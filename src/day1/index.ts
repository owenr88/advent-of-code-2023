import { first, last } from "lodash";

/**
 * Input the string and return an array
 * @param input string
 */
const prepare = (input: string): string[] => {
  return input.split(/\n/).filter(Boolean);
};

/**
 * @param input String input
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
 * @param input String input
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
    // Convert the string to an array of digits

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
