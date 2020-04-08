# mspl

Most stupid programming language

## Features
- Functions
- Print

## Examples
**Function**
```
func:MyFunction
	print:"Hello World" 
endf

print:"Hello World x2"
call:MyFunction
```
**Repeat Instruction with @**
This will print "Hello World" 5 times
```
print:"Hello World"@5
```
**Variables**
```
var:MyFirstVariable "Hello!"
print:%MyFirstVariable
```
**Combine variables with strings**
```
var:name "John Doe"
print:"My name is "/%name
```
("/" concatenates)