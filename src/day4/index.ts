import { intersection, sum, toNumber, trim } from "lodash";

/**
 * Represents a card with its ID, winning numbers, and player's numbers.
 */
interface Card {
  id: number;
  copies: number;
  winningNumbers: number[];
  myNumbers: number[];
}

/**
 * Input the string and return an array of cards.
 * @param input - The input string.
 * @returns An array of cards.
 */
const prepare = (input: string): Card[] => {
  return input
    .split(/\n/)
    .filter(Boolean)
    .map((n) => {
      const val = n.match(/^Card\s+(\d+):\s([^|]*)\|(.*)/);
      return {
        id: parseInt(val?.[1] ?? "0"),
        copies: 1,
        winningNumbers:
          val?.[2]
            .trim()
            .split(/\s/g)
            .map((v) => toNumber(trim(v)))
            .sort()
            .filter(Boolean) ?? [],
        myNumbers:
          val?.[3]
            .trim()
            .split(/\s/g)
            .map((v) => toNumber(trim(v)))
            .sort()
            .filter(Boolean) ?? [],
      };
    });
};

/**
 * Analyzes a card and calculates the score based on the winning numbers and the player's numbers.
 * @param card - The card to analyze.
 * @returns The score calculated based on the matches between the player's numbers and the winning numbers.
 */
const analyzeCardForScores = (card: Card): number => {
  const winningNumbers = card.winningNumbers;
  const myNumbers = card.myNumbers;
  const matches = intersection(myNumbers, winningNumbers);
  const score = matches.reduce((acc, match, i) => {
    if (i === 0) return 1;
    return acc * 2;
  }, 0);
  return score * card.copies;
};

/**
 * Calculates the total score for all cards in the input.
 * @param input - The input string.
 * @returns The total score.
 */
export const partOne = (input: string): number => {
  const data = prepare(input);
  return data.reduce((acc, card) => acc + analyzeCardForScores(card), 0);
};

/**
 * Analyzes a card and calculates the number of matches between the player's numbers and the winning numbers.
 * @param card - The card to analyze.
 * @returns The number of matches.
 */
const analyzeCardForMatches = (card: Card): number => {
  const winningNumbers = card.winningNumbers;
  const myNumbers = card.myNumbers;
  const matches = intersection(myNumbers, winningNumbers);
  return matches.length;
};

/**
 * Calculates the total number of cards after applying the matching rules.
 * @param input - The input string.
 * @returns The total number of cards.
 */
export const partTwo = (input: string): number => {
  const data = prepare(input);
  let cards = [...data];
  let index = 0;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const matches = analyzeCardForMatches(card);
    for (let match = i + 1; match <= i + matches; match++) {
      cards[index + match].copies += card.copies;
    }
  }
  return sum(cards.map((card) => card.copies));
};
