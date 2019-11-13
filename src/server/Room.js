const CellObj = require('./CellObj.js')

module.exports  = class Room{
    constructor(name, arr, creator){
        this.name = name;
        if(arr != undefined)
            this.gameState = arr.map((n, i) => new CellObj(n, i));
        this.creator = creator;
        this.users = [];
    }
} 