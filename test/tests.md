# Tests

## Current test inventory

All tests are in `test/game.test.ts`. Run with `npx vitest run`.

### 1. Game Setup (11 tests)
| # | Test | Verifies |
|---|------|----------|
| 1 | player starts with correct initial resources | resources = 5 |
| 2 | player starts with score 0 and damage 0 | score = 0, damage = 0 |
| 3 | round starts at 1 | round = 1 |
| 4 | player hand has strategy cards after setup | 10 strategy cards dealt |
| 5 | player hand has challenge cards after setup | 3 challenge cards dealt |
| 6 | one challenge card is placed in slot0 | slot0 has a ChallengeCard |
| 7 | player pool has 20 innovation tokens | pool size = 20 |
| 8 | token pool has all 4 types | Data, Method, User, Aim present |
| 9 | all tokens have quality between 1 and 3 | quality in [1, 3] |
| 10 | event deck has cards | eventDeck is not empty |
| 11 | player starts in play phase with correct actions | all 6 play actions available |

### 2. Play Phase Actions (8 tests)
| # | Test | Verifies |
|---|------|----------|
| 12 | player can draw a strategy card from deck | deck shrinks, hand grows |
| 13 | player can play a strategy card from hand | card moves to activeStrategies, resources deducted |
| 14 | player can skip turn, setting resources to 0 | resources = 0 |
| 15 | after skipping, player moves to event phase | drawEvent is available |
| 16 | player can add a challenge card to an empty slot | slot fills correctly |
| 17 | player can stash a challenge card for +1 score, -1 resource | score and resources update |
| 18 | player can only stash once per turn | stashCard removed from actions |
| 19 | player can place an innovation token on a challenge card | resources deducted by token quality |

### 3. Event Phase (2 tests)
| # | Test | Verifies |
|---|------|----------|
| 20 | after play phase, player must draw an event card | drawEvent is available |
| 21 | player can draw an event card | no error thrown |

### 4. Resource Management (2 tests)
| # | Test | Verifies |
|---|------|----------|
| 22 | spending resources reduces player resources correctly | skip sets resources to 0 |
| 23 | player resources deduct correctly when stashing | resources = 4 after stash |

### 5. Full Turn Flow (2 tests)
| # | Test | Verifies |
|---|------|----------|
| 24 | a complete turn: play -> event -> check status | correct phase transitions |
| 25 | after a full turn with no event impact, game proceeds | round increments, resources reset |

### 6. Win/Lose Conditions (4 tests)
| # | Test | Verifies |
|---|------|----------|
| 26 | win condition is score >= 10 | wincondition = 10 |
| 27 | lose condition is damage >= 10 | losecondition = 10 |
| 28 | max rounds is 6 | maxRounds = 6 |
| 29 | player starts with no win/lose status | status = undefined |

### 7. Board Structure (4 tests)
| # | Test | Verifies |
|---|------|----------|
| 30 | player has 3 challenge slots | 3 slots with group 'challengeslot' |
| 31 | each challenge slot has a tokenSpace with 4 type spaces | Data, Method, User, Aim per slot |
| 32 | player has activeStrategies, hand, pool, wastedResource spaces | all spaces exist |
| 33 | discarded space exists | discarded space present |

### 8. Edge Cases (12 tests)
| # | Test | Verifies |
|---|------|----------|
| 34 | filling all 3 slots does not crash | 3 challenges placed without error |
| 35 | adding a challenge card when all slots are full does not crash | graceful handling |
| 36 | drawing a harmful event on a challenge with tokens triggers resolveEvent | correct flow branch |
| 37 | accepting event impact moves tokens to wastedResource | tokens move on accept |
| 38 | safe event skips resolveEvent and goes to checkStatus | no resolveEvent for zero-impact |
| 39 | placing all 4 token types with strategy coverage completes challenge | multi-turn completion flow |
| 40 | player can draw strategy, play strategy, and play token in same turn | multiple actions per turn |
| 41 | stashing a card then playing tokens works in the same turn | combined actions |
| 42 | round counter increments across multiple turns | round goes up |
| 43 | resources reset to 5 at the start of each new round | resources = turnLimit |
| 44 | stashedThisTurn resets between rounds | stash flag clears, stashCard available |
| 45 | playing through 2 full rounds without crashing | multi-round stability |

---

## Running tests

```bash
npx vitest run                # run once and report
npx vitest                    # watch mode, re-runs on file changes
npx vitest run -t "test name" # run a specific test by name
```

---

## How to add more tests

Every test follows the same pattern:

### 1. Start a game

```ts
const p1 = startGame();  // uses the helper that calls runner.start()
```

### 2. Simulate player actions

```ts
p1.move('actionName', { argName: someGameElement });
```

### 3. Assert the result

```ts
expect(p1.player.score).toBe(1);
expect(p1.actions()).toContain('drawEvent');
```

### Key APIs

| API | What it does |
|-----|-------------|
| `p1.actions()` | Returns array of action names currently available to the player |
| `p1.move(action, args)` | Executes a player action with arguments |
| `p1.player` | Access player state (`.score`, `.resources`, `.damage`, `.status`) |
| `p1.player.my('spaceName')` | Access a player-owned space (hand, pool, etc.) |
| `p1.game` | Access game state (`.round`, `.wincondition`, etc.) |
| `p1.game.first('spaceName')` | Find a space/piece on the board |
| `.all(PieceClass)` | Get all pieces of a type in a space |
| `.first(PieceClass)` | Get first piece of a type |

### Example: adding a new test

Add inside an existing `describe` block or create a new one in `test/game.test.ts`:

```ts
test('drawing strategy card costs strategyDrawCost resources', () => {
  const p1 = startGame();
  const resourcesBefore = p1.player.resources;
  const card = p1.game.first('strategyDeck')!.first(StrategyCard)!;

  p1.move('drawStrategyCard', { strategyCard: card });

  expect(p1.player.resources).toBe(resourcesBefore - p1.game.strategyDrawCost);
});
```

### Testing multi-step scenarios

Chain moves to simulate a full gameplay scenario:

```ts
test('player can play strategy then stash in same turn', () => {
  const p1 = startGame();

  // Step 1: play a cheap strategy
  const cheapCard = p1.player.my('hand')!.all(StrategyCard).find(c => c.cost === 1)!;
  p1.move('playStrategyCard', { strategyCard: cheapCard });

  // Step 2: stash a challenge
  const challenge = p1.player.my('hand')!.first(ChallengeCard)!;
  p1.move('stashCard', { challengeCard: challenge });

  expect(p1.player.score).toBe(1);
  expect(p1.player.resources).toBe(3); // 5 - 1 - 1
});
```

### Important constraint

Deck shuffling is random, so tests must work with whatever cards are dealt rather than expecting specific cards. Use `.find()` to locate cards with the properties you need (e.g., affordable cost, specific impact values).

---

## What tests catch

**Game logic errors** (most valuable):
- Actions that should work but throw errors (e.g., playing a token crashes because of a bad space lookup)
- Wrong math — resources not deducting correctly, score not incrementing, damage miscounted
- State not updating — `stashedThisTurn` not being set, round not incrementing, status not changing
- Missing game elements — setup forgetting to create spaces, slots, or tokens
- Flow/phase violations — actions available when they shouldn't be, or missing when they should

**Structural/setup errors:**
- Board not constructed correctly (wrong number of slots, missing token spaces)
- Cards not dealt properly (wrong hand size, missing initial challenge)
- Token pool wrong size or missing types

**Regression bugs** — things that used to work but break when you change game code:
- Change event resolution logic and accidentally break the play phase
- Refactor challenge completion and break the score calculation
- Modify a card definition and break the principle-matching algorithm

## What tests don't catch

- **UI/visual bugs** — the TestRunner runs headlessly, no browser or rendering
- **Balancing issues** — tests verify mechanics work, not whether the game is fun or fair
- **Race conditions or async bugs** — Boardzilla's TestRunner runs synchronously, so timing-related issues in a real multiplayer session won't surface
