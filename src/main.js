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
var:WHATisIT "nested variable!"
var: "I am "/%WHATisIT

func:MyFunction
	print:"Hello "/%WHATisIT
endf

call:MyFunction@2`.replace("\n\t", "\n").replace("\t", "").split("\n"))

myProg.run()
