const test = require('tape');
const CPU = require('./cpu2');

test('tape works', (t) => {        
    const actual = 2 + 2;
    t.equals(actual, 4, 'should equal 4');
    t.end();
});

test('cpu is a function', (t) => {
    t.equal(typeof CPU, 'function', 'typeof could be "function"');
    t.end();
});

test('memory should be always be of size 256', (t) => {
    const cpuInstance = new CPU();
    t.equal(cpuInstance.memory.length, 256, 'memory.length should be 256');    

    cpuInstance.loadProgram([1,100,2,7,3,15,0]);
    t.equal(cpuInstance.memory.length, 256, 'memory.length should still be 256 after loading in a program');

    cpuInstance.start();
    t.equal(cpuInstance.memory.length, 256, 'memory.length should still be 256 after running in a program');

    t.end();
});

test('Should load 100 into register a', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([1, 100]);
    cpuInstance.start();

    t.equal(cpuInstance.a, 100, 'register a should equal 100');
    t.end();
});

test('Should add value to register a', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([2, 7]);
    cpuInstance.a = 100;
    cpuInstance.start();

    t.equal(cpuInstance.a, 107, 'register a should equal 107');
    t.end();
});

test('Should store register value in memory location', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([3, 15]);
    cpuInstance.a = 107;
    cpuInstance.start();

    t.equal(cpuInstance.memory[15], 107, 'value at memory address 15 should be equal to register a');
    t.end();
});

test('Should load the value in the next memory address into register X', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([4, 15]);
    cpuInstance.start();

    t.equal(cpuInstance.x, 15, 'register x should equal 15');
    t.end();
});

test('Should increment register X by 1', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([5]);
    cpuInstance.x = 5;
    cpuInstance.start();

    t.equal(cpuInstance.x, 6, 'register x should equal 6');
    t.end();
});

test('Should compare the value in register Y to value in next memory address and store result in the `equal` flag', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([6, 15]);
    cpuInstance.start();

    t.equal(cpuInstance.flags, false, 'value of register `flags` should be false');
    t.end();
});

test('Should add the value in the next memory address to the program counter if the equal flag is not set', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([7, 15]);
    cpuInstance.start();

    t.equal(cpuInstance.programCounter, 15, 'value of programCounter should be 15');
    t.end();
});

test('Should not add the value in the next memory address to the program counter if the equal flag has been set', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([7, 15]);
    cpuInstance.flags = false;
    cpuInstance.start();

    t.equal(cpuInstance.programCounter, 2, 'value of programCounter should be 2');
    t.end();
});

// test('Should execute entire program', (t) => {
//     const cpuInstance = new CPU();
//     cpuInstance.loadProgram([1,100,2,7,3,15,0]);
//     cpuInstance.start();

//     t.equal(cpuInstance.memory[15], 107, 'value at memory address 15 should be equal to register a');
//     t.end();
// });





