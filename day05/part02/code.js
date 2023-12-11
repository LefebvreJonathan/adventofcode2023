const fs = require("fs");

const FILE_PATH = "../input.txt";
const DESTINATION_INDEX = 0;
const SOURCE_INDEX = 1;
const LENGTH_INDEX = 2;

const readFile = () => {
  return fs.readFileSync(FILE_PATH, "utf8");
};

const addMissingRanges = (mapping) => {
  let allMapping = [...mapping];
  if (allMapping[0][0] !== 0) {
    allMapping = [[0, 0, allMapping[0][DESTINATION_INDEX] - 1], ...allMapping];
  }
  lastMap = [...mapping].pop();
  allMapping = [
    ...allMapping,
    [
      lastMap[DESTINATION_INDEX] + lastMap[LENGTH_INDEX],
      lastMap[DESTINATION_INDEX] + lastMap[LENGTH_INDEX],
      Infinity,
    ],
  ];

  return allMapping;
};

const parseFile = (content) => {
  const parts = content.split("\n\n");
  const parsedMaps = parts.map((part) => {
    const [firstLine, ...restLines] = part.split("\n");
    const firstLineParsed = firstLine.split(":");
    const mapping = [firstLineParsed[1], ...restLines]
      .filter((x) => x)
      .map((numbers) =>
        numbers
          .split(" ")
          .filter((x) => x)
          .map((x) => Number(x))
      );
    const toSort = (a, b) => a[DESTINATION_INDEX] - b[DESTINATION_INDEX];

    return {
      history: [],
      name: firstLineParsed[0],
      mapping: addMissingRanges(mapping.sort(toSort)),
    };
  });

  return parsedMaps;
};

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

const searchRangeMapping = (mappingsToFound, map) => {
  let mappingContains = [];

  mappingsToFound.forEach(mapping => {

    const minimum = mapping[SOURCE_INDEX];
    const maximum = mapping[SOURCE_INDEX] + mapping[LENGTH_INDEX];
    map.mapping.forEach((lastMapping) => {
      const maxDest = lastMapping[DESTINATION_INDEX] + lastMapping[LENGTH_INDEX];
  
      if (lastMapping[DESTINATION_INDEX] <= minimum && minimum < maxDest) {
        mappingContains.push(lastMapping);
      }

      if (lastMapping[DESTINATION_INDEX] <= maximum && maximum < maxDest) {
        mappingContains.push(lastMapping);
      }
    });
  })
  
  return mappingContains
}

const testOverlap = (x1, x2,y1, y2) => {
  
  if (x1 >= y1 && x1 <= y2)
    return [x1, x2] // (2,  3, 1, 4)
  if (x2 >= y1 && x2 <= y2)
    return [y1, x2] // (1,  3, 2, 4)
  if (y1 >= x1 && y1 <= x2)
    return [y1, y2] // (1, 4, 2,  3)
  if (y2 >= x1 && y2 <= x2)
      return [x1, y2]
  return null
}

const main = () => {
  const content = readFile();
  let parsedMaps = parseFile(content);
  parsedMaps = parsedMaps.reverse();

  const seeds = parsedMaps.pop();

  const lastMap = parsedMaps[0];

  map = lastMap.mapping[0];

  let mappingContains = [map]
  for (let parsedMap of parsedMaps) {
    mappingContains = new Set(searchRangeMapping(mappingContains, parsedMap).sort((a, b) => a[0] - b[0]))
  }
  [...mappingContains].sort((a, b) => a[SOURCE_INDEX] - b[SOURCE_INDEX]).forEach(m => {
    console.log('start', m[SOURCE_INDEX])
    console.log('end', m[SOURCE_INDEX] + m[LENGTH_INDEX])
  })
};

let date1 = new Date();
console.log(date1);
main();
let date2 = new Date();
console.log("duration", date2 - date1);
