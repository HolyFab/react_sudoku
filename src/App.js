import io from 'socket.io-client'; 
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {GAME_STATE, TOGGLE_TIP, INPUT_NUMBER, JOIN_ROOM} from './Events'
import Header from './components/layout/Header';
import Sudoku from './components/Sudoku';
import RoomInfo from './components/RoomInfo';
import JoinRoom from './components/JoinRoom';
import About from './components/pages/About';
import './App.css';
import Cell from './Cell';

const socketUrl = 'http://localhost:3231/'; 

class App extends Component {
    state = {
        sudoku: undefined,
        socket: undefined,
        selected: undefined,
        room: undefined
    };

    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log("Connected");
        });

        socket.on(GAME_STATE, (room) => {
            let {sudoku} = this.state;
            if(sudoku)
                room.gameState.forEach(cO => sudoku[cO.index].Set(cO));
            else
                sudoku = room.gameState.map(c => new Cell(c));
            this.setState({sudoku, room});
        });
        this.setState({socket});
    }

    /*setUser = (user) => {
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    }

    logout = () => {
        const { socket } = this.state;
        socket.emit(USER_DISCONNECTED)
        this.setState({user: null});
    }*/

    _handleNumberKey = (event) => {
        const key = event.keyCode;
        if (!this.state.selected || !(key >= 96 && key <= 105))
            return;

        const val = key - 96
        const {sudoku, selected, socket} = this.state;
        if (event.ctrlKey) {
            event.preventDefault();
            if(key !== 96)
                socket.emit(TOGGLE_TIP, selected, val);
        }
        else {
            socket.emit(INPUT_NUMBER, selected, val);
        }
        this.setState({ sudoku });
    }

    componentWillMount() {
        document.addEventListener('keydown', this._handleNumberKey, false);
        this.initSocket();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleNumberKey, false);
    }

    select = (index) => {
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

    joinRoom = (room) =>{
        const{ socket  } = this.state;
        socket.emit(JOIN_ROOM, room);
    }

    render() {
        return (
            <Router>
                <div className='App'>
                    <div className='container'>
                        <Header />
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={(props) => (
                                    
                                        <React.Fragment>
                                            {
                                                this.state.sudoku && this.state.sudoku.length === 81 
                                                ?
                                                    <div id="RoomContainer">
                                                        {this.state.room !== undefined && <RoomInfo room={this.state.room}></RoomInfo>}
                                                        <Sudoku sudoku={this.state.sudoku} select={this.select} />
                                                    </div>
                                                :
                                                    <JoinRoom joinRoom={this.joinRoom} />
                                            }
                                            
                                        </React.Fragment>
                                )}
                            />
                            <Route path='/about' component={About} />
                        </Switch>
                        
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
