## To run

Install e.g., `go install github.com/boardzilla/boardzilla-devtools/cmd/bz@latest` (see https://docs.boardzilla.io/introduction/getting-started)

`npm run dev`

May need to
`netstat -ano | findstr ":80"`
`taskkill /PID PIDHERE /F`

## To do

See todo at top of game/index.ts



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


