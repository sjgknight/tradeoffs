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