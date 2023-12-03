const fs = require('fs');


const FILE_PATH = "../input.txt"
const COLORS_CUBES_CONFIGURATION = {
    'blue': 14,
    'green': 13,
    'red': 12,
}

const readFile = () => {
    return fs.readFileSync(FILE_PATH, "utf8")
}

const isValidGame = (gameCubes) => {
    const result = gameCubes.split(';').findIndex((cubes) => {
        const colorsCubes = cubes.split(',')
        
        const index = colorsCubes.findIndex(cubes => {
            x = cubes.trim().split(' ')
            return COLORS_CUBES_CONFIGURATION[x[1]] < Number(x[0]);
        })
    

        return index != -1
    })

    return result == -1
}

const main = () => {
    const content = readFile().split('\n')

    const result = content.reduce((acc, row) => {
        const gameInfo = row.split(':')
        const gameIndex = Number(gameInfo[0].replace(/Game /g,''))

        const isValid = isValidGame(gameInfo[1])
        acc += isValid ? gameIndex : 0
        return acc
    }, 0)   
    console.log('result', result)
}   

main()