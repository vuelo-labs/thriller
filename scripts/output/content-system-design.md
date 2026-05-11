# ALIBI Content System Design

## 1. THE CONTENT LAYER AUDIT

### What exists now

**scenarios.ts** contains 8 adult scenarios and 3 kid scenarios. Each scenario is a narrative paragraph + image URL + 5 hardcoded constraint strings. The constraints are crime-specific: "Where were you between 10 PM and midnight last Tuesday?" These escalate from vague to pointed, which is good instinct, but the escalation is linear (time-based narrowing) rather than dramatic (emotional narrowing).

**questions.ts** contains 60 generic self-revelation questions across 6 categories (habits, values, relationships, past, fears, spontaneity). Each has adult + kid versions and tags. There is a `MODE_CATEGORIES` filter that restricts which categories appear in "work" vs "family" vs "friends" mode.

### The fundamental problem

These two content streams operate in parallel universes. The constraints talk about the crime. The questions talk about the person. They never intersect. This means:

1. **The constraint questions feel like a quiz**, not an interrogation. "Where were you between 9 PM and 11 PM?" has one correct answer: wherever you actually were. There is no dramatic tension because the question does not create a dilemma.

2. **The personal questions feel random**. "What's a food combination you love that people think is disgusting?" is a fine party question, but when it appears in the middle of a murder investigation, it breaks the narrative spell. The player thinks: "Why am I answering this?"

3. **The guilty player's lie has no thematic weight**. Their lie is a generic personal falsehood (one of three statements). It is not connected to the crime scenario. The lie detection game and the crime narrative are two separate games sharing a UI.

### The architectural fix

**Merge the two streams into a single question type that serves both masters.**

Every question in the game should work on two levels:

- **Surface level (theme):** It sounds like it belongs to the investigation. It feels like something a detective / colleague / family member would ask given the scenario.
- **Depth level (human):** It actually reveals something true and interesting about the real person answering it.

This is not hard to do. Most good interrogation questions already work this way. "Tell us about the last time you stayed somewhere you weren't supposed to be" sounds like a detective probing for access to the crime scene. But the real answer is a story about sneaking into a concert, sleeping in your ex's car, or hiding in the library after closing. The question belongs to the theme AND reveals the person.

The constraint arc (the escalating scenario-specific questions) stays. But instead of being pure logistics ("Where were you at 10 PM?"), they become dramatically escalating questions that ALSO happen to reveal character:

- Round 1: "Walk us through a typical evening for you. Where do you usually end up?" (Establishes who you are.)
- Round 2: "What's something you wanted that night that you couldn't have?" (Creates desire and tension.)
- Round 3: "What are you not telling us right now?" (Forces vulnerability.)

The generic question pool is then re-themed per pack so that even the "between rounds" personal questions feel native to the setting.


---

## 2. THE THEME PACK SCHEMA

The full TypeScript interface is written in:

**`/src/lib/themePack.ts`**

Key design decisions:

- **ThemePack** is a single self-contained object. One import, one JSON blob, one complete game skin. It contains scenarios, questions, vocabulary, visual identity, player briefings, and closing rituals.

- **ThemeScenario** contains a narrative, image, and an array of **ThemeConstraint** objects (not raw strings). Each constraint has a `text`, an `arc` position (establish/tension/reveal), and a `guiltyHint` — private coaching for the guilty player about what kind of lie would be smart here.

- **ThemeQuestion** has `adultVersion`, `kidVersion`, `arc`, `reveals`, `surfaceRead`, and `depthRead`. The surface/depth reads are QA fields — they are not shown to players but they force the content author to articulate WHY the question works on both levels.

- **ThemeVocabulary** replaces every hardcoded string in the UI. "crime" becomes "incident". "criminal" becomes "guiltyNoun". "JUSTICE IS SERVED" becomes `justiceServedLine`. This means the FinalReveal.tsx, Confession.tsx, and CrimeScene.tsx components can be entirely theme-driven without any string surgery.

- **ThemeVisuals** carries CSS backgrounds, accent colours, and optional ambient audio. Enough to reskin the mood without touching component code.


---

## 3. THE QUESTION DESIGN FRAMEWORK

### The Two-Level Rule

Every question must pass this test:

> **If you read it in-theme, it sounds like part of the story.**
> **If you answer it honestly, it reveals something real about you.**

If a question only works on one level, it fails. "Where were you at 10 PM?" is pure theme — it reveals nothing interesting. "What's your weirdest food habit?" is pure revelation — it has nothing to do with the story.

### CRIME SCENE: 5 dual-level questions

| # | Question | Surface Read (crime) | Depth Read (human) |
|---|----------|---------------------|-------------------|
| 1 | "Describe the last time you were somewhere you absolutely should not have been." | Probing for access to the crime scene. | Reveals rule-breaking, adventurousness, secret life. |
| 2 | "What's something you own that would be very hard to explain if someone found it in your bag right now?" | Searching for incriminating evidence. | Reveals quirky possessions, guilty pleasures, private life. |
| 3 | "Tell us about a time you convinced someone of something that wasn't entirely true." | Testing capacity for deception. | Reveals social dynamics, persuasion, past lies, vulnerability. |
| 4 | "Who in your life would be least surprised to find out you committed a crime — and why would they say that?" | Building a character profile. | Reveals self-perception, closest relationships, reputation. |
| 5 | "What would you do if you had 48 hours before anyone noticed you were gone?" | Testing flight risk and hidden desires. | Reveals deepest desires, secret life, what freedom means to them. |

### OFFICE POLITICS: 5 dual-level questions

(Theme: Someone stole credit for the big project. The presentation was plagiarised. HR is investigating.)

| # | Question | Surface Read (office) | Depth Read (human) |
|---|----------|----------------------|-------------------|
| 1 | "Describe your actual relationship with your own ambition. How far would you go?" | Establishing motive for the theft. | Reveals values around success, competition, self-worth. |
| 2 | "Tell us about a time you did work that someone else got the credit for." | Probing for resentment and motive. | Reveals injustice stories, how they handle being overlooked. |
| 3 | "What's a professional skill you have that your colleagues would be surprised to learn about?" | Checking capability — could they have pulled it off? | Reveals hidden talents, imposter syndrome, secret competence. |
| 4 | "Who in this room would you trust with a secret that could get you fired?" | Testing alliances and loyalties. | Reveals trust patterns, vulnerability, who actually matters. |
| 5 | "What's something you've done at work that you knew was wrong but did anyway because nobody was watching?" | Direct interrogation of ethics under pressure. | Reveals moral flexibility, private rule-breaking, honesty. |

### FAMILY REUNION: 5 dual-level questions

(Theme: Someone ate the last piece of Grandma's famous birthday cake. The fridge is empty. Accusations are flying.)

| # | Question | Surface Read (family) | Depth Read (human) |
|---|----------|----------------------|-------------------|
| 1 | "What is your honest reputation within this family — what do people say about you when you leave the room?" | Establishing who has the appetite (literal and figurative) for this crime. | Reveals family role, self-awareness, vulnerability about belonging. |
| 2 | "Describe something a family member did years ago that you still haven't forgiven them for." | Probing for grudges — maybe the cake was revenge. | Reveals deep family dynamics, long-held resentments, what matters. |
| 3 | "What's a family tradition or rule that everyone follows but you secretly think is ridiculous?" | Testing respect for family norms — would they violate the sacred cake? | Reveals values, conformity vs. independence, private rebellion. |
| 4 | "If you could swap lives with one other family member for a week, who would it be and why?" | Probing for envy — who wanted what someone else had? | Reveals admiration, jealousy, what they wish their life looked like. |
| 5 | "What's one thing you wish this family talked about openly but nobody ever does?" | The final crack — forcing the unspoken into the open. | Reveals family secrets, emotional needs, courage to be honest. |


---

## 4. THE SCENARIO-TO-QUESTION PIPELINE (Escalating Arcs)

### The problem with the current constraints

The 5 current constraints per scenario follow a TIME-BASED narrowing:

```
Round 1: "Walk us through a typical Tuesday evening."          (wide)
Round 2: "Describe the last time you stayed out past 11 PM."   (narrower)
Round 3: "Tell us about a time you've been to a museum."       (context)
Round 4: "What were you doing between 10 PM and midnight?"     (specific)
Round 5: "Prove you weren't at the Gardner Museum."            (direct)
```

This is logistical escalation. It gets more specific but not more dramatic. By round 3, the questions feel like a police report, not a story. The emotional temperature stays flat.

### The fix: DRAMATIC escalation across 3 rounds

The game runs 3 rounds (recommended). Each round should escalate not just in specificity but in emotional stakes. The arc:

**Round 1 — ESTABLISH:** "Who are you in this story?"
Low pressure. The question gives everyone a chance to paint a picture of themselves. The guilty player establishes their cover. The innocent players reveal something real. The audience starts forming impressions.

**Round 2 — TENSION:** "What did you want?"
Medium pressure. The question introduces desire, conflict, and motive. Now every answer sounds suspicious because everyone WANTED something. The guilty player's lie has to navigate around real desire. The innocent players reveal what drives them.

**Round 3 — REVEAL:** "What aren't you telling us?"
Maximum pressure. The question demands honesty. It is almost impossible to answer this without revealing something real. The guilty player is cornered — their lie here must be their best performance. The innocent players are forced into genuine vulnerability.

### CRIME SCENE — 3-Round Arc

**Scenario: The Vermeer painting vanished from the Gardner Museum.**

**Round 1 (Establish):**
Constraint: "Paint us a picture of who you are on a regular Tuesday night. Where are you, who are you with, and what does your evening actually look like?"
Guilty hint: "Your lie should make your Tuesday night sound boring and accounted for. Too specific is suspicious. Too vague is suspicious."

**Round 2 (Tension):**
Constraint: "What's something you wanted — badly — that you couldn't get through normal means? Not necessarily the painting. Anything in your life."
Guilty hint: "Your lie must describe a desire that sounds believable but doesn't point toward the painting. If your desire sounds too noble, they'll suspect you."

**Round 3 (Reveal):**
Constraint: "What's something about that night — or about yourself — that you haven't told us yet? We're not asking if you did it. We're asking what you're holding back."
Guilty hint: "This is the hardest one. Your lie must sound like a real confession of something small to distract from the big truth. Give them a bone so they stop digging."

### OFFICE POLITICS — 3-Round Arc

**Scenario: Someone copied the Meridian pitch deck and presented it as their own to the board. The real author has proof. HR is in the building.**

**Round 1 (Establish):**
Constraint: "Tell us about your role here. What do you actually do day-to-day, and how do you feel about it — honestly?"
Guilty hint: "Your lie should make your position sound stable and content. If you sound ambitious or frustrated, they'll see motive."

**Round 2 (Tension):**
Constraint: "Describe a time at work when you felt you deserved more than you got. What happened, and what did you do about it?"
Guilty hint: "Everyone has this story. Your lie needs to describe a real-sounding grievance that ISN'T about the pitch deck. The trick is to sound resentful about something else."

**Round 3 (Reveal):**
Constraint: "What would you do right now if you knew nobody in this room would ever find out? Not about the pitch deck. About anything."
Guilty hint: "Your lie should be a small, relatable secret — something that makes them think 'oh, that's their real confession' and stop looking. Misdirect with vulnerability."


---

## 5. REPLAYABILITY: THE CONTENT AUTHORING GUIDE

### What a content creator needs to deliver for one Theme Pack

| Component | Count | Effort | Notes |
|-----------|-------|--------|-------|
| Theme identity (name, tagline, premise, description) | 1 set | 15 min | Must pass the "would I pick this from a menu?" test. |
| Scenarios | 5-10 | 30-45 min each | Each needs: narrative (2-4 sentences), 3 constraint questions with guilty hints. |
| Themed questions | 40-60 | 3-5 min each | Must pass the two-level test. At least 12 per arc position. |
| Vocabulary | 1 set | 20 min | Every noun, verb, and UI label. |
| Briefings (guilty, innocent, instructions) | 4 pieces | 15 min | In-theme versions of standard instructions. |
| Closing reflection | 1 | 5 min | The human connection question at the end. |
| Visual identity | 1 set | 15 min | Colour palette, background CSS. Images optional. |

**Total estimated time for a complete theme pack: 6-10 hours of focused writing.**

A skilled content creator who understands the two-level question principle can produce a draft pack in a single day. QA and playtesting adds another day.

### Quality criteria — what makes a theme pack WORK

1. **Universal access.** Every player must be able to answer every question from personal experience. If a question requires specialist knowledge ("What's your favourite opera?"), it fails. The best questions are ones where EVERYONE has an answer but every answer is different.

2. **Plausible guilt.** The scenario must make it plausible that ANY person in the room could be the culprit. If the scenario is "someone hacked the mainframe" and three players don't own computers, the premise collapses. The incident must be something anyone could conceivably do.

3. **Funny potential.** The theme must create situations where truthful answers are accidentally hilarious. "Office Politics" works because everyone has a petty work grudge. "Family Reunion" works because family dynamics are inherently absurd. The humour comes from the gap between the dramatic framing and the mundane reality.

4. **Escalation headroom.** The theme must support a round 3 question that genuinely raises the emotional temperature. If the theme is too lightweight, the "reveal" round falls flat. The test: can you write a round 3 question for this theme that would make a room go quiet for a second before someone answers?

5. **The closing lands.** The closing reflection question must feel earned. It should connect the theme back to real human connection. After a "Crime Scene" game, asking "What did you learn about someone tonight?" feels right because you've been scrutinising each other for an hour. If the theme can't support a meaningful closing, it's entertainment without heart.

### What makes a theme pack FAIL

- **Too niche.** "Wine Connoisseur Mystery" — excludes anyone who doesn't drink. "Sci-Fi Convention" — excludes anyone who isn't a fan. Themes must be universally relatable situations, not subcultures.

- **Too abstract.** "Philosophical Dilemma" — there's no specific incident, no physical scene, no one to accuse. The game needs a concrete "what happened" to anchor everything.

- **No motive gradient.** If the scenario doesn't create a reason why EVERYONE might have done it, the investigation phase is dead on arrival. Every player needs to feel slightly uncomfortable, like their truthful answers make them look guilty.

- **Humourless.** If the theme is genuinely dark (e.g., "someone was harmed"), the funny moments evaporate. The game works because the crime is serious enough to justify the interrogation but absurd enough to enjoy. "Someone stole a painting" = good. "Someone's pet is missing" = too sad for some groups. Test: would the table laugh at the scenario setup?

- **Questions don't dual-track.** If the themed questions are just regular icebreakers with a theme word inserted ("As a detective, what's your favourite food?"), the integration fails. Every question must genuinely sound like it belongs to the investigation AND reveal something real.

### The 20-pack roadmap (in order of universal appeal)

| Priority | Theme | Why it works |
|----------|-------|-------------|
| 1 | Crime Scene (current) | The original. Universal, dramatic, proven. |
| 2 | Office Politics | Everyone has worked somewhere. Petty stakes are funny. |
| 3 | Family Reunion | Universal family dynamics. Maximum embarrassment potential. |
| 4 | High School Reunion | Nostalgia + secrets. "Who spread the rumour?" is inherently dramatic. |
| 5 | Heist Gone Wrong | Aspirational fantasy. "The plan was perfect until..." |
| 6 | Reality TV | "Someone leaked the elimination order." Meta and self-aware. |
| 7 | Wedding Drama | "Someone objected. Who was it?" Universal high-stakes social event. |
| 8 | Spy Mission | "The mole in our agency." Thriller fantasy. |
| 9 | Mythology | "Which god broke the oath?" Epic framing, silly answers. |
| 10 | Neighbourhood Drama | "Someone called the council about the fence." Maximum pettiness. |
| 11 | Holiday Disaster | "Someone cancelled the booking." Travel + stress = comedy. |
| 12 | School Staff Room | "Someone left that review on Rate My Teacher." Teachers love this. |
| 13 | Flatmate Tribunal | "Someone ate the labelled food." Everyone who's had a flatmate has stories. |
| 14 | Sports Team | "Someone leaked the playbook." Team dynamics, loyalty, competition. |
| 15 | Book Club Gone Wrong | "Someone spoiled the ending on purpose." Literate pettiness. |
| 16 | Cooking Competition | "Someone sabotaged the sourdough." Low stakes, high drama. |
| 17 | Road Trip | "Someone took the wrong turn on purpose." Confined space, rising tension. |
| 18 | Talent Show | "Someone swapped the backing track." Performance + sabotage. |
| 19 | Museum After Dark | "The exhibit moved. On its own." Spooky, fun, kid-friendly. |
| 20 | Space Station | "Someone opened the airlock." Sci-fi but with universal human dynamics. |


---

## 6. THE IMMEDIATE FIX — 3 Content Changes for 10x Improvement

These are edits to `scenarios.ts` and `questions.ts` ONLY. No code changes.

### Fix 1: Rewrite the constraints to escalate dramatically, not logistically

The current constraints narrow by time window. Rewrite the first 3 constraints of every scenario to follow the establish/tension/reveal arc. The last 2 constraints can stay as backup for 4-5 round games.

**Example — Scenario 1 (Gardner Museum), change constraints from:**
```
1. "Walk us through a typical Tuesday evening for you."
2. "Describe what you were doing the last time you stayed out past 11 PM."
3. "Tell us about a time you've been to a museum, gallery, or cultural event."
4. "What were you doing between 10 PM and midnight last Tuesday?"
5. "Prove you weren't at the Gardner Museum last Tuesday night."
```

**To:**
```
1. "Paint us a picture of your typical evening. Where do you go, who are you with, and what does the night usually look like for you?"
2. "Tell us about something you've wanted — really wanted — that you couldn't get through normal or honest means."
3. "What's something about yourself that, if the people in this room knew it, would make you look guilty right now?"
4. "What were you doing between 10 PM and midnight last Tuesday?"
5. "Prove you weren't at the Gardner Museum last Tuesday night."
```

Rounds 1-3 now escalate in emotional weight. Round 1 reveals lifestyle. Round 2 reveals desire (motive). Round 3 forces vulnerability (makes everyone look guilty). Rounds 4-5 stay as direct police-style questions for longer games.

**Do this for all 8 adult scenarios and all 3 kid scenarios.** The specific details change but the arc (establish -> tension -> reveal) stays constant.

### Fix 2: Add 10 "bridge" questions to questions.ts that connect to crime/investigation themes

The current 60 questions are good but they feel disconnected because they have zero narrative flavour. Add 10 new questions (IDs 61-70) that use investigative language while still revealing the real person. These become the preferred pool when the game needs a personal question mid-investigation.

```typescript
// CATEGORY 7: INVESTIGATION BRIDGE QUESTIONS (61-70)
// These use crime/investigation framing to ask personal questions.
// They work in any theme because they're about human nature, not specific crimes.

{ id: 61, category: 'bridge', adultVersion: "If someone searched your phone right now, what's the most suspicious thing they'd find — and what's the innocent explanation?", kidVersion: "If a teacher looked through your bag right now, what would be the hardest thing to explain?", tags: ['funny', 'revealing', 'vulnerable'] },

{ id: 62, category: 'bridge', adultVersion: "What's your alibi for last Friday night — and does anyone here actually believe it?", kidVersion: "What did you actually do last weekend — and would anyone here believe you?", tags: ['funny', 'social', 'revealing'] },

{ id: 63, category: 'bridge', adultVersion: "What skill or knowledge do you have that would make you surprisingly good at committing a crime?", kidVersion: "What's something you're good at that would make you a surprisingly good spy?", tags: ['funny', 'revealing'] },

{ id: 64, category: 'bridge', adultVersion: "Describe a time you got away with something you definitely should not have gotten away with.", kidVersion: "Tell us about a time you got away with something and you still can't believe it.", tags: ['past', 'funny', 'vulnerable'] },

{ id: 65, category: 'bridge', adultVersion: "Who in your life would make the best alibi witness for you — and who would immediately sell you out?", kidVersion: "Who would cover for you no matter what — and who would snitch on you immediately?", tags: ['relationships', 'funny', 'revealing'] },

{ id: 66, category: 'bridge', adultVersion: "What's the biggest secret you're currently keeping from someone in your life?", kidVersion: "What's a secret you're keeping right now that you kind of wish you could just tell someone?", tags: ['vulnerable', 'revealing'] },

{ id: 67, category: 'bridge', adultVersion: "If you had to disappear for 72 hours and nobody could know where you went, where would you go and what would you do?", kidVersion: "If you could disappear for a whole day and nobody would know, where would you go?", tags: ['aspirational', 'revealing'] },

{ id: 68, category: 'bridge', adultVersion: "What's the most convincing lie you've ever told — and did it work?", kidVersion: "What's the best excuse you've ever made up — and did the person believe you?", tags: ['past', 'funny', 'social'] },

{ id: 69, category: 'bridge', adultVersion: "What's something about you that, if revealed to this group, would change how they see you?", kidVersion: "What's something about you that would surprise everyone here if they found out?", tags: ['vulnerable', 'revealing'] },

{ id: 70, category: 'bridge', adultVersion: "Right now, in this moment — what are you most afraid we'll find out about you?", kidVersion: "What's something you're hoping nobody asks you about tonight?", tags: ['vulnerable', 'revealing', 'fears'] },
```

Then update `MODE_CATEGORIES` to include `'bridge'` in all modes:

```typescript
const MODE_CATEGORIES: Record<string, string[]> = {
  friends: ['habits', 'values', 'relationships', 'past', 'fears', 'spontaneity', 'bridge'],
  work: ['habits', 'values', 'past', 'fears', 'bridge'],
  family: ['habits', 'relationships', 'past', 'spontaneity', 'bridge'],
}
```

### Fix 3: Add dramatic weight to the scenario narratives

The current scenarios are well-written but they all follow the same structure: [item] was [stolen] from [place] during [event]. [Security detail]. Everyone is a suspect.

The narratives need a HUMAN HOOK — one sentence that makes the crime feel personal rather than procedural. Add one sentence to each scenario that creates emotional stakes:

**Current (Scenario 1):**
> "At 11:47 PM on a rainy Tuesday, the priceless Vermeer painting 'The Concert' vanished from the Isabella Stewart Gardner Museum. Security footage shows nothing. The alarm was disabled from inside. Everyone at tonight's private viewing is a suspect."

**Improved:**
> "At 11:47 PM on a rainy Tuesday, the priceless Vermeer painting 'The Concert' vanished from the Isabella Stewart Gardner Museum. Security footage shows nothing. The alarm was disabled from inside. **The curator who'd spent thirty years protecting it was found weeping in the empty frame room.** Everyone at tonight's private viewing is a suspect."

That one sentence — the weeping curator — transforms the scenario from a logistics puzzle into a story with a victim. Now when players lie, they're lying about something that hurt someone. The emotional temperature rises.

Do this for all scenarios. One sentence each. Add a human consequence:

- Scenario 2 (sapphire necklace): "The necklace belonged to a woman who donated it in memory of her late daughter."
- Scenario 3 (bearer bonds): "The host hasn't spoken since. His family's trust fund — generations of it — was in that room."
- Scenario 4 (microchip): "The engineer who built it has been placed on leave pending the investigation. She says she can't rebuild it."
- Scenario 5 (black diamond): "The exhibition was the life's work of a retired gemologist. He watched the replica revealed on live television."
- Scenario 6 (First Folio): "The librarian who authenticated it last week has resigned. She says she'll never trust herself again."
- Scenario 7 (ransomware): "Every employee's pension record was in those files. Two thousand people's futures, locked behind a ransom."
- Scenario 8 (Ghost Violin): "The violin was being sold to fund a children's music programme. The money is gone. The programme is cancelled."

These additions cost nothing in code. They transform every scenario from a puzzle into a story with stakes.


---

## Summary

The ThemePack interface is written and ready at `/src/lib/themePack.ts`. It is the complete content schema for a theme-agnostic ALIBI game. The three immediate content fixes (dramatic constraint arcs, bridge questions, human hooks in narratives) can be applied to `scenarios.ts` and `questions.ts` today with zero code changes. The 20-theme roadmap gives the content team a clear production pipeline. The authoring guide tells them exactly what to write, how long it should take, and what failure looks like.

The game mechanics are good. The content layer just needs to catch up.
