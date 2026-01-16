# Tradeoffs

A board game exploring ethical AI decision-making in education,
built with [Boardzilla](https://docs.boardzilla.io).


## To run

```bash
# Install Boardzilla devtools
go install github.com/boardzilla/boardzilla-devtools/cmd/bz@latest

# Run dev server
npm run dev
```
(see https://docs.boardzilla.io/introduction/getting-started)

If port 80 is busy:
```bash
netstat -ano | findstr ":80"
taskkill /PID  /F
```

If needed, check:
```bash
npm install
```


## Background to repo

Very much in draft idea (a) game, (b) system, and (c) code.

Idea is to build 'tradeoff' games to illustrate challenges in navigating various decisions.

Mechanics inspired by various games including pandemic (and, more recent and by the same makers, daybreak) but with intent to simplify significantly.

Initial bits drafted based on a game actually run with collaborators.

The game uses [boardzilla](https://docs.boardzilla.io) as a framework.
Drafting made use of the various very helpful [boardzilla example games](https://github.com/boardzilla/) (and e.g., https://github.com/noamsiegel/cabo from others).

Code adapted based on my level of R competence...i.e., a totally different language, and a 'competent but' level, with some heavy use of github copilot and chatgpt particularly in linting help and method inspiration.
There may well be (significant) errors, although I have (a) reviewed code, and (b) checked the gameflow and outputs and (caveats apply) most things work.

The game material itself needs significant testing/development, the samples are just for testing the code.


## Rough game sketch

There are:

1. Challenge boards/cards. Resolve these to get points (or stash them to get 1 point, but increase the opportunity cost). Challenges are resolved by (1) adding a complete innovation and (2) having the policy landscape required on your regulation cards.
2. Strategy cards. Each of these describes an approach, and has a value across "impact" areas or principles. Different challenges have different risks and benefits so they need different strategies that match these principles. Once a strategy/regulate card is in play it applies to all active challenges.
3. Innovation tiles. To make an innovation you need 1 of each: data, model, aim, user. Some tiles are cheap (eg historic data scraped from social media) some expensive. BUT events can mean incomplete innovations fail and are added to your opportunity cost level or wasted resource.
5. Event cards. These either modify the context of the problem, introducing new requirements, or have impacts contingent on the regulation cards in play. If you can't address the event, your innovation fails and those tiles are added to the opportunity cost. Events can be mitigated by playing a single regulate or innovate, but then you must add 1 opportunity cost and immediately draw a new event.

The board has areas for:
1. A score counter (you score when you solve challenges)
2. An opportunity cost or wasted resource counter (innovation tokens fill this up, hit x and you lose)
3. A round counter
4. Challenge and Strategy decks
5. A tile pool
6. A discard pile (for everything discarded)
7. An active challenges area, max of 3, each with slots for innovations
8. An active strategies area


Players start with 2 in hand challenges and 1 on the table. They can draw and play as they like. To win, x points. To lose, hit the opportunity cost limit, or run out of innovation tokens.

Each turn, players:
1. Spend 3 points on either strategy cards (1-3 cost) or innovate tokens (1-3 cost)
2. Draw and execute an event
3. Check the opportunity cost level and challenge points complete

(Possibly the innovation tiles also carry points)
(For the narrative the problem cards themselves can describe how the regulation and innovations might play out, you don't need the cards to). Modifiers are shuffled in the problem deck.

Regulate cards all available from the start? Or possibly they cost more until one board is completed (because regulation plays catch-up with innovation).


## To Support Framework (not this game)

- [Boardzilla Discord](https://discord.com/channels/959788025670414366/959788025670414369)
- [Boardzilla Docs](https://docs.boardzilla.io)
