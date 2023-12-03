const fs = require('fs');


const FILE_PATH = "../input.txt"

const readFile = () => {
    return fs.readFileSync(FILE_PATH, "utf8")
}

const calculateMinimumConfiguration = (gameCubes) => {
    const configuration = {
        'blue': 0,
        'green': 0,
        'red': 0,
    }
    gameCubes.split(';').forEach((cubes) => {
        const colorsCubes = cubes.split(',')
        
        colorsCubes.forEach(cubes => {
            const cubesPart = cubes.trim().split(' ')
            const color = cubesPart[1]
            const value = Number(cubesPart[0])
            
            if (configuration[color] < value) configuration[color] = value
        })
    })

    return configuration
}

const main = () => {
    const content = readFile().split('\n')

    const result = content.reduce((acc, row) => {
        const gameInfo = row.split(':')

        const config = calculateMinimumConfiguration(gameInfo[1])
        return acc + config['blue'] * config['red'] * config['green']
    }, 0)   
    console.log('result', result)
}   

main()