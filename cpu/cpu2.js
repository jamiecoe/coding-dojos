class CPU {
  constructor() {
    this.a;
    this.x;
    this.y;
    this.flags;
    this.programCounter = 0;
    this.memory = new Array(256).fill(0);
  }

  loadProgram(program) {
    this.memory = program.concat(this.memory.slice(program.length));
  }

  nextProgramCounter() {
    this.programCounter++;
    return this.programCounter;
	}

  start() {
    while (this.memory[this.programCounter] != 0) {
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
        case 4:
          this.x = this.memory[this.nextProgramCounter()];
          this.nextProgramCounter();
          break;
        case 5:
          this.x += 1;
          this.nextProgramCounter();
          break;
        case 6:
					this.flags = this.y === this.memory[this.nextProgramCounter()];
					this.nextProgramCounter();
					break;
				case 7: 
					if (this.flags === undefined) this.programCounter += this.memory[this.nextProgramCounter()];
					else {
						this.nextProgramCounter();
						this.nextProgramCounter();
					}
					break;
        default:
          this.nextProgramCounter();
      }
    }
  }
}

module.exports = CPU;
