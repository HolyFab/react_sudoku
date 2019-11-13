const http = require('http');
const axios = require('axios');

const size = 9;
const difficulty = 2;
const url = `http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=${size}&difficulty=${difficulty}`;
module.exports = async function(callback){
    try{
        var res = (await axios.get(url)).data; 
        let sudoku = new Array(size*size).fill(0);
        if(res.response)
            res.squares.forEach(sq => sudoku[sq.x + sq.y * size] = sq.value);

        return sudoku; 
    }
    catch(e){
        console.error(e);
    }
}