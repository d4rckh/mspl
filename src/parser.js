const DELIM_BETWEEN_NAME_AND_ARGUMENTS = ":"

class Value {
	constructor(input, type="COMBO", final=false) {
		this.type = type
		this.value = []
		this.raw = input
		if (!final) { 
				this.raw.split("/").forEach(p => {
				if (p.startsWith("\"") && p[p.length - 1] == "\"") {
					this.value.push(new Value(p.substring(1, p.length-1), "STRING", true))
				}
			})
		} else {
			this.value = input
		}
	}
}

class instruction {
	constructor(type) {
		this.type = type
	}
}

class func extends instruction {
	constructor(instructions, args) {
		super("func")
		this.name = args.split(" ")[0]
		this.instructions = instructions
	}
}

class print extends instruction {
	constructor(args) {
		super("print")
		this.arguments = args
		this.toPrint = new Value(this.arguments, "COMBO", false)
	}
}

class call extends instruction {
	constructor(args) {
		super("call")
		this.name = args.split(" ")[0]
	}
}

module.exports = class Parser {
	constructor(lines) {
		this.input = lines
		this.output = []
		this.f = null
	}

	pushInstruct(instruction) {
		if (!this.f) this.output.push(instruction)
		else this.f.instructions.push(instruction)
	}

	parse() {
		for (var i in this.input) {
			const line = this.input[i]
			const instruction = line.split(DELIM_BETWEEN_NAME_AND_ARGUMENTS)[0]
			const args = line.split(DELIM_BETWEEN_NAME_AND_ARGUMENTS)[1]
			
			var times = 1
			if (line[line.length - 2] == "@") times = parseInt(line[line.length - 1])
			//if (line[line.length - 2] == "&") times = parseInt(line[line.length - 1])
			var currentInstruction = null

			if (instruction == "func") {
				this.f = new func([], args)
			} else if (instruction == "endf") {
				const finalF = this.f 
				this.f = null
				currentInstruction = finalF
			} else if (instruction == "print") {
				currentInstruction = new print(args)
			} else if (instruction == "call") {
				currentInstruction = new call(args)
			} else {
				currentInstruction = instruction
			} 
			//if (currentInstruction) this.pushInstruct(currentInstruction)
			var i = 0
			while (i < times) {
				if (currentInstruction) this.pushInstruct(currentInstruction)		
				i++
			}	
			currentInstruction = null


		}
		return this.output
	}
}