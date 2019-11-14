import React, { Component } from 'react';
import Square from './Square';
import PropTypes from 'prop-types';

class Sudoku extends Component {
    render() {

        const style = {
            margin: 'auto',
            width: "auto",
            height: "auto",
            fontSize: "3em",
            tableLayout: 'fixed',
        }
        const n = 9;
        const rows = [];
        for (var i = 0; i < n; i++) {
            var squares = [];
            for (var j = 0; j < n; j++) {
                var index = i * n + j;
                var cell = this.props.sudoku[index];
                squares.push(<Square select={this.props.select} key={cell.index} cell={cell}></Square>)
            }
            rows.push(<tr key={i}>{squares}</tr>)
        }
        return (
            <div id="GameContainer">
                <table cellSpacing="0" id="sudokuTable" style={style}>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

// PropTypes
Sudoku.propTypes = {
    sudoku: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired
}

export default Sudoku;