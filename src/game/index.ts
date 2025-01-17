/**
 * TO DO
 * 1. Create a mapping of principle expressions to numbers so I just update the principles once and it flows across event/challenge/stratgies
 * 2. visual design
 * 3. 
 */

import {
    createGame,
    Player,
    Game,
    Space,
    Piece,
    Stack,
    Do,
    union,
    PieceGrid
} from '@boardzilla/core';

export class TradeoffsPlayer extends Player<Tradeoffs, TradeoffsPlayer> {
    /**
     * Any properties of your players that are specific to your game go here
     * Not clear at this point how the player vs game def differs.
     * These are properties for each player (e.g., a score, a set resource value, etc).
     * Possibly if you have character types they'd go here.
     * The game class provides shared properties such as the round we're on.
     */
    score: number = 0;
    resources: number = 3;
    stashedThisTurn: boolean = false;
    damage: number = 0; //used to store wastedresource
}

export class Tradeoffs extends Game<Tradeoffs, TradeoffsPlayer> {
    /**
     * Any overall properties of your game go here
     */
    round: number = 0;
    maxRounds: number = 6;
    turnLimit: number = 3;
    handLimit: number = 10;
    poolSize: number = 20;
    strategyDrawCost: number = 4;
    wincondition: number = 10;
    losecondition: number = 10;
}

/**
 * Define your game's custom pieces.
 * note you cant import * from x in js, so don't try.
 */
import { Token, ScoreCounter, Slot } from './pieces/index.ts';
import { challengeCards, ChallengeCard } from './pieces/challenges.ts';
import { strategyCards, StrategyCard } from './pieces/strategies.ts';
import { eventCards, EventCard } from './pieces/events.ts';

/**
 * Create custom spaces for the board
 */
export default createGame(TradeoffsPlayer, Tradeoffs, game => {
    // I'm not clear what's needed in these first two, or what they're doing/why they can't be set default.
    const { action } = game;
    const {
        playerActions,
        eachPlayer,
        forEach,
        forLoop,
        whileLoop,
        loop,
    } = game.flowCommands;

    // For each player, setup their space (this is probably a 1 player game, but this provides extensibility)
    for (const player of game.players) {

        // setup space to hold challenge cards
        // contains three slots slot0, slot1, slot2
        // each slot contains a tokenSpace for each token type
        // this allows us to check if the tokens are in place for a challenge
        // by checking the space, rather than the card
        const challengeSpace = game.create(Space, 'challengeSpace', { player });

        const challengeSlots = challengeSpace.create(Space, 'challengeSlots', { player });
        for (let i = 0; i < 3; i++) {
            const slot = challengeSlots.create(Slot, `slot${i}`, {group: 'challengeslot'});
            const tokenSpace = slot.create(Space, 'tokenSpace');
            ['Data', 'Method', 'User', 'Aim'].forEach(type => {
                tokenSpace.create(Token, `token${type}`, { type: type as 'Data' | 'Method' | 'User' | 'Aim'});
            });
        }


        // setup space to hold completed challenge cards (may not be needed)
        const challengeCompleted = game.create(Space, 'challengeCompleted', { player });

        // setup space to hold strategies that are in play
        const activeStrategies = game.create(Space, 'activeStrategies', { player });

        // setup player hand (to hold cards)
        const hand = game.create(Space, 'hand', { player });

        // pool (for tokens), and create the tokens
        const pool = game.create(Space, 'pool', { player });
        ['Data', 'Method', 'User', 'Aim'].forEach(type => {
            pool.create(Token, `token${type}`, { type: type as 'Data' | 'Method' | 'User' | 'Aim', quality: 1 });
        });

        // setup space to track the score using the scoringtoken piece,
        // to track wastedResource damage using the damage piece 
        // and to track discarded pieces
        const discarded = game.create(Space, 'discarded', { player });
        const wastedResource = game.create(Space, 'wastedResource', { player });
        const scoreArea = game.create(Space, 'scoreArea', { player });

        // Setup score counter piece for the player
        game.create(ScoreCounter, 'scoreCounter', { value: player.score });

        // Setup event deck
        const eventDeck = game.create(Space, 'eventDeck');
        eventCards.forEach(card => {
            eventDeck.create(EventCard, card.name!, card);
        });

        // Setup challenge deck
        const challengeDeck = game.create(Space, 'challengeDeck');
        challengeCards.forEach((card, i) => {
            challengeDeck.create(ChallengeCard, `challengeCard${i}`, card);
        });

        // Setup strategy deck
        const strategyDeck = game.create(Space, 'strategyDeck');
        strategyCards.forEach(card => {
            strategyDeck.create(StrategyCard, card.name!, card);
        });
        
    }

    // Define actions
    // It seems messages require you to give the template string and variables to substitute in (you can't just call from environments)
    game.defineActions({

        // allow a player to draw additional strategy cards from the strategy deck into their hand (at cost set by strategyDrawCost, currently free/0)
        drawStrategyCard: player => action({
            prompt: 'Draw strategy cards',
        }).chooseOnBoard(
            'strategyCard', $.strategyDeck.all(StrategyCard), // should this be unquoted StrategyCard or quoted 'strategyCards', I thought the latter, the former is the class (assigned to strategyCards), but it's the former
        ).move(
            'strategyCard', player.my('hand')!
        ).do(({ strategyCard }) => {
            if (player.resources >= game.strategyDrawCost) {
                player.resources -= game.strategyDrawCost;
                //strategyCard.effect(game);
                game.message(`{{player}} drew a strategy card, costing {{drawcost}}.`,
                    { player: player, drawcost: game.strategyDrawCost });
            } else {
                game.message(`{{player}} does not have enough resources ({{myresource}}, {{drawcost}} needed) to draw a strategy card.`,
                    { player: player, drawcost: game.strategyDrawCost, myresource: player.resources });
            }
        }),

        // allow a player to play strategy cards (at cost set on each card by strategyCard.cost)
        playStrategyCard: player => action({
            prompt: 'Play a strategy card',
        }).chooseOnBoard(
            'strategyCard', player.my('hand')!.all(StrategyCard),
        ).do(({ strategyCard }) => {
            if (player.resources >= strategyCard.cost) {
                player.resources -= strategyCard.cost;
                strategyCard.putInto($.activeStrategies); // why is this putInto but not move
                //strategyCard.effect(game);
                game.message(`{{player}} played a strategy card, resource is now {{myresource}}.`,
                    { player: player, myresource: player.resources });
            } else {
                game.message(`{{player}} does not have enough resource ({{myresource}}) to play this strategy card.`,
                    { player: player, myresource: player.resources });
            }
        }),
        addChallengeCard: player => action({
            prompt: 'Add a challenge card to an available slot',
        }).chooseOnBoard(
            'challengeCard', $.challengeDeck.all(ChallengeCard),
        ).do(({ challengeCard }) => {
            //'challengeSlot', () => $.challengeSpace.all(Space).filter(space => space.isEmpty())
            //() => $.challengeSpace.challengeSlots.all, empty: true, mine: true,
            //player.my('challengeSpace')!.first(Space, 'challengeSlots')!.all(Space).filter(space => space.isEmpty())
            //const allSlots = $.slot.all({ mine: true });
            //const allSlots = $.challengeSlots.all().filter(slot => container(slot) === challengeSlots);
            //const allSlots = container($.challengeSlots);
            //const allSlots = $.challengeSlots.all({ mine: true });
            //const allSlots = challengeSlots.all({ mine: true });
            //const emptySlots3 = emptySlots2.filter(space => space.group === 'challengeslot' );
            //const emptySlots = $.all({ type: $.slot, empty: true, mine: true });
            //const emptySlots = $.challengeSpace.all('challengeSlots', { empty: true, mine: true});
            //
            //const emptySlotCount = emptySlots.length;

            const allSlots = player.allMy(Slot, { group: 'challengeslot' });
            const emptySlots = allSlots.filter(slot => !slot.has(ChallengeCard));
            //console.log('All Challenge Slots:', emptySlots);

            if (emptySlots.length > 0) {
                // find the  empty challengeSlot and place the item
                const freeSlot = emptySlots.first()!;
                //console.log('free Slots:', freeSlot);
                //console.log('slots now', player.allMy(Slot, { group: 'challengeslot' }));
                challengeCard.putInto(freeSlot)!; //emptySlots[0]); //$.slot1); 
                game.message(`{{player}} placed a new challenge card.`, { player: player });
            } else {
                game.message(`{{player}} does not have any empty slots to place this challenge`,
                    { player: player });
            }
        }),
        stashCard: player => action({
            prompt: 'Stash a challenge card',
            condition: !player.stashedThisTurn,
        }).chooseOnBoard(
            'challengeCard', player.my('hand')!.all(ChallengeCard), // challengeDeck
        ).move(
            'challengeCard', $.discarded
        ).do(({ challengeCard }) => {
            player.resources -= 1;
            player.score += 1;
            player.stashedThisTurn = true;
            game.message(`{{player}} stashed a card and increased their score by 1.`, { player: player });
        }),

        /**
         * In the above I need to add some conditional logic to ensure players can take up to x moves/spend up to x resource each turn
         * 
         */

        // FUNCTIONS CHECKED AND FUNCTIONAL(ish) ABOVE THIS LINE
        // FUNCTIONS CHECKED AND FUNCTIONAL(ish) ABOVE THIS LINE
        // FUNCTIONS CHECKED AND FUNCTIONAL(ish) ABOVE THIS LINE
        // FUNCTIONS CHECKED AND FUNCTIONAL(ish) ABOVE THIS LINE
        // FUNCTIONS CHECKED AND FUNCTIONAL(ish) ABOVE THIS LINE
        //const allSlots = player.allMy(Slot, { group: 'challengeslot' });
        //const emptySlots = allSlots.filter(slot => !slot.has(ChallengeCard));

        /** for the drawEvent and check I need:
         * A conditional to check what's on the board (if there are no tokens)
         * Variables to check (1) the current resource values on each tokenslot, (2) modified by the current strategies in play
         * Then check that value (for each slot) against the event requirements
         * If the requirements are met, the player proceeds to the nxt round
         * If the requirements are not met, the player must either:
         *  1. Discard resources placed on any impacted challenge cards,
         *  adding these to the wastedResource space
         *  2. Choose to 'mitigate' by playing ONE stratey card or ONE resource if it would mitigate the event impact
         * adding one unused resource to the wastedResource space
         * and then immediately drawing a new event card (a full turn is not played, the round marker does not increase)
         * The drawEvent action then repeats.
         * 
         * The options available could probably be made available via the existing actions and adding conditions to those.
         * 
         * */
        drawEvent: player => action({
            prompt: 'Draw an event card',
        }).chooseOnBoard(
            'card', $.eventDeck.all(EventCard),
        ).message(
            `An event occurred....`
        ).do(({ card }) => {

            interface PrincipleData {
                principle: string | number;
                eventValue: number;
                challengeValue: number | null;
                strategyValue: number;
                tokenValue: number;
            }

            const principlesData: PrincipleData[] = [
                { principle: 1, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
                { principle: 2, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
                { principle: 3, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
                { principle: 4, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
                { principle: 5, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
            ];


            const activestrategies = player.my('activeStrategies')!.all(StrategyCard); //container(activeStrategies!);
            // console.log('All strats:', activestrategies);

            // Get the values from the event card
            card.impact?.forEach(impact => {
                const principleData = principlesData.find(p => p.principle === impact.principle);
                if (principleData) {
                    principleData.eventValue += impact.value || 0;
                };
            });

            // Aggregate values from the active strategies
            if (activestrategies.length > 0) {
                activestrategies.forEach(strategy => {
                    strategy.contribution?.principles.forEach(principle => {
                        const principleData = principlesData.find(p => p.principle === principle.principle);
                        if (principleData) {
                            principleData.strategyValue += principle.value || 0;
                        }
                    });
                });
            };

            // Then I want to check each challenge card to:
            // 1. See whether the card requirements relate to the -impact of the event
            // 2. For TRUE, check whether the current strategy cards exceed the impact of the event
            // 3. For FALSE, check whether the card has any resource tokens placed on it
            // 4. For TRUE, check whether those resource token values exceed the impact of the event
            // 5. For FALSE, move the resource tokens to the wastedResource space
            const activechallenges = player.my('challengeSlots')!.all(ChallengeCard); 
            //console.log('activechallenge:', activechallenges);

            activechallenges.forEach(challenge => {

                // Get the requirements for that card
                challenge.requirements?.principles.forEach(principle => {
                    const principleData = principlesData.find(p => p.principle === principle.principle);
                    if (principleData) {
                        principleData.challengeValue = principle.value || 0;
                    };
                });


                console.log('overview:', principlesData);

                // Check whether this event matches the requirements of the challenge
                const matchingPrinciples = principlesData.filter(row =>
                    row.eventValue < 0 &&
                    row.challengeValue != null && 
                    row.challengeValue > 0);

                console.log('principle match:', matchingPrinciples);


                // If match, check whether the event exceeds the activestrategies in play for the challenges
                if (matchingPrinciples.length > 0) {
                    const failTest = matchingPrinciples.filter(row => (row.eventValue + row.strategyValue) < 0);
                    const passTest = matchingPrinciples.filter(row => (row.eventValue + row.strategyValue) >= 0 );

                    if (failTest.length > 0) {

                        // Get the token values for each challenge

                        const allSlots = player.allMy(Slot, { group: 'challengeslot' });
                        const riskedSlots = allSlots.filter(slot => slot.has(challenge));
                        const riskedTokens = riskedSlots.all(Token);
                        const tokenSum = riskedTokens.sum(token => token.quality);

                        console.log('Token Sum:', tokenSum);
                        console.log('Token risk:', riskedTokens);
                        console.log('Token slots:', riskedSlots);
                        // Check what will be removed and store


                        // Then check with the user what they want to do, mitigate or accept and enact
                        // 5. For FALSE, move the resource tokens to the wastedResource space

                        riskedTokens.putInto(player.my('wastedresource')!); 

                        // challenge.resources.forEach(resource => {
                       //     resource.move($.wastedResource);
                        //});
                        //challenge.resources = []; // Clear the tokens from the challenge card
                        //game.message(`Resource tokens from '${challenge.name}' moved to the wastedResource space.`);

                    }
                }
            });
        }),


               /**
         playInnovation: player => action({
             prompt: 'Play an innovation token on a challenge card',
         }).chooseOnBoard(
             'token', player.my('pool')!.all(Token),
         ).chooseOnBoard(
             'challengeSpace', game.all(Space).filter(space => space.container instanceof Token && space.isEmpty()),
         ).move(
             'token', 'challengeSpace'
         ).do(({ token, challengeSpace }) => {
             if (player.resources >= token.quality && token.type === challengeSpace.name) {
                 player.resources -= token.quality;
                 game.message(`{{player}} played a {{token}} token on a challenge card.`,
                     { player: player, token: token.type });
             } else {
                 game.message(`{{player}} does not have enough resources or the space does not match the token type.`,
                     { player: player });
             }
         }),
                   */
    });

    // Define game flow
    game.defineFlow(
        // Initial setup step
        // Draw initial hand of strategies
        // place initial challenge card, set round marker
        // ensure there is a challenge card in the first slot
        // ensure player has token pool
        () => {
            $.strategyDeck.shuffle();
            $.challengeDeck.shuffle();
            //game.announce('intro');
        },
        eachPlayer({
            name: 'player',
            do: [
                // Draw initial hand of strategy cards
                ({ player }) => {
                    $.strategyDeck.firstN(game.handLimit, StrategyCard).putInto(player.my('hand')!);
                },
                // Place an initial challenge card into the first challenge card slot
                ({ player }) => {
                    // I think this has worked...
                   $.challengeDeck.firstN(1, ChallengeCard).putInto($.slot0!); //challengeSpace.challengeSlots.slot0
                },
                // Give players some extra challenges to look at
                ({ player }) => {
                    // I think this has worked...
                    $.challengeDeck.firstN(3, ChallengeCard).putInto(player.my('hand')!); 
                },
                // Put all the other challenge cards into the deck
                ({ player }) => {
                    // I think this has worked...
                    $.challengeDeck.firstN(5, ChallengeCard).putInto(player.my('hand')!); //challengeSpace.challengeSlots.slot0
                },
                // Set the round marker to an initial state of 1
                () => {
                    game.round = 1;
                }
            ]
        }),

        eachPlayer({
            name: 'playerinturnphase',
            continueUntil: () => game.players.current()!.resources <=0, // so why set the name 'playerinturnphase'? Can it be referred to?
            do: playerActions({
                actions: ['drawStrategyCard', 'playStrategyCard', 'addChallengeCard', 'stashCard'] //'playInnovation'
            }),
        }),
        eachPlayer({
            name: 'eventphase',
            do: playerActions({
                actions: ['drawEvent']
            }),
        })


        /**
         *            
         *   checkConditions: Eachplayer({
         *      name: 'checkingplayer',
         *  continueUntil: () => game.round <= game.maxRounds, 
         *     do: [
         *      
         *      ]
         *  
                   prompt: 'Check win/lose conditions',
               }).do(() => {
                   const wastedTokens = player.my('wastedResource')!.all(Token).length;
                   const poolTokens = player.my('pool')!.all(Token).length;

                   if (player.score >= game.wincondition) {
                       game.message(`{{player}} wins the game!`, { player: player });
                       Do.break('mainLoop');
                   } else if (wastedTokens >= game.losecondition || poolTokens < 4) {
                       game.message(`{{player}} loses the game!`, { player: player });
                       Do.break('mainLoop');
                   } else if (game.round < 6) {
                       game.message(`{{player}} proceeds to the next round.`, { player: player });
                       game.round += 1;
                       Do.returnTo('turnphase');
                   }
               })
         * 
               checkConditions: player => action({
                   prompt: 'Check win/lose conditions',
               }).do(() => {
                   const wastedTokens = player.my('wastedResource')!.all(Token).length;
                   const poolTokens = player.my('pool')!.all(Token).length;

                   if (player.score >= game.wincondition) {
                       game.message(`{{player}} wins the game!`, { player: player });
                       Do.break('mainLoop');
                   } else if (wastedTokens >= game.losecondition || poolTokens < 4) {
                       game.message(`{{player}} loses the game!`, { player: player });
                       Do.break('mainLoop');
                   } else if (game.round < 6) {
                       game.message(`{{player}} proceeds to the next round.`, { player: player });
                       game.round += 1;
                       Do.returnTo('turnphase');
                   }
               })
        */
        // Main game loop
        // Each round, players will:
        // 1. Decide whether to add a challenge card (for free)
        // 2. Play strategy cards or resources to complete challenges (for cost)
        // 3. Stash a challenge card (for 1 cost, and +1 score)
        // To a maximum of turnLimit

        // Event loop
        // After each set of turns, an event card is drawn and resolved
        // Each event has impacts for your challenges
        // If the event requirements are not met, the player may either
        // 1. Discard resources placed on any impacted challenge cards,
        // adding these to the wastedResource space
        // 2. Play ONE stratey card or ONE resource if it would mitigate the event impact
        // adding one unused resource to the wastedResource space
        // and then immediately drawing a new event card (a full turn is not played, the round marker does not increase)
        // After the event round, players 
        // 1. Check for completed challenges
        // 2. Adjust the score/damage markers and check win conditions
    );
});
