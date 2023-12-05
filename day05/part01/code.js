const fs = require("fs");

const FILE_PATH = "../input.txt";
const DESTINATION_INDEX = 0
const SOURCE_INDEX = 1
const LENGTH_INDEX = 2

const readFile = () => {
  return fs.readFileSync(FILE_PATH, "utf8");
};

const parseFile = (content) => {
  const parts = content.split("\n\n");
  const parsedMaps = parts.map(part => {
    const [firstLine, ...restLines] = part.split("\n")
    const firstLineParsed = firstLine.split(":")

     return {
        name: firstLineParsed[0],
        mapping: [firstLineParsed[1], ...restLines].filter(x => x).map(numbers => numbers.split(" ").filter(x => x).map(x => Number(x)))
     }
  })
  return parsedMaps
}


const main = () => {
  const content = readFile()
  const parsedMaps = parseFile(content)

  const findDestinationNumbers = (number, indexRow) => {
    const map = parsedMaps[indexRow]
    
    if(!map) return number;
    
    const foundedRow = map.mapping.find(row => {
      const begin = row[SOURCE_INDEX]
      const end = row[SOURCE_INDEX] + row[LENGTH_INDEX]
      return begin <= number && number <= end
    })

    const offset = foundedRow ? foundedRow[DESTINATION_INDEX] - foundedRow[SOURCE_INDEX] : 0
    const newNumber = foundedRow ? number + offset : number


    return findDestinationNumbers(newNumber, indexRow + 1)
  }
  
  const results = {}
  parsedMaps[0].mapping[0].forEach((seed) => {
    results[seed] = findDestinationNumbers(seed, 1)
  })
  const min = Math.min(...Object.values(results));
  console.log(`Result ${min}`)
};

main();
