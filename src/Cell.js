class Cell {
    constructor(cellObj) {
        this.number = cellObj.number;
        this.locked = cellObj.locked;
        this.index = cellObj.index;
        this.x = this.index % 9;
        this.y = Math.floor(this.index / 9);
        this.focused = false;
        this.selected = false;
        this.tips = cellObj.tips;
    }

    Set(cellObj){
        this.number = cellObj.number;
        this.tips = cellObj.tips;
    }
}

export default Cell;