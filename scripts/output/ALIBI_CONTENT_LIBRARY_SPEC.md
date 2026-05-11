# ALIBI Content Library Specification
## Preset Story Mode: Complete Narrative Design

---

## 0. PREAMBLE: WHAT THIS DOCUMENT IS

This specification defines a new game mode for ALIBI built on **preset narratives** rather than player-generated statements. In the current game, every player writes their own truths and lies. In this mode, the GUILTY player and the LIAR player receive predetermined sequences of five-word lies that they must deliver across 10 rounds. The lies are fixed. The order is fixed. The drama is authored, not improvised.

This is not a replacement for the existing free-form mode. It is a second mode -- one that trades creative freedom for narrative craft. The advantage: every game tells a tightly constructed story with designed tension points, escalation, and reversals. The disadvantage: the GUILTY and LIAR players are performers, not authors. They are actors given a script.

The existing ALIBI architecture (ThemePack, ThemeScenario, ThemeConstraint, etc.) can accommodate this mode with relatively modest structural additions. The content layer is where all the work lives.

---

## 1. STORY ARCHITECTURE

### What makes a good ALIBI story

A good ALIBI story is a machine for generating suspicion. It must do five things simultaneously:

1. **Establish a world that everyone at the table can inhabit.** The crime scenario cannot require specialist knowledge. "A painting was stolen from a gallery" works. "A quantum decoherence matrix was tampered with" does not. Every player -- guilty, liar, or innocent -- must be able to improvise truthful-sounding statements within the world of the story.

2. **Create a reason why everyone is a suspect.** If only two people had access to the crime scene, the game is too narrow. The scenario must establish that all 4-6 players were present, had opportunity, and could plausibly have motive.

3. **Give the GUILTY player a believable alibi to construct.** The preset lie sequence for the guilty player must, when read in order, sound like a coherent (if false) account of their evening. The lies are the bones of a story. They must hold together -- until they don't.

4. **Give the LIAR a secret worth protecting.** The liar is not guilty of the crime. They are guilty of something adjacent -- being at the scene, having a relationship with the guilty player, possessing information they shouldn't have. Their lies protect this secret while subtly deflecting suspicion away from the guilty player and toward innocents.

5. **Produce 10 rounds of escalating tension.** The early rounds should feel safe. The middle rounds should feel risky. The late rounds should feel like the walls are closing in.

### The structure of a complete story

Every story must specify the following:

**FIXED ELEMENTS (authored, never change):**

| Element | Description |
|---------|-------------|
| **Crime Scenario** | 3-4 sentences. The what, where, when. A specific incident at a specific place. Must include a human cost (a victim, a consequence). |
| **The Guilty Player's Secret** | What actually happened. 1-2 sentences. Not revealed to anyone until the game ends. |
| **The Liar's Secret** | What the liar is hiding and why. 1-2 sentences. The liar knows this from the start. If exposed, it would help innocents identify the guilty player. |
| **Guilty Lie Arc** | 10 statements, each 5 words or fewer. Delivered in fixed order, one per round. |
| **Liar Lie Arc** | 10 statements, each 5 words or fewer. Delivered in fixed order, one per round. |
| **Round Prompts** | 10 questions/prompts that the host (or game) asks all players each round. These create the context for every player's 2-truths-and-a-lie response. |
| **Story Category** | Which tone/genre this story belongs to. |

**FLEXIBLE ELEMENTS (vary per game):**

| Element | Description |
|---------|-------------|
| **Which player is GUILTY** | Randomly assigned at game start. |
| **Which player is the LIAR** | Randomly assigned at game start (cannot be the same as guilty). |
| **Innocent players' truths** | Every innocent player writes their own 2 truths per round. Their lie is also their own -- but innocents are genuinely trying to deceive, which creates noise. |
| **Discussion and interrogation** | Free-form verbal cross-examination between rounds. Unscripted. |

### The relationship between the crime scenario and the preset lies

The crime scenario is the stage. The lies are the performance.

Every lie in the guilty player's arc is a response to a specific round prompt, and it must sound like a plausible answer to that prompt. But because the lies are written in advance, the round prompts must be authored to create exactly the right context for each lie to land.

This means the **round prompts and the lie arcs are co-authored**. You do not write the prompts first and then write lies to fit them. You do not write lies first and then write prompts to justify them. You write them together, as a unit, tuning each one until the lie feels like a natural (if false) response to the prompt, and the prompt feels like a natural (if pointed) question given the scenario.

The liar's lies have a secondary constraint: they must sound like plausible answers to the same prompts while also subtly supporting the guilty player's alibi. This means the liar's lies often echo or corroborate elements of the guilty player's lies without being identical.

### The 5-word constraint

Five words is the sweet spot because:

- It is long enough to make a claim: "I was home all night."
- It is short enough to be ambiguous: Does "home" mean their house? Their parents' house? A friend's place they call home?
- It forces economy: You cannot over-explain in 5 words. Every word must earn its place.
- It makes memorability easy: Players can remember what was said. In a 10-round game, that matters.
- It creates interpretive space: "We hadn't spoken in months" -- who is "we"? Which months? Spoken about what?

The count is words, not syllables. Contractions count as one word ("hadn't" = 1). Hyphenated compounds count as one word ("well-known" = 1). Names count as one word ("the Gardner Museum" = 3 words, so it would need trimming).

---

## 2. THE GUILTY PLAYER'S LIE ARC: DESIGN PRINCIPLES AND EXAMPLE

### Design principles for guilty lie arcs

**A. The arc must tell a coherent story.** If you read all 10 lies in sequence, stripping away the prompts, you should get something that sounds like a person's account of their evening. Not a polished story -- a sketchy, defensive, improvised-sounding alibi that holds together just well enough.

**B. Early lies establish, late lies specify.** Rounds 1-3 should be vague and safe: "I stayed in that night." Rounds 4-6 should introduce details that create commitments: "My flatmate can confirm." Rounds 7-9 should be dangerously specific: "I was on the phone till eleven." Round 10 should be the hardest lie to maintain -- the one that either seals the alibi or cracks it.

**C. Internal tension points must exist.** At least two lies in the sequence should be subtly inconsistent with each other -- not obviously contradictory, but close enough that an attentive player might notice. For example: lie 3 says "I was alone all evening" and lie 6 says "My flatmate can confirm." These aren't necessarily contradictory (the flatmate could have arrived later), but they create a seam that interrogation can probe.

**D. Specificity escalates risk.** The vaguer the lie, the safer it is. The more specific, the more it can be cross-examined. The lie arc must move from vague to specific, which means the guilty player's danger increases as the game progresses.

**E. One lie should be a trap.** Around round 7-8, the guilty player should be forced to say something that sounds suspicious even to players who aren't paying close attention. This is the designed "heat moment" -- the point where the room turns to look at the guilty player.

### Example: "The Vermeer Vanishes"

**Crime Scenario:**
At 11:47 PM on a rainy Tuesday, the priceless Vermeer painting "The Concert" vanished from the Isabella Stewart Gardner Museum. The alarm was disabled from inside. The night guard found the empty frame and collapsed in the doorway. Security footage shows a 6-minute gap beginning at 11:41 PM. Everyone who attended that evening's private donors' reception is now a suspect.

**The Guilty Player's Secret:**
The guilty player disabled the alarm using a code obtained from a museum employee they had been cultivating a relationship with for months. They removed the painting during the 6-minute footage gap, passed it to an accomplice waiting at the loading dock, and returned to the reception before anyone noticed.

**Round Prompts and Guilty Lie Arc:**

| Round | Prompt | Guilty Player's Lie (<=5 words) | Design Notes |
|-------|--------|--------------------------------|--------------|
| 1 | "Tell us about your evening. Where were you, what were you doing?" | **"Quiet night, nothing special really"** | Safe, vague, establishes a boring evening. Creates no commitments. This is the easiest lie to tell. |
| 2 | "Who were you with? Anyone who can confirm?" | **"I was alone all evening"** | Slightly more committal. Establishes solitude. Closes off the "who saw you" line of questioning -- but also means no alibi witness. A calculated trade-off. |
| 3 | "What's your connection to this museum?" | **"I've been once, maybe twice"** | Downplays familiarity. The vagueness of "maybe twice" is designed to sound honest (people genuinely don't track museum visits precisely). But it's a lie -- they've been many times. |
| 4 | "Did you know anyone who works there?" | **"Nobody there, not at all"** | First dangerous lie. This is a flat denial that can be disproven if anyone connects the guilty player to the museum employee. The double emphasis ("nobody" + "not at all") is a tell that attentive players may notice -- people who are telling the truth rarely deny twice. |
| 5 | "What time did you leave the reception?" | **"Left around ten, I think"** | This is the critical commitment. The crime happened at 11:47. By claiming to have left at 10, the guilty player is constructing an alibi window. But "around" and "I think" add hedging that could later be exploited. |
| 6 | "How did you get home that night?" | **"Walked home, it wasn't far"** | Introduces a specific mode of transport. Walking means no cab receipt, no rideshare record, no CCTV on public transport. This is strategically smart but also suspicious -- who walks home at 10 PM on a rainy Tuesday? The rain was mentioned in the scenario. An attentive player may notice. |
| 7 | "Did anything unusual happen that evening?" | **"My phone died around nine"** | The designed heat moment. This explains away why there's no phone data, no texts, no calls confirming the alibi. It's a classic preemptive excuse -- and it sounds like one. Players should start wondering why the guilty player is volunteering this. It also contradicts nothing said so far, but it feels rehearsed. |
| 8 | "Is there anything about that night you haven't told us?" | **"I had a drink beforehand"** | A misdirection confession. By volunteering a small, relatable detail ("I had a drink"), the guilty player appears to be coming clean about something minor. The strategy is: give them a bone so they stop digging. But "beforehand" -- before what? The wording creates ambiguity. Before going home? Before the reception? Before the theft? |
| 9 | "What were you doing at exactly 11:47 PM?" | **"Asleep by then, for sure"** | The alibi's keystone. This is the most specific and most risky lie. If any previous statement creates doubt about the "left at 10, walked home" narrative, this lie is the one that breaks. "For sure" is another emphasis tell -- it protests too much. |
| 10 | "If you're innocent, what should we know?" | **"I have nothing to hide"** | The final lie. It's a meta-statement -- not about the evening, but about the guilty player's character. It's designed to sound like a closing argument. But it's also the most transparent lie in the sequence: everyone has something to hide. The question is whether the room reads it as confidence or performance. |

**Reading the arc in sequence:**
"Quiet night, nothing special really. I was alone all evening. I've been once, maybe twice. Nobody there, not at all. Left around ten, I think. Walked home, it wasn't far. My phone died around nine. I had a drink beforehand. Asleep by then, for sure. I have nothing to hide."

This reads as a coherent, defensive alibi. The cracks are:
- Walked home in the rain (scenario says rainy Tuesday)
- Phone conveniently dead (no verifiable alibi)
- "Nobody there, not at all" -- overemphasis
- "Asleep by then, for sure" -- overemphasis
- The drink "beforehand" is vague about what it was before

---

## 3. THE LIAR'S LIE ARC: DESIGN PRINCIPLES AND EXAMPLE

### Design principles for liar lie arcs

**A. The liar is protecting a secret, not committing a crime.** The liar's lies are not about the crime itself. They are about a related truth that, if revealed, would help innocents identify the guilty player. The liar knows who did it. Their job is to keep that knowledge hidden.

**B. The liar's lies must subtly corroborate the guilty player's story.** If the guilty player says "I left around ten," the liar might independently say "The reception thinned out early." These don't reference each other directly, but they construct a shared reality that supports the guilty player's timeline.

**C. The liar must also appear innocent.** The liar is not suspected of the crime -- they are suspected of lying. Their lies must protect their own secret while also not drawing suspicion that they are covering for someone else.

**D. The liar should have 1-2 statements that can be interpreted multiple ways.** These are designed to create moments where an attentive player thinks "wait, what did they mean by that?" Ambiguity is the liar's weapon and vulnerability simultaneously.

**E. The liar has one dangerous lie around round 7-8.** This is the point where the liar's secret is closest to being exposed. The lie at this moment either saves them or damns them. It should be the kind of statement that, in hindsight, was obviously a lie -- but in the moment, could go either way.

### Example: "The Vermeer Vanishes" -- Liar's Arc

**The Liar's Secret:**
The liar saw the guilty player near the restricted wing at 11:30 PM -- well after the guilty player claims to have left. The liar was in the restricted wing themselves because they were having an affair with one of the museum staff. They cannot reveal what they saw without revealing why they were there.

| Round | Prompt | Liar's Lie (<=5 words) | Design Notes |
|-------|--------|----------------------|--------------|
| 1 | "Tell us about your evening. Where were you, what were you doing?" | **"Stayed at the reception mostly"** | Safe and vague. "Mostly" does real work here -- it's technically honest-sounding (they were at the reception for part of the evening) while leaving room for the time they spent elsewhere. |
| 2 | "Who were you with? Anyone who can confirm?" | **"Chatted with lots of people"** | Avoids naming anyone specific. If pushed, the liar can improvise names -- but the lie itself keeps things fuzzy. This also subtly supports the guilty player by establishing the reception as a busy, crowded event where people lost track of each other. |
| 3 | "What's your connection to this museum?" | **"I appreciate art, that's all"** | Downplays their actual connection (the affair with a staff member). "That's all" is the same kind of overemphasis the guilty player uses -- "not at all," "that's all." Players who notice this pattern across two different people may start to suspect collusion. |
| 4 | "Did you know anyone who works there?" | **"Just faces, nobody personally"** | A direct lie. The liar knows a staff member intimately. "Nobody personally" is technically meaningless -- what does "personally" mean? -- but it sounds like a denial. This lie runs parallel to the guilty player's "Nobody there, not at all." Both are denying connections to staff. An observant player might notice. |
| 5 | "What time did you leave the reception?" | **"Quite late, maybe after eleven"** | This is the liar's most strategically important lie. By saying they left "after eleven," they establish themselves as present until late -- which means they should have noticed if anything unusual happened. But they didn't (they say). This implicitly supports the idea that nothing unusual happened before 11:47. It also distances them from the 11:30 sighting -- if they "left after eleven," they weren't in the restricted wing at 11:30 (they claim). |
| 6 | "How did you get home that night?" | **"Called a cab, standard stuff"** | Establishes a normal, verifiable departure. Unlike the guilty player's suspicious "walked in the rain," the liar's exit sounds routine. This is by design -- the liar is meant to look more credible than the guilty player on logistical questions, which deflects suspicion from both of them. |
| 7 | "Did anything unusual happen that evening?" | **"Thought I heard something odd"** | THE DANGEROUS LIE. This is calculated misdirection. By volunteering that they heard "something odd," the liar creates the impression of a witness who noticed something but didn't think it was important. It also subtly moves suspicion away from the guilty player by suggesting the unusual thing was a sound (ambient, not a person). But this lie is dangerous because it invites follow-up: What did you hear? Where were you when you heard it? If pressed, the liar has to improvise around the fact that what they actually heard was the guilty player near the restricted wing. Any stumble here could expose them. |
| 8 | "Is there anything about that night you haven't told us?" | **"I stepped outside for air"** | The second dangerous lie. "Stepped outside" is an attempt to explain any gap in their presence at the reception without revealing that they were actually in the restricted wing. It's a half-truth -- they did leave the main reception area. But "for air" is a lie about why. This statement, combined with "thought I heard something odd," starts to paint a picture of someone who was wandering the building. A sharp player might connect the dots. |
| 9 | "What were you doing at exactly 11:47 PM?" | **"Waiting for my cab outside"** | Convenient. Places the liar outside the building at the moment of the crime. Consistent with "called a cab" (round 6) and "stepped outside for air" (round 8). The liar's story holds together -- but it also means they were conveniently absent from the building during the theft. Innocents may find this suspicious for the wrong reason (suspecting the liar of the crime rather than suspecting them of covering for someone). |
| 10 | "If you're innocent, what should we know?" | **"I just want this resolved"** | A plea for resolution that sounds genuine but is actually a deflection. The liar does NOT want this resolved -- resolution would expose both them and the guilty player. "Just want this resolved" is the kind of thing an innocent person would say, which is exactly why a liar says it. |

**Reading the liar's arc in sequence:**
"Stayed at the reception mostly. Chatted with lots of people. I appreciate art, that's all. Just faces, nobody personally. Quite late, maybe after eleven. Called a cab, standard stuff. Thought I heard something odd. I stepped outside for air. Waiting for my cab outside. I just want this resolved."

The pattern: the liar constructs a story of a normal, pleasant evening -- chatting, appreciating art, leaving by cab. But two statements break the pattern: "heard something odd" and "stepped outside for air." These are the seams.

**How the two arcs interact:**
- Both deny knowing museum staff (round 4 parallel).
- The guilty player claims to leave at 10; the liar claims to stay until after 11. This means the liar should have been around when things started going wrong -- but claims not to have seen anything. Why not?
- The liar's "heard something odd" is the closest the game gets to a confession. If innocents push on this, and then push on the guilty player's suspiciously dead phone and rain-walk, the case starts to build.

---

## 4. STORY COUNT

### Minimum viable launch: 12 stories

The math:
- A typical game group plays 2-3 games per session.
- A group that loves the game plays 3-5 sessions before the novelty fades.
- At 2-3 games per session and 3-5 sessions, that's 6-15 games.
- You need stories to never repeat in a single session AND rarely repeat across sessions.
- 12 stories, at 2-3 per session, gives 4-6 sessions of unique content.
- This is the minimum for the game to feel like a complete product at launch.

### Good target: 20-25 stories

- 20 stories across 5-6 categories gives 3-5 stories per category.
- Players can select categories they prefer ("we want crime stories tonight").
- Even heavy users won't exhaust the library for months.
- 25 is the point where the content feels abundant rather than adequate.

### Aspirational target: 40+ stories

- This is the "content is the product" tier.
- At 40 stories, you can release seasonal packs, themed collections, difficulty tiers.
- This is a post-launch goal, not a launch requirement.

### Why 10 rounds per story matters for volume

Each story requires 20 authored lies (10 guilty + 10 liar), 10 round prompts, and the framing material. At 40+ authored elements per story, 12 stories is 480+ individual content pieces. 25 stories is 1000+. Quality control at this scale requires discipline, which is addressed in Section 7.

---

## 5. STORY CATEGORIES

### Category 1: CLASSIC CRIME ("The Heist")

**Tone:** Noir detective. Dramatic. Rain-soaked streets and empty galleries. The music is low jazz and distant sirens.

**Setting types:** Museums, banks, estate vaults, auction houses, penthouse safes.

**Crime types:** Art theft, jewel heists, document theft, safe-cracking, forgery swaps.

**What it does to the room:** Creates a cinematic atmosphere. Players feel like they are in a film. The lies feel weighty and serious. Interrogation tends to be pointed and methodical.

**Why it works for a party:** The scenario is glamorous enough to be fun (nobody is really upset about a stolen painting), serious enough to justify the interrogation mechanics, and universal enough that everyone can play. No specialist knowledge required.

**Example scenario premise:** "A painting vanished from a museum during a donors' reception."

---

### Category 2: SOCIAL DRAMA ("The Betrayal")

**Tone:** Tense, personal, intimate. The crime is not a crime in the legal sense -- it's a social violation. Someone betrayed a confidence, ruined a relationship, sabotaged an event. The music is silence and uncomfortable eye contact.

**Setting types:** Dinner parties, reunions, shared houses, friend groups, weddings.

**Crime types:** Leaked secrets, stolen partners, sabotaged events, broken trust, public humiliation.

**What it does to the room:** Makes the game personal. The lies hit closer to home because the scenario is about relationships, not objects. Players interrogate each other about loyalty and character, not whereabouts and timelines. The conversation gets real faster.

**Why it works for a party:** Everyone has been betrayed by a friend. Everyone has a story about trust. The scenario is low-stakes (nobody went to prison) but high-emotion (someone got hurt). The gap between the dramatic framing and the mundane reality is where the humour lives.

**Example scenario premise:** "Someone leaked the bride's secret to the entire wedding party the night before the ceremony."

---

### Category 3: WORKPLACE SCANDAL ("The Backstab")

**Tone:** Dry, cutting, satirical. The crime is corporate but petty. Someone plagiarised a presentation, embezzled from the social fund, sabotaged a colleague's project. The music is hold music and fluorescent lighting.

**Setting types:** Offices, conference rooms, company retreats, after-work drinks.

**Crime types:** Plagiarism, credit-stealing, expense fraud, leaked documents, sabotage.

**What it does to the room:** Unlocks every player's workplace resentments. Everyone has a boss they don't respect, a colleague who took credit, a moment where they considered doing something unethical. The lies in this category hit different because they're about ambition and fairness -- things adults actually care about.

**Why it works for a party:** Work stories are universally relatable and universally funny when framed as crimes. The pettiness of the scenario ("someone stole credit for the Q3 deck") contrasted with the intensity of the interrogation creates comedy.

**Example scenario premise:** "Someone copied the entire Meridian pitch and presented it to the board as their own work."

---

### Category 4: FAMILY SECRET ("The Reunion")

**Tone:** Warm on the surface, volatile underneath. The crime is a family violation -- someone ate the last of grandmother's cake, someone read someone's diary, someone told a family secret to an outsider. The music is passive-aggressive small talk.

**Setting types:** Family homes, holiday gatherings, funerals, christenings, Sunday dinners.

**Crime types:** Boundary violations, inheritance disputes, secret-telling, favouritism exposed, snooping.

**What it does to the room:** Taps into universal family dynamics. Everyone has a role in their family (the responsible one, the chaotic one, the peacemaker) and these roles map onto the game roles naturally. The lies feel different because they're about belonging, not guilt.

**Why it works for a party:** Families are inherently absurd. The scenario is silly enough to be fun ("someone ate the christening cake before the christening") but the emotional dynamics underneath are real. Players often surprise each other with how they answer family-themed questions.

**Example scenario premise:** "Someone opened and read grandmother's sealed letter -- the one she said should only be opened after she was gone."

---

### Category 5: THRILLER / ESPIONAGE ("The Mole")

**Tone:** Cold, precise, paranoid. The crime is espionage -- a leak, a betrayal, a double agent. The music is ticking clocks and encrypted transmissions.

**Setting types:** Government agencies, embassies, research facilities, covert operations.

**Crime types:** Information leaks, identity exposure, sabotaged missions, planted evidence, double-crossing.

**What it does to the room:** Creates paranoia. Every statement sounds like a coded message. Players start reading into pauses, word choices, eye contact. The interrogation becomes genuinely tense because the framing encourages distrust.

**Why it works for a party:** Spy stories are aspirational fantasy. Nobody in the room is actually a spy, but everyone enjoys pretending. The vocabulary shift (from "crime" to "breach," from "suspect" to "asset") changes how the game feels without changing how it plays.

**Example scenario premise:** "A classified dossier was transmitted from this facility to an unknown foreign contact. The transmission lasted 11 seconds."

---

### Category 6: LIGHT MYSTERY ("The Caper")

**Tone:** Playful, silly, whimsical. The crime is absurd or low-stakes -- a missing mascot costume, a swapped trophy, a hacked school announcement system. The music is cartoon sound effects and dramatic stings played for laughs.

**Setting types:** Schools, neighbourhood events, community centres, local competitions, amateur theatre productions.

**Crime types:** Pranks, swaps, petty vandalism, harmless sabotage, embarrassing reveals.

**What it does to the room:** Lowers the stakes and raises the fun. This category is ideal for groups that include younger players, mixed-age groups, or people who find the crime/thriller categories too intense. The lies are still lies, but they're about silly things.

**Why it works for a party:** Not every group wants noir intensity. Some groups want to laugh. The caper category delivers the same mechanical game (preset lies, interrogation, deduction) in a package that is purely entertaining.

**Example scenario premise:** "Someone replaced the school mascot costume with a gorilla suit 20 minutes before the big match. The mascot performed the entire halftime show before anyone noticed."

---

## 6. THREE COMPLETE STORIES

---

### STORY 1: "THE VERMEER VANISHES"
**Category:** Classic Crime (The Heist)

**Crime Scenario:**
At 11:47 PM on a rainy Tuesday, the priceless Vermeer painting "The Concert" vanished from the Isabella Stewart Gardner Museum. The alarm was disabled from inside using a code known only to senior staff. The night guard found the empty frame and collapsed in the doorway -- he had spent thirty years watching over that painting. Security footage shows a clean 6-minute gap beginning at 11:41 PM. Everyone who attended the private donors' reception that evening is a suspect.

**The Liar's Secret:**
The liar saw the guilty player entering the restricted wing at 11:30 PM, well after the guilty player claims to have left the building. The liar cannot reveal this without explaining why they were in the restricted wing themselves -- they were meeting a museum staff member they have been having a secret affair with.

**Round Prompts, Guilty Lies, and Liar Lies:**

| Rd | Prompt | GUILTY Lie | LIAR Lie |
|----|--------|-----------|----------|
| 1 | "Tell us about your evening. Where were you, what were you doing?" | **Quiet night, nothing special really** | **Stayed at the reception mostly** |
| 2 | "Who were you with? Anyone who can confirm?" | **I was alone all evening** | **Chatted with lots of people** |
| 3 | "What's your connection to this museum?" | **I've been once, maybe twice** | **I appreciate art, that's all** |
| 4 | "Did you know anyone who works there?" | **Nobody there, not at all** | **Just faces, nobody personally** |
| 5 | "What time did you leave the reception?" | **Left around ten, I think** | **Quite late, maybe after eleven** |
| 6 | "How did you get home that night?" | **Walked home, it wasn't far** | **Called a cab, standard stuff** |
| 7 | "Did anything unusual happen that evening?" | **My phone died around nine** | **Thought I heard something odd** |
| 8 | "Is there anything about that night you haven't told us?" | **I had a drink beforehand** | **I stepped outside for air** |
| 9 | "What were you doing at exactly 11:47 PM?" | **Asleep by then, for sure** | **Waiting for my cab outside** |
| 10 | "If you're innocent, what should we know?" | **I have nothing to hide** | **I just want this resolved** |

**Round-by-round notes:**

**Round 1:** Both lies are safe. The guilty player downplays; the liar vaguely accounts for themselves. No commitments made. Players are establishing their characters. The interesting dynamic: the guilty player says "nothing special" while the liar says they were at the reception. If the guilty player was at the reception, why does their evening sound so boring?

**Round 2:** The guilty player commits to being alone. The liar commits to being social. These are opposite strategies -- the guilty player avoids witnesses; the liar hides among a crowd. Attentive players may notice this divergence and wonder why.

**Round 3:** Both players downplay their connection to the museum. The parallel structure ("once, maybe twice" / "art, that's all") is a designed echo. Players who notice that two people are being equally vague about the same topic may start connecting them.

**Round 4:** The most dangerous parallel. Both players deny knowing anyone who works at the museum, and both use emphasis ("not at all" / "nobody personally"). This is the first moment where an attentive player could think: "Why are these two so emphatic about the same thing?"

**Round 5:** The guilty player claims to have left at 10. The liar claims to have stayed past 11. This creates a timeline problem: if the liar was there until 11 and saw nothing unusual, the guilty player's alibi (left at 10, home by 10:30, asleep by 11:47) is corroborated by absence. The liar's late departure implicitly supports the guilty player's story. This is the designed collaboration point.

**Round 6:** The guilty player walked home in the rain. The liar took a cab. The rain was mentioned in the scenario. If anyone asks the guilty player "Wasn't it raining?", they have to improvise around this. Meanwhile, the liar's cab story sounds perfectly normal -- which is the point. The liar is meant to look credible.

**Round 7:** The heat round for both players. The guilty player volunteers that their phone died -- a classic preemptive excuse that sounds rehearsed. The liar volunteers hearing "something odd" -- a calculated admission that invites follow-up. If both players are pressed in the same round, the room divides its attention, which helps both of them. But if the room focuses on one, that player is in trouble.

**Round 8:** Both players offer small confessions. The guilty player had "a drink beforehand" (vague misdirection). The liar "stepped outside for air" (half-truth concealing their actual location). These lies are designed to feel like honesty -- giving the room something small to satisfy their curiosity.

**Round 9:** The keystone round. The guilty player claims to be asleep. The liar claims to be outside waiting for a cab. Both are conveniently absent from the building at 11:47 PM. If the room notices that BOTH of these players were supposedly gone at the critical moment, it either looks like coincidence or collusion. This is where the case breaks or holds.

**Round 10:** Both players make meta-statements. "I have nothing to hide" and "I just want this resolved" are both things guilty and innocent people say. The room must decide whether these are confidence or performance.

---

### STORY 2: "THE PITCH DECK"
**Category:** Workplace Scandal (The Backstab)

**Crime Scenario:**
The Meridian Group's confidential pitch deck -- six months of proprietary strategy worth an estimated $12 million in competitive advantage -- was emailed to a rival firm from an internal account at 3:17 AM on Sunday morning. The access logs show someone used a conference room terminal after hours. The deck's original author, Claire Nguyen, has been placed on administrative leave while the investigation proceeds. She built that strategy over two years. Her team cannot look her in the eye. Six employees had after-hours badge access that weekend.

**The Liar's Secret:**
The liar knows the guilty player was in the building on Saturday night because they were also there -- working unauthorized overtime on a personal side project using company resources. The liar saw the guilty player entering the conference room at approximately 2:45 AM. They cannot reveal this without admitting they were violating their employment contract.

**Round Prompts, Guilty Lies, and Liar Lies:**

| Rd | Prompt | GUILTY Lie | LIAR Lie |
|----|--------|-----------|----------|
| 1 | "Walk us through your weekend. What did you do Saturday?" | **Home all day, very boring** | **Errands, gym, the usual stuff** |
| 2 | "How do you feel about your role at Meridian?" | **Perfectly happy where I am** | **It's fine, no complaints really** |
| 3 | "What's your relationship with Claire Nguyen?" | **We're colleagues, that's about it** | **Friendly enough, nothing deep though** |
| 4 | "Have you ever accessed the building after hours?" | **Never had any reason to** | **Once or twice, nothing recent** |
| 5 | "Do you know who might benefit from this leak?" | **Could be anyone, honestly speaking** | **Competitors, obviously, not us though** |
| 6 | "What were you doing at 3 AM Sunday?" | **Sound asleep in my bed** | **Home watching something, probably Netflix** |
| 7 | "Is there anything about your work you're hiding?" | **I've applied for jobs elsewhere** | **I sometimes work weekends unofficially** |
| 8 | "What would you do with $12 million?" | **Pay off my mortgage, maybe** | **Not worth risking everything for** |
| 9 | "Why should we believe your account?" | **My record speaks for itself** | **Ask anyone, they'll vouch completely** |
| 10 | "Anything else before we conclude?" | **Claire deserved better than this** | **Let's find who actually did it** |

**Round-by-round notes:**

**Round 1:** Both claims are mundane. The guilty player was "home all day" (false -- they were in the building). The liar had a normal day of "errands, gym" (partially true but omits the nighttime trip to the office). Neither lie creates danger yet.

**Round 2:** The guilty player claims to be "perfectly happy." This matters because motive is the crux of workplace crime stories. If they're happy, why would they leak? But "perfectly happy" is a suspiciously strong claim -- nobody is perfectly happy at work. The liar's "no complaints really" is more realistic-sounding, which makes the guilty player's answer stand out by contrast.

**Round 3:** Both downplay their relationship with the victim. The guilty player keeps it professional ("colleagues"). The liar keeps it warm but shallow ("friendly enough, nothing deep"). Neither lie is dangerous alone, but they create a pattern of distance from Claire that could look like coordinated detachment.

**Round 4:** The critical lie for both. The guilty player flatly denies ever being in the building after hours. The liar admits to being there "once or twice" but says "nothing recent." The liar's lie is strategically brilliant -- by admitting to occasional after-hours access, they normalize it, making it seem like the kind of thing several people do. This provides cover for the guilty player's actual after-hours presence. But "nothing recent" is a lie -- the liar was there that very weekend.

**Round 5:** The guilty player deflects ("could be anyone"). The liar deflects toward external competitors. Both are steering suspicion away from internal actors. The liar's "not us though" is technically a lie -- one of "us" did exactly that.

**Round 6:** Both players claim to be home at the time of the crime. The guilty player is "sound asleep." The liar is "watching Netflix." Two alibi claims for the same time. If the room starts checking these against each other, neither can corroborate the other -- and neither can disprove the other.

**Round 7:** The designed confessional round. The guilty player volunteers that they've been job hunting -- a real-sounding personal admission that also introduces motive (disgruntled employee). This is a trap. If the room latches onto "applying for jobs elsewhere" as evidence of disloyalty, it actually makes the guilty player look more suspicious, not less. It's a high-risk misdirection. The liar's admission of unofficial weekend work is even more dangerous -- it directly contradicts "nothing recent" from round 4 and places them in the building on weekends. If a sharp player connects "sometimes work weekends" with "once or twice, nothing recent," the liar's story cracks.

**Round 8:** A question about motive framed as aspiration. The guilty player gives a modest, relatable answer ("mortgage"). The liar gives a principled answer ("not worth risking everything"). The liar's response is actually suspicious -- it's an unprompted declaration of innocence disguised as a value statement. Why would someone say "not worth the risk" unless they'd thought about the risk?

**Round 9:** Both players appeal to character. "My record speaks for itself" (guilty player) and "ask anyone, they'll vouch" (liar). Neither is verifiable in the moment. Both sound confident. The question is whether the room reads confidence as innocence or bravado.

**Round 10:** The emotional close. The guilty player expresses sympathy for Claire -- "she deserved better." This is either genuine empathy or calculated performance. The liar redirects to finding the real culprit. Both are saying the right things. But the guilty player's sympathy, coming from the person who actually did it, is the cruelest lie in the entire sequence.

---

### STORY 3: "GRANDMOTHER'S LETTER"
**Category:** Family Secret (The Reunion)

**Crime Scenario:**
At the annual Gallagher family reunion last Sunday, someone opened the sealed envelope that Grandmother Rose left in the bureau before she passed. The envelope was labelled "NOT TO BE OPENED UNTIL I AM GONE" -- but Rose is still alive, in a care home across town, and she is devastated. The envelope contained a letter revealing a family secret that Rose wanted to control the timing of. Now the secret is out, the family is fractured, and Rose's daughter Margaret found the torn envelope on the kitchen counter. Everyone who was in the house that afternoon is suspected.

**The Liar's Secret:**
The liar walked into the kitchen and saw the guilty player reading the letter. They made eye contact. Neither spoke. The liar said nothing because they had already read the letter themselves months ago -- they found it during a previous visit and resealed it. They know the secret. They have known for months. They cannot reveal that they saw the guilty player without explaining how they recognised what was being read.

**Round Prompts, Guilty Lies, and Liar Lies:**

| Rd | Prompt | GUILTY Lie | LIAR Lie |
|----|--------|-----------|----------|
| 1 | "Tell us what you did at the reunion. Walk us through your afternoon." | **Helped in the kitchen mostly** | **Mingled, caught up with everyone** |
| 2 | "What's your relationship with Grandmother Rose?" | **We're close, always have been** | **I visit when I can manage** |
| 3 | "Did you go near the bureau at any point?" | **Didn't even notice it there** | **Passed it, didn't think anything** |
| 4 | "How do you feel about family secrets?" | **Every family deserves their privacy** | **Better out than hidden forever** |
| 5 | "Who do you think opened the letter?" | **I genuinely have no idea** | **Could be anyone in there** |
| 6 | "What was the mood like that afternoon?" | **Completely normal, nothing felt off** | **A bit tense, families are though** |
| 7 | "Were you ever alone in the kitchen?" | **Maybe briefly, getting a drink** | **I popped in, someone left quickly** |
| 8 | "Is there anything about that day you haven't told us?" | **I nearly didn't come today** | **I already knew the secret** |
| 9 | "Why should we trust what you're saying?" | **Rose would believe me absolutely** | **I'd never hurt Rose, you know** |
| 10 | "What do you want to say to Rose?" | **I'm sorry this happened, truly** | **She deserves peace, nothing less** |

**Round-by-round notes:**

**Round 1:** The guilty player claims to have been in the kitchen -- which is true (they opened the letter there) but presented as innocent activity ("helped"). The liar was "mingling." Both stories are benign and create no suspicion.

**Round 2:** The guilty player claims closeness with Rose. The liar claims to visit when they can. These are both establishing emotional position. The guilty player's claim of closeness is interesting -- close enough to betray her trust? The liar's more casual relationship seems less suspicious, but it's also a lie: the liar has been visiting Rose independently, which is how they found the letter months ago.

**Round 3:** Both players deny interacting with the bureau. The guilty player says they "didn't even notice it" -- an overclaim. How do you spend an afternoon in a room and not notice a piece of furniture? The liar's response is more sophisticated: "passed it, didn't think anything." This acknowledges the bureau exists but dismisses its significance. The difference in approach could be telling.

**Round 4:** A philosophical question that reveals character. The guilty player argues for privacy -- which is ironic, given that they violated Rose's privacy. The liar argues for openness -- "better out than hidden." This is the liar's most ambiguous statement. It can be read as innocent opinion. It can also be read as the liar rationalising their own prior reading of the letter. And it could be read as the liar subtly arguing that what the guilty player did was justified. Three readings, one statement. This is designed ambiguity at its best.

**Round 5:** Both deflect. The guilty player has "no idea." The liar says "could be anyone." Neither statement is useful. Neither is suspicious. This round is a breather -- designed to let the room catch its breath before the escalation of rounds 6-8.

**Round 6:** The guilty player says everything felt normal. The liar says it was "a bit tense." This disagreement is important. If the guilty player says nothing was off and the liar says things were tense, the room may wonder: which is it? Were things fine, or weren't they? The liar's honesty here ("families are tense") sounds more authentic, which makes the guilty player's "completely normal" sound like denial.

**Round 7:** The most dangerous round for both. The guilty player admits to being briefly alone in the kitchen. This is a massive concession -- they're placing themselves alone at the scene. But they frame it as trivial ("getting a drink"). The liar goes further: "I popped in, someone left quickly." This is extraordinarily dangerous. The liar is describing the actual moment -- they walked in, the guilty player was reading the letter, and the guilty player left. But the liar frames it as a vague observation. If anyone asks "Who left?", the liar must improvise. This is the designed cracking point. The room should feel the temperature rise.

**Round 8:** The confession round. The guilty player says they "nearly didn't come" -- a misdirect that introduces reluctance without admitting anything. It invites sympathy. The liar's lie is a bombshell: "I already knew the secret." This is true. The liar DID already know. By confessing this, the liar paradoxically protects themselves -- if they already knew, they had no reason to open the letter. But it also reveals that the secret was less secret than everyone thought, which could redirect suspicion toward the liar: how did they already know? Did Rose tell them? Or did they open the letter before and reseal it? If the room follows this thread, the liar's entire story unravels.

**Round 9:** Both appeal to character and relationship with Rose. The guilty player invokes Rose's trust ("she would believe me"). The liar invokes their love for Rose ("I'd never hurt her"). Both are emotional appeals. The guilty player's is more specific and more manipulative -- they're using Rose as a character witness. The liar's is simpler and probably more genuine.

**Round 10:** The emotional finale. The guilty player says "I'm sorry this happened" -- which is technically true (they probably are sorry, even though they did it). The word "truly" at the end is the final tell: it's another emphasis word, like "for sure" and "not at all" from Story 1. The liar says Rose "deserves peace" -- which is the liar's genuine wish, complicated by the fact that the liar's own actions (reading the letter months ago, saying nothing) also violated Rose's wishes.

---

## 7. CONTENT PRODUCTION NOTES

### "Making a lot of them is probably the easiest bit." -- An honest assessment.

This statement is half right and half dangerously wrong.

**The half that's right:** The format is highly templated. Once you understand the structure -- crime scenario, liar's secret, 10 round prompts, 10 guilty lies, 10 liar lies -- you can produce a first draft of a new story in 60-90 minutes. The five-word constraint actually accelerates writing because it prevents overthinking. You cannot write a paragraph-long lie. You must distill. The constraint breeds creativity.

**The half that's wrong:** A first draft is not a finished story. The difference between a mediocre lie arc and a great one is in the interactions -- how lie 4 interacts with lie 7, how the guilty player's arc echoes the liar's, how the round prompts create context that makes each lie land differently. These interactions cannot be checked in a single pass. They require reading the arcs out loud, playing through them with test groups, and iterating.

### The traps

**Trap 1: Lies that are too obviously false.**
"I was definitely not there" sounds like a guilty person in a comedy sketch. Real people don't speak this way. The best lies sound exactly like truths. The five-word constraint helps because it forces natural phrasing, but writers must still resist the urge to make lies sound "liey."

Bad: "I would never steal anything"
Good: "Not really my sort of thing"

The bad version sounds like a denial. The good version sounds like a person.

**Trap 2: Lies that create no commitments.**
"I don't really know" is safe but boring. It cannot be interrogated. It creates no tension. Every lie must commit the player to SOMETHING -- a time, a place, a relationship, a claim about themselves -- that can be tested against other information.

Bad: "I'm not sure, to be honest"
Good: "Left around ten, I think"

The good version claims a time (around ten), a direction (left), and a hedge (I think). All three can be probed.

**Trap 3: Arcs that don't escalate.**
If the most dangerous lie is in round 3 and the rest are safe, the game's tension curve is wrong. The arc must build. Rounds 1-3 should be low risk. Rounds 4-6 should introduce commitments. Rounds 7-8 should be genuinely dangerous. Rounds 9-10 should feel like a closing argument.

**Trap 4: Liar arcs that are too supportive of the guilty player.**
If the liar's lies all obviously corroborate the guilty player's story, attentive players will notice the pattern immediately. The liar must appear to have their own independent story. The corroboration must be incidental, not structural. The liar should seem like they're telling their own truth, not backing up someone else's lie.

**Trap 5: Round prompts that don't serve both arcs.**
Every prompt must work for the guilty lie, the liar lie, AND the innocent players' genuine truths. If a prompt is so specific that only the guilty player's lie fits naturally, it fails. Prompts must be universal enough that any human can answer truthfully while also creating the right context for both preset lies.

**Trap 6: Stories that all sound the same.**
Ten stories about stolen paintings in museums are one story repeated ten times. Each story within a category must vary in setting, relationships, emotional register, and the type of secret the liar is protecting. The Vermeer story is about a professional theft. A second heist story might be about an inside job driven by desperation. A third might involve a swap that nobody noticed for weeks. Same category, different human dynamics.

### What makes a bad lie arc

- **Flat tension curve.** Every lie is equally vague or equally specific. No escalation.
- **No internal contradictions.** The arc is perfectly consistent. Real alibis have seams. Designed alibis should too.
- **The lies don't sound like a person talking.** They sound like a writer writing. Five words must sound spoken, not composed.
- **The liar's arc is invisible.** If nobody ever suspects the liar, the liar role is wasted. The liar must come close to exposure at least once.
- **The guilty player's arc is too easy.** If none of the lies create danger, the innocent players have nothing to work with. The game becomes boring.

### What makes a good lie arc

- **It tells a story.** Read the 10 lies in sequence. Do they sound like a person's account? Can you hear them talking?
- **It has a turn.** Somewhere around round 6-8, the arc shifts. A lie contradicts an earlier one. A new detail changes the meaning of an old one. The room should be able to feel this shift even if they cannot articulate it.
- **The dangerous lie is dangerous.** Round 7-8 should make the player nervous to say it. It should feel like the room is about to catch them.
- **The final lie is thematic.** Round 10 is not just another alibi statement. It's a character statement. It reveals what kind of liar this person is -- confident, sympathetic, deflecting, emotional.
- **The guilty and liar arcs rhyme without copying.** They echo each other in structure (both deny, both downplay, both confess something small) without using the same words or the same strategy.

### Content principles for writers

1. **Write lies you would believe.** If you read the lie and think "that sounds like BS," rewrite it. The test is not whether it's technically plausible. The test is whether it sounds like something a real person would actually say.

2. **Write prompts you would enjoy answering.** If the prompt feels like a police questionnaire, it will produce police-questionnaire answers. If it feels like a question a curious friend would ask, it will produce real conversation.

3. **Write the liar's arc second.** Always write the guilty arc first, then write the liar's arc in response to it. The liar is reacting to the guilty player's story. Their arc only makes sense in relation to it.

4. **Read both arcs aloud together.** Interleave them -- guilty round 1, liar round 1, guilty round 2, liar round 2. Listen for echoes, contradictions, and moments where both players are doing the same thing simultaneously. Those moments are either gold (designed parallels) or mistakes (accidental coordination that looks suspicious in the wrong way).

5. **Playtest with real humans before finalising.** No amount of desk work replaces a table of people interrogating each other. The lie that felt clever on paper might be immediately transparent in person. The lie that felt too obvious might slip past everyone. You will not know until you watch it happen.

6. **Every story needs a human cost.** The crime scenario must include a victim or a consequence. "A painting was stolen" is a puzzle. "A painting was stolen and the guard who protected it for thirty years collapsed in the doorway" is a story. The human cost is what makes the lies feel heavy.

7. **The five-word limit is sacred.** Do not cheat it. Do not allow "I was at my friend's house that night actually" and call it five words. Count them. Cut them. The constraint is the game.

8. **Ambiguity is a feature, not a bug.** "I had a drink beforehand" -- before what? This is not sloppy writing. This is designed space for interrogation. The best lies are the ones where the room argues about what the lie even means.

### Production timeline estimate

| Phase | Per Story | Notes |
|-------|-----------|-------|
| First draft (scenario + both arcs) | 90 minutes | Fastest part. The structure guides you. |
| Internal review (read aloud, check word counts, check arc shape) | 45 minutes | Catches 80% of problems. |
| Cross-arc review (interleave guilty + liar, check for accidental tells or missing parallels) | 30 minutes | This is where the magic happens or doesn't. |
| Playtest | 60-90 minutes | Need 4-6 people. Cannot be skipped. |
| Post-playtest revision | 45 minutes | Usually 2-4 lies get rewritten. |
| Final polish | 15 minutes | Word count check, tone check, consistency check. |
| **Total per story** | **4.5-6 hours** | From blank page to production-ready. |

For 12 stories (minimum launch): approximately 55-70 hours of focused content work.
For 25 stories (good target): approximately 115-150 hours.

This is not trivial. But it is tractable. A dedicated content creator can produce 2-3 finished stories per week. A team of two can hit 25 stories in 6-8 weeks.

The creator was right that the format is repeatable. The creator was wrong if they assumed repeatable means fast. It is repeatable. It is not fast. The quality bar is what takes time.
