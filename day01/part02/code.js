const fs = require('fs');


const FILE_PATH = "../input.txt"
const WORDS_NUMBERS = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
]

const readFile = () => {
    return fs.readFileSync(FILE_PATH, "utf8")
}


const getFirstNumber = (row, numbers) => {
    const searchNumber = (number, index) => {
        const partToCompare = row.slice(index, index + number.length)

        return partToCompare == number;
    }

    for (let index = 0; index < row.length; index++) {
        if (/^\d+$/.test(row[index])) return row[index]

        const foundedIndex = numbers.findIndex(number => searchNumber(number, index))
        if (foundedIndex !== -1) return foundedIndex
    }
}

const reverseString = (string) => string.split('').reverse().join('')

const findNumbers = (row) => {
    const reversedWordsNumbers = WORDS_NUMBERS.map(row => reverseString(row))
    const reversedRow = reverseString(row)

    const firstNumber = getFirstNumber(row, WORDS_NUMBERS)
    const lastNumber = getFirstNumber(reversedRow, reversedWordsNumbers)

    return  Number(`${firstNumber}${lastNumber}`)
}

const main = () => {
    const content = readFile()
    const rows = content.split('\n')

    const answer = rows.reduce((sum, row) => sum + findNumbers(row), 0)

    console.warn('answer', answer)
}

main()