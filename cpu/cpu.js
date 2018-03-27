class CPU {
    constructor() {
        this.a;
        this.programCounter = 0;
        this.memory = new Array(16).fill(0);
    }

    loadProgram(program) {
        this.memory = program.concat(this.memory.slice(program.length)); 
    }

    nextProgramCounter() {
        this.programCounter++;
        return this.programCounter;
    }

    start() {
        while(this.memory[this.programCounter] != 0) {
            switch (this.memory[this.programCounter]) {
                case 1:
                    this.a = this.memory[this.nextProgramCounter()];
                    this.nextProgramCounter();
                    break;
                case 2:
                    this.a += this.memory[this.nextProgramCounter()];    
                    this.nextProgramCounter();
                    break;
                case 3:
                    this.memory[this.memory[this.nextProgramCounter()]] = this.a;
                    this.nextProgramCounter();
                    break;
                default:
                    this.nextProgramCounter();                            
            }
        }
    }
};

module.exports = CPU;
