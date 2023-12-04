const fs = require("fs");

const FILE_PATH = "../input.txt";

const readFile = () => {
  return fs.readFileSync(FILE_PATH, "utf8");
};

const findNumbers = (str) => str.match(/[0-9]+/);

const hasSpecialCharacterAdjacent = (
  content,
  indexRow,
  indexNumber,
  numberLength
) => {
  const start = indexNumber - 1 !== -1 ? indexNumber - 1 : 0;

  let block = [
    content[indexRow - 1]?.slice(start, indexNumber + numberLength + 1),
    content[indexRow]?.slice(start, indexNumber + numberLength + 1),
    content[indexRow + 1]?.slice(start, indexNumber + numberLength + 1),
  ];

  block = block
    .filter((item) => item)
    .join("")
    .replace(/[0-9.]/g, "");

  return block.length !== 0;
};

const main = () => {
  const content = readFile().split("\n");
  let result = 0;

  content.forEach((row, indexRow) => {
    let offset = 0;
    let input = row;
    let found = findNumbers(input);

    while (found) {
      let realIndex = offset + found["index"];
      if (
        hasSpecialCharacterAdjacent(
          content,
          indexRow,
          realIndex,
          found[0].length
        )
      ) {
        result += Number(found[0]);
      }
      let length = found["index"] + found[0].length;
      offset += length;
      input = input.slice(length);
      found = findNumbers(input);
    }
  });
  console.log("result", result);
};

main();
