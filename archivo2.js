var ArrayRegister = new Array();
var Functions = new Array();
var position = -1;
var answer = true;

function SetFunctions(func, name, value, code) {
    var F = {
        name: func,
        registerName: name,
        value: value,
        code: code
    }
    Functions.push(register);
    position++;
}

function movFunct(name, value) {
    var register = {
        name: name,
        value: value
    }
    ArrayRegister.push(register);
    this.SetFunctions('mov' + name + value, name, value, 1);
    position++;

    console.log(ArrayRegister);
}

function Increment(name) {
    ArrayRegister.find(register => register.name == name).value++;
    SetFunctions('inc' + name, name, 1, 2);
    position++;
}

function Decrement(name) {
    ArrayRegister.find(register => register.name == name).value--;
    SetFunctions('inc' + name, name, -1, 3);
    position++;
}

function Jump(name, value) {
    do {
        var register = Functions[position + value].registerName;
        var value = Functions[position + value].value
        var code = Functions[position + value].code;

        switch (code) {
            case 1:
                this.movFunct(register, value)
                break;
            case 2:
                this.Increment(register)
            case 3:
                this.Decrement(register)
            default:
                break;
        }

    } while (value != 0);
    SetFunctions('jnz' + name + value, name, value, 4);
}

while (answer) {
    alert("List of Functions are: mov x y -copies y into register x- , inc x , dec x, jnz x y(jump an instruction y step away) ... Press 1 for mov, 2 for inc , 3 for dec and 4 for jump")
    var number = prompt("Please introduce a number");
    switch (parseInt(number)) {
        case 1:
            var register = prompt("Please introduce a register");
            var value = prompt("Please introduce a value");
            this.movFunct(register, value);
            break;
        case 2:
            var register = prompt("Please introduce a register");
            this.Increment(register);
            break;
        case 3:
            var register = prompt("Please introduce a register");
            this.Decrement(register);
            break;
        case 4:
            alert("a jump that points another jump will cause an infinite loop")
            var register = prompt("Please introduce a register");
            var value = prompt("Please introduce a value (positive means forward, negative means backward");
            this.Jump(regsiter, value);
            break;
        default:
            break;
    }
    textAnswer = prompt("You wanna keep doing functions. Write 'no' or 'yes' ");

    if (textAnswer == 'no') {
        answer = false;
    }

    let functionsText = '';
    Functions.forEach(element => {
        functionsText += element.name
    });
    prompt(functionsText);
}