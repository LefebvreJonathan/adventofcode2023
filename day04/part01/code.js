const fs = require("fs");

const FILE_PATH = "../input.txt";

const readFile = () => {
  return fs.readFileSync(FILE_PATH, "utf8");
};

const calculatePoints = (numbers, winningNumbers) => {
  const correspondingNumbers = numbers.filter(number => winningNumbers.includes(number))

  return correspondingNumbers.length === 0 ? 0 : 2 ** (correspondingNumbers.length -1)
}

const main = () => {
  const content = readFile().split("\n");

  const result = content.reduce((acc, row) => {
    const [cardId, cardContent] = row.split(':')
    const [numbersPart, winningPart] = cardContent.split('|')
    const numbers = numbersPart.split(' ').filter(c => c).map(number => Number(number))
    const winningNumbers = winningPart.split(' ').filter(c => c).map(number => Number(number))

    return acc + calculatePoints(numbers, winningNumbers)
  }, 0)


  console.log("result", result);
};

main();
