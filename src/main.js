processArray = [];

class processID {
    constructor(id, process) {
        this.id = id;
        this.process = process;
    }
}

class bot {

    constructor(id, pair, amount, timeFrame = '1D') {
        this.id = id;
        this.pair = pair;
        this.status = 2; // 2 - Yet to change, 1 - Active, 0 - Inactive
        this.amount = amount;
        this.timeFrame = timeFrame;
        this.currentPrice = 0;
        this.profitLoss = 0.0;
        console.log('Bot Created');
    }

    process() {
        console.log('Bot Functioning Properly ' + this.pair);
    }

    activate() {
        var botProcess = setInterval(this.process, 60000);
        var newID = new processID(this.id, botProcess);
        processArray.push(newID);
        console.log('Bot Started Successfully');
        console.log(processArray);
    }

    deactivate() {
        var processIDIndex = processArray.findIndex(item => item.id == this.id);
        clearInterval(processArray[processIDIndex].process);
        delete processArray[processIDIndex];
        processArray.splice(processIDIndex, 1);
        console.log('Bot Stoped Successfully');
        console.log(processArray);
    }

    buyNow() {
        console.log("Buy Now executed");
    }

    sellNow() {
        console.log("Sell Now executed");
    }
}

module.exports = bot;