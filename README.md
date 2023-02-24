# Tic-Toc-Toe

Project 1 for GA SEI.

Try it [here] (https://mountmike.github.io/Tic-Tac-Toe/)


Screenshot:
![Screenshot01](https://github.com/mountmike/Tic-Tac-Toe/blob/main/images/tictactoe.exe%20screenshot.png?raw=true)



# **Planning process** | Phase 1


Theme
- Windows 98 (mimic minesweeper)
    - use a library (OS GUI 98 / 98.cssor) or DIY?

Pseudocode
- store board data in a matrix
- make grid of blocks (divs) that corelate with matrix
    - on click target div and update matrix value/DOM
- toggle between player 1/player 2 with boolean variable
- check if matrix is equal to a winning pattern
    - return winner!


Flow diagram
![Flow Chart 01](https://github.com/mountmike/Tic-Tac-Toe/blob/main/images/Figjam1.png?raw=true)

# Phase 2

Basic code complete that resembles a game of tic tac toe and interacts with DOM somewhat appropriately. Features still lacking though such as:

**Some kind of winning/drawing sequence with the DOM**
- a popup DIV that becomes visible at the conclusion of each round

**Keeping track of multiple round scores**
- Minesweeper inspired GUI for displaying the score count for each player
- DOM interactions that make it really clear who's turn it currently is

**Adding sound FX**

# Phase 3
**Saving score between refreshes**
- researched localStorage and added function to save scores, but now needs reset score capability

**Adding old *file* menu bar on the window which would unlock extra settings such as:**
- Custom player names
- New game to reset the board and scores.

# Future thoughts
- As an extra aesthetic feature I would love to have the screen mimic the Windows desktop environment and be able to launch the .exe, minimize, maximise and close it.
- Add to file menu something like:
    - Different game modes (such as speed round where you have 3 seonds to win)
    - Different board sizes



