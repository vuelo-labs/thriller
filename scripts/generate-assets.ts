/**
 * ALIBI — Asset Generation Script
 *
 * Generates 200 crime scenarios (text) + noir crime scene images (Imagen 4 Fast)
 * and uploads images to Supabase Storage.
 *
 * Run with:
 *   GEMINI_API_KEY=xxx SUPABASE_URL=xxx SUPABASE_ANON_KEY=xxx npx tsx scripts/generate-assets.ts
 *
 * Safe to re-run — skips already-completed items.
 */

import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// ─── Config ───────────────────────────────────────────────────────────────────

const TOTAL = 200;
const BATCH_SIZE = 20; // scenarios per Gemini text request
const IMAGE_DELAY_MS = 7000; // delay between image requests (Imagen 4 limit: 10 RPM)

const OUTPUT_DIR = join(process.cwd(), "scripts/output");
const IMAGES_DIR = join(OUTPUT_DIR, "images");
const SCENARIOS_FILE = join(OUTPUT_DIR, "scenarios.json");
const PROGRESS_FILE = join(OUTPUT_DIR, "progress.json");

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scenario {
  id: number;
  scenario: string;
  promptQuestion: string;
  imagePrompt: string;
  imageUrl?: string;         // Supabase Storage public URL (set after upload)
  localImagePath?: string;   // local path (set after image generation)
}

interface Progress {
  scenariosGenerated: number;
  imagesGenerated: number;
  imagesUploaded: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadScenarios(): Scenario[] {
  if (existsSync(SCENARIOS_FILE)) {
    return JSON.parse(readFileSync(SCENARIOS_FILE, "utf-8"));
  }
  return [];
}

function saveScenarios(scenarios: Scenario[]) {
  writeFileSync(SCENARIOS_FILE, JSON.stringify(scenarios, null, 2));
}

function loadProgress(): Progress {
  if (existsSync(PROGRESS_FILE)) {
    return JSON.parse(readFileSync(PROGRESS_FILE, "utf-8"));
  }
  return { scenariosGenerated: 0, imagesGenerated: 0, imagesUploaded: 0 };
}

function saveProgress(progress: Progress) {
  writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(msg: string) {
  const time = new Date().toISOString().substring(11, 19);
  console.log(`[${time}] ${msg}`);
}

// ─── Step 1: Generate scenario texts ─────────────────────────────────────────

async function generateScenarioTexts(ai: GoogleGenAI): Promise<Scenario[]> {
  let scenarios = loadScenarios();
  const progress = loadProgress();

  if (scenarios.length >= TOTAL) {
    log(`✓ Scenarios already generated (${scenarios.length})`);
    return scenarios;
  }

  log(`Generating ${TOTAL} scenario texts in batches of ${BATCH_SIZE}...`);

  while (scenarios.length < TOTAL) {
    const batchNum = Math.floor(scenarios.length / BATCH_SIZE) + 1;
    const remaining = TOTAL - scenarios.length;
    const thisBatch = Math.min(BATCH_SIZE, remaining);

    log(`  Batch ${batchNum}: generating ${thisBatch} scenarios (${scenarios.length}/${TOTAL} done)...`);

    const prompt = `You are a creative writer for ALIBI, a social deduction party game.

Generate exactly ${thisBatch} unique crime scenarios for the game. They should vary in:
- Setting (museum, hotel, casino, yacht, tech company, art gallery, airport, estate, restaurant, train, etc.)
- Crime type (theft, forgery, sabotage, disappearance, espionage — NO graphic violence or murder)
- Time period (contemporary, 1960s, near-future)

For each scenario, provide:
- scenario: The crime description (under 80 words, specific location, intriguing)
- promptQuestion: A question ALL players can answer about their REAL lives to build an alibi (under 20 words, must relate to establishing whereabouts or knowledge relevant to the crime)
- imagePrompt: A description for a moody noir illustration of the crime scene (specific, visual, cinematic)

IMPORTANT:
- Every scenario must be completely unique
- The promptQuestion must work for real people in real life (not game-specific)
- No graphic violence, death, or disturbing content

Respond ONLY with a valid JSON array, no markdown, no commentary:
[
  {
    "scenario": "...",
    "promptQuestion": "...",
    "imagePrompt": "Noir detective style illustration: [scene]. Dark moody palette, dramatic shadows, film noir aesthetic, no text in image."
  }
]`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text = (response.text as string).trim();
      // Strip markdown code fences if present
      const jsonText = text.replace(/^```json?\n?/, "").replace(/\n?```$/, "");
      const batch: Omit<Scenario, "id">[] = JSON.parse(jsonText);

      for (const item of batch) {
        scenarios.push({
          id: scenarios.length + 1,
          scenario: item.scenario,
          promptQuestion: item.promptQuestion,
          imagePrompt: item.imagePrompt,
        });
      }

      saveScenarios(scenarios);
      progress.scenariosGenerated = scenarios.length;
      saveProgress(progress);

      log(`  ✓ Batch ${batchNum} done. Total: ${scenarios.length}/${TOTAL}`);

      // Small delay between batches
      if (scenarios.length < TOTAL) await sleep(500);
    } catch (err) {
      log(`  ✗ Batch ${batchNum} failed: ${err}`);
      log(`  Retrying in 3 seconds...`);
      await sleep(3000);
    }
  }

  log(`✓ All ${TOTAL} scenarios generated.`);
  return scenarios;
}

// ─── Step 2: Generate images ──────────────────────────────────────────────────

async function generateImages(ai: GoogleGenAI, scenarios: Scenario[]): Promise<Scenario[]> {
  const progress = loadProgress();
  let generated = 0;

  for (const scenario of scenarios) {
    if (scenario.localImagePath && existsSync(scenario.localImagePath)) {
      generated++;
      continue; // already done
    }

    const imagePath = join(IMAGES_DIR, `scene-${String(scenario.id).padStart(3, "0")}.png`);

    try {
      log(`  Generating image ${scenario.id}/${TOTAL}...`);

      const response = await ai.models.generateImages({
        model: "imagen-4.0-fast-generate-001",
        prompt: scenario.imagePrompt,
        config: { numberOfImages: 1 },
      });

      const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
      if (!imageBytes) throw new Error("No image bytes in response");

      const buffer = Buffer.from(imageBytes, "base64");
      writeFileSync(imagePath, buffer);

      scenario.localImagePath = imagePath;
      generated++;
      progress.imagesGenerated = generated;

      // Save progress after each image
      saveScenarios(scenarios);
      saveProgress(progress);

      log(`  ✓ Image ${scenario.id} saved.`);

      await sleep(IMAGE_DELAY_MS);
    } catch (err: any) {
      const msg = String(err);
      const retryMatch = msg.match(/retry in (\d+)/i);
      if (retryMatch) {
        const waitSec = parseInt(retryMatch[1]) + 2;
        log(`  ✗ Image ${scenario.id} rate limited. Waiting ${waitSec}s then retrying...`);
        await sleep(waitSec * 1000);
        // retry once
        try {
          const response = await ai.models.generateImages({
            model: "imagen-4.0-fast-generate-001",
            prompt: scenario.imagePrompt,
            config: { numberOfImages: 1 },
          });
          const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
          if (!imageBytes) throw new Error("No image bytes");
          const imagePath = join(IMAGES_DIR, `scene-${String(scenario.id).padStart(3, "0")}.png`);
          writeFileSync(imagePath, Buffer.from(imageBytes, "base64"));
          scenario.localImagePath = imagePath;
          generated++;
          progress.imagesGenerated = generated;
          saveScenarios(scenarios);
          saveProgress(progress);
          log(`  ✓ Image ${scenario.id} saved (retry).`);
        } catch (retryErr) {
          log(`  ✗ Image ${scenario.id} retry failed, skipping: ${retryErr}`);
        }
      } else {
        log(`  ✗ Image ${scenario.id} failed: ${err}`);
        log(`  Skipping and continuing...`);
      }
      await sleep(IMAGE_DELAY_MS);
    }
  }

  log(`✓ Images generated: ${generated}/${TOTAL}`);
  return scenarios;
}

// ─── Step 3: Upload to Supabase Storage ──────────────────────────────────────

async function uploadToSupabase(scenarios: Scenario[]): Promise<Scenario[]> {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const progress = loadProgress();
  let uploaded = 0;

  for (const scenario of scenarios) {
    if (scenario.imageUrl) {
      uploaded++;
      continue; // already uploaded
    }
    if (!scenario.localImagePath || !existsSync(scenario.localImagePath)) {
      log(`  Skipping upload for ${scenario.id} — no local image.`);
      continue;
    }

    const fileName = `scene-${String(scenario.id).padStart(3, "0")}.png`;

    try {
      log(`  Uploading ${fileName}...`);

      const fileBuffer = readFileSync(scenario.localImagePath);

      const { error } = await supabase.storage
        .from("crime-scenes")
        .upload(fileName, fileBuffer, {
          contentType: "image/png",
          upsert: true,
        });

      if (error) throw error;

      const { data } = supabase.storage.from("crime-scenes").getPublicUrl(fileName);
      scenario.imageUrl = data.publicUrl;
      uploaded++;
      progress.imagesUploaded = uploaded;

      saveScenarios(scenarios);
      saveProgress(progress);

      log(`  ✓ Uploaded ${fileName}`);
    } catch (err) {
      log(`  ✗ Upload failed for ${scenario.id}: ${err}`);
    }
  }

  log(`✓ Uploaded: ${uploaded}/${TOTAL}`);
  return scenarios;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");
  if (!supabaseUrl) throw new Error("Missing SUPABASE_URL");
  if (!supabaseKey) throw new Error("Missing SUPABASE_ANON_KEY");

  mkdirSync(IMAGES_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });

  log("=== ALIBI Asset Generator ===");
  log(`Target: ${TOTAL} scenarios + images`);
  log("");

  log("Step 1: Generating scenario texts...");
  let scenarios = await generateScenarioTexts(ai);

  log("");
  log("Step 2: Generating crime scene images...");
  scenarios = await generateImages(ai, scenarios);

  log("");
  log("Step 3: Uploading to Supabase Storage...");
  scenarios = await uploadToSupabase(scenarios);

  log("");
  log("=== Done ===");
  log(`Scenarios file: ${SCENARIOS_FILE}`);

  const withUrls = scenarios.filter((s) => s.imageUrl).length;
  const withoutUrls = scenarios.filter((s) => !s.imageUrl).length;
  log(`Images with Supabase URLs: ${withUrls}/${TOTAL}`);
  if (withoutUrls > 0) {
    log(`Warning: ${withoutUrls} images missing URLs (check logs above)`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
