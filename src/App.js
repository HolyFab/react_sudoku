import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sudoku from './components/Sudoku';
import About from './components/pages/About';

import './App.css';

class Cell {
    constructor(number, locked, index) {
        console.log(number);
        this.number = number;
        this.locked = locked;
        this.index = index;
        this.x = index % 9;
        this.y = Math.floor(index / 9);
        this.focused = false;
        this.selected = false;
        this.tips = [];

        if (this.x === this.y)
            this.tips.push(this.x);
    }
}

function FillSudoku() {
    var arr = [
        8, 7, 6, 9, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 6, 0, 0, 0, 0,
        0, 4, 0, 3, 0, 5, 8, 0, 0,

        4, 0, 0, 0, 0, 0, 2, 1, 0,
        0, 9, 0, 5, 0, 0, 0, 0, 0,
        0, 5, 0, 0, 4, 0, 3, 0, 6,

        0, 2, 9, 0, 0, 0, 0, 0, 8,
        0, 0, 4, 6, 9, 0, 1, 7, 3,
        0, 0, 0, 0, 0, 1, 0, 0, 4
    ];
    return arr.map((n, i) => new Cell(n, !!n, i));
}

class App extends Component {
    state = {
        sudoku: FillSudoku(),
        selected: undefined
    };

    _handleNumberKey = (event) => {
        const key = event.keyCode;
        console.log(this.state.selected);
        if (!this.state.selected || !(key >= 96 && key <= 105))
            return;
        var temp = this.state.sudoku;
        temp[this.state.selected].number = key - 96;
        this.setState({ sudoku: temp });
    }

    componentWillMount() {
        document.addEventListener('keydown', this._handleNumberKey, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleNumberKey, false);
    }

    select = (index) => {
        console.log(index);
        var cell = this.state.sudoku[index];
        var unselect = cell.selected;
        this.setState({ selected: unselect ? undefined : index });
        this.setState({
            sudoku: this.state.sudoku.map((c) => {
                c.selected = c.focused = false;
                if (unselect)
                    return c;
                if (c.x === cell.x || c.y === cell.y)
                    c.focused = true;
                if (c.index === index)
                    c.selected = true;
                return c;
            })
        });
    }

    render() {
        return (
            <Router>
                <div className='App'>
                    <div className='container'>
                        <Header />
                        <Route
                            exactpath='/'
                            render={(props) => (
                                <React.Fragment>
                                    <Sudoku
                                        sudoku={this.state.sudoku}
                                        select={this.select}
                                    />
                                </React.Fragment>
                            )}
                        />
                        <Route path='/about' component={About} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
