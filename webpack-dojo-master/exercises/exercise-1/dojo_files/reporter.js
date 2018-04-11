const fs = require('fs')
const util = require('util')
const path = require('path')
const writeFile = util.promisify(fs.writeFile)

class JestReporter {
  constructor (globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunComplete (contexts, results) {
    const outputPath = path.resolve(__dirname, 'test_output', 'results.json')
    console.log('writing results.json', outputPath)
    writeFile(outputPath, JSON.stringify(results, null, 2))
  }
}

module.exports = JestReporter
