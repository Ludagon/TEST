var maze = [
    '####### #',
    '#>#   # #',
    '#   #   #',
    '#########'
]


function getDimensions() {
    var defaultValue = 0;
    var row = [];
    var matrix = [];
    //initialize
    for (var i = 0; i < maze[0].length; i++) {
        row.push(defaultValue);
    }
    for (var i = 0; i < maze.length; i++) {
        matrix.push(row.slice());
    }

    //fill
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = maze[i].split('');

    }
    return matrix;
}

function getInitialPosition(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == '^' || matrix[i][j] == '<' || matrix[i][j] == 'v' || matrix[i][j] == '>') {
                return initial = [i, j, matrix[i][j]];
            }
        }
    }
}

function getEndPosition(matrix) {
    //First Row
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] == ' ')
            return [0, i];
    }

    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0] == ' ')
            return [i, 0];
    }

    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][matrix[0].length - 1] == ' ')
            return [i, matrix[0].length - 1];
    }

    //End row
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[matrix.length - 1][i] == ' ')
            return [matrix.length - 1, i];
    }
}

function Wallfront(matrix, position, value) {
    if (value == 1 && matrix[position[0] - 1][position[1]] != null) {
        if (matrix[position[0] - 1][position[1]] == '#') {
            return true;
        } else {
            return false;
        }
    }

    if (value == 2 && matrix[position[0]][position[1] - 1] != null) {
        if (matrix[position[0]][position[1] - 1] == '#') {
            return true;
        } else {
            return false;
        }
    }

    if (value == 3 && matrix[position[0] + 1][position[1]] != null) {
        if (matrix[position[0] + 1][position[1]] == '#') {
            return true;
        } else {
            return false;
        }
    }

    if (value == 4 && matrix[position[0]][position[1] + 1] != null) {
        if (matrix[position[0]][position[1] + 1] == '#') {
            return true;
        } else {
            return false;
        }
    }
}


function historicoFunction(action, historico) {

    historico += action;
    console.log(historico)
}

function WallLeft(matrix, position, value) {
    if (value == 1 && matrix[position[0]][position[1] - 1] != null) {
        if (matrix[position[0]][position[1] - 1] == '#') {
            return true;
        } else {
            return false;
        }
    }

    if (value == 2 && matrix[position[0] + 1][position[0]] != null) {
        if (matrix[position[0] + 1][position[0]] == '#') {
            return true;
        } else {
            return false;
        }
    }

    if (value == 3 && matrix[position[0]][position[1] + 1] != null) {
        if (matrix[position[0]][position[1] + 1] == '#') {
            return true;
        } else {
            return false;
        }
    }
    if (value == 4 && matrix[position[0] - 1][position[1]] != null) {
        if (matrix[position[0] - 1][position[1]] == '#') {
            return true;
        } else {
            return false;
        }
    }
}

function rotateRigth(value, historico) {
    if (value == 1) {
        historicoFunction('Rotate 90 degrees to pos >', historico)
        return 4;
    }
    if (value == 2) {
        historicoFunction('Rotate 90 degrees to pos ˆ', historico)
        return 1;
    }
    if (value == 3) {
        historicoFunction('Rotate 90 degrees to pos <', historico)
        return 2;
    }
    if (value == 4) {
        historicoFunction('Rotate 90 degrees to pos v', historico)
        return 3;
    }
}

function rotateLeft(value, historico) {
    if (value == 1) {
        historicoFunction('Rotate 90 degrees to pos <', historico)
        return 2;
    }
    if (value == 2) {
        historicoFunction('Rotate 90 degrees to pos v', historico)
        return 3;
    }
    if (value == 3) {
        historicoFunction('Rotate 90 degrees to pos >', historico)
        return 4;
    }
    if (value == 4) {
        historicoFunction('Rotate 90 degrees to pos ˆ', historico)
        return 1;
    }
}

function walkForward(matrix, position, facing, historico) {
    matrix[position[0]][position[1]] = ' '
    if (facing == 1) {
        matrix[position[0] - 1][position[1]] = 'ˆ'
        historicoFunction('step forward', historico)
        return [position[0] - 1, position[1], 'ˆ']

    } else if (facing == 2) {
        matrix[position[0]][position[1] - 1] = '<'
        historicoFunction('step forward', historico)
        return [position[0], position[1] - 1, '<']

    } else if (facing == 3) {
        matrix[position[0] + 1][position[1]] = 'v'
        historicoFunction('step forward', historico)
        return [position[0] + 1, position[1], 'v']

    } else if (facing == 4) {
        matrix[position[0]][position[1] + 1] = '>'
        historicoFunction('step forward', historico)
        return [position[0], position[1] + 1, '>']
    }
}


function solver() {
    var finished = false;
    var matrix = getDimensions();
    var InitialPosition = getInitialPosition(matrix);
    var position = InitialPosition;
    var end = getEndPosition(matrix);
    var historico = " ";

    var facing;
    if (InitialPosition[2] == '^') {
        facing = 1;
    } else if (InitialPosition[2] == '<') {
        facing = 2;
    } else if (InitialPosition[2] == 'v') {
        facing = 3
    } else {
        facing = 4;
    }

    //Rigth hand Rule
    while (!finished) {
        switch (facing) {
            case 1:
                if (WallLeft(matrix, position, 1) == true) {
                    if (Wallfront(matrix, position, 1) == true) {
                        facing = rotateRigth(facing, historico);
                    } else {
                        var position = walkForward(matrix, position, facing, historico);
                    }
                } else {
                    facing = rotateLeft(facing, historico);
                    var position = walkForward(matrix, position, facing, historico);
                }
                break;
            case 2:
                if (WallLeft(matrix, position, 2) == true) {
                    if (Wallfront(matrix, position, 2) == true) {
                        facing = rotateRigth(facing, historico);
                    } else {
                        var position = walkForward(matrix, position, facing, historico);
                    }
                } else {
                    facing = rotateLeft(facing, historico);
                    var position = walkForward(matrix, position, facing, historico);
                }
                break;
            case 3:
                if (WallLeft(matrix, position, 3) == true) {
                    if (Wallfront(matrix, position, 3) == true) {
                        facing = rotateRigth(facing, historico);
                    } else {
                        var position = walkForward(matrix, position, facing, historico);
                    }
                } else {
                    facing = rotateLeft(facing, historico);
                    var position = walkForward(matrix, position, facing, historico);
                }
                break;
            case 4:
                if (WallLeft(matrix, position, 4) == true) {
                    if (Wallfront(matrix, position, 4) == true) {
                        facing = rotateRigth(facing, historico);
                    } else {
                        var position = walkForward(matrix, position, facing, historico);
                    }
                } else {
                    facing = rotateLeft(facing, historico);
                    var position = walkForward(matrix, position, facing, historico);
                }
                break;
            default:
                break;
        }
        if (position[0] == end[0] && position[1] == end[1]) {
            finished = true;

        }
    }
};

solver();