const fs = require("fs");

const FILE_PATH = "../input.txt";

const readFile = () => {
  return fs.readFileSync(FILE_PATH, "utf8");
};

const findGear = (str) => str.match(/[*]+/);

const findNumber = (row, index) => {
  let result = [row[index]];
  let offset = 1;

  while (row[index - offset]?.match(/[0-9]/)) {
    result = [row[index - offset], ...result];
    offset++;
  }

  offset = 1;

  while (row[index + offset]?.match(/[0-9]/)) {
    result = [...result, row[index + offset]];
    offset++;
  }

  return Number(result.join(""));
};

const hasSpecialCharacterAdjacent = (
  content,
  indexRow,
  indexNumber,
  numberLength
) => {
  let result = [];
  const start = indexNumber - 1 !== -1 ? indexNumber - 1 : 0;
  const end = indexNumber + numberLength + 1;

  let rowHasNumbers = [
    content[indexRow - 1]?.slice(start, end),
    content[indexRow]?.slice(start, end),
    content[indexRow + 1]?.slice(start, end),
  ];

  let patt = /\d+/igm;
  let offset = -1;
  rowHasNumbers.forEach((row) => {

    while ((match = patt.exec(row)) != null) {
      console.log('match', match)
      const completeRow = content[indexRow + offset]
      let number = findNumber(completeRow, indexNumber - 1 + match["index"]);

      result.push(number);
  }

    offset += 1;
  });

  console.warn(result)
  return result.length == 2 ? result.reduce((acc, value) => acc * value, 1) : 0
};

const main = () => {
  const content = readFile().split("\n");
  let result = 0;

  content.forEach((row, indexRow) => {
    let offset = 0;
    let input = row;
    let found = findGear(input);

    while (found) {
      let realIndex = offset + found["index"];
      value = hasSpecialCharacterAdjacent(
        content,
        indexRow,
        realIndex,
        found[0].length
      );

      result += value;

      let length = found["index"] + found[0].length;
      offset += length;
      input = input.slice(length);
      found = findGear(input);
    }
  });
  console.log("result", result);
};

main();
