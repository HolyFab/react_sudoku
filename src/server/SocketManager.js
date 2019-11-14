const { GAME_STATE, INPUT_NUMBER, TOGGLE_TIP, JOIN_ROOM} = require('../Events');
var sudokuGenerator = require('./SudokuGenerator.js');
const CellObj = require('./CellObj.js');
const Room = require('./Room.js');

const io = require('./index.js').io;

const rooms = {};
const players = {};

const arr = [
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
const defaultSudoku = arr.map((n, i) => new CellObj(n, i));

module.exports = function(socket){
    console.log('Socket Id' + socket.id);
    socket.on(INPUT_NUMBER, (index, number) =>{
        if(players[socket.id] === undefined)
            return;
        const room = rooms[players[socket.id]];
        room.gameState[index].SetNumber(number);
        io.in(room.name).emit(GAME_STATE, room);
    });

    socket.on(TOGGLE_TIP, (index, number) =>{
        if(players[socket.id] === undefined)
            return;
        const room = rooms[players[socket.id]];
        room.gameState[index].ToggleTip(number);
        io.in(room.name).emit(GAME_STATE, room);
    });

    socket.on(JOIN_ROOM, async roomName => {
        if(rooms[roomName] === undefined){
            rooms[roomName] = new Room(roomName, await sudokuGenerator(), socket.id);
        }
        const room = rooms[roomName];
        console.log(room);
        players[socket.id] = roomName;
        socket.join(roomName);
        room.users.push(socket.id);
        io.in(room.name).emit(GAME_STATE, room);
    });

    socket.on('disconnect', (reason)=>{
        if(players[socket.id] === undefined)
            return;
        const room = rooms[players[socket.id]];
        var i = room.users.indexOf(socket.id);
        if(i >= 0)
            room.users.splice(i,1);
        delete players[socket.id];
        io.in(room.name).emit(GAME_STATE, room);
    });
}

function joinOrCreateRoom(socket, roomName){
    
}