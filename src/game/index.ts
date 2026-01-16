/**
 TO DO
 * 0. There's something wrong with the playInnovation action such that the tile doesnt move or show (although the resources are reduced, and they do seem to move into the wastedResources)
 
 * 1. <s>fix the subflow followup </s>and check other code for stupidity https://docs.boardzilla.io/api/classes/Game#flowcommands
 * 2. <s>Create a mapping of principle expressions to numbers so I just update the principles once and it flows across event/challenge/stratgies</s>
 * 3. <s>visual design https://docs.boardzilla.io/category/customizing-the-ui </s>
 * 4. Deal with wildcard strategies (999 value) (see how the example using () => for trump cards)
 * 5. Consider 1 player, cooperative, and competitive modes. Consider what would be (1) shared (same pieces), (2) duplicated (same pieces, each player receiving a copy), (3) distinct, for different gameplay. E.g., in cooperative challenges and strategies could be shared by all, or they'd have distinct challenges but shared strategies. In competitive, they might start with different strategies in play (mirroring e.g., different regulatory environment), and draw their own challenges.
 * 6. Consider a 'versioning' with different game modes (possibly even allowing users to add cards)
 * 7. <s>Ideally i'd work out how to ensure tokens can only be placed on matching type spaces as a function or class method </s>
 * 8. Consider if there's a way to automate balance testing, can I record outputs with random hands and choices using https://docs.boardzilla.io/cookbook/testing ?
 * can I run different tests with e.g., a 'probably bad' and 'probably good' strategy to compare likelihood of winning
 * 9. Consider publish https://docs.boardzilla.io/publishing/publish or elsewhere
 
New todo

1. There's some subflow issue with resolving events, if you select 'accept the impact of the event, you potentially get stuck. 
 
 Notes:
 
 * With 3 resource and win at score 10, a minimum of 3 challenges need completing and one stashing, requiring spend of 14 absolute minimum, or 5 turns.
 * I've changed the resource setting to 5 to allow for more flexibility in the game, further testing needed.
 
 **/

import {
    createGame,
    Player,
    Game,
    Space,
    Piece,
    Stack,
    Do,
    union,
    PieceGrid,
    ConnectedSpaceMap
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
    resources: number = 5;
    stashedThisTurn: boolean = false;
    damage: number = 0; //used to store wastedresource
    status: 'win' | 'lose' | undefined; // can only be 'win', 'lose', or undefined
}

export class Tradeoffs extends Game<Tradeoffs, TradeoffsPlayer> {
    /**
     * Any overall properties of your game go here
     */
    round: number = 0;
    maxRounds: number = 6;
    turnLimit: number = 5;
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

    // Define challengeSlots as a child space of challengeSpace
    const challengeSlots = challengeSpace.create(Space, 'challengeSlots', { player });

    for (let i = 0; i < 3; i++) {
        const slot = challengeSlots.create(Slot, `slot${i}`, { group: 'challengeslot' });
        const tokenSpace = slot.create(Space, 'tokenSpace');

        // Create spaces for each token type - use unique names to avoid React key conflicts
        const slotNum = i + 1; // Start from 1
        const dataSpace = tokenSpace.create(Space, `Data-${slotNum}`);
        const methodSpace = tokenSpace.create(Space, `Method-${slotNum}`);
        const userSpace = tokenSpace.create(Space, `User-${slotNum}`);
        const aimSpace = tokenSpace.create(Space, `Aim-${slotNum}`);

        // console.log(`Created slot${i} with token spaces:`, {
        //     data: dataSpace.name,
        //     method: methodSpace.name,
        //     user: userSpace.name,
        //     aim: aimSpace.name
        // });
    }
        // setup space to hold strategies that are in play
        const activeStrategies = game.create(Space, 'activeStrategies', { player });

        // setup player hand (to hold cards)
        const hand = game.create(Space, 'hand', { player });

        // setup space to hold completed challenge cards (may not be needed)
        const challengeCompleted = game.create(Space, 'challengeCompleted', { player });

        // pool (for tokens), and create the tokens
        const pool = game.create(Space, 'pool', { player });
        const tokenTypes: ('Data' | 'Method' | 'User' | 'Aim')[] = ['Data', 'Method', 'User', 'Aim'];

        for (let i = 0; i < game.poolSize; i++) {
            const type = tokenTypes[i % tokenTypes.length];
            const quality = Math.floor(Math.random() * 3) + 1; // randomly assign quality, 1,2,3
            pool.create(Token, `token${type}`, { type: type, quality: quality });
        }

        // setup space to track the score using the scoringtoken piece,
        // to track wastedResource damage using the damage piece
        // and to track discarded pieces

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

        const discarded = game.create(Space, 'discarded', { player });

        // Setup strategy deck
        const strategyDeck = game.create(Space, 'strategyDeck');
        strategyCards.forEach(card => {
            strategyDeck.create(StrategyCard, card.name!, card);
        });

        const wastedResource = game.create(Space, 'wastedResource', { player });
    }

    // Define actions
    // It seems messages require you to give the template string and variables to substitute in (you can't just call from environments)

    game.defineActions({
        /**
        chooseActions: player =>
            action({
                prompt: 'Pick an action',
            }).chooseFrom(
                'actions', [
                    'draw a Strategy card (free)': drawStrategyCard,
                    'play an innovation tile (see tile costs)': playInnovation,
                    'play a strategy card (see card costs)': playStrategyCard,
                    'add an extra challenge': addChallengeCard,
                    'stash a challenge card (gain 1 point, lose 1 resource)': stashCard
                ]
            ),
            */

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

            const allSlots = player.allMy(Slot, { group: 'challengeslot' });
            const emptySlots = allSlots.filter(slot => !slot.has(ChallengeCard));
            console.log('All Challenge Slots:', emptySlots);

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
            if (player.resources >= 1) {
                player.resources -= 1;
                player.score += 1;
                player.stashedThisTurn = true;

                // Update the ScoreCounter piece
                const scoreCounter = game.first(ScoreCounter);
                if (scoreCounter) {
                    scoreCounter.value = player.score;
                }

                game.message(`{{player}} stashed a card and increased their score by 1.`, { player: player });
            }
        }),

        // allow a player to skip their turn by setting their resources to 0
        skip: player => action({
            prompt: 'skip the rest of your turn',
        }).do(() => {
            player.resources = 0;
            game.message(`{{player}} resources passed for this turn.`,
                { player: player });
        }),

        drawEvent: player => action({
            prompt: 'Draw an event card',
        }).chooseOnBoard(
            'card', $.eventDeck.all(EventCard),
        ).message(
            `{{player}} triggered an event`
            //`An event occurred....`
        ).do(({ card }) => {

            game.message(`You have drawn: {{name}}. {{description}}. This event impacts: {{impact}}.`,
                {
                    name: card.name,
                    description: card.description,
                    impact: card.impact
                        .flat()
                        .map(i => `${i.principle}: ${i.value}`)
                        .join(', ')
                });
            interface PrincipleData {
                principle: string | number | undefined;
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
                }
            });

            // Aggregate values from the active strategies
            // This may be where wildcards are useful
            if (activestrategies.length > 0) {
                activestrategies.forEach(strategy => {
                    strategy.contribution?.principles.forEach(principle => {
                        const principleData = principlesData.find(p => p.principle === principle.principle);
                        if (principleData) {
                            principleData.strategyValue += principle.value || 0;
                        }
                    });
                });
            }

            // We need to complete challenges by building innovations. The events may impact our innovations. Cheaper innovations are faster to build, but more susceptible to events. Strategies/regulation can help by providing baseline protection. So...
            // Check each challenge card to:
            // 1. See whether the card requirements relate to the -impact of the event
            // 2. For TRUE, check whether the current strategy cards exceed the impact of the event
            // 3. For FALSE, check whether the card has any resource tokens placed on it
            // 4. For TRUE, check whether those resource token values exceed the impact of the event
            // 5. For FALSE, move the resource tokens to the wastedResource space

            // Create an array to store the results
            interface Result {
                challenge: ChallengeCard;
                failTest: PrincipleData[];
                tokenSum: number;
                riskedTokens: Token[];
            }
            const results: Result[] = [];

            const activechallenges = player.my('challengeSlots')!.all(ChallengeCard);
            //console.log('activechallenge:', activechallenges);

            activechallenges.forEach(challenge => {

                // Get the requirements for that card
                challenge.requirements?.principles.forEach(principle => {
                    const principleData = principlesData.find(p => p.principle === principle.principle);
                    if (principleData) {
                        principleData.challengeValue = principle.value || 0;
                    }
                });

                // Check whether this event matches the requirements of the challenge
                const matchingPrinciples = principlesData.filter(row =>
                    row.eventValue < 0 &&
                    row.challengeValue != null &&
                    row.challengeValue > 0);

                // If match, check whether the event exceeds the activestrategies in play for the challenges
                if (matchingPrinciples.length > 0) {
                    const failTest = matchingPrinciples.filter(row => (row.eventValue + row.strategyValue) < 0);
                    const passTest = matchingPrinciples.filter(row => (row.eventValue + row.strategyValue) >= 0);

                    if (failTest.length > 0) {

                        // Get the token values for each challenge
                        const allSlots = player.allMy(Slot, { group: 'challengeslot' });
                        const riskedSlots = allSlots.filter(slot => slot.has(challenge));
                        const riskedTokens = riskedSlots.all(Token);
                        const tokenSum = riskedTokens.sum(token => token.quality);
                        //const tokenSum: number = riskedTokens.reduce((sum, token) => sum + token.quality, 0);
                        //let tokenSum = 0;
                        //riskedTokens.forEach(token => {
                        //    tokenSum += token.quality;
                        //});

                        console.log('tokensum', tokenSum);
                        // Create an array to store the output from this loop
                        // Store the results
                        results.push({
                            challenge: challenge,
                            failTest: failTest,
                            riskedTokens: riskedTokens, //riskedTokens, //number of tokens, not value
                            tokenSum: tokenSum,
                        });
                    }
                }
            });

            if (results.length > 0) {

                // Identify the failing principles
                const failingPrinciples = results.flatMap(result =>
                    result.failTest.map(fail => fail.principle)
                );

                // max event
                const worstImpact = Math.max(...results.flatMap(result =>
                    result.failTest.map(fail => fail.eventValue)
                ));

                // Filter strategy cards
                const usefulStrategies = player.my('hand')!.all(StrategyCard).filter(strategyCard => {
                    return strategyCard.contribution?.principles.some(principle => {
                        return failingPrinciples.includes(principle.principle) && (principle.value || 0) +
                            principlesData.find(p => p.principle === principle.principle)!.strategyValue >=
                            Math.abs(principlesData.find(p => p.principle === principle.principle)!.eventValue);
                    });
                });

                // get the tokens in the pool that can mitigate this event
                const potentialTokens = player.my('pool')!.all(Token).filter(tok => tok.quality >= Math.abs(worstImpact));

                // Check token slots that (1) are on the failing challenge cards; (2) are empty; and (3) match the usefulTokens.types
                // Iterate over usefulSlots to access their tokenSpace children
                const usefulSlots = [...new Set(activechallenges
                    .map(challenge => challenge.container(Slot)).flatMap(slot => {
                        // Access the tokenSpace children of each slot
                        const tokenSpaces = slot!.all(Space).filter(space => space.name === 'tokenSpace');
                        // filter out slots that are already filled
                        // Filter the tokenSpace slots based on the Token type (space names now include slot index)
                return tokenSpaces.all(Space).filter(space => {
                    // Check if this space matches any useful token type AND is empty
                    const matchesTokenType = potentialTokens.some(token => space.name.startsWith(token.type));
                    const isEmpty = space.isEmpty();
                    return matchesTokenType && isEmpty;
                });
                    }))];

                // Then get the final useful tokens, based on potential tokens with matching useful slots
                const usefulTokens = potentialTokens.filter(token => {
                    return usefulSlots.some(slot => slot.name.startsWith(token.type));
                });

                // Create a flat map of result.riskedTokens and result.challenge.name
                const riskedTokensMap = results.flatMap(result =>
                    result.riskedTokens.map(token => token) // Assuming `token` is a GameElement
                );

                const impactedChallenges = results.flatMap(result =>
                    [result.challenge.name] // Wrap the string in an array so `flatMap` works
                );

                // Then pass all of this information to a followup to the player can resolve the event
                // usefulSlots holds the valid positions

                console.log('immediately prior to the resolveEvent followup')
                // Using followUp
                game.followUp({
                    name: 'resolveEvent',
                    args: {
                        usefulSlots: usefulSlots,
                        usefulTokens: usefulTokens,
                        usefulStrategies: usefulStrategies,
                        riskedTokensMap: riskedTokensMap,
                        impactedChallenges: impactedChallenges
                    },
                });



            } // THIS IS THE END OF THE 'check fails' CONDITIONAL;  // DO I NEED AN ELSE HERE TO LOOP THROUGH GAMEPLAY ROUNDS?
        }), // THIS IS THE END OF THE DRAW EVENT ACTION

        // Then action to check with the user what they want to do, mitigate or accept and enact
        // with followup to different actions depending on decision

        resolveEvent: player => action<{
            usefulSlots: Slot[]; // Temporary use 'any' placeholder, previously had this as Space, Token, Token, RiskedToken[]
            usefulTokens: Token[],
            usefulStrategies: StrategyCard[],
            riskedTokensMap: any[],
            impactedChallenges: ChallengeCard[]
        }>({
            prompt: 'The event has impacted a challenge card. Do you want to mitigate the impact?',
            description: 'mitigation',
        }).chooseFrom('options', [
            { choice: 'play', label: 'Play a strategy card' },
            { choice: 'token', label: 'Play an available token' },
            { choice: 'accept', label: 'Accept the impact of the event' },
        ],
        ).do(({ options, usefulSlots, usefulTokens, usefulStrategies, riskedTokensMap, impactedChallenges }) => {
            // Log all arguments (they all pass correctly)
            console.log('Selected Option:', options);
            console.log('usefulSlots:', usefulSlots);
            console.log('usefulTokens:', usefulTokens);
            console.log('usefulStrategies:', usefulStrategies);
            console.log('riskedTokensMap:', riskedTokensMap);
            console.log('impactedChallenges:', impactedChallenges);

            if (options === 'play') {
                // Prompt the user to choose a strategy card
                game.followUp({
                    name: 'mitigatePlay',
                    args: {
                        usefulStrategies: usefulStrategies,
                    },
                });
            } else if (options === 'token') {

                //Prompt the user to choose a token
                game.followUp({
                    name: 'mitigateToken',
                    args: {
                        usefulTokens: usefulTokens,
                        usefulSlots: usefulSlots
                    },
                });
            } else if (options === 'accept') {
                // Handle accepting the impact of the event
                riskedTokensMap.forEach(token => {
                    token.putInto(player.my('wastedResource')!);
                });
                game.message(`Resource tokens moved from {{impactedChallenges}} to the wastedResource space.`,
                    { impactedChallenges: impactedChallenges });
                //game.followUp({ name: 'playerinturnphase' });


            } // END OF THE ELSE IF
        }), // end othe action


    


        mitigateToken: player => action<{
            usefulTokens: Token[],
            usefulSlots: Slot[]
        } > ({
            // Prompt the user to choose a token and corresponding slot (or automatically allocate it)
            prompt: 'Choose a Token and Slot to play',
        }).chooseOnBoard('chosenToken', ({ usefulTokens }) => usefulTokens)
            .chooseOnBoard('chosenSlot', ({ chosenToken, usefulSlots }) => {
                // Further filter usefulSlots to only those matching the chosen token type
                return usefulSlots.filter(slot => slot.name.startsWith(chosenToken.type));
            }).do(({ chosenToken, chosenSlot }) => {
                chosenToken.putInto(chosenSlot);

            player.my('pool')!.first(Token)?.putInto($.wastedResource);

            game.message(`{{player}} one token discarded, and token placed. Draw another event to proceed...`,
                { player: player });

            // Player mitigated so must pass through an event to proceed
            game.followUp({ name: 'drawEvent' });

        }), // End of the action call

        mitigatePlay: player => action<{
            usefulStrategies: StrategyCard[]
        }>({
            // Prompt the user to choose a strategy card
            prompt: 'Choose a strategy card to play',
        }).chooseOnBoard('chosenCard', ({ usefulStrategies }) => usefulStrategies).do(({ chosenCard }) => {
            // here I don't understand what ({ usefulStrategies }) => usefulStrategies is doing
            // or why ({ usefulStrategies }) (or variants thereof) doesn't work
            //console.log('chosencard', ({ chosenCard }));

            chosenCard.putInto($.discarded);
            player.my('pool')!.first(Token)?.putInto($.wastedResource);

            // This works but console is giving deserializeSingleArg<@http://localhost:8080/game.js:766:13

            //const ds = $.discarded;
            //console.log('discarded contents', ({ ds }) );

            game.message(`{{player}} played and discarded strategy card {{chosenCard}} to mitigate the impact.`,
                { chosenCard: chosenCard, player: player });

            // Player mitigated so must pass through an event to proceed
            game.followUp({ name: 'drawEvent' });

        }), // End of the action call

        playInnovation: player => action({
            prompt: 'Play an innovation token on a challenge card', // first choose a token
        }).chooseOnBoard(
            'chosenToken', player.my('pool')!.all(Token)
        ).chooseOnBoard('chosenSpace', ({ chosenToken }) => { // then choose the space to play it in
            const allTokenSpaces = game.all(Space, 'tokenSpace');
            // console.log('All tokenSpaces found:', allTokenSpaces.length);

            const validSpaces = allTokenSpaces.filter(tokenSpace => {
                // Check if the parent contains a ChallengeCard
                const parentSlot = tokenSpace.container(Slot);
                const hasChallenge = parentSlot && parentSlot.has(ChallengeCard);

                if (hasChallenge) {
                    // console.log('Found tokenSpace with challenge in slot:', parentSlot.name);
                    // Check the children spaces
                    const childSpaces = tokenSpace.all(Space);
                    // console.log('Child spaces in this tokenSpace:', childSpaces.map(s => s.name));
                }

                return hasChallenge;
            }).flatMap(tokenSpace => {
                const childSpaces = tokenSpace.all(Space);
                console.log('Child spaces in tokenSpace:', childSpaces.map(s => s.name));

                // Find spaces that match the token type and are empty
                return childSpaces.filter(childSpace => {
                    const matchesType = childSpace.name.startsWith(chosenToken.type);
                    const isEmpty = childSpace.isEmpty();
                    console.log(`Space ${childSpace.name}: matchesType=${matchesType}, isEmpty=${isEmpty}`);
                    return matchesType && isEmpty;
                });
            });

            console.log('Valid spaces for placement:', validSpaces.length, validSpaces.map(s => s.name));
            return validSpaces;
        }).do(({ chosenToken, chosenSpace }) => {
            if (player.resources >= chosenToken.quality) {
                player.resources -= chosenToken.quality;
                // console.log('Moving token to space:', chosenSpace.name);
                chosenToken.putInto(chosenSpace);

                game.message(`{{player}} played a {{token}} token (quality {{quality}}) on a challenge card.`,
                    { player: player, token: chosenToken.type, quality: chosenToken.quality });
            } else {
                game.message(`{{player}} does not have enough resources (need {{cost}}, have {{resources}}).`,
                    { player: player, cost: chosenToken.quality, resources: player.resources });
            }
        }),

        checkStatus: player => action({
            prompt: 'Check the status of the game',
        }).do(() => {

            // Define the type for Principle
            interface Principle {
                principle: string;
                value: number;
            }

            // Define the type for StrategyCard
            interface StrategyCard {
                contribution?: {
                    principles: Principle[];
                };
            }

            // 1. Compile active strategies
            const principlesData: { [key: string]: number } = {};
            const activeStrategies = player.my('activeStrategies')!.all(StrategyCard);
            activeStrategies.forEach(strategy => {
                strategy.contribution?.principles.forEach(principle => {
                    const principleKey = principle.principle as string;
                    if (!principlesData[principleKey]) {
                        principlesData[principleKey] = 0;
                    }
                    principlesData[principleKey] += principle.value || 0;
                });
            });

            // 2. Identify active challenges
            const activeChallenges = player.my('challengeSlots')!.all(ChallengeCard);

            activeChallenges.forEach(challenge => {
                // 2a. Get the requirements for the challenge
                const challengePrinciples: { [key: string]: number } = {};
                challenge.requirements?.principles.forEach(principle => {
                    const principleKey = principle.principle as string;
                    challengePrinciples[principleKey] = principle.value || 0;
                });

                // 2b. Check if strategy contributions exceed challenge requirements
                const passTest = Object.keys(challengePrinciples).every(principle => {
                    return (challengePrinciples[principle] || 0) <= (principlesData[principle] || 0);
                });

                // 3. Check if tokenSpace contains 4 tokens with different types
                const tokenSpaces = challenge.container(Slot)!.all(Space).filter(space => space.name === 'tokenSpace');
                const tokens = tokenSpaces.flatMap(tokenSpace => tokenSpace.all(Token));
                const uniqueTokenTypes = new Set(tokens.map(token => token.type));

                console.log("activechallenges", activeChallenges);
                console.log("activestrategies", activeStrategies);
                console.log("tokens", tokens);


                if (passTest && uniqueTokenTypes.size >= 4) {
                    // 1. Set the challenge is_complete field to 'true'
                    challenge.is_complete = true;

                    // 2. Add the challenge 'points' field to the current score
                    player.score += challenge.points || 0;

                     // Update the ScoreCounter piece
                    const scoreCounter = game.first(ScoreCounter);
                    if (scoreCounter) {
                        scoreCounter.value = player.score;
                    }

                    // 3. Move all tokens from this challenge to wastedResource FIRST
                    const challengeSlot = challenge.container(Slot);
                    if (challengeSlot) {
                        const tokensOnChallenge = challengeSlot.all(Token);
                        tokensOnChallenge.forEach(token => {
                            token.putInto(player.my('wastedResource')!);
                        });
                    }

                    // 4. Move the challenge to the $.discarded space
                    challenge.putInto(player.my('challengeCompleted')!);

                    game.message(`{{player}} completed the challenge and earned {{points}} points.`,
                        { player: player, points: challenge.points });
                }
            });

            // track how many tokens we wasted
            const wastedTokens = player.my('wastedResource')!.all(Token).length;

            // Add wasted tokens to overall damage to track lose condition
            player.damage += wastedTokens;

            console.log("damage is:", player.damage)
            // Check win/lose conditions
            if (player.score >= game.wincondition) {
                game.message(`{{player}} wins the game!`, { player: player });
                player.status = 'win';
                game.finish(player);
                // send to a winner flow;
            } else if (player.damage >= game.losecondition || player.my('pool')!.all(Token).length < 4 || game.round > game.maxRounds) {
                game.message(`{{player}} loses the game!`, { player: player });
                player.status = 'lose';
                // send to a loser flow
            } else if (game.round <= game.maxRounds) {
                game.message(`{{player}} proceeds to the next round with {{ score }} and resource {{ resource }}, but wasted resource of {{ damage }}.`, { player: player, score: player.score, resource: player.resources, damage: player.damage });
                game.round += 1;
                //return game.x(); // here I thought I could refer people back to my flow phase, but perhaps I need to have a separate choices action to refer people to...this seems overkill?


                //Do.subflow('playround');
                //Do.continue('playround');
                // return to the main loop
            } // end of do
        }), // end of this action

    }), // THIS IS THE END OF DECLARING THE ACTIONS



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
                $.eventDeck.shuffle();
                //game.announce('intro');
            },
            eachPlayer({
                name: 'player',
                do: [
                    // Draw initial hand of strategy cards (tokens are already in player pool)
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
                    // all the other challenge cards are in the deck  //challengeSpace.challengeSlots.slot0
                    // Set the round marker to an initial state of 1
                    () => {
                        game.round = 1;
                    }
                ]
            }),

            whileLoop({
                // Outer loop runs until the current player wins or loses
                while: () =>
                    game.players.current()!.status !== 'win' &&
                    game.players.current()!.status !== 'lose',
                do: [
                    eachPlayer({
                        name: 'playerinturnphase',
                        // Loop through each player's turn
                        do: [
                            // Subflow for playing a round (custom logic inside this subflow)
                            ({playerinturnphase}) => Do.subflow('playround'),

                            // Draw an event card and resolve it
                            playerActions({
                                actions: ['drawEvent'],
                            }),

                            // Check the player's status after the event
                            playerActions({
                                actions: ['checkStatus'],
                            }),

                            // Reset player's resources after their turn is complete, and allow stash next turn
                            ({ playerinturnphase }) => {
                                playerinturnphase.resources = game.turnLimit;
                                playerinturnphase.stashedThisTurn = false;
                            },
                        ],
                        // Exit each player's turn if they win or lose

                    }),
                ],
            }),

            /**
             *
             * Loop attempt...also doesnt work
             *
             * () => {
                loop(
                    whileLoop({
                        while: () => game.players.current()!.score < game.wincondition &&
                            game.players.current()!.my('wastedResource')!.all(Token).length < game.losecondition &&
                            game.players.current()!.my('pool')!.all(Token).length >= 4 &&
                            game.round <= game.maxRounds,
                        do: [
                            eachPlayer({
                                name: 'playerinturnphase',
                                () => Do.subflow('playround'),
                                playerActions({
                                    actions: ['drawEvent']
                                }),
                                () => game.players.current()!.resources = game.turnLimit, // Reset resources for the next round
                                playerActions({
                                    actions: ['checkStatus']
                                })
                                })
                        ]
                    })
                    )}, // end of loop
             *
             *
             *
             *
             *
             *
            eachPlayer({
                name: 'eventphase',
                do: [
                    playerActions({
                        actions: ['drawEvent']
                    })
                ],
            }),

            eachPlayer({
                name: 'conditionCheckPhase',
                do: [
                    () => game.players.current()!.resources = game.turnLimit, // I have to reset this at some point

                    playerActions({
                        actions: ['checkStatus']
                    })
                ],
            }), // end of this part of flow
            */
        ) // End of flow definition


    game.defineSubflow(
        'playround',
        eachPlayer({
            name: 'player',
            continueUntil: () => game.players.current()!.resources <= 0,
            //initial: game.players.current()!.resources = 3, // reset initial resources
            do: [
                // Reset initial resources for the player
                ({ player }) => {
                    game.message(`{{player}} has {{resources}} resources to spend this turn.`, { player: player, resources: player.resources });
                },
                // Define the actions the player can take during their turn
                playerActions({
                actions: ['drawStrategyCard', 'playInnovation', 'playStrategyCard', 'addChallengeCard', 'stashCard', 'skip']
                })
            ]
        })
    ); // end subflow



}); // END OF GAME DEFINITION




/**
 *
            /**
             * Here add code to resolve the challenge cards and add them to the score
            (1) identify the activechallenges
            (2a) identify the requirements on those challenges, and (2b) whether or not the current strategycard contributions exceed those challenges,
            (3) identify whether the tokenSpace on the challenge contains 4 tokens with different types.

            If so, can we (1) set the challenge is_complete field to 'true', and (2) add the challenge 'points' field to the current score, and (3) move the challenge to the $.discarded space.

                            // Check whether this event matches the requirements of the challenge
                            const matchingPrinciples = principlesData.filter(row =>
                                row.eventValue < 0 &&
                                row.challengeValue != null &&
                                row.challengeValue > 0);

                            // If match, check whether the event exceeds the activestrategies in play for the challenges
                            if (matchingPrinciples.length > 0) {
                                const failTest = matchingPrinciples.filter(row => (row.eventValue + row.strategyValue) < 0);
                                const passTest = matchingPrinciples.filter(row => (row.eventValue + row.strategyValue) >= 0);

                                if (failTest.length > 0) {

                                    // Get the token values for each challenge

                                    const allSlots = player.allMy(Slot, { group: 'challengeslot' });
                                    const riskedSlots = allSlots.filter(slot => slot.has(challenge));
                                    const riskedTokens = riskedSlots.all(Token);
                                    const tokenSum = riskedTokens.sum(token => token.quality);
                                    //const tokenSum: number = riskedTokens.reduce((sum, token) => sum + token.quality, 0);
                                    //let tokenSum = 0;
                                    //riskedTokens.forEach(token => {
                                    //    tokenSum += token.quality;
                                    //});

                                    console.log('tokensum', tokenSum);
                                    // Create an array to store the output from this loop
                                    // Store the results
                                    results.push({
                                        challenge: challenge,
                                        failTest: failTest,
                                        riskedTokens: riskedTokens, //riskedTokens, //number of tokens, not value
                                        tokenSum: tokenSum,
                                    });
                                }
                            }
                        });

                        if (results.length > 0) {

                            // Identify the failing principles
                            const failingPrinciples = results.flatMap(result =>
                                result.failTest.map(fail => fail.principle)
                            );

                            // max event
                            const worstImpact = Math.max(...results.flatMap(result =>
                                result.failTest.map(fail => fail.eventValue)
                            ));

                             /**
        do(() => {

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
