const fs = require('fs');


const FILE_PATH = "./input.txt"

const readFile = () => {
    return fs.readFileSync(FILE_PATH, "utf8")
}

const getFirstNumber = (row) => {
    return row.split('').find(carac => /^\d+$/.test(carac))
}

const main = () => {
    const content = readFile()
    const rows = content.split('\n')

    const answer = rows.reduce((sum, row) => {
        const reversedRow = row.split('').reverse().join()

        const firstNumber = getFirstNumber(row)
        const lastNumber = getFirstNumber(reversedRow)

        return sum + Number(`${firstNumber}${lastNumber}`)
    }, 0)

    console.warn('answer', answer)
}

main()