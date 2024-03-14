import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";
import { findAllByDisplayValue } from "@testing-library/react";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  };

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    // y is the row, x is the column
    // Use for loop to create the board with y length of nrows and x length of ncols
    // Creates 5 rows, as y = row and y will be less than nrows which is set to 5
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      // Creates 5 columns, x= columns and x will be less than ncols which is set to 5
      for (let x = 0; x < this.props.ncols; x++) {
        // Creates random number between 0 and 1, if that number is less than chanceLightsStartsOn = true, if that number is not less than = false
        // Pushes the random true and false statement into rows 5 times from for loop
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      // This pushes all the rows into board
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    // console.log('FLIPPING', coord)
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    // Pass in coordinates of what needs to be changed
    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      // if column number x is less than or equal to 0 and x is less than ncols (5) and if row number y is less than or equal to 0 and y is less than nrows (5)
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        // Takes current cell and changes it to be opposite (board = true or false, so if current board is true, it creates false)
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    // Initial cell
    flipCell(y, x);
    // Right cell
    flipCell(y, x - 1);
    // Left cell
    flipCell(y, x + 1);
    // Top cell
    flipCell(y - 1, x);
    // Bottom cell
    flipCell(y + 1, x);


    // win when every cell is turned off
    // TODO: determine is the game has been won
    // Every cell, in every row, in the whole board, should be false
    let hasWon = board.every(row => row.every(cell => !cell));
    

    this.setState({board, hasWon});
  }

  /** Render game board or winning message. */
  makeTable() {
    // TODO: make table board
    let tblBoard = [];
    // Creates 5 rows with y = rows
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      // Creates 5 columns with x = columns
      for (let x = 0; x < this.props.ncols; x++) {
        // Creates coordinates based on existing row(y) and column(x) location
        let coord = `${y}-${x}`;
        // Pushes the component Cell into each row with a key as their coordinate and isLit being true or false based off CreateBoard randomness in state
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
  
    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }

  render() {
    // TODO: if the game is won, just show a winning msg & render nothing else
    return (
      <div>
        {this.state.hasWon ? (
          <div className="winner" >
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN!</span>
          </div>
        ) : (
          <div>
            <div className='Board-title'>
              <div className='neon-orange'>Lights</div>
              <div className='neon-blue'>Out</div>
            </div>
            {this.makeTable()}
          </div>
        )}
      </div>
    )
  }
}

export default Board;
