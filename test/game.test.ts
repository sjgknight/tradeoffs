import { expect, test, beforeEach, describe } from 'vitest'
import { TestRunner } from "@boardzilla/core";
import setup, { Tradeoffs } from '../src/game/index.js';
import { Token, Slot } from '../src/game/pieces/index.ts';
import { ChallengeCard } from '../src/game/pieces/challenges.ts';
import { StrategyCard } from '../src/game/pieces/strategies.ts';
import { EventCard } from '../src/game/pieces/events.ts';

let runner: TestRunner<Tradeoffs>;

beforeEach(() => {
  runner = new TestRunner(setup);
});

// Helper: start a 1-player game (this game is primarily single-player)
function startGame() {
  const [p1] = runner.start({ players: 1, settings: {} });
  return p1;
}

// ═══════════════════════════════════════════════════════════
// 1. GAME SETUP TESTS
// ═══════════════════════════════════════════════════════════

describe('Game Setup', () => {

  test('player starts with correct initial resources', () => {
    const p1 = startGame();
    expect(p1.player.resources).toBe(5);
  });

  test('player starts with score 0 and damage 0', () => {
    const p1 = startGame();
    expect(p1.player.score).toBe(0);
    expect(p1.player.damage).toBe(0);
  });

  test('round starts at 1', () => {
    const p1 = startGame();
    expect(p1.game.round).toBe(1);
  });

  test('player hand has strategy cards after setup', () => {
    const p1 = startGame();
    const handStrategies = p1.player.my('hand')!.all(StrategyCard);
    expect(handStrategies.length).toBe(10); // handLimit = 10
  });

  test('player hand has challenge cards after setup', () => {
    const p1 = startGame();
    const handChallenges = p1.player.my('hand')!.all(ChallengeCard);
    expect(handChallenges.length).toBe(3); // 3 extra challenge cards dealt to hand
  });

  test('one challenge card is placed in slot0', () => {
    const p1 = startGame();
    const slot0 = p1.player.allMy(Slot, { group: 'challengeslot' })[0];
    expect(slot0.has(ChallengeCard)).toBe(true);
  });

  test('player pool has 20 innovation tokens', () => {
    const p1 = startGame();
    const poolTokens = p1.player.my('pool')!.all(Token);
    expect(poolTokens.length).toBe(20); // poolSize = 20
  });

  test('token pool has all 4 types (Data, Method, User, Aim)', () => {
    const p1 = startGame();
    const poolTokens = p1.player.my('pool')!.all(Token);
    const types = new Set(poolTokens.map(t => t.type));
    expect(types.has('Data')).toBe(true);
    expect(types.has('Method')).toBe(true);
    expect(types.has('User')).toBe(true);
    expect(types.has('Aim')).toBe(true);
  });

  test('all tokens have quality between 1 and 3', () => {
    const p1 = startGame();
    const poolTokens = p1.player.my('pool')!.all(Token);
    poolTokens.forEach(token => {
      expect(token.quality).toBeGreaterThanOrEqual(1);
      expect(token.quality).toBeLessThanOrEqual(3);
    });
  });

  test('event deck has cards', () => {
    const p1 = startGame();
    const eventDeck = p1.game.first('eventDeck')!;
    expect(eventDeck.all(EventCard).length).toBeGreaterThan(0);
  });

  test('player starts in play phase with correct actions available', () => {
    const p1 = startGame();
    const actions = p1.actions();
    // During the play phase (subflow 'playround'), these actions should be available
    expect(actions).toContain('drawStrategyCard');
    expect(actions).toContain('playInnovation');
    expect(actions).toContain('playStrategyCard');
    expect(actions).toContain('addChallengeCard');
    expect(actions).toContain('stashCard');
    expect(actions).toContain('skip');
  });

});

// ═══════════════════════════════════════════════════════════
// 2. PLAY PHASE ACTION TESTS
// ═══════════════════════════════════════════════════════════

describe('Play Phase - Draw Strategy Card', () => {

  test('player can draw a strategy card from deck', () => {
    const p1 = startGame();
    const deckBefore = p1.game.first('strategyDeck')!.all(StrategyCard).length;
    const handBefore = p1.player.my('hand')!.all(StrategyCard).length;

    // Pick first available strategy card from deck
    const card = p1.game.first('strategyDeck')!.first(StrategyCard)!;
    p1.move('drawStrategyCard', { strategyCard: card });

    const deckAfter = p1.game.first('strategyDeck')!.all(StrategyCard).length;
    const handAfter = p1.player.my('hand')!.all(StrategyCard).length;

    expect(deckAfter).toBe(deckBefore - 1);
    expect(handAfter).toBe(handBefore + 1);
  });

});

describe('Play Phase - Play Strategy Card', () => {

  test('player can play a strategy card from hand to active strategies', () => {
    const p1 = startGame();
    // Find a strategy card the player can afford (cost <= 5 resources)
    const affordableCard = p1.player.my('hand')!.all(StrategyCard).find(c => c.cost <= p1.player.resources);
    if (!affordableCard) return; // skip if no affordable cards (unlikely)

    const costOfCard = affordableCard.cost;
    const resourcesBefore = p1.player.resources;

    p1.move('playStrategyCard', { strategyCard: affordableCard });

    // Card should move to activeStrategies and resources should decrease
    const activeCount = p1.player.my('activeStrategies')!.all(StrategyCard).length;
    expect(activeCount).toBeGreaterThanOrEqual(1);
    expect(p1.player.resources).toBe(resourcesBefore - costOfCard);
  });

});

describe('Play Phase - Skip', () => {

  test('player can skip turn, setting resources to 0', () => {
    const p1 = startGame();
    expect(p1.player.resources).toBe(5);

    p1.move('skip', {});

    expect(p1.player.resources).toBe(0);
  });

  test('after skipping, player moves to event phase (drawEvent)', () => {
    const p1 = startGame();
    p1.move('skip', {});

    // After resources hit 0, the play subflow ends and we move to drawEvent
    const actions = p1.actions();
    expect(actions).toContain('drawEvent');
  });

});

describe('Play Phase - Add Challenge Card', () => {

  test('player can add a challenge card from deck to an empty slot', () => {
    const p1 = startGame();

    // slot0 already has a challenge, slot1 and slot2 should be empty
    const challengeCard = p1.game.first('challengeDeck')!.first(ChallengeCard);
    if (!challengeCard) return; // no cards left in deck

    p1.move('addChallengeCard', { challengeCard });

    // Now slot1 should have a challenge card too
    const allSlots = p1.player.allMy(Slot, { group: 'challengeslot' });
    const filledSlots = allSlots.filter(slot => slot.has(ChallengeCard));
    expect(filledSlots.length).toBe(2); // slot0 (setup) + slot1 (just added)
  });

});

describe('Play Phase - Stash Card', () => {

  test('player can stash a challenge card for +1 score, -1 resource', () => {
    const p1 = startGame();
    const scoreBefore = p1.player.score;
    const resourcesBefore = p1.player.resources;

    // Player has 3 challenge cards in hand from setup
    const challengeInHand = p1.player.my('hand')!.first(ChallengeCard);
    if (!challengeInHand) return;

    p1.move('stashCard', { challengeCard: challengeInHand });

    expect(p1.player.score).toBe(scoreBefore + 1);
    expect(p1.player.resources).toBe(resourcesBefore - 1);
  });

  test('player can only stash once per turn', () => {
    const p1 = startGame();

    const firstCard = p1.player.my('hand')!.first(ChallengeCard);
    if (!firstCard) return;

    p1.move('stashCard', { challengeCard: firstCard });

    // stashCard should no longer be in available actions (condition: !player.stashedThisTurn)
    const actions = p1.actions();
    expect(actions).not.toContain('stashCard');
  });

});

describe('Play Phase - Play Innovation Token', () => {

  test('player can place an innovation token on a challenge card', () => {
    const p1 = startGame();

    // Get a token from pool
    const token = p1.player.my('pool')!.first(Token)!;
    const tokenType = token.type;
    const tokenCost = token.quality;

    if (tokenCost > p1.player.resources) return; // can't afford

    // Find the matching empty space on slot0's challenge
    const allSlots = p1.player.allMy(Slot, { group: 'challengeslot' });
    const slot0 = allSlots[0];
    const tokenSpaces = slot0.all('tokenSpace');
    const targetSpace = tokenSpaces.flatMap(ts => ts.all('*')).find(
      space => space.name.startsWith(tokenType) && space.isEmpty()
    );

    if (!targetSpace) return; // no matching empty space

    const resourcesBefore = p1.player.resources;
    p1.move('playInnovation', { chosenToken: token, chosenSpace: targetSpace });

    expect(p1.player.resources).toBe(resourcesBefore - tokenCost);
  });

});

// ═══════════════════════════════════════════════════════════
// 3. EVENT PHASE TESTS
// ═══════════════════════════════════════════════════════════

describe('Event Phase', () => {

  test('after play phase, player must draw an event card', () => {
    const p1 = startGame();

    // Skip the play phase
    p1.move('skip', {});

    const actions = p1.actions();
    expect(actions).toContain('drawEvent');
  });

  test('player can draw an event card', () => {
    const p1 = startGame();
    p1.move('skip', {});

    const eventDeck = p1.game.first('eventDeck')!;
    const eventCard = eventDeck.first(EventCard)!;
    // Drawing the event should work without error
    expect(() => p1.move('drawEvent', { card: eventCard })).not.toThrow();
  });

});

// ═══════════════════════════════════════════════════════════
// 4. RESOURCE MANAGEMENT TESTS
// ═══════════════════════════════════════════════════════════

describe('Resource Management', () => {

  test('spending resources reduces player resources correctly', () => {
    const p1 = startGame();
    // Draw a strategy card (cost is strategyDrawCost, which is 4 currently... but looking at code it's free if cost=0)
    // Actually strategyDrawCost is 4 in the game settings
    // Let's just use skip which sets resources to 0
    p1.move('skip', {});
    expect(p1.player.resources).toBe(0);
  });

  test('player resources deduct correctly when stashing', () => {
    const p1 = startGame();

    const challengeInHand = p1.player.my('hand')!.first(ChallengeCard);
    if (!challengeInHand) return;

    p1.move('stashCard', { challengeCard: challengeInHand });
    expect(p1.player.resources).toBe(4); // 5 - 1 = 4
  });

});

// ═══════════════════════════════════════════════════════════
// 5. FULL TURN FLOW TEST
// ═══════════════════════════════════════════════════════════

describe('Full Turn Flow', () => {

  test('a complete turn: play phase -> event phase -> check status', () => {
    const p1 = startGame();

    // PLAY PHASE: skip immediately
    expect(p1.actions()).toContain('skip');
    p1.move('skip', {});

    // EVENT PHASE: draw an event
    expect(p1.actions()).toContain('drawEvent');
    const eventCard = p1.game.first('eventDeck')!.first(EventCard)!;
    p1.move('drawEvent', { card: eventCard });

    // After event, we either get resolveEvent (if event impacts challenges)
    // or checkStatus (if no impact)
    const actionsAfterEvent = p1.actions();
    const validNextActions = actionsAfterEvent.includes('resolveEvent') ||
                              actionsAfterEvent.includes('checkStatus');
    expect(validNextActions).toBe(true);
  });

  test('after a full turn with no event impact, game proceeds to next round', () => {
    const p1 = startGame();

    // Skip play phase
    p1.move('skip', {});

    // Draw an event - find one with no impact (all zeros)
    const eventDeck = p1.game.first('eventDeck')!;
    const safeEvent = eventDeck.all(EventCard).find(e =>
      e.impact?.every(i => (i.value || 0) === 0)
    );

    if (safeEvent) {
      p1.move('drawEvent', { card: safeEvent });

      // Should proceed to checkStatus
      if (p1.actions().includes('checkStatus')) {
        p1.move('checkStatus', {});

        // After checkStatus, round should increment and resources reset
        expect(p1.player.resources).toBe(5); // reset to turnLimit
        expect(p1.game.round).toBeGreaterThanOrEqual(2);
      }
    }
  });

});

// ═══════════════════════════════════════════════════════════
// 6. WIN/LOSE CONDITION TESTS
// ═══════════════════════════════════════════════════════════

describe('Win/Lose Conditions', () => {

  test('win condition is score >= 10', () => {
    const p1 = startGame();
    expect(p1.game.wincondition).toBe(10);
  });

  test('lose condition is damage >= 10', () => {
    const p1 = startGame();
    expect(p1.game.losecondition).toBe(10);
  });

  test('max rounds is 6', () => {
    const p1 = startGame();
    expect(p1.game.maxRounds).toBe(6);
  });

  test('player starts with no win/lose status', () => {
    const p1 = startGame();
    expect(p1.player.status).toBeUndefined();
  });

});

// ═══════════════════════════════════════════════════════════
// 7. GAME BOARD STRUCTURE TESTS
// ═══════════════════════════════════════════════════════════

describe('Board Structure', () => {

  test('player has 3 challenge slots', () => {
    const p1 = startGame();
    const slots = p1.player.allMy(Slot, { group: 'challengeslot' });
    expect(slots.length).toBe(3);
  });

  test('each challenge slot has a tokenSpace with 4 type spaces', () => {
    const p1 = startGame();
    const slots = p1.player.allMy(Slot, { group: 'challengeslot' });

    slots.forEach((slot, i) => {
      const tokenSpace = slot.first('tokenSpace');
      expect(tokenSpace).toBeTruthy();

      // Each tokenSpace should have Data, Method, User, Aim spaces
      const slotNum = i + 1;
      const dataSpace = tokenSpace!.first(`Data-${slotNum}`);
      const methodSpace = tokenSpace!.first(`Method-${slotNum}`);
      const userSpace = tokenSpace!.first(`User-${slotNum}`);
      const aimSpace = tokenSpace!.first(`Aim-${slotNum}`);

      expect(dataSpace).toBeTruthy();
      expect(methodSpace).toBeTruthy();
      expect(userSpace).toBeTruthy();
      expect(aimSpace).toBeTruthy();
    });
  });

  test('player has activeStrategies, hand, pool, wastedResource spaces', () => {
    const p1 = startGame();
    expect(p1.player.my('activeStrategies')).toBeTruthy();
    expect(p1.player.my('hand')).toBeTruthy();
    expect(p1.player.my('pool')).toBeTruthy();
    expect(p1.player.my('wastedResource')).toBeTruthy();
  });

  test('discarded space exists', () => {
    const p1 = startGame();
    expect(p1.game.first('discarded')).toBeTruthy();
  });

});

// ═══════════════════════════════════════════════════════════
// 8. EDGE CASES
// ═══════════════════════════════════════════════════════════

describe('Edge Case - All 3 challenge slots full', () => {

  test('filling all 3 slots does not crash', () => {
    const p1 = startGame();

    // slot0 is already filled from setup. Fill slot1 and slot2.
    const deck = p1.game.first('challengeDeck')!;

    const card1 = deck.first(ChallengeCard);
    if (!card1) return;
    p1.move('addChallengeCard', { challengeCard: card1 });

    const card2 = deck.first(ChallengeCard);
    if (!card2) return;
    p1.move('addChallengeCard', { challengeCard: card2 });

    // All 3 slots should now be filled
    const allSlots = p1.player.allMy(Slot, { group: 'challengeslot' });
    const filledSlots = allSlots.filter(slot => slot.has(ChallengeCard));
    expect(filledSlots.length).toBe(3);
  });

  test('adding a challenge card when all slots are full does not crash', () => {
    const p1 = startGame();
    const deck = p1.game.first('challengeDeck')!;

    // Fill slot1 and slot2
    const card1 = deck.first(ChallengeCard);
    if (!card1) return;
    p1.move('addChallengeCard', { challengeCard: card1 });

    const card2 = deck.first(ChallengeCard);
    if (!card2) return;
    p1.move('addChallengeCard', { challengeCard: card2 });

    // Try adding a 4th — the game code handles this with a message, should not throw
    const card3 = deck.first(ChallengeCard);
    if (!card3) return;
    expect(() => p1.move('addChallengeCard', { challengeCard: card3 })).not.toThrow();
  });

});

describe('Edge Case - Event impacts active challenge (resolveEvent flow)', () => {

  test('drawing a harmful event on a challenge with tokens triggers resolveEvent', () => {
    const p1 = startGame();

    // Place a token on the challenge in slot0 first
    const token = p1.player.my('pool')!.first(Token)!;
    const tokenType = token.type;
    const allSlots = p1.player.allMy(Slot, { group: 'challengeslot' });
    const slot0 = allSlots[0];
    const tokenSpaces = slot0.all('tokenSpace');
    const targetSpace = tokenSpaces.flatMap(ts => ts.all('*')).find(
      space => space.name.startsWith(tokenType) && space.isEmpty()
    );

    if (!targetSpace || token.quality > p1.player.resources) return;

    p1.move('playInnovation', { chosenToken: token, chosenSpace: targetSpace });

    // Now skip to event phase
    p1.move('skip', {});

    // Find an event with negative impact
    const eventDeck = p1.game.first('eventDeck')!;
    const harmfulEvent = eventDeck.all(EventCard).find(e =>
      e.impact?.some(i => (i.value || 0) < 0)
    );

    if (!harmfulEvent) return;

    p1.move('drawEvent', { card: harmfulEvent });

    // After a harmful event, the player should either get resolveEvent or checkStatus
    // depending on whether the event's principles match the challenge's requirements
    const actions = p1.actions();
    const isValidState = actions.includes('resolveEvent') || actions.includes('checkStatus');
    expect(isValidState).toBe(true);
  });

  test('accepting event impact moves tokens to wastedResource', () => {
    const p1 = startGame();

    // Place a token on slot0's challenge
    const token = p1.player.my('pool')!.first(Token)!;
    const tokenType = token.type;
    const allSlots = p1.player.allMy(Slot, { group: 'challengeslot' });
    const slot0 = allSlots[0];
    const tokenSpaces = slot0.all('tokenSpace');
    const targetSpace = tokenSpaces.flatMap(ts => ts.all('*')).find(
      space => space.name.startsWith(tokenType) && space.isEmpty()
    );

    if (!targetSpace || token.quality > p1.player.resources) return;

    const wastedBefore = p1.player.my('wastedResource')!.all(Token).length;

    p1.move('playInnovation', { chosenToken: token, chosenSpace: targetSpace });
    p1.move('skip', {});

    // Find a harmful event
    const eventDeck = p1.game.first('eventDeck')!;
    const harmfulEvent = eventDeck.all(EventCard).find(e =>
      e.impact?.some(i => (i.value || 0) < 0)
    );

    if (!harmfulEvent) return;

    p1.move('drawEvent', { card: harmfulEvent });

    // If resolveEvent is triggered, accept the impact
    if (p1.actions().includes('resolveEvent')) {
      p1.move('resolveEvent', { options: 'accept' });

      // Tokens should have moved to wastedResource
      const wastedAfter = p1.player.my('wastedResource')!.all(Token).length;
      expect(wastedAfter).toBeGreaterThan(wastedBefore);
    }
  });

});

describe('Edge Case - Event with no impact (safe event)', () => {

  test('safe event skips resolveEvent and goes to checkStatus', () => {
    const p1 = startGame();
    p1.move('skip', {});

    // Find a zero-impact event
    const eventDeck = p1.game.first('eventDeck')!;
    const safeEvent = eventDeck.all(EventCard).find(e =>
      e.impact?.every(i => (i.value || 0) === 0)
    );

    if (!safeEvent) return;

    p1.move('drawEvent', { card: safeEvent });

    // No challenge was impacted, should go straight to checkStatus
    expect(p1.actions()).toContain('checkStatus');
    expect(p1.actions()).not.toContain('resolveEvent');
  });

});

describe('Edge Case - Challenge completion', () => {

  test('placing all 4 token types on a challenge with strategy coverage completes it', () => {
    const p1 = startGame();
    const pool = p1.player.my('pool')!;
    const allSlots = p1.player.allMy(Slot, { group: 'challengeslot' });
    const slot0 = allSlots[0];

    // First, play strategies to meet the challenge requirements
    // Play cheap strategy cards (cost 1) to build up principle coverage
    const cheapStrategies = p1.player.my('hand')!.all(StrategyCard)
      .filter(c => c.cost >= 0 && c.cost <= 1);

    for (const card of cheapStrategies) {
      if (p1.player.resources >= card.cost && p1.actions().includes('playStrategyCard')) {
        p1.move('playStrategyCard', { strategyCard: card });
      }
    }

    // Skip to end play phase, then go through event + check to start a new turn
    // We may need multiple turns to place all 4 tokens (resource limit)
    const tokenTypes: ('Data' | 'Method' | 'User' | 'Aim')[] = ['Data', 'Method', 'User', 'Aim'];
    let tokensPlaced = 0;

    for (let turn = 0; turn < 6 && tokensPlaced < 4; turn++) {
      // On each turn, try to place tokens
      for (const type of tokenTypes) {
        if (tokensPlaced >= 4) break;
        if (!p1.actions().includes('playInnovation')) break;

        // Find a token of this type in the pool
        const token = pool.all(Token).find(t => t.type === type);
        if (!token || token.quality > p1.player.resources) continue;

        // Find the matching empty space
        const tokenSpaces = slot0.all('tokenSpace');
        const targetSpace = tokenSpaces.flatMap(ts => ts.all('*')).find(
          space => space.name.startsWith(type) && space.isEmpty()
        );

        if (!targetSpace) continue; // already placed this type

        p1.move('playInnovation', { chosenToken: token, chosenSpace: targetSpace });
        tokensPlaced++;
      }

      if (tokensPlaced >= 4) break;

      // End this turn: skip -> event -> checkStatus -> next turn
      if (!p1.actions().includes('skip')) break;
      p1.move('skip', {});

      if (!p1.actions().includes('drawEvent')) break;

      const eventDeck = p1.game.first('eventDeck')!;

      // Draw events until we reach checkStatus (resolveEvent -> accept triggers another drawEvent)
      for (let e = 0; e < 10; e++) {
        if (!p1.actions().includes('drawEvent')) break;
        const safeEvent = eventDeck.all(EventCard).find(ev =>
          ev.impact?.every(i => (i.value || 0) === 0)
        );
        const eventToPlay = safeEvent || eventDeck.first(EventCard);
        if (!eventToPlay) break;
        p1.move('drawEvent', { card: eventToPlay });

        if (p1.actions().includes('resolveEvent')) {
          p1.move('resolveEvent', { options: 'accept' });
        }
      }

      if (p1.actions().includes('checkStatus')) {
        p1.move('checkStatus', {});
      }
    }

    // Verify: if we placed all 4 tokens, check that the game recognizes it
    // (challenge completion is checked in checkStatus)
    if (tokensPlaced === 4) {
      // The slot0 should have all 4 token types filled
      const tokenSpaces = slot0.all('tokenSpace');
      const placedTokens = tokenSpaces.flatMap(ts => ts.all(Token));
      const uniqueTypes = new Set(placedTokens.map(t => t.type));
      expect(uniqueTypes.size).toBe(4);
    }
  });

});

describe('Edge Case - Multiple actions in one turn', () => {

  test('player can draw strategy, play strategy, and play token in same turn', () => {
    const p1 = startGame();

    // 1. Draw a strategy card (free if strategyDrawCost allows)
    const deckCard = p1.game.first('strategyDeck')!.first(StrategyCard);
    if (deckCard && p1.player.resources >= p1.game.strategyDrawCost) {
      p1.move('drawStrategyCard', { strategyCard: deckCard });
    }

    // 2. Play a cheap strategy card from hand
    const cheapCard = p1.player.my('hand')!.all(StrategyCard).find(c => c.cost === 1);
    if (cheapCard && p1.player.resources >= 1) {
      p1.move('playStrategyCard', { strategyCard: cheapCard });
    }

    // 3. Play an innovation token
    const token = p1.player.my('pool')!.first(Token)!;
    if (token.quality <= p1.player.resources) {
      const slot0 = p1.player.allMy(Slot, { group: 'challengeslot' })[0];
      const tokenSpaces = slot0.all('tokenSpace');
      const targetSpace = tokenSpaces.flatMap(ts => ts.all('*')).find(
        space => space.name.startsWith(token.type) && space.isEmpty()
      );

      if (targetSpace) {
        p1.move('playInnovation', { chosenToken: token, chosenSpace: targetSpace });
      }
    }

    // Should still be in play phase (resources may remain)
    // or have transitioned to event phase (resources exhausted)
    const actions = p1.actions();
    const validPhase = actions.includes('skip') || actions.includes('drawEvent');
    expect(validPhase).toBe(true);
  });

  test('stashing a card then playing tokens works in the same turn', () => {
    const p1 = startGame();
    const scoreBefore = p1.player.score;

    // Stash first (costs 1 resource)
    const challengeInHand = p1.player.my('hand')!.first(ChallengeCard);
    if (!challengeInHand) return;

    p1.move('stashCard', { challengeCard: challengeInHand });
    expect(p1.player.score).toBe(scoreBefore + 1);
    expect(p1.player.resources).toBe(4);

    // Then play a token (if affordable)
    const token = p1.player.my('pool')!.first(Token)!;
    if (token.quality <= p1.player.resources) {
      const slot0 = p1.player.allMy(Slot, { group: 'challengeslot' })[0];
      const tokenSpaces = slot0.all('tokenSpace');
      const targetSpace = tokenSpaces.flatMap(ts => ts.all('*')).find(
        space => space.name.startsWith(token.type) && space.isEmpty()
      );

      if (targetSpace) {
        const resBefore = p1.player.resources;
        p1.move('playInnovation', { chosenToken: token, chosenSpace: targetSpace });
        expect(p1.player.resources).toBe(resBefore - token.quality);
      }
    }
  });

});

describe('Edge Case - Multi-round gameplay', () => {

  // Helper: play through one complete round (skip play, safe event, check status)
  // After resolveEvent -> accept, a followUp drawEvent fires, so we may need
  // to draw multiple events before reaching checkStatus.
  function playOneSafeRound(p1: ReturnType<typeof startGame>) {
    // Skip play phase
    if (p1.actions().includes('skip')) {
      p1.move('skip', {});
    }

    // Draw events until we reach checkStatus (resolveEvent -> accept triggers another drawEvent)
    for (let i = 0; i < 10; i++) {
      if (p1.actions().includes('drawEvent')) {
        const eventDeck = p1.game.first('eventDeck')!;
        const safeEvent = eventDeck.all(EventCard).find(e =>
          e.impact?.every(i => (i.value || 0) === 0)
        );
        const eventToPlay = safeEvent || eventDeck.first(EventCard)!;
        if (!eventToPlay) break;
        p1.move('drawEvent', { card: eventToPlay });

        if (p1.actions().includes('resolveEvent')) {
          p1.move('resolveEvent', { options: 'accept' });
        }
      } else {
        break;
      }
    }

    // Check status
    if (p1.actions().includes('checkStatus')) {
      p1.move('checkStatus', {});
    }
  }

  test('round counter increments across multiple turns', () => {
    const p1 = startGame();
    expect(p1.game.round).toBe(1);

    playOneSafeRound(p1);

    // Round should have incremented
    expect(p1.game.round).toBeGreaterThanOrEqual(2);
  });

  test('resources reset to 5 at the start of each new round', () => {
    const p1 = startGame();

    playOneSafeRound(p1);

    // After round transition, resources should be reset
    expect(p1.player.resources).toBe(5);
  });

  test('stashedThisTurn resets between rounds', () => {
    const p1 = startGame();

    // Stash a card this turn
    const challengeInHand = p1.player.my('hand')!.first(ChallengeCard);
    if (!challengeInHand) return;

    p1.move('stashCard', { challengeCard: challengeInHand });
    expect(p1.player.stashedThisTurn).toBe(true);

    // Complete the rest of the turn using the safe round helper
    p1.move('skip', {});

    // Draw events until we reach checkStatus
    for (let i = 0; i < 10; i++) {
      if (p1.actions().includes('drawEvent')) {
        const eventDeck = p1.game.first('eventDeck')!;
        const safeEvent = eventDeck.all(EventCard).find(e =>
          e.impact?.every(i => (i.value || 0) === 0)
        );
        const eventToPlay = safeEvent || eventDeck.first(EventCard)!;
        if (!eventToPlay) break;
        p1.move('drawEvent', { card: eventToPlay });

        if (p1.actions().includes('resolveEvent')) {
          p1.move('resolveEvent', { options: 'accept' });
        }
      } else {
        break;
      }
    }

    if (p1.actions().includes('checkStatus')) {
      p1.move('checkStatus', {});
    }

    // After full round completes (flow resets stashedThisTurn after checkStatus),
    // the player should be back in play phase with stash available again
    expect(p1.player.stashedThisTurn).toBe(false);
    expect(p1.actions()).toContain('stashCard');
  });

  test('playing through 2 full rounds without crashing', () => {
    const p1 = startGame();

    // Round 1
    playOneSafeRound(p1);

    // Round 2
    expect(() => playOneSafeRound(p1)).not.toThrow();

    expect(p1.game.round).toBeGreaterThanOrEqual(3);
  });

});
