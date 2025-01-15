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
     */
    score: number = 0;
    resources: number = 15;
    stashedThisTurn: boolean = false;
}

export class Tradeoffs extends Game<Tradeoffs, TradeoffsPlayer> {
    /**
     * Any overall properties of your game go here
     */
    round: number = 0;
}

/**
 * Define your game's custom pieces and spaces.
 */
import { Token, ScoreCounter } from './pieces/index.ts';
import { challengeCards, ChallengeCard } from './pieces/challenges.ts';
import { strategyCards, StrategyCard } from './pieces/strategies.ts';
import { eventCards, EventCard } from './pieces/events.ts';

export default createGame(TradeoffsPlayer, Tradeoffs, game => {
    const { action } = game;
    const {
        playerActions,
        eachPlayer,
        forEach,
        forLoop,
        loop,
    } = game.flowCommands;

    for (const player of game.players) {
        // Setup spaces
        const challengeSpace = game.create(Space, 'challengeSpace', { player });

        const challengeSlots = challengeSpace.create(Space, 'challengeSlots', { player });
        for (let i = 0; i < 3; i++) {
            const slot = challengeSlots.create(Space, `slot${i}`);
            const tokenSpace = slot.create(Space, 'tokenSpace');
            ['Data', 'Method', 'User', 'Aim'].forEach(type => {
                tokenSpace.create(Token, `token${type}${i}`, { type: type as 'Data' | 'Method' | 'User' | 'Aim', quality: 1 });
            });
        }

        const challengeCompleted = game.create(Space, 'challengeCompleted', { player });

        const activeStrategies = game.create(Space, 'activeStrategies', { player });
        const hand = game.create(Space, 'hand', { player });
        const pool = game.create(Space, 'pool', { player });

        const discarded = game.create(Space, 'discarded', { player });
        const wastedResource = game.create(Space, 'wastedResource', { player });
        const scoreArea = game.create(Space, 'scoreArea', { player });

        // Setup event deck
        const eventDeck = game.create(Space, 'eventDeck');
        eventCards.forEach(card => {
            eventDeck.create(EventCard, card.name!, card);
        });

        // Setup challenge cards
        const challengeDeck = game.create(Space, 'challengeDeck');
        challengeCards.forEach((card, i) => {
            challengeDeck.create(ChallengeCard, `challengeCard${i}`, card);
        });

        // Setup strategy deck
        const strategyDeck = game.create(Space, 'strategyDeck');
        strategyCards.forEach(card => {
            strategyDeck.create(StrategyCard, card.name!, card);
        });

        // Setup score counter
        game.create(ScoreCounter, 'scoreCounter', { value: 0 });
    }

    // Define actions
    game.defineActions({
        drawStrategyCard: player => action({
            prompt: 'Draw a strategy card',
        }).chooseOnBoard(
            'card', $.strategyDeck.all(StrategyCard),
        ).move(
            'card', player.my('hand')!
        ).message(
            `{{player}} drew a strategy card.`
        ),
        playInnovation: player => action({
            prompt: 'Play an innovation on a challenge card',
        }).chooseOnBoard(
            'token', player.my('hand')!.all(Token),
        ).chooseOnBoard(
            'challengeSpace', game.all(Space).filter(space => space.container instanceof ChallengeCard && space.isEmpty()),
        ).move(
            'token', 'challengeSpace'
        ).do(({ token, challengeSpace }) => {
            if (player.resources >= token.quality && token.type === challengeSpace.name) {
                player.resources -= token.quality;
                game.message(`{{player}} played a {{token.type}} token on a challenge card.`);
            } else {
                game.message(`{{player}} does not have enough resources or the space does not match the token type.`);
            }
        }),
        stashStrategyCard: player => action({
            prompt: 'Stash a strategy card',
            condition: !player.stashedThisTurn,
        }).chooseOnBoard(
            'strategyCard', player.my('hand')!.all(StrategyCard),
        ).move(
            'strategyCard', $.discarded
        ).do(({ strategyCard }) => {
            player.resources -= 1;
            player.score += 1;
            player.stashedThisTurn = true;
            game.message(`{{player}} stashed a strategy card and increased their score by 1.`);
        }),

        playStrategyCard: player => action({
            prompt: 'Play a strategy card',
        }).chooseOnBoard(
            'strategyCard', player.my('hand')!.all(StrategyCard),
        ).move(
            'strategyCard', $.discarded
        ).do(({ strategyCard }) => {
            if (player.resources >= strategyCard.cost) {
                player.resources -= strategyCard.cost;
                //strategyCard.effect(game);
                game.message(`{{player}} played a strategy card.`);
            } else {
                game.message(`{{player}} does not have enough resources to play this strategy card.`);
            }
        }),

        drawEvent: player => action({
            prompt: 'Draw an event card',
        }).chooseOnBoard(
            'card', $.eventDeck.all(EventCard),
        ).move(
            'card', player.my('hand')!
        ).message(
            `An event occurred.`
        ).do(({ card }) => {
        }),

        evaluateChallenge: player => action({
            prompt: 'Evaluate challenge',
        }).do(() => {

        }),

        evaluateEvent: player => action({
            prompt: 'Evaluate the event',
        }).do(() => {

        }),

        mitigate: player => action({
            prompt: 'Mitigate the event',
        }).chooseFrom(
            'action', ['playInnovation', 'playStrategyCard'],
        ),
        proceed: player => action({
            prompt: 'Proceed to the next round',
        }).do(() => {
            player.stashedThisTurn = false;
            game.message(`{{player}} proceeds to the next round.`);
        }),

        checkConditions: player => action({
            prompt: 'Check win/lose conditions',
        }).do(() => {
            const wastedTokens = player.my('wastedResource')!.all(Token).length;
            const poolTokens = player.my('pool')!.all(Token).length;

            if (player.score >= 10) {
                game.message(`{{player}} wins the game!`);
                Do.break('mainLoop');
            } else if (wastedTokens >= 10 || poolTokens < 4) {
                game.message(`{{player}} loses the game!`);
                Do.break('mainLoop');
            }
        })
    });

    // Define game flow
    game.defineFlow(
        // Initial setup step
        eachPlayer({
            name: 'player',
            do: [
                // Draw initial hand of strategy cards
                ({ player }) => {
                    $.strategyDeck.firstN(3, StrategyCard).putInto(player.my("hand")!);
                },
                // Give the player a pool of 20 innovation tokens of varied types
                ({ player }) => {
                    const pool = player.my('pool')!;
                    ['Data', 'Method', 'User', 'Aim'].forEach(type => {
                        for (let i = 0; i < 5; i++) {
                            pool.create(Token, `token${type}${i}`, { type: type as 'Data' | 'Method' | 'User' | 'Aim', quality: 1 });
                        }
                    });
                },
                // Place an initial challenge card into the first challenge card slot
                ({ player }) => {
                    const challengeDeck = $.challengeDeck;
                    const firstChallengeCard = challengeDeck.draw();
                    const firstSlot = $.challengeSpace.all(Space).find(space => space.name === 'slot0');
                    if (firstSlot && firstChallengeCard) {
                        firstSlot.put(firstChallengeCard);
                    }
                },
                // Set the round marker to an initial state of 1
                () => {
                    game.round = 1;
                }
            ]
        }),

        // Main game loop for player turns
        eachPlayer({
            name: 'turn',
            do: playerActions({
                player: ({ player }) => player,
                actions: ['drawStrategyCard', 'playInnovation', 'stashStrategyCard', 'playStrategyCard']
            }),
        }),

        // Event phase for each player
        eachPlayer({
            name: 'eventphase',
            do: playerActions({
                actions: ['drawEvent']
            }),
        })
    );
});
