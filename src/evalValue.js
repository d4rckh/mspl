module.exports = (parsedValue, declarations) => {
	var f = ""
	parsedValue.forEach(({value, type, name}) => {
		if (type == "STRING") f += value
		if (type == "VAR") {
			declarations.forEach(declaration => {
				if (declaration.type == "variable") {
					if (declaration.name == name) f += declaration.value
				}
			})
		}
	})
	return f// + "placeholder"
}