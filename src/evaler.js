
class Declaration {
	constructor(name, type) {
		this.name = name
		this.type = type	
	}
}

class Func extends Declaration {
	constructor(name, instructions) {
		super(name, "function")
		this.instructions = instructions
	}
}

module.exports = class Evaler { 
	constructor(parsed, declarations=[]) {
		this.instructions = parsed
		this.declarations = [...declarations]
		this.i = 0
	}

	eval() {
		this.instructions.forEach(instruc => {
			//console.log(instruc)
			if (instruc.type == "func") {
				this.declarations.push(new Func(instruc.name, instruc.instructions))
				//console.log("DECLARE FUNCTION: " + instruc.name + " WITH " + instruc.instructions.length + " INSTRUCTIONS")
			} else if (instruc.type == "print") {
				var valueToPrint = ""
				instruc.toPrint.value.forEach(({value, type}) => {
					if (type == "STRING") valueToPrint += value
				})
				console.log(valueToPrint)
			} else if (instruc.type == "call") {
				this.declarations.forEach(declaration => {
					if (declaration.type == "function") {
						if (declaration.name == instruc.name) {
							(new module.exports(declaration.instructions, this.declarations)).eval()
						}
					}
				})
			}
			this.i++
		})
		return this
	}
}