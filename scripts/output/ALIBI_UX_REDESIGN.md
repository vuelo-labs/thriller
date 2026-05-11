# ALIBI UX Redesign: Complete Experience Specification

---

## Architecture Overview

**Core change:** The game shifts from "one player reads aloud while others vote" to "everyone answers the same question simultaneously, all answers appear on TV at once, 30 seconds of verbal cross-examination, then vote on who the liar is."

**New phase flow per round:**
```
crime_reveal -> briefing -> answer_input -> answer_reveal -> interrogation (30s) -> voting -> reveal -> [next round or accusation]
```

**Key mechanical changes:**
- The AlibiBuilder no longer asks for 3 statements (2 truths + 1 lie). Instead, every player answers ONE question with ONE answer. The liar's answer is fabricated; everyone else answers truthfully.
- One player is secretly the liar for the entire game. They maintain ONE consistent fictional persona/detail across all rounds.
- All answers are shown simultaneously on TV. Nobody reads aloud. The room reads the TV together.
- After answers appear, a 30-second interrogation window opens. Players verbally question each other. The TV and phones suggest good questions to ask.
- After interrogation, players vote on who they think the liar is (not which statement is a lie).
- Notes persist across rounds on phones.

---

## 1. PHONE UX FLOWS

### 1A. LIAR BRIEFING SCREEN

**When shown:** After `crime_reveal`, before `answer_input`. Only the liar sees this version. Shown for 12 seconds with a "Got it" button to dismiss early.

**Layout:**

```
[Full screen, dark bg with deep red vignette at edges]

[Top bar]
[Player dot] [Player name]              ROUND 1 OF 3

[Red border card, centered]
---------------------------------------------
|  FOR YOUR EYES ONLY                       |
|                                           |
|  You are the liar.                        |
|                                           |
|  Your cover story:                        |
|  "[personal_lie from DB]"                 |
|                                           |
|  Every round, you'll answer a question.   |
|  Everyone else answers truthfully.        |
|  You must answer consistently with your   |
|  cover story — without making it obvious. |
---------------------------------------------

[Gold border tip card — one of 5 tips, randomly selected]
---------------------------------------------
|  TIP: Don't over-explain. Liars add       |
|  unnecessary detail. Keep it as short as   |
|  the truth would be.                       |
---------------------------------------------

[Button: "GOT IT — I'M READY"]
```

**Exact copy for the briefing card:**
```
FOR YOUR EYES ONLY

You are the liar.

Your cover story:
"[personal_lie]"

Every round, a question will appear. Everyone answers it honestly — except you. Your answer must fit your cover story. Stay consistent. Stay calm. Don't get caught.
```

**The 5 liar coaching tips (one shown at random per round):**

1. "Keep it short. Truthful people don't over-explain. Match the length of a real answer."
2. "Borrow from real life. Change one key detail rather than inventing from scratch. It's easier to remember and harder to spot."
3. "Don't be the first or last to submit. Blend into the middle of the pack."
4. "If questioned, pause before answering — just like you would if you were genuinely remembering. Instant answers look rehearsed."
5. "Anchor your lie to something true. If your cover story says you grew up in Leeds, use real Leeds details you actually know."

---

### 1B. INNOCENT PLAYER BRIEFING SCREEN

**When shown:** Same timing as liar briefing. All non-liar players see this version.

**Layout:**

```
[Full screen, dark bg with subtle gold vignette]

[Top bar]
[Player dot] [Player name]              ROUND 1 OF 3

[Gold border card, centered]
---------------------------------------------
|  YOUR BRIEFING                            |
|                                           |
|  Someone in this room is lying.           |
|                                           |
|  Each round, everyone answers the same    |
|  question. You answer truthfully.         |
|  The liar is making it up.               |
|                                           |
|  After answers appear on the TV, you'll   |
|  have 30 seconds to question anyone.      |
|  Watch closely. Trust your gut.           |
---------------------------------------------

[Gold border tip card — one of 5 tips, randomly selected]
---------------------------------------------
|  TIP: Watch for answers that are too       |
|  perfect. Real memories have rough edges.  |
---------------------------------------------

[Button: "GOT IT — LET'S GO"]
```

**Exact copy for the briefing card:**
```
YOUR BRIEFING

Someone in this room is lying.

Each round, everyone answers the same question. You answer truthfully. The liar doesn't.

After all answers appear on the TV, you have 30 seconds to question anyone in the room — out loud. Listen for hesitation, over-detail, or contradictions.

At the end, you'll vote on who you think the liar is.
```

**The 5 innocent coaching tips (one shown at random per round):**

1. "Watch for answers that are too perfect. Real memories have rough edges."
2. "Ask follow-up questions. Liars prepare the headline but not the details underneath."
3. "Compare answers across rounds. The liar has to maintain a fiction — look for drift."
4. "Watch body language during the 30-second window. Who avoids eye contact when questioned?"
5. "Pay attention to who reacts to being questioned. Truthful people are curious; liars are defensive."

---

### 1C. ANSWER INPUT SCREEN (Replaces AlibiBuilder)

**When shown:** During `answer_input` phase. All players see the same question but answer individually.

**Layout:**

```
[Full screen]

[Top bar]
[Player dot] [Player name]              [Timer: 60s]

[Question card — gold border for innocent, red for liar]
---------------------------------------------
|  ROUND 1 QUESTION                         |
|                                           |
|  "What's a meal you could cook from       |
|   memory right now, no recipe needed?"    |
---------------------------------------------

[Liar only: red subtle reminder bar]
---------------------------------------------
|  Remember: your cover story is            |
|  "[personal_lie]". Stay consistent.       |
---------------------------------------------

[Round-specific guidance text — see escalation arc]
"Just answer honestly. There are no wrong answers
 — except for the liar's."

[Answer input]
---------------------------------------------
|  Your answer...                           |
|                                           |
|                              [42/150]     |
---------------------------------------------

[Example prompt, faded — disappears on first keystroke]
e.g. "Spaghetti bolognese — my mum's recipe,
I've made it a hundred times"

[Submit button]
[ SUBMIT ANSWER ]
```

**Guidance text per round (shown above the input):**

- **Round 1:** "Just answer honestly. Don't overthink it — say what comes to mind first."
- **Round 2:** "Be specific this time. Details matter. The liar will have to invent theirs."
- **Round 3:** "This one's personal. Answer from the heart — it'll be obvious if someone doesn't."

**Example prompts (shown as placeholder text, disappear on first keystroke). These vary by round question category but here are defaults:**

- Round 1 examples: `e.g. "Spaghetti bolognese — my mum taught me when I was 12"` or `e.g. "A full English. I could do it in my sleep."`
- Round 2 examples: `e.g. "The smell of cut grass — reminds me of playing football as a kid"` or `e.g. "My grandad's cologne. Haven't smelled it in years but I'd recognise it instantly."`
- Round 3 examples: `e.g. "I once lied about being ill to skip a wedding. I still feel guilty."` or `e.g. "I pretended to like my partner's cooking for two years before I said anything."`

**Character limit:** 150 characters. Counter shows at bottom-right of input.

**Post-submission state:**
```
[Check mark animation]

Answer submitted.

Waiting for others... [3/5 submitted]

[Your answer displayed back in a card]
"Spaghetti bolognese — my mum's recipe,
 I've made it a hundred times"
```

---

### 1D. INTERROGATION WATCH SCREEN (During the 30-second window)

**When shown:** During `interrogation` phase, on every player's phone while the TV shows all answers.

**Layout:**

```
[Full screen, split into two zones]

[Top bar]
[Player dot] [Player name]              [Timer: 30s, pulsing red under 10s]

[Zone 1: Suggested question — takes top 30%]
---------------------------------------------
|  ASK THE ROOM:                            |
|                                           |
|  "Who had to think the longest            |
|   before answering?"                      |
|                                           |
|         [Next question in 6s ---]         |
---------------------------------------------

[Zone 2: Notes — takes bottom 70%]
---------------------------------------------
|  YOUR NOTES                      [Rd 1/3] |
|                                           |
|  [Quick-tap suspect buttons]              |
|  [Sam] [Alex] [Jordan] [Casey]            |
|                                           |
|  [Text input, always focused]             |
|  Type a note...                           |
|                                           |
|  [Previous notes scroll area]             |
|  Rd 1: "Sam hesitated on cooking q"      |
|  Rd 1: "Alex's answer felt rehearsed"    |
---------------------------------------------
```

**How notes work:**
- Tapping a player name button inserts their name into the note input as a prefix: "Sam: " — this is faster than typing the name.
- Pressing enter/return saves the note and clears the input for the next one.
- Notes are timestamped with the round number.
- Notes persist across all rounds, scrollable.
- Notes are strictly private. They are never shown to other players or on the TV.
- The input field is auto-focused when the interrogation phase begins so players can immediately start typing.

**Suggested questions rotate every 6 seconds during the 30-second window (5 questions shown per round). A thin progress bar under the question card shows time until next question.**

---

### 1E. END-GAME ACCUSATION SCREEN

**When shown:** After the final round's reveal, during `accusation` phase.

**Layout:**

```
[Full screen]

[Top bar]
[Player dot] [Player name]              [Timer: 45s]

[Header]
---------------------------------------------
|  FINAL ACCUSATION                         |
|                                           |
|  Who has been lying all along?            |
---------------------------------------------

[Notes review — collapsed by default, expandable]
[> View your notes from all rounds]

[Suspect list — all other players]
---------------------------------------------
| [Sam's dot] Sam                           |
|   Rd1: "Spaghetti bolognese..."          |
|   Rd2: "Cut grass..."                    |
|   Rd3: "Lied about being ill..."         |
---------------------------------------------
| [Alex's dot] Alex                         |
|   Rd1: "Scrambled eggs..."              |
|   Rd2: "Old books..."                   |
|   Rd3: "Pretended to like a gift..."    |
---------------------------------------------
| [Jordan's dot] Jordan                     |
|   Rd1: "Pad thai..."                    |
|   Rd2: "Petrol..."                      |
|   Rd3: "Faked an injury..."             |
---------------------------------------------

[Each suspect card is tappable — tap to select]
[Selected card gets red border + "ACCUSED" badge]

[Accusation weight indicator]
Your vote weight: [1.5x] — based on your detective score

[Button]
[ ACCUSE [NAME] ]
```

**Key differences from current Accusation.tsx:**
- All answers from all rounds are shown beneath each player's name, giving the accuser a summary view.
- The player's private notes are accessible via an expandable section at the top.
- The accusation weight mechanic remains as-is (score-based).

---

## 2. TV UX FLOWS

### 2A. ANSWER REVEAL SCREEN (All answers shown simultaneously)

**When shown:** After all players have submitted (or timer expires). Replaces the per-player interrogation entry point.

**Layout for 4 players:**

```
[Full TV screen, dark background]

[Header bar]
ROUND 1 OF 3                    ALIBI                    [Question prompt]

[Question displayed prominently]
"What's a meal you could cook from memory right now, no recipe needed?"

[Grid of answer cards — 2x2 for 4 players, 2x3 for 5-6, 2x4 for 7-8]
┌─────────────────────────┐  ┌─────────────────────────┐
│ [Sam's dot] SAM          │  │ [Alex's dot] ALEX        │
│                          │  │                          │
│ "Spaghetti bolognese —   │  │ "Scrambled eggs on       │
│  my mum's recipe, I've   │  │  toast. I eat it every   │
│  made it a hundred times"│  │  single morning."        │
│                          │  │                          │
└─────────────────────────┘  └─────────────────────────┘
┌─────────────────────────┐  ┌─────────────────────────┐
│ [Jordan's dot] JORDAN    │  │ [Casey's dot] CASEY      │
│                          │  │                          │
│ "Pad thai. Lived in      │  │ "Cheese toastie. That's  │
│  Bangkok for a year and  │  │  literally all I can     │
│  learned from a street   │  │  make."                  │
│  vendor."                │  │                          │
└─────────────────────────┘  └─────────────────────────┘
```

**Animation:** Cards appear one at a time with a 0.4s stagger (fade-in + slight upward slide), creating a moment of suspense as each answer is revealed. The order is randomized each round so the liar's position is not predictable.

**Adaptive grid:**
- 2-3 players: single column, full width cards
- 4 players: 2x2 grid
- 5-6 players: 2x3 grid
- 7-8 players: 2x4 grid

**Card styling:**
- Background: `var(--bg-card)` with `evidence-card` class
- Left border: 3px solid with the player's color
- Player name in `var(--font-heading)`, answer text in `var(--font-mono)`
- All cards are visually identical — no visual distinction for the liar's card

**After all cards have appeared (2-3 seconds of stagger complete), a banner slides in at the bottom:**

```
┌──────────────────────────────────────────────────────────────┐
│  INTERROGATION BEGINS IN 3... 2... 1...                      │
└──────────────────────────────────────────────────────────────┘
```

Then the screen transitions to the interrogation timer screen.

---

### 2B. INTERROGATION TIMER SCREEN (30-second window)

**When shown:** Immediately after answer reveal. Lasts exactly 30 seconds.

**Layout:**

```
[Full TV screen]

[Persistent: all answer cards remain visible but slightly dimmed/smaller,
 pushed to top 60% of screen in the same grid layout]

[Bottom 40%: interrogation zone]
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│              ████████████████░░░░░░  18s                     │
│              [Gold progress bar, turning red under 10s]      │
│                                                              │
│  ASK THE ROOM:                                               │
│                                                              │
│  "Whose answer felt the most rehearsed?"                     │
│                                                              │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─                      │
│                                                              │
│  "Ask someone to add one more detail                         │
│   to their answer."                                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Behaviour:**
- The progress bar is a horizontal bar, gold, turning red when under 10 seconds.
- Two question suggestions are shown at all times. They rotate as a pair every 6 seconds (5 pairs across 30 seconds).
- The question text fades out and the next fades in with a 0.3s crossfade.
- When the timer hits 0, the interrogation zone flashes white briefly, then transitions to the voting phase.

**Atmospheric details:**
- A very subtle pulsing vignette at the screen edges intensifies as time runs down.
- The timer number itself uses `animate-pulse-red` when under 10 seconds.
- A faint ticking sound effect could be triggered (optional, controlled by a mute toggle in the lobby).

---

### 2C. FINAL ACCUSATION REVEAL SEQUENCE

**When shown:** After all players have submitted their final accusation. This replaces the current FinalReveal's three-stage approach but keeps the dramatic pacing.

**Stage 1: "The Accusations" (4 seconds)**
```
[Dark screen, single line fades in]

THE ROOM HAS SPOKEN.

[Pause 2 seconds, then fade to next stage]
```

**Stage 2: "The Tally" (6 seconds)**
```
[Each player's name appears in a column with an accusation bar growing beside it]

THE ACCUSATIONS

Sam          ████████████  4.5x
Alex         ██████        2x
Jordan       ███           1.5x
Casey        █             1x

[Bars animate left to right over 3 seconds]
[The highest bar pulses gold]
[2 second pause]
```

**Stage 3: "The Verdict" (4 seconds)**
```
[Screen clears. Dramatic pause.]

The evidence points to...

[Player's name SLAMS in, large, with their color glow]

SAM
[Sam's color dot, glowing, pulsing]
```

**Stage 4: "The Truth" (holds until ready)**
```
[Below the verdict, the truth fades in after 3 seconds]

The guilty party was...

JORDAN
[Jordan's color dot]

[If correct:]  JUSTICE IS SERVED
[If wrong:]    THE LIAR WALKS FREE

[Jordan's cover story revealed:]
"Jordan's cover story: they claimed to have
 grown up in Edinburgh — they actually grew
 up in Bristol."

[ReadinessBar at bottom]
```

---

## 3. GUIDANCE COPY

### 3A. "How to Answer" Hints (shown on phone during answer_input)

**Round 1 — Warm:**
- "Just answer honestly. Don't overthink it — say what comes to mind first."
- "There's no wrong answer here. Well, except for one person's."

**Round 2 — Specific:**
- "Be specific this time. Details matter. The liar will have to invent theirs."
- "Think of a real memory. The more specific, the harder it is to fake."

**Round 3 — Pressure:**
- "This one's personal. Answer from the heart — it'll be obvious if someone doesn't."
- "Dig deep. The liar can't fake what they haven't lived."

(Show one of the two options randomly per player per round.)

### 3B. 20 Cross-Examination Question Suggestions (for TV and phones)

These are designed to be asked verbally by players to anyone in the room during the 30-second window. They are generic enough to work with any question but pointed enough to be useful.

1. "Whose answer surprised you the most?"
2. "Ask someone to add one more detail to their answer."
3. "Who had to think the longest before answering?"
4. "Whose answer felt the most rehearsed?"
5. "Ask someone: why did you phrase it that way?"
6. "Pick someone and ask them to tell the story behind their answer."
7. "Whose answer was suspiciously short?"
8. "Whose answer was suspiciously detailed?"
9. "Ask someone: would your best friend give the same answer about you?"
10. "Who changed their mind while writing?"
11. "Ask someone to look you in the eye and repeat their answer."
12. "Whose answer doesn't match what you know about them?"
13. "Ask someone: what's one thing you left out of your answer?"
14. "Who gave the safest answer? Why?"
15. "Ask someone: if you're telling the truth, what would you have answered differently?"
16. "Does anyone's answer contradict something they said last round?"
17. "Ask someone: are you more or less confident in your answer than last round?"
18. "Who is being unusually quiet right now?"
19. "Ask someone: what made you answer so quickly?"
20. "Whose answer could you most easily fact-check?"

### 3C. Liar Coaching (5 tips — shown during briefing, one per round)

1. "Keep it short. Truthful people don't over-explain. Match the length of a real answer."
2. "Borrow from real life. Change one key detail rather than inventing from scratch. It's easier to remember and harder to spot."
3. "Don't be the first or last to submit. Blend into the middle of the pack."
4. "If questioned, pause before answering — just like you would if you were genuinely remembering. Instant answers look rehearsed."
5. "Anchor your lie to something true. If your cover story says you grew up in Leeds, use real Leeds details you actually know."

### 3D. Innocent Coaching (5 tips — shown during briefing, one per round)

1. "Watch for answers that are too perfect. Real memories have rough edges."
2. "Ask follow-up questions. Liars prepare the headline but not the details underneath."
3. "Compare answers across rounds. The liar has to maintain a fiction — look for drift."
4. "Watch body language during the 30-second window. Who avoids eye contact when questioned?"
5. "Pay attention to who reacts to being questioned. Truthful people are curious; liars are defensive."

---

## 4. THE ESCALATION ARC DESIGN

### Round Introduction Text (shown on TV before answering starts)

**Round 1 Introduction — "The Warm-Up"**

TV screen:
```
[Dark bg, text fades in line by line with 1.5s between each]

ROUND 1 OF 3

Everyone answers the same question.
One of you is lying.
The rest of you? Just be honest.

This round: get to know each other.
The truth should come easy.

[Question fades in after 3 seconds]
"What's a meal you could cook from memory
 right now, no recipe needed?"

[ReadinessBar]
```

**Design intent for Round 1:**
- Question is universal, non-threatening, social
- Anyone can answer quickly and honestly
- The liar's task is easy: just pick a plausible meal
- The room gets used to the format without pressure
- The 30-second interrogation window feels conversational, not adversarial

---

**Round 2 Introduction — "The Details"**

TV screen:
```
[Dark bg, text fades in]

ROUND 2 OF 3

The questions get more specific now.
Details are harder to invent.
And harder to keep straight.

Pay attention to what people said last round.
Does anything not add up?

[Question fades in]
"What's a smell that takes you back
 to your childhood?"

[ReadinessBar]
```

**Design intent for Round 2:**
- Question requires a specific sensory memory — harder to fabricate convincingly
- Players are now primed to compare this round's answers against Round 1
- The liar has to stay consistent with their cover story while inventing a plausible childhood memory that fits
- Interrogation gets more pointed — players have a frame of reference now

---

**Round 3 Introduction — "The Pressure"**

TV screen:
```
[Dark bg, text fades in, slower pacing, slightly red-tinted vignette]

FINAL ROUND

This one's personal.
The truth is easy when it's real.
The liar has to dig deep now.

After this, you vote.
Choose carefully.

[Question fades in]
"What's a small lie you've told that
 you still feel a bit guilty about?"

[ReadinessBar]
```

**Design intent for Round 3:**
- Deliberately intimate, vulnerability-inducing question
- Truthful players will write something real and slightly uncomfortable — that authenticity is hard to fake
- The liar must invent a "confession" that sounds genuine, which is a paradox: lying about lying
- The 30-second window after this round will be the most intense — players have two rounds of data to cross-reference
- This is the "let a little bit of yourself out" moment

---

### Example Question Sets for the Three-Round Arc

**Set A (Friends):**
1. "What's a meal you could cook from memory right now, no recipe needed?"
2. "What's a smell that takes you back to your childhood?"
3. "What's a small lie you've told that you still feel a bit guilty about?"

**Set B (Friends):**
1. "What's a TV show you've watched all the way through more than once?"
2. "What's a specific place you go to when you need to think?"
3. "What's something you believed for way too long before finding out it wasn't true?"

**Set C (Work):**
1. "What's the first job you ever had?"
2. "What's the most unusual skill you've picked up from a job?"
3. "What's a professional mistake you made that you learned the most from?"

**Set D (Family):**
1. "What's a family tradition that only your family does?"
2. "What's a piece of advice a family member gave you that stuck?"
3. "What's something your family thinks about you that isn't quite true?"

---

## 5. NOTE-TAKING FEATURE DESIGN

### Location and Format
- Notes occupy the bottom 70% of the phone screen during the interrogation phase (top 30% is the suggested question).
- Outside of interrogation, notes are accessible via a small "Notes" tab at the bottom of the screen during any passive phase (waiting screens, watching TV).

### Input Design
- A single-line text input at the top of the notes area, always auto-focused during interrogation.
- Above the input: a row of quick-tap player name buttons (pill-shaped, colored with each player's color). Tapping a name inserts "[Name]: " at the start of the input if empty, or " [Name] " at the cursor position if mid-sentence.
- Pressing Enter/Return saves the note immediately and clears the input.
- No submit button — Enter is the only way to save, reducing friction to zero.
- Saved notes appear below in reverse chronological order (newest at top), each prefixed with the round number: "R1: Sam hesitated on cooking question"

### Speed Optimisations for 30-Second Window
- Auto-focus on the input field the instant the interrogation phase begins.
- Quick-tap name buttons eliminate the need to type player names.
- Single-line input (not multiline) keeps it fast — one thought per note.
- No character limit on notes.
- Haptic feedback (short vibration) on note save to confirm without looking.

### Persistence
- Notes persist across all rounds for the entire game.
- Notes are stored locally on the device (not sent to the server). They survive a page refresh but not a cache clear.
- Grouped by round in the scrollable area: "Round 1" heading, then notes, "Round 2" heading, then notes, etc.

### Privacy
- Notes are strictly private. They are never transmitted, never shown on the TV, never shared with other players.
- The accusation screen includes an expandable "View your notes" section so players can review before voting.
- A small lock icon beside "YOUR NOTES" reinforces that these are private.

---

## 6. SUGGESTION ENGINE DESIGN

### Generic vs. Specific
- The 30-second interrogation questions are **semi-generic**: they apply to any round's question but are designed to probe for inconsistencies, hesitation, and fabrication. They do not reference the specific question content.
- This keeps the engine simple (no AI generation needed during gameplay) while still being useful and provocative.
- The TV and phones show the same questions in sync (deterministic selection based on round number and game ID).

### Timing
- 5 question pairs are pre-selected per round from the pool of 30 (see below).
- Each pair is displayed for 6 seconds.
- The transition is a 0.3-second crossfade (old text fades out, new fades in).
- A thin progress bar beneath the question shows time until the next rotation.

### Display
- **TV:** Two questions shown at once in the interrogation zone (bottom 40% of screen). Large text, high contrast.
- **Phone:** One question shown at a time in the top 30% of the screen, above the notes area. Smaller text to leave room for note-taking.

### The 30 Cross-Examination Questions

**Observation questions (who is acting differently):**
1. "Whose answer surprised you the most?"
2. "Who had to think the longest before answering?"
3. "Whose answer felt the most rehearsed?"
4. "Whose answer was suspiciously short?"
5. "Whose answer was suspiciously detailed?"
6. "Who is being unusually quiet right now?"
7. "Who seems the most nervous?"
8. "Who gave the safest, most boring answer?"
9. "Whose answer doesn't match what you know about them?"
10. "Who changed their body language when the answers appeared?"

**Direct challenge questions (ask a specific person):**
11. "Ask someone to add one more detail to their answer."
12. "Ask someone: why did you phrase it that way?"
13. "Pick someone and ask them to tell the story behind their answer."
14. "Ask someone to look you in the eye and repeat their answer."
15. "Ask someone: what's one thing you left out?"
16. "Ask someone: would your best friend confirm that about you?"
17. "Ask someone: if you're telling the truth, prove it — give us a detail no one would invent."
18. "Ask someone: are you more or less confident than last round?"
19. "Ask someone: what made you answer so quickly?"
20. "Ask someone: say it again, but differently."

**Cross-round comparison questions (Rounds 2-3 only):**
21. "Does anyone's answer contradict something they said last round?"
22. "Whose answers across rounds paint the most consistent picture?"
23. "Whose story has shifted since Round 1?"
24. "Ask someone: how does your answer this round connect to what you said before?"
25. "Who has been the most consistent — and is that suspicious or reassuring?"

**Pressure questions (Round 3 only):**
26. "Who do you most suspect right now? Say it out loud."
27. "Ask the person you trust the least: convince me you're telling the truth."
28. "If you had to accuse someone right now, who would it be and why?"
29. "Ask someone: what's the one thing that would prove you're not the liar?"
30. "Look around the room. Someone here has been lying to your face for three rounds. Who?"

### Selection Logic
- **Round 1:** Draw 5 pairs from questions 1-20 (observation + direct challenge only).
- **Round 2:** Draw 3 pairs from 1-20, plus 2 pairs from 21-25 (add cross-round comparisons).
- **Round 3:** Draw 2 pairs from 1-20, 1 pair from 21-25, plus 2 pairs from 26-30 (add pressure questions).
- Pairs are selected deterministically using a hash of `gameId + roundNumber` so TV and all phones stay in sync without network coordination.

---

## IMPLEMENTATION NOTES FOR DEVELOPERS

### New Game Phases
The phase flow changes. The existing `alibi_building` phase becomes `answer_input`. A new `briefing` phase is inserted before it. The `interrogation` phase no longer cycles per-suspect — it happens once per round with all answers visible.

```
lobby -> crime_reveal -> briefing -> answer_input -> answer_reveal -> interrogation -> voting -> reveal -> [next round: crime_reveal] -> ... -> accusation -> final_reveal -> confession -> finished
```

### Data Model Changes
- **`statements` table:** No longer needs `statement_1`, `statement_2`, `statement_3`, `lie_index`. Replace with a single `answer` text field. The `lie_index` concept goes away — the system knows who the liar is from `game.guilty_player_id`.
- **`votes` table:** The `voted_index` field (which statement is the lie) becomes `suspected_id` (which player is the liar). This is now per-round, not per-suspect.
- **`notes` table (new, local only):** `{ round: number, text: string, timestamp: number }` — stored in localStorage, keyed by game ID.
- **`player.personal_lie`:** Remains as-is. This is the liar's cover story, assigned at game start.

### Sync Requirement for Question Suggestions
The TV and phones must show the same questions at the same time during the 30-second window. Use a deterministic PRNG seeded with `gameId + roundNumber` to select and order questions. All clients run the same selection algorithm locally — no server coordination needed.

### Timer Precision
The 30-second interrogation timer must be consistent across TV and phones. Use the existing `phase_ends_at` timestamp from the server and compute remaining time locally via `useTimer`. Do not use client-side-only timers for the canonical countdown.
