module.exports  = class CellObj{
    constructor(number, index, locked, tips){
        this.number = number;
        this.index = index;
        this.locked = locked || (number != 0);
        this.tips = tips || [];
    }

    ToggleTip(number) {
        if(this.number)
            return;
        const i = this.tips.indexOf(number); 
        if (i >= 0)
            this.tips.splice(i, 1);
        else
            this.tips.push(number);
        this.tips.sort();
    }

    SetNumber(number){
        this.number = number;
        this.tips = [];
    }
} 