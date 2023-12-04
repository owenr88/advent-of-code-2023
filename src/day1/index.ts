import { first, last } from "lodash";

/**
 * Prepares the input string by splitting it into an array of strings and filtering out empty strings.
 * @param input The input string to be prepared.
 * @returns An array of prepared strings.
 */
const prepare = (input: string): string[] => {
  return input.split(/\n/).filter(Boolean);
};

/**
 * Calculates the sum of the first and last digits of each string in the input array.
 * @param input The input string.
 * @returns The sum of the first and last digits.
 */
export const partOne = (input: string) => {
  const data = prepare(input);
  return data.reduce((acc, curr) => {
    const digits = curr.match(/\d/gm);
    if (!digits?.length) return acc;
    const firstDigit = first(digits) ?? "";
    const lastDigit = last(digits) ?? "";
    const number = `${firstDigit}${lastDigit}`;
    return parseInt(number) + acc;
  }, 0);
};

/**
 * Converts the first and last digits of each string in the input array to numbers and calculates their sum.
 * @param input The input string.
 * @returns The sum of the converted first and last digits.
 */
export const partTwo = (input: string) => {
  const data = prepare(input);
  const vals = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return data.reduce((acc, curr) => {
    // Convert the first digit to a number
    const firstRegex = new RegExp(`[0-9]|${vals.join("|")}`);
    let firstDigit = first(curr.match(firstRegex)) ?? "0";
    if (isNaN(parseInt(firstDigit)))
      firstDigit = (vals.indexOf(firstDigit) + 1).toString();

    // Convert the last digit to a number
    const lastRegex = new RegExp(`.*([0-9]|${vals.join("|")}).*$`);
    let lastDigit = curr.match(lastRegex)?.[1] ?? "0";
    if (isNaN(parseInt(lastDigit)))
      lastDigit = (vals.indexOf(lastDigit) + 1).toString();

    // Return the number
    const number = `${firstDigit}${lastDigit}`;
    return parseInt(number) + acc;
  }, 0);
};
