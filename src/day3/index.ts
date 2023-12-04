import { isNaN, isNumber, last, max, sum, toNumber } from "lodash";

/**
 * Converts the input string into a 2D array of characters.
 * Each character is represented as a string.
 * @param input The input string
 * @returns The 2D array of characters
 */
const prepare = (input: string): string[][] => {
  return input
    .split(/\n/)
    .filter(Boolean)
    .map((n) => n.split(""));
};

/**
 * Checks if a string is a valid symbol.
 * A valid symbol is any character that is not a number or a dot.
 * @param s The string to check
 * @returns True if the string is a valid symbol, false otherwise
 */
const isValid = (s?: string): boolean => {
  return !!s?.match(/^[^\d|\.]$/)?.length;
};

/**
 * Checks if a string is a number.
 * @param s The string to check
 * @returns True if the string is a number, false otherwise
 */
const isNum = (s: string): boolean => !!s && !isNaN(toNumber(s));

/**
 * Gets the numbers adjacent to symbols in a row.
 * @param row The row of characters
 * @param prevRow The previous row of characters
 * @param nextRow The next row of characters
 * @returns An array of numbers, null, or false representing the adjacent numbers
 */
export const getNumbersAdjacentToSymbols = (
  row: string[],
  prevRow?: string[],
  nextRow?: string[]
): (number | null | false)[] => {
  let values: (number | null | false)[] = [];
  row?.forEach((s, i) => {
    const val = () => {
      const thisIsNum = isNum(s);

      // Stop if the previous was/was not a number
      const prev = last(values);
      const next = row[i + 1];
      const prevIsNum = isNumber(prev);
      const nextIsNum = isNum(next);

      // Do some logic to return smart values
      if (!prevIsNum && !thisIsNum && !nextIsNum) return null;
      if (!prevIsNum && !thisIsNum && nextIsNum) return false;
      if (prevIsNum && thisIsNum) return 0;
      if (prevIsNum && !thisIsNum) return false;
      if (!thisIsNum) return null;

      // Get the full number
      let numberStr = s;
      let nextIndex = i + 1;
      while (!!row[nextIndex] && isNum(row[nextIndex])) {
        numberStr += row[nextIndex];
        nextIndex++;
      }
      const numberLenth = numberStr.length;
      const number = parseInt(numberStr);

      // Get the symbol to the left
      const symbolLeft = row[i - 1];
      if (isValid(symbolLeft)) return number;

      // Get the symbol to the right
      const symbolRight = row[i + numberLenth];
      if (isValid(symbolRight)) return number;

      // Get the parts above
      const aboveParts = prevRow?.slice(max([i - 1, 0]), i + numberLenth + 1);
      if (aboveParts?.some((n) => isValid(n))) return number;

      // Get the parts below
      const belowParts = nextRow?.slice(max([i - 1, 0]), i + numberLenth + 1);
      if (belowParts?.some((n) => isValid(n))) return number;

      return null;
    };
    values.push(val());
  });
  return values;
};

/**
 * Calculates the sum of the numbers adjacent to symbols in the input string.
 * @param input The input string
 * @returns The sum of the numbers adjacent to symbols
 */
export const partOne = (input: string): number => {
  const data = prepare(input);
  return data.reduce((acc, row, index) => {
    const numbers = getNumbersAdjacentToSymbols(
      row,
      data[index - 1],
      data[index + 1]
    );
    return acc + sum(numbers.filter(Boolean));
  }, 0);
};

/**
 * Checks if a string is a gear symbol.
 * @param s The string to check
 * @returns True if the string is a gear symbol, false otherwise
 */
const isGear = (s: string): boolean => s === "*";

/**
 * Filters and counts the matches in an array of numbers, false, or null values.
 * @param items The array of numbers, false, or null values
 * @param baseIndex The base index to filter the matches
 * @returns An array of numbers representing the filtered matches
 */
const filterCountMatches = (
  items: (number | false | null)[],
  baseIndex: number
): number[] => {
  let matches: number[] = [];
  let recentNumber: number | undefined;
  const range = [baseIndex - 1, baseIndex, baseIndex + 1];
  items.forEach((item, i) => {
    // Not a number
    if (!isNumber(item)) {
      recentNumber = undefined;
      return;
    }

    // Is a number over 0
    if (isNumber(item) && item > 0) {
      recentNumber = item;
    }

    // Stop if next is a number
    if (isNumber(items[i + 1]) && range.includes(i + 1)) {
      return;
    }

    // Only capture in range
    if (!range.includes(i)) return;

    // Add the recent number
    matches.push(recentNumber ?? 0);
    recentNumber = undefined;
  });
  return matches;
};

/**
 * Gets the gears adjacent to numbers in a row.
 * @param allRows The 2D array of characters representing all rows
 * @param index The index of the row to check
 * @returns An array of numbers representing the gears adjacent to numbers
 */
export const getGearsAdjacentToNumbers = (
  allRows: string[][],
  index: number
): number[] => {
  const row = allRows[index];
  return (
    row?.map((s, i) => {
      // Stop if it's not a gear
      if (!isGear(s)) return 0;

      // Get the numbers from the previous row
      const prev = allRows[index - 1];
      const prevMatches = getNumbersAdjacentToSymbols(
        prev,
        allRows[index - 2],
        row
      );
      const prevValues = filterCountMatches(prevMatches, i);

      // Get the numbers from the next row
      const next = allRows[index + 1];
      const nextMatches = getNumbersAdjacentToSymbols(
        next,
        row,
        allRows[index + 2]
      );
      const nextValues = filterCountMatches(nextMatches, i);

      // Get the numbers from this row
      const thisMatches = getNumbersAdjacentToSymbols(row, prev, next);
      const thisValues = filterCountMatches(thisMatches, i);

      // Return the values if there are two
      const values = [...prevValues, ...thisValues, ...nextValues].filter(
        Boolean
      );
      if (values.length === 2) {
        return values[0] * values[1];
      }

      return 0;
    }) ?? []
  );
};

/**
 * Calculates the sum of the gears adjacent to numbers in the input string.
 * @param input The input string
 * @returns The sum of the gears adjacent to numbers
 */
export const partTwo = (input: string): number => {
  const data = prepare(input);
  const v = data.reduce((acc, row, index) => {
    const numbers = getGearsAdjacentToNumbers(data, index);
    return acc + sum(numbers);
  }, 0);
  return v;
};
