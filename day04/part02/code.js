const fs = require("fs");

const FILE_PATH = "../input.txt";

const readFile = () => {
  return fs.readFileSync(FILE_PATH, "utf8");
};

const retrieveCopyCard = (numbers, winningNumbers, cardId) => {
  const correspondingNumbers = numbers.filter(number => winningNumbers.includes(number))

  return correspondingNumbers.map((_, index) => cardId + 1 + index)
}

const readCard = (row) => {
  const [cardId, cardContent] = row.split(':')

  const matching = cardId.match(/Card[ ]+(\d+)/)
  const id = Number(matching[1])
  const [numbersPart, winningPart] = cardContent.split('|')
  const numbers = numbersPart.split(' ').filter(c => c).map(number => Number(number))
  const winningNumbers = winningPart.split(' ').filter(c => c).map(number => Number(number))

  return {
    id, 
    copyCards: retrieveCopyCard(numbers, winningNumbers, id)
  }
}

const main = () => {
  const content = readFile().split("\n");
  const cardInstances = {}

  const cardResults = content.map(readCard)

  const searchCard = (cardResult) => {
    const value =  cardInstances[`${cardResult.id}`] ? cardInstances[`${cardResult.id}`] + 1 : 1
    cardInstances[`${cardResult.id}`] = value

    cardResult.copyCards.forEach((cardId) => searchCard(cardResults.find(x => x.id === cardId)));
  }

  cardResults.forEach(searchCard)

  const result = Object.values(cardInstances).reduce((acc, value) => acc + value, 0)
  console.log("result", result);
};

main();
