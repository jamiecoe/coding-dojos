const test = require('tape');
const CPU = require('./cpu');

test('tape works', (t) => {        
    const actual = 2 + 2;
    t.equals(actual, 4, 'should equal 4');
    t.end();
});

test('cpu is a function', (t) => {
    t.equal(typeof CPU, 'function', 'typeof could be "function"');
    t.end();
});

test('memory should be always be of size 16', (t) => {
    const cpuInstance = new CPU();
    t.equal(cpuInstance.memory.length, 16, 'memory.length should be 16');    

    cpuInstance.loadProgram([1,100,2,7,3,15,0]);
    t.equal(cpuInstance.memory.length, 16, 'memory.length should still be 16 after loading in a program');

    cpuInstance.start();
    t.equal(cpuInstance.memory.length, 16, 'memory.length should still be 16 after running in a program');

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

test('Should execute entire program', (t) => {
    const cpuInstance = new CPU();
    cpuInstance.loadProgram([1,100,2,7,3,15,0]);
    cpuInstance.start();

    t.equal(cpuInstance.memory[15], 107, 'value at memory address 15 should be equal to register a');
    t.end();
});





