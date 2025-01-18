A code graveyard




//     game.followUp({
//         name: "eventOutcome",
//          args: { results: results },
//      });
//            }
//    }),
//});
//eventOutcome: player => action < { results }>({
/**
action({
    prompt: 'The event has impacted a challenge card. Do you want to mitigate the impact?',
}).chooseFrom(
    "options", ["Play a strategy card", "Play an available token", "Accept the impact of the event"]
)


 else if (options === 'token') {
                        // Prompt the user to choose a strategy card
                        action({
                            prompt: 'Choose a token to play',
                        }).chooseOnBoard(
                            'chosenToken', usefulTokens.all(Token)
                        ).placePiece(({ chosenToken }), usefulSlots).do(
                            ({ chosenToken }) => {
                                player.my('pool')!.first(Token)?.putInto($.wastedResource);
                                // Add the placePiece action

                                game.message(`{{player}} one token discarded, and token placed`,
                                    { player: player });
                            });






*/
// const usefulSlots = activechallenges.all('tokenSpace').filter(slot => !slot.has(Token) && usefulTokens.some(token => token.type === slot.name));
//const slotSiblings = activechallenges.others();
//const slotSiblings = others.activechallenges();
//const slotSiblings = activechallenges.others(Slot);
//const parentContainer = activechallenges.container();
//const firstChallenge = activechallenges.first();
//const challengeContainer = firstChallenge!.container(Slot);
//const usefulSlots = activechallenges.all('tokenSpace').filter(slot => !slot.has(Token) && usefulTokens.some(token => token.type === slot.name));

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


// const riskedTokensMap = results.flatMap(result =>
//     result.riskedTokens.map(token => ({
//         type: 'RiskedToken', // Add a type discriminator
//         value: { token, challengeName: result.challenge.name },
//      }))
// );

//const allSlots = player.allMy(Slot, { group: 'challengeslot' });
//const emptySlots = allSlots.filter(slot => !slot.has(ChallengeCard));
//}).chooseOnBoard('chosenCard', player.allMy(StrategyCard).filter(strategyCard => ({ usefulStrategies }).includes(strategyCard))).do(({ chosenCard }) => {
// why doesn't providing usefulStrategies work here
// ({ usefulStrategies })
//({ usefulStrategies }) => usefulStrategies
//({ usefulStrategies }) => player.my('hand')!.all(StrategyCard).filter(strategyCard => usefulStrategies.includes(strategyCard)
//player.allMy(StrategyCard)) //works to let me select from my strategycards
// so either validate, or use a filter on that e.g.,
// player.allMy(StrategyCard).filter(strategyCard => usefulStrategies.includes(strategyCard))).
//$.strategyDeck.all(StrategyCard))
//usefulStrategies
//player.my('hand')!.all(StrategyCard))
//('chosenCard', player.my('hand')!.all(StrategyCard).filter(strategyCard => usefulStrategies.includes(strategyCard))).do(({ chosenCard }) => {

//({ chosenCard }) => chosenCard.all(StrategyCard).putInto($.discarded);
//const tomove = chosenCard.all(StrategyCard);
//console.log('tomove', tomove);
//const tomove = chosenCard.all(StrategyCard);
//chosenCard => chosenCard.move('tomove', 'discarded');
//({ chosenCard }).all(StrategyCard)!.putInto($.discarded!);
//chosenCard.putInto($.discarded);
//({ chosenCard })! => chosenCard(StrategyCard).putInto($.discarded!);


/**
                                 action({
                                     prompt: 'Choose a token to play',
                                 }).chooseOnBoard('chosenToken', usefulTokens).do(
                                     ({ chosenToken }) => {
                                         action({
                                             prompt: 'Where do you want to place the token',
                                         }).chooseOnBoard('chosenLocation', usefulSlots).do(
                                             ({ chosenLocation }) => {
                                                 console.log('chosenlocation', chosenLocation);
                                                 //const locmatch = chosenLocation!.all('Tokenspace').find(space => space.type === chosenToken!.type);
                                                 const locmatch = chosenLocation.all(Space, 'type');
                                                 //console.log('loctype', locmatch);
                                                 //console.log('toktype', chosenToken.type);
            
                                                 if (!locmatch) {
                                                     return 'Token type does not match slot type';
                                                 } else {
                                                     chosenToken.putInto(chosenLocation);
                                                     player.my('pool')!.first(Token)?.putInto($.wastedResource);
                                                     // Add the placePiece action
            
                                                     game.message(`{{player}} one token discarded, and token placed`,
                                                         { player: player });
                                                 }
                                             });
                                     });
                                     */
//player.my('challengeSlots')!.filter((slot) => slot?.has(ChallengeCard))?.all('tokenSpace', {isEmpty: true} )
// game.all(Slot)  does work  as does 'challengeSlots'
// game.all('tokenSpace')  works
// .filter((slot) => slot?.has(ChallengeCard))?.all('tokenSpace', { isEmpty: true })
//, (token) => token.name === 'tokenSpace')
//game.all(Space).filter(space => space.name === 'tokenSpace')
//player.my('challengeSlots') tokenSpace chosenToken
// && space.isEmpty: true

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


//const challengeSpaces = player.all(ChallengeCard).filter(card => card.container?.name === 'challengeSlots');
//const challengeSpaces = game.all('ChallengeCard', { container: { name: 'challengeSlots' }, mine: true });
const challengeSlots = game.all(Space).filter(space => space.name === 'challengeSlots');
const challengeSpaces = challengeSlots.flatMap(slot => slot.all(ChallengeCard));
//const challengeSpaces = game.all(ChallengeCard).filter(card => card.container?.name === 'challengeSlots' && card.container?.player === player);

const results = [];

const tokenMap = new Map < string, Token[]> ();

challengeSpaces.forEach(slot => {
    const tokens = slot.all(Token);
    tokenMap.set(slot.name, tokens);
});

challengeSpaces.forEach(challengeCard => {
    let passes = true;
    let failBy = 0;

    // Get the requirements for each ChallengeCard
    const requirements = challengeCard.requirements;

    // Find the challengeSlot that contains the challengeCard
    const challengeSlot = challengeCard.container;

    // Check if the ChallengeCard has 4 tokens of type data, user, aim, method
    // Check if the ChallengeCard has tokens of type data, user, aim, method in the tokenSpace
    const tokens = tokenMap.get(challengeSlot!.name) || [];
    const hasData = tokens.some(token => token.type === 'Data');
    const hasMethod = tokens.some(token => token.type === 'Method');
    const hasUser = tokens.some(token => token.type === 'User');
    const hasAim = tokens.some(token => token.type === 'Aim');
    const totalQuality = tokens.reduce((sum, token) => sum + token.quality, 0);

    const hasInnovation = hasData && hasMethod && hasUser && hasAim;


    // Get the values of the strategy cards in play
    const strategyCards = player.my('activeStrategies')!.all(StrategyCard);

    // Initialize a map to store the sum of contributions for each principle
    const principleContributions = new Map < string, number> ();

    // Iterate over the strategy cards and update the map with the contributions
    strategyCards.forEach(strategyCard => {
        strategyCard.value.principles.forEach(principle => {
            let contribution = principle.contribution;
            if (contribution === undefined || !isFinite(contribution)) {
                contribution = 0;
            }
            if (principleContributions.has(principle.principle!)) {
                principleContributions.set(principle.principle!, principleContributions.get(principle.principle!)! + contribution);
            } else {
                principleContributions.set(principle.principle!, contribution);
            }
        });
    });


    // Check the challengecard requirements against the strategies in play
    //              requirements.principles.forEach(requirement => {
    //                 const strategyValue = principleContributions.get(requirement.principle) || 0;
    //
    //                  if (strategyValue < (requirement.count || 1)) {
    //                    passes = false;
    //                  failBy += (requirement.count || 1) - strategyValue;
    //            }
    //      });

    // A challenge is complete if hasInnovation and passes are true
    if (hasInnovation && passes) {
        challengeCard.is_complete = true;
        player.score += challengeCard.points;
        // Find the specific challengeCard within the challengeSlot space and remove it
        challengeCard.remove();

        game.message(`Challenge card ${challengeCard.name} is completed.`);
    }

    results.push({ challengeCard, passes, failBy });
});

// Report. This will require a followup action using the available api methods.
results.forEach(result => {
    if (result.passes) {
        game.message(`Challenge card ${result.challengeCard.name} passes the requirements.`);
    } else {
        game.message(`Challenge card ${result.challengeCard.name} fails the requirements by ${result.failBy}.`);
    }
});






// USE THE EVALUATION PROCEDURE FROM THE CHALLENGE EVALUATION TO MODIFY 

// get the requirements for each ChallengeCard

// get the token values on the ChallengeCard

// if the ChallengeCard has 4 tokens of type data, user, aim, method, then it passes hasInnovation

// get the values of the strategy cards in play

// requirements and strategies represent principle:value pairs
// for each principle check whether the sum of the strategy card principles
// => the requirements for that principle, if not, fail the challenge requirements

// a challenge is complete if hasInnovation and hasRequirements are true


// Check if strategy cards in play modify the outcome

// Store results for the next action


const challengeSpaces = game.all(ChallengeCard).filter(card => card.container?.name === 'challengeSlots');
const results = [];

const tokenMap = new Map < string, Token[]> ();

challengeSpaces.forEach(slot => {
    const tokens = slot.all(Token);
    tokenMap.set(slot.name, tokens);
});

challengeSpaces.forEach(challengeCard => {
    let passes = true;
    let failBy = 0;

    // Get the requirements for each ChallengeCard
    const requirements = challengeCard.requirements;

    // Find the challengeSlot that contains the challengeCard
    const challengeSlot = challengeCard.container;

    // Check if the ChallengeCard has 4 tokens of type data, user, aim, method
    // Check if the ChallengeCard has tokens of type data, user, aim, method in the tokenSpace
    const tokens = tokenMap.get(challengeSlot!.name) || [];
    const hasData = tokens.some(token => token.type === 'Data');
    const hasMethod = tokens.some(token => token.type === 'Method');
    const hasUser = tokens.some(token => token.type === 'User');
    const hasAim = tokens.some(token => token.type === 'Aim');
    const totalQuality = tokens.reduce((sum, token) => sum + token.quality, 0);

    const hasInnovation = hasData && hasMethod && hasUser && hasAim;

    // Get the values of the strategy cards in play
    const strategyCards = player.my('activeStrategies')!.all(StrategyCard);

    // Initialize a map to store the sum of contributions for each principle
    const principleContributions = new Map < string, number> ();

    // Iterate over the strategy cards and update the map with the contributions
    strategyCards.forEach(strategyCard => {
        strategyCard.value.principles.forEach(principle => {
            let contribution = principle.contribution;
            if (contribution === undefined || !isFinite(contribution)) {
                contribution = 0;
            }
            if (principleContributions.has(principle.principle!)) {
                principleContributions.set(principle.principle!, principleContributions.get(principle.principle!)! + contribution);
            } else {
                principleContributions.set(principle.principle!, contribution);
            }
        });
    });

    // Check the challengecard requirements against the strategies in play
    requirements.principles.forEach(requirement => {
        const strategyValue = principleContributions.get(requirement.principle!) || 0;

        if (strategyValue < (requirement.count || 1)) {
            passes = false;
            failBy += (requirement.count || 1) - strategyValue;
        }
    });

    // A challenge is complete if hasInnovation and passes are true
    if (hasInnovation && passes) {
        challengeCard.is_complete = true;
        player.score += challengeCard.points;
        // Find the specific challengeCard within the challengeSlot space and remove it
        challengeCard.remove();
        game.message(`Challenge card ${challengeCard.name} is completed.`);
    }

    results.push({ challengeCard, passes, failBy });
});

// Report. This will require a followup action using the package methods.
results.forEach(result => {
    if (result.passes) {
        game.message(`Challenge card ${result.challengeCard.name} passes the requirements.`);
    } else {
        game.message(`Challenge card ${result.challengeCard.name} fails the requirements by ${result.failBy}.`);
    }
});




/** this should conditionally make either the choose
innovation or play regulation actions available in this phase. 
And within those actions, we should define a condition that says
if there is an event on the table, xyz conditions apply */

/**
 
                challengeSpace: {
                    type: 'board',
                    prompt: 'Choose a matching space on the challenge card',
                    from: game.all(Space).filter(space => space.container instanceof ChallengeCard && space.isEmpty()),
                    condition: ({ action }) => action === 'playInnovation',
                },
                strategyCard: {
                    type: 'board',
                    prompt: 'Choose a strategy card to play',
                    from: player.my('hand')!.all(StrategyCard),
                    condition: ({ action }) => action === 'playStrategyCard',
                },
            }).do(({ action, token, challengeSpace, strategyCard }) => {
                if (action === 'playInnovation' && player.resources >= token.quality && token.type === challengeSpace.name) {
                    player.resources -= token.quality;
                    game.message(`{{player}} played a {{token.type}} token on a challenge card.`);
                } else if (action === 'playStrategyCard' && player.resources >= strategyCard.cost) {
                    player.resources -= strategyCard.cost;
                    strategyCard.effect(game);
                    game.message(`{{player}} played a strategy card.`);
                } else {
                    game.message(`{{player}} does not have enough resources or the space does not match the token type.`);
                }
                // Flip an unused innovation tile and place it in the wasted-resource counter
                const unusedToken = player.my('hand')!.all(Token).find(t => !t.isUsed);
                if (unusedToken) {
                    unusedToken.flip();
                    unusedToken.move(game.wastedResource);
                    game.message(`{{player}} flipped an unused innovation tile and placed it in the wasted-resource counter.`);
                }
            }),
            consequences: player => action({
                prompt: 'Take the consequences of the event',
            }).do(() => {
                // Define the consequences based on the event card
                game.message(`{{player}} took the consequences of the event.`);
            }),
proceed: player => action({
    prompt: 'Proceed to the next round',
}).do(() => {
    player.stashedThisTurn = false;
    game.message(`{{player}} proceeds to the next round.`);
}),
*/