const parser = require('./parser.js')
const evaler = require('./evaler.js')

module.exports = class Runner {
	constructor(lines) {
		this.lines = lines
	}

	parse() {
		return (new parser(this.lines)).parse()
	}

	run() {
		(this.evaler(this.parse()))
	}

	evaler(parsed) {
		return (new evaler(parsed)).eval()
	}
}

const myProg = new module.exports(`
func:MyFunction
print:"Hello World, in the "//"function"
call:MyFunction
endf

call:MyFunction
`.replace("\t", "").split("\n"))

myProg.run()