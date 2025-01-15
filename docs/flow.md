---
sidebar_position: 6
---

# Flow

The Flow of your game is how the game runs from beginning to end. This describes
the phases, rounds and turns of the game, and what actions are available to
players at various points in the Flow. You describe the Flow using the available
API and Boardzilla keeps track of where your players are in the Flow.

Your Flow definition will contain at minimum some player actions, and usually
some loops around them with logic to decide when the game is over.

## Typical flow structure

Flow is defined in `game/index.ts` inside the
[createGame](../api/modules#creategame) when you call
[`game.defineFlow`](../api/classes/Game#defineflow). The arguments to this
function are the steps for your game. There are two basic types of steps:

- Functions
- Flow commands

Functions alter the game state in some way, and Flow commands change the flow of
the game. You can keep adding as many functions and Flow commands as needed, in
any order. Let's look at a simple example from the Boardzilla starter game:

```ts Sample flow
  game.defineFlow(
    () => $.pool.shuffle(),
    loop(
      eachPlayer({
        name: "player",
        do: playerActions({
          actions: ["take"],
        }),
      })
    )
  );
```

This flow contains exactly two items: a function call that shuffles the pool,
and the main play loop. The first function makes a single change:

```ts
  () => $.pool.shuffle(),
```

Generally the first function of a flow will set up the board, shuffling decks,
dealing out opening hands and the like. Later in the flow you can use functions
as much as you like to make other changes to the board state, including moving
pieces around that are not part of a player action (e.g. dealing out a new hand)
or just changing state on the board or players (e.g. updating the score).

:::warning Flow may not create or destroy game elements

One thing you cannot do in the flow is create new elements. All Spaces and
Pieces in your game must be [created](board#creation) before calling
`defineFlow`. If pieces are only needed later in the game, they can be created
on the [`pile`](../api/classes/Game#pile) using `game.pile.create()` and moved
from the `pile` when needed. Similarly when elements are
[`removed`](../api/classes/Piece#remove) they actually are put into the `pile`.

:::

The next argument in this example calls `loop`. This is a basic Flow command
that causes a portion of the flow to be repeated until something interrupts
it. In this case, it sets up the basic game loop. Flow commands can set up other
types of loops, have players take turns, create branching logic, and most
importantly, prompt players for the actions they can perform.

In the example above the main loop itself includes other Flow commands, namely
`eachPlayer` and `playerActions`. This is an important distinction between the
two types of flow steps, plain functions and Flow commands:

:::warning Flow commands must be separated

Each Flow command is its own "step" in the flow. You cannot include flow
commands inside functions.

:::

For example, imagine you have a flow function that does some things, setting up
the deck, dealing some cards, and then cleaning up after the hand:

```ts Sample flow
  game.defineFlow(
    () => {
      // shuffle the deck
      // deal cards

      // put the cards back in the deck
    })
  );
```

If you now want to insert a Flow command in the middle to add a player action,
you cannot just add it to the function, e.g.:

```ts Sample flow
  game.defineFlow(
    () => {
      // shuffle the deck
      // deal cards

      // highlight-next-line
      playerAction({ actions: ['playCard'] }); // ❌ wrong

      // put the cards back in the deck
    })
  );
```


you must break the function into two pieces and insert the flow function between
them, e.g.:

```ts Sample flow with playerAction added
  game.defineFlow(
    () => {
      // shuffle the deck
      // deal cards
    },

    // highlight-next-line
    playerAction({ actions: ['playCard'] }), // ✅ correct

    () => {
      // put the cards back in the deck
    })
  );
```

:::tip flow visualization

Getting the Flow right is critical, but it can be hard to conceptualize and
visualize game flow in a formalized way like this.

As an aid to understanding the flow, you can use the debug mode of the devtools
(the magnifying glass icon in the top left) to open up a visualization of the
flow showing where the game is currently in the flow at any point.

<div style="text-align:center">
  <img style="border: 1px solid black; width: clamp(50%, 500px, 100%)" src="/img/flow-debug.png"/>
</div>

Since the Flow is evaluated only once, what you see is what you get. If the flow
is missing something, it is likely defined in the wrong place.

:::

## Flow arguments

Each flow function modifies the game state in some way. But how do you check the
current state? The board state can simply be read by using the methods and
properties on `game`, either ones that you've defined or the query functions,
e.g. `game.first('deck')!.all(Card).length`. Using these you can access all the
properties of the game and all the game elements within.

You can also access the flow arguments in any flow function. The arguments
provide the current values for the parts of the flow that are currently being
evaluated. There are two main types of flow arguments:
- loop variables
- player actions

While the flow is executing steps inside of loops and player actions, these
values are provided to the each of these steps using the flow arguments, e.g.

```ts
  forEach({
    name: "card",
    collection: () => $.field.all(Card),
    do: playerAction({
      name: "choose",
      actions: [
        {
          name: "chooseCard",
          do: forLoop({
            name: "tokens",
            initial: 1,
            next: tokens => tokens + 1,
            while: tokens => tokens < 5
            // highlight-next-line
            do: ({ card, choose, tokens }) => {
              // here we have access to 3 values from the 3 steps we're inside of:
              // `card` will be the card being looped over in the list of Card's on the field
              // `choose` will be the choices the player made when they made the `chooseCard` action
              // `tokens` will be the value of the tokens loop, from 1 to 4.
            }
          })
        },
        "pass"
      ]
    }),
  });
```

These arguments are also available for several of the properties in new flow
steps. As just one example, the [`playerAction`](../api/modules#playeraction)
has a `player` property that can be either a `Player` or a function that returns
a `Player`. We can use the function form to access the flow arguments, if we
need to check the current flow to decide who the starting player is, e.g.:

```ts Sample flow
  forEach({
    name: 'player',
    collection: () => [game.playerWithHighestScore(), game.playerWithMostCities()],
    do: playerActions({
      // Here 2 players get to vote, first the one with high score, then the player
      // with the most cities. We've looped over the 2 players and then check the
      // current player in the loop with the following:
      // highlight-next-line
      player: ({ player }) => player,
      actions: ['vote', 'pass']
    })
  }),
```

## Flow commands

All Flow commands are available on
[`game.flowCommands`](../api/classes/Game#flowcommands). It is common to
deconstruct all needed commands before defining flow, e.g.:

```ts
const { playerActions, eachPlayer, forEach, forLoop } = game.flowCommands;
```

Let's look at the various Flow commands. There are 3 main types of flow
commands, looping, branching and actions.

### Looping Flow commands

#### [`loop`](../api/modules#loop)

The most basic loop, this creates a loop that continues indefinitely until
explicitly interrupted. This would be like a C/Javascript `while(true)`.

#### [`whileLoop`](../api/modules#whileloop)

Like the basic `loop`, except that it accepts a condition and will only start a
new iteration of the loop if the condition is true. This is exaclty like the
C/Javascript `while(condition)`. In particular, note that this loop might not
execute even one iteration if the supplied condition is false to begin with.

#### [`forLoop`](../api/modules#forloop)

This loop sets a value, iterates that value at each loop iteration and continues
looping until that value meets some condition. In other words, a standard `for`
loop from C/Javascript.

#### [`forEach`](../api/modules#foreach)

This loop accepts a collection, and iterates over the members of that
collection. This is like `for ... of` or `Array#forEach` in Javascript.

#### [`eachPlayer`](../api/modules#eachplayer)

This is a loop that iterates over each player. This is the same as `forEach`
with one addition. On each iteration as the player changes, it also
automatically sets the ["current" player](players#current-player).

#### [`everyPlayer`](../api/modules#everyplayer)

Strictly speaking, this isn't a loop. However, it looks identical to
`eachPlayer` except that instead of operating on each player in turn, it let's
all players take their turn in parallel. This "loop" completes when all players
have completed the body of this command, or is otherwise interrupted.

### Branching Flow commands

#### [`ifElse`](../api/modules#ifelse)

Simply checks a condition and either takes one branch named `do` or an optional
`else` branch, just as an standard `if...else`

#### [`switchCase`](../api/modules#switchcase)

Like `ifElse` except the test expression can be compared with several possible
values and execute different branches depending on the outcome. It may also
execute a `default` branch if no other matches apply. This is similar to the
`switch...case` in C/Javascript but without [fall
through](https://en.wikipedia.org/wiki/Switch_statement#Fallthrough) behaviour.

### Player Actions

#### [`playerActions`](../api/modules#playeractions)

This is the sole Flow command for prompting player actions. This command accept
a list of allowed [actions](actions) that were defined in `defineActions` and
prompts the current player (or a particular player or players if specified).

Actions can be supplied as strings, corresponging to the names given in
`defineActions` e.g.:

```ts
actions: ["take", "pass"]
```

or as objects if additional properties are needed, e.g.:
```ts
actions: [
  {
    name: "take",
    do: Do.repeat,
  },
  'pass'
]
```

The properties available are:

- `name`: the name of the action
- `do`: a continuation for the flow if this action is taken. This can contain
   any number of nested Flow functions.
- `args`: args to pass to the action. If provided this pre-selects arguments to
   the action that the player does not select themselves, in the same way as
   [Follow up's](actions#follow-ups).
- `prompt`: a string prompt. If provided this overrides the prompt defined in
   the action. This can be useful if the same action should prompt differently
   at different points in the game

Note that like all other selections in Boardzilla, this list of actions has
[tree-shaking and skipping](actions#tree-shaking-and-skipping) behavior. If one
of the included actions is determined to have no possible valid moves, it will
not be included in player prompts. If only one of the supplied actions is
determined to be playable, it will be prompted with any required selections. If
such an action requires no further selections it will be auto-played. Just like
action selections this behavior can be configured for each `playerActions` with
a `skipIf` parameter.

For this reason, it is common to include a wide variety of possible actions in
the list of `playerActions` but let each action definition take responsibility
for determining whether it is actually playable at the time based on its
selections and/or `condition` parameter.

The Player Actions step in the flow can be further customized with a few optional paramters:

- `prompt`: A prompting message for the player to decide between multiple
actions that involve clicking on the board.
- `description`: A description of this step from a 3rd person perspective, used
to inform other players as to what the current player is doing.
- `player`: Which player can perform this action, if someone other than the current player
- `players`: Same as above, for multiple players that can act.
- `optional`: Make this action optional with a "Pass"
- `condition`: Skip this action completely if condition fails
- `skipIf`: One of 'always', 'never' or 'only-one' (Default
'always'). See [Skipping](../actions#skipping).
- `repeatUntil`: Make this action repeatable until the player passes
- `continueIfImpossible`: Skip this action completely if none of the actions are
  possible.

:::danger Flow commands are created once

Unlike [`Actions`](actions) that are created for each player **at the time** of
being played, Flow commands are created **at the beginning** of the game. Be
careful with passing expressions directly to Flow commands that rely on game
state.

For example if you want to loop through some cards laid out in a Space called
"field", something like the following is probably **not** what you want:

```ts
  forEach({
    name: "card",
    // highlight-next-line
    collection: $.field.all(Card), // ❌ only evaluated at the start of the game
    do: playerAction({ actions: ["chooseCard", "pass"] }),
  });
```

Instead use the functional form, so that the expression will be evaluated each
time this loop is entered:

```ts
  forEach({
    name: "card",
    // highlight-next-line
    collection: () => $.field.all(Card), // ✅
    do: playerAction({ actions: ["chooseCard", "pass"] }),
  });
```

:::

### Current Flow Position

For many Flow commands, it is necessary to know what the current position
is. For example in a simple `for i` loop, we need to access `i` and have logic
that depends on its current value.

All function parameters in Flow commands accept a single argument of
type [`FlowArguments`](../api/modules#flowarguments) for this purpose. The
argument is a single object that contains all the values "in scope" at this point in
the flow. There are two types of values included here:

- loop variables
- player action selections

#### Loop variables

The loop variables included here are from any loops that the flow is currently
inside of, namely the current iterator value in any [`forLoop`](#forloop)'s, the
current collection member of any [`forEach`](#foreach) loops, the evaluated test
expression in any [`switchCase`](#switchcase)'s.

The values are included as key value pairs where the key is the `name` parameter
supplied for the Flow command.

```ts Example of reading loop variables
  forLoop({
    // highlight-next-line
    name: "x", // x is declared here
    initial: 0,
    next: x => x + 1,
    while: x => x < 3,
    do: forLoop({
      // highlight-next-line
      name: "y", // y is declared here
      initial: 0,
      next: y => y + 1,
      while: y => y < 2,
      // highlight-start
      do: ({ x, y }) => {
        // x is available here as the value of the outer loop
        // and y will be the value of the inner loop
      },
      // highlight-end
    }),
  });
```

#### Player action selections

For player action selections, the arguments to the player action are included as
a single object. Again this only applies if the Flow command is inside the `do`
branch belonging to this player action. The name in this case is the name of the
actions. For example, here we have defined an action called "takeResource" and
later we want to know what choices the player made in the flow.

```ts example Player action selections
  game.defineActions({
    ...
    // highlight-next-line
    takeResources: player => action<{ amount: number }>({
      prompt: "Take resources",
    }).chooseFrom(
      "resource", ["Lumber", "Steel", "Wheat"]
    ).do(
      ({ resource, amount }) => player.addResources(resource, amount)
    ),
    ...
  });

  game.defineFlow(
    ...
    playerActions({
      actions: [
        {
          name: "takeResources",
          // The argument is the name of the action
          // highlight-start
          do: ({ takeResources }) => {
            // takeResoures.resource will be the name of the resource, e.g. 'Steel'
            // takeResoures.amount will be the selection number "amount"
          },
          // highlight-end
        },
      ],
    })
  );
```

:::tip Action vs playerActions

We can react to a player's action both in the action
[`do`](actions#other-behavior) and in the `do` of the playerActions. It can be
confusing which we should use for what.

In general the action `do` is the proper place to react to what a player just did. This
includes mutating the board, recording state, or triggering follow-up actions.

The playerActions `do` should be used only for changes to the flow of the game
as a result of the player action, e.g. ending a phase or somehow interrupting a
loop, or triggering other rounds of player actions, since Flow commands can only
be issued inside other Flow commands.

:::

## Loop interruption

It is important in a game to able to interrupt loops. In fact if we use the
basic `loop` Flow command, the loop will continue indefinitely _unless_ we
interrupt it. There are 3 basic [loop interruption
functions](../api/modules#do):

**`Do.break()`**

This causes the flow to exit loop and resume after the loop, like the
`break` keyword in C/Javascript.

**`Do.continue()`**

This causes the flow to skip the rest of the current loop iteration and restart
the loop at the next iteration, like the `continue` keyword in C/Javascript.

**`Do.repeat()`**

Similar to `Do.continue` except this restarts the loop on **the same iteration**
it's currently on.

These functions can be called anywhere that is called from a loop. Often it
is the only thing you want to call after a particular action, in which case you
can pass it as the action `do`, e.g.:

```ts
  loop(
    playerActions({
      actions: [
        "takeOneFromBag",
        {
          name: "done",
          // break out of the loop when a player selects 'Done'
          // highlight-next-line
          do: Do.break,
        },
      ],
    })
  );
```

All 3 flow interruption commands operate on the "current" loop, just as in
C/Javascript. If you wish to operate on another loop higher up, you can pass an
argument to the function with the name of the loop you wish to break out of,
e.g.:

```ts
  ...,
  whileLoop({
    while: () => true,
    name: 'outer-loop',
    do: whileLoop({
      while: () => true,
      name: 'inner-loop',
      // break here
      // highlight-next-line
      do: () => Do.break('outer-loop')
    }),
    () => { /* will never reach here */ }
  }),
  () => { /* will resume here */ }
```

This operates much the same as a [labelled
statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)
in Javascript.

:::danger These are not javascript keywords

Remember that the flow interruption functions are merely humble Javascript
functions, **not keywords**, despite being named similarly. They do not break control
flow all by themselves.

```ts
  loop({
    name: 'round',
    do: () => {
      if (game.isRoundFinished()) Do.break();
      // otherwise do other stuff
      // highlight-next-line
      game.doOtherStuff(); <-- will execute even if Do.break is called
    }
  });
```

Use e.g. `return` or `else` to control what executes, e.g.:

```ts
  loop({
    name: "round",
    do: () => {
      // highlight-next-line
      if (game.isRoundFinished()) return Do.break();
      // otherwise do other stuff
      game.doOtherStuff();
    },
  });
```

:::

## Subflows

Every game defines its main flow by calling
[`game.defineFlow`](../api/classes/Game#defineflow). However, there can be more
than one flow in a game. Additional flows are called "subflows" and are like
subroutines in your game. Each subflow is given a unique name and at any point
in the game, calling [`Do.subflow`](../api/modules#do) with the `name` of the
subflow and any `args` you wish to pass to the subflow. Like with the [loop
interruption](#loop-interruption) functions above, this does not throw or return
from the current block and so the current block will evaluate any remaining
statements. However, after doing so, game execution will jump to the new subflow
and start at its beginning. When the subflow reaches the end, game execution
will resume on the calling flow at the next step from the one that called the
subflow.

The args passed to the subflow become the part of the [flow
arguments](#flow-arguments) in this subflow. The subflow does not have access to
any other flow arguments from the calling flow unless they passed in.

```ts
  game.defineFlow(
    whileLoop({
      while: () => game.all(Token).length > 0,
      do: eachPlayer({
        name: 'player',
        do: [
          playerActions({ actions: ['discardTokens']}),
          // if 5 or fewer tokens remain, perform the `voting` subflow
          // before the next round of token discarding
          // highlight-next-line
          () => if (game.all(Token).length <= 5) Do.subflow('token-flow');
        ]
      })
    )}),
  );

  game.defineSubflow(
    'voting',
    eachPlayer({
      name: 'player',
      do: playerActions({
        actions: ['vote']
      })
    })
  );
```


Here are some other examples 

```ts
game.defineFlow(
    () => {
      // setup board
      deck.shuffle();
      deck.topN(8, Card, card => card.cost <= 15).putInto(powerplants);

      let removals = 0;
      if (game.players.length === 4) removals = 1;
      if (game.players.length === 3) removals = 2;
      if (game.players.length === 2) removals = 1;
      deck.topN(removals, Card, card => card.cost <= 15).remove();

      removals = 0;
      if (game.players.length === 4) removals = 3;
      if (game.players.length === 3) removals = 6;
      if (game.players.length === 2) removals = 5;
      deck.topN(removals, Card, card => !!card.resourceType && card.cost > 15).remove();

      deck.top(Card, card => card.cost <= 15)!.putInto(deck);
      deck.first(Card, 'step-3')?.putInto(deck, {fromBottom: 0});

      // initial resources
      game.refillResources('coal', 24);
      game.refillResources('oil', 18);
      game.refillResources('garbage', 9);
      game.refillResources('uranium', 2);

      game.players.shuffle();
    },

    loop(
      whileLoop({
        while: () => game.zones.length < Math.min(5, Math.max(3, game.players.length)),
        do: playerActions({
          name: 'selectZone',
          player: game.players.host(),
          actions: ['selectZone']
        }),
      }),
      () => {
        game.sortPlayers('desc');
        game.phase = 'auction';
        game.turn += 1;
        for (const player of game.players) player.havePassedAuctionPhase = false;
        const discount = powerplants.first(Card);
        if (discount) discount.discount = true;
      },
      eachPlayer({
        name: 'auctionPlayer',
        startingPlayer: () => game.players[0],
        continueUntil: () => game.players.every(p => p.havePassedAuctionPhase),
        do: ifElse({
          name: 'mayAuction',
          if: ({ auctionPlayer }) => !auctionPlayer.havePassedAuctionPhase,
          do: playerActions({
            name: 'auction',
            actions: [
              {
                name: 'auction',
                do: [
                  ({ auctionPlayer }) => Do.subflow('bidding-round', { auctionPlayer }),
                  ({ auctionPlayer }) => {
                    const winner = game.playerWithHighestBid!;
                    game.message(`${winner} won the bid with ${game.lastBid}`);
                    winner.elektro -= game.lastBid!;
                    game.lastBid = undefined;
                    powerplants.first(Card, {auction: true})!.putInto(game.first(PlayerMat, {player: winner})!);
                    deck.top(Card)?.putInto(powerplants);
                    winner.havePassedAuctionPhase = true;
                    if (winner !== auctionPlayer) Do.repeat();
                  },
                ]
              },
              'passAuction'
            ]
          })
        })
      }),

      () => {
        if (game.turn === 1) game.sortPlayers('desc'); // resort only for first turn
        game.players.reverse();
        game.phase = 'resources';
        const discount = powerplants.first(Card, { discount: true });
        if (discount) {
          game.addDelay();
          discount.remove();
          deck.top(Card)?.putInto(powerplants);
        }

        if (powerplants.has('step-3')) { // because it was refilled at some point during phase 2
          game.message('Step 3 has begun!');
          game.step = 3;
          game.addDelay();
          powerplants.first(Card)?.remove();
          powerplants.first(Card, 'step-3')?.remove();
        }

        // unpower cities
        for (const building of map.all(Building, { powered: true })) building.powered = false;
      },

      eachPlayer({
        name: 'purchasePlayer',
        do: playerActions({
          name: 'purchaseResources',
          optional: 'Done',
          actions: [
            { name: 'buyResource', do: Do.repeat },
          ]
        }),
      }),

      () => { game.phase = 'build' },

      eachPlayer({
        name: 'buildPlayer',
        do: playerActions({
          name: 'build',
          optional: 'Done',
          actions: [
            { name: 'build', do: Do.repeat },
          ]
        }),
      }),

      () => {
        game.phase = 'power';
        if (game.players.max('score') >= game.victory()) {
          game.message("Final power phase!");
        }
      },

      eachPlayer({
        name: 'powerPlayer',
        do: [
          loop(playerActions({
            name: 'arrange',
            actions: [
              'arrangeResources',
              { name: 'pass', do: Do.break }
            ]
          })),
          loop(playerActions({
            name: 'power',
            actions: [
              'power',
              { name: 'pass', do: Do.break }
            ]
          })),
          ({ powerPlayer }) => {
            // count power from plants and number of cities that can be powered
            powerPlayer.cities = Math.min(
              powerPlayer.allMy(Building, { powered: true }).length,
              game.income.length - 1,
            )

            if (game.players.max('score') < game.victory()) {
              const rev = game.income[powerPlayer.cities];
              powerPlayer.elektro += rev;
              game.message(`${powerPlayer} earned ${rev} elektro for ${powerPlayer.cities} ${powerPlayer.cities === 1 ? 'city' : 'cities'}`);

              powerPlayer.cities = 0;
              // unpower plants
              for (const card of powerPlayer.allMy(Card, { powered: true })) {
                card.powered = false;
              }
            }
          },
        ]
      }),
      () => {
        if (game.step === 1 && game.players.max('score') >= game.step2Score()) {
          game.message('Step 2 has begun!');
          game.step = 2;
          game.addDelay();
          powerplants.first(Card)?.remove();
          game.first('deck')!.top(Card)?.putInto(powerplants);
        }
        if (game.players.max('score') >= game.victory()) {
          const winner = game.players.withHighest('cities', 'elektro');
          game.message(`${winner} wins with ${winner.cities} powered cities!`)
          game.finish(winner);
        } else {
          for (const r of resourceTypes) {
            game.refillResources(r, game.refill(game.step, r));
          }
          game.message('Resources have been resupplied');

          if (game.step === 3) {
            powerplants.first(Card)?.remove();
          } else {
            powerplants.last(Card)?.putInto(deck, {fromBottom: 0});
          }
          game.addDelay();
          deck.top(Card)?.putInto(powerplants);

          if (powerplants.has('step-3')) { // because it was just refilled
            game.message('Step 3 has begun!');
            game.step = 3;
            powerplants.first(Card)?.remove();
            powerplants.first(Card, 'step-3')?.remove();
          }
        }
      }
    )
  );

  game.defineSubflow(
    'bidding-round',

    ({ auctionPlayer }) => {
      for (const player of game.players) player.passedThisAuction = player.havePassedAuctionPhase;
      game.playerWithHighestBid = auctionPlayer;
    },

    eachPlayer({
      name: 'biddingPlayer',
      startingPlayer: ({ auctionPlayer }) => auctionPlayer,
      nextPlayer: player => game.players.seatedNext(player),
      continueUntil: () => game.lastBid !== undefined && game.players.filter(p => !p.passedThisAuction).length === 1,
      do: ifElse({
        if: ({ biddingPlayer }) => !biddingPlayer.passedThisAuction,
        do: playerActions({ name: 'bid', actions: ['bid', 'passBid'] })
      }),
    }),

    ifElse({
      if: () => game.playerWithHighestBid!.allMy(Card).length >= 3,
      do: playerActions({
        player: () => game.playerWithHighestBid!,
        name: 'scrap',
        actions: ['scrap']
      }),
    }),
  );

```

And

```ts
  game.defineFlow(
    () => {
      $.draw.shuffle();
      game.announce('intro');
    },

    playerActions({ actions: ['drawItem'] }),

    loop(
      whileLoop({
        while: () => !game.currentMonster(),
        do: playerActions({
          actions: ['drawMonster', 'useItem']
        }),
      }),

      () => {
        game.traitTriggered = false;
        game.shielded = 0;
      },

      loop(
        () => game.currentMonster()!.tookDamage = false,

        playerActions({
          name: 'draw',
          prompt: 'Use weapons or items',
          actions: [
            'drawWeapon',
            'useItem',
            'bust',
            { name: 'finish', do: Do.break }
          ]
        }),

        () => {
          if (!game.currentMonster()) return Do.break();

          game.message(
            "{{damage}} damage vs monster {{attack}}",
            { damage: game.currentDamage(), attack: game.currentMonsterAttack() }
          );

          const lastWeapon = $.encounter.last(Card, {orientation: 'weapon'});
          const currentMonster = game.currentMonster()!;

          if (!game.traitTriggered) {
            const trait = currentMonster.trait;
            if (lastWeapon && !lastWeapon.ignoreTraits) {

              if (trait === 'Explodes') {
                game.traitTriggered = true;
                game.message('Monster explodes!');
              }

              if (trait === 'Flying' && lastWeapon.weaponType === 'melee') {
                game.traitTriggered = true;
                lastWeapon.actualDamage = 0;
                game.message('{{lastWeapon}} does no damage vs Flying monster', {lastWeapon});
              }

              if (trait === 'Tough Skin' && lastWeapon.weaponType === 'ranged') {
                game.traitTriggered = true;
                lastWeapon.actualDamage = 0;
                game.message('{{lastWeapon}} does no damage vs monster with Tough Skin', {lastWeapon});
              }

              if (trait === 'Evasive' && lastWeapon.actualDamage % 2 === 0) {
                game.traitTriggered = true;
                lastWeapon.actualDamage = 0;
                game.message('{{lastWeapon}} does no damage vs Evasive monster', {lastWeapon});
              }

              if (trait === 'Ethereal' && lastWeapon.actualDamage % 2 === 1) {
                game.traitTriggered = true;
                lastWeapon.actualDamage = 0;
                game.message('{{lastWeapon}} does no damage vs Ethereal monster', {lastWeapon});
              }
            }
          }

          if (!game.currentMonster()) {
            return Do.break();
          }

          if (game.haveBust()) {
            game.message("You have gone over!");
          } else {
            if (lastWeapon && lastWeapon.actualDamage > 0 && currentMonster) currentMonster.tookDamage = true;

            if (game.pendingDamage() === 0) return Do.break();
          }
        }
      ), // end fight loop

      () => {
        const monster = game.currentMonster();
        if (monster) {
          const damage = game.pendingDamage();
          const hp = $.draw.all(Card).length;
          game.message(damage === 0 ? "Perfect kill!" : `You take ${damage} damage`);
          $.draw.firstN(damage, Card).putInto($.discard);
          if (damage > hp) return game.finish();
          game.addDelay();
          monster.defeat();
        }
        $.encounter.all(Card).putInto($.discard);

        const souls = $.souls.all(Card).length;
        game.message(`You have ${souls} souls`);
        if (souls >= 8) return game.finish(game.players[0]);
        if (!$.draw.has(Card)) return game.finish();

        if (game.treasureEarned) {
          game.addDelay();
          $.discard.shuffle();
          const treasure = $.discard.first(Card);
          if (treasure) {
            treasure.putInto($.items);
            treasure.orientation = 'item';
            if (treasure.itemName === 'Mimic!') {
              treasure.putInto($.encounter);
            } else {
              game.message("You got a {{treasure}}", {treasure});
            }
          }
          game.treasureEarned = false;
        }
      },
    )
  )
```


```ts
  game.defineFlow(
    () => {
      // set up deck, removing appropriate number of cards
      deck.shuffle();
      deck.firstN(3, Card, {age:1}).remove()
      deck.firstN(3, Card, {age:2}).remove()
      deck.firstN(3, Card, {age:3}, c => c.type !== 'guild').remove()
      deck.firstN(4, Card, {age:3}, c => c.type === 'guild').remove()
      game.pile.shuffle();
      game.pile.firstN(5, ProgressToken).putInto(field);
    },

    eachPlayer({
      name: 'turn',
      do: [
        () => game.pile.firstN(4, Wonder).putInto(field),
        // alternate players 1-2-2-1 for wonder picking
        forEach({
          name: 'player',
          collection: ({ turn }) => [turn, turn.other(), turn.other(), turn],
          do: playerActions({
            player: ({ player }) => player,
            actions: ['pickWonder']
          })
        }),
      ]
    }),

    forLoop({ name: 'age', initial: 1, next: age => age + 1, while: age => age <= 3, do: [
      // set up board
      ({ age }) => {
        const cards = deck.firstN(20, Card, {age});
        for (let i = 0; i !== 20; i++) {
          cards[i].putInto($.cards, cardPosition[age - 1][i]);
        }
        $.cards.all(Card, card => visibleRows[age - 1].includes(card.row!)).showToAll();
        game.message('Age {{age}} has begun!', {age});
        if (age > 1) game.firstMoveOfAge = true;
        if (age === 1) game.players[0].setCurrent();
      },

      eachPlayer({
        name: 'player',
        continueUntil: () => !field.has(Card),
        startingPlayer: () => game.militaryTrack === 0 ? game.players.current()! : game.players[game.militaryTrack > 0 ? 0 : 1],
        do: [
          () => game.revealUncovered(),
          playerActions({
            player: ({ player }) => player,
            name: 'play',
            prompt: 'Choose card',
            description: 'choosing a card',
            actions: [
              'buy',
              'discard',
              'pass',
              {
                name: 'buildWonder',
                do: ({ player, buildWonder }) => {
                  if (buildWonder.wonder?.special?.includes('extra-turn') || player.has(ProgressToken, {special: 'extra-turn'})) {
                    game.message('{{player}} takes an extra turn', {player});
                    game.firstMoveOfAge = false;
                    Do.repeat();
                  }
                }
              }
            ]
          }),
          () => { game.firstMoveOfAge = false }
        ]
      })
    ]}),

    () => {
      let winner: SevenWondersDuelPlayer | undefined = undefined;
      if (game.players[0].score() !== game.players[1].score()) {
        winner = game.players[0].score() > game.players[1].score() ? game.players[0] : game.players[1];
        game.finish(winner, 'civilianVictory');
      } else {
        const bluePoints1 = game.players[0].allMy(Card, {type: 'civilian', built: true}).sum('vp');
        const bluePoints2 = game.players[1].allMy(Card, {type: 'civilian', built: true}).sum('vp');
        if (bluePoints1 !== bluePoints2) {
          winner = bluePoints1 > bluePoints2 ? game.players[0] : game.players[1];
          game.finish(winner, 'civilianVictory');
        } else {
          game.finish(undefined, 'civilianVictory');
        }
      }

      if (winner) game.message(`{{winner}} wins a civilian victory!`, {winner});
    }
  );
```
