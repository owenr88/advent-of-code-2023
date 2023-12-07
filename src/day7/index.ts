import { chain, flatten, padStart, toNumber, uniq, uniqBy } from "lodash";

export type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

const cardStrengthA: Card[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const cardStrengthB: Card[] = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

type HandType =
  | "five-of-a-kind"
  | "four-of-a-kind"
  | "full-house"
  | "three-of-a-kind"
  | "two-pair"
  | "one-pair"
  | "high-card";

const handStrengthMap: HandType[] = [
  "high-card",
  "one-pair",
  "two-pair",
  "three-of-a-kind",
  "full-house",
  "four-of-a-kind",
  "five-of-a-kind",
];

type Hand = {
  cards: string[];
  type: HandType;
  typeWithJoker: HandType;
  score: number;
  scoreWithJoker: number;
  bid: number;
  rank: number;
  winnings: number;
};

/**
 * Returns an array of duplicate sets in the given array of cards.
 * A duplicate set is defined as a card that appears more than once in the array.
 *
 * @param cards - The array of cards to check for duplicate sets.
 * @returns An array of objects containing the duplicate card and the count of its occurrences.
 */
const getDuplicateSets = (cards: Card[]) => {
  const sets: { card: Card; count: number }[] = [];
  cards.forEach((card) => {
    const count = cards.filter((c) => c === card).length;
    if (count > 1) sets.push({ card, count });
  });
  return uniqBy(sets, "card");
};

/**
 * Calculates the type of a hand based on the given cards.
 * @param cards An array of Card objects representing the hand.
 * @returns The type of the hand as a string.
 */
export const calculateType = (cards: Card[]): HandType => {
  if (uniq(cards).length === cards.length) return "high-card";

  const sets = getDuplicateSets(cards);
  if (sets.length === 1) {
    const set = sets[0];
    if (set.count === 5) return "five-of-a-kind";
    if (set.count === 4) return "four-of-a-kind";
    if (set.count === 3) return "three-of-a-kind";
    if (set.count === 2) return "one-pair";
  }

  if (sets.length === 2) {
    const set1 = sets[0];
    const set2 = sets[1];
    if (set1.count === 3 && set2.count === 2) return "full-house";
    if (set1.count === 2 && set2.count === 3) return "full-house";
    if (set1.count === 2 && set2.count === 2) return "two-pair";
  }

  return "five-of-a-kind";
};

/**
 * Calculates the joker values for a given array of cards.
 * @param cards The array of cards.
 * @returns An object containing the highest hand with joker replacements and its type.
 */
export const getJokerValues = (cards: Card[]) => {
  if (!cards.includes("J")) {
    return {
      cards,
      type: calculateType(cards),
    };
  }

  const possibleReplacements = cardStrengthB.filter((card) => card !== "J");

  /**
   * Maps the replacements for the "J" card in the given array of cards.
   * If the array does not contain "J", it returns an array with the original cards.
   * If the array contains "J", it recursively replaces "J" with each possible replacement and returns all resulting arrays.
   * @param cards - The array of cards to map replacements for.
   * @returns An array of arrays, each representing a different set of replacements for the "J" card.
   */
  const mapReplacements = (cards: Card[]): Card[][] => {
    if (!cards.includes("J")) return [cards];
    const index = cards.findIndex((card) => card === "J");
    return flatten(
      possibleReplacements.map((replacement): Card[][] => {
        const newCards = [...cards];
        newCards[index] = replacement;
        if (!newCards.includes("J")) return [newCards];
        return mapReplacements(newCards);
      })
    );
  };

  const possibleHands = mapReplacements(cards);

  const highestHand = chain(possibleHands)
    .map((cards) => {
      const type = calculateType(cards);
      const handStrength = handStrengthMap.indexOf(type);
      return {
        cards,
        type,
        handStrength,
      };
    })
    .orderBy("handStrength", "desc")
    .first()
    .value();

  return {
    cards: highestHand.cards,
    type: highestHand.type,
  };
};

/**
 * Calculates the score based on the strength map, cards, and hand type.
 *
 * @param strengthMap - The array of cards representing the strength map.
 * @param cards - The array of cards in the hand.
 * @param type - The type of hand.
 * @returns The calculated score.
 */
const calculateScore = (
  strengthMap: Card[],
  cards: Card[],
  type: HandType
): number => {
  const handScore = handStrengthMap.indexOf(type).toString();
  const cardScores = cards.map((card) =>
    padStart(strengthMap.indexOf(card).toString(), 2, "0")
  );
  return toNumber(`${handScore}${cardScores.join("")}`);
};

/**
 * Prepares the input by parsing it into an array of Hand objects.
 * Each Hand object contains information about the cards, type, score, bid, rank, and winnings.
 * @param input - The input string to be parsed.
 * @returns An array of Hand objects.
 */
const prepare = (input: string): Hand[] => {
  return input.split(/\n/).map((n) => {
    const [_cards, bid] = n.split(/\s/);
    const cards = _cards.split("").filter(Boolean) as Card[];
    const type = calculateType(cards);
    const joker = getJokerValues(cards);
    return {
      cards,
      type,
      typeWithJoker: joker.type,
      score: calculateScore(cardStrengthA, cards, type),
      scoreWithJoker: calculateScore(cardStrengthB, cards, joker.type),
      bid: toNumber(bid),
      rank: 0,
      winnings: 0,
    };
  });
};

/**
 * Calculates the total winnings for a given input.
 *
 * @param input - The input string.
 * @returns The total winnings.
 */
export const partOne = (input: string) => {
  return chain(prepare(input))
    .orderBy("score", "asc")
    .map((hand, index) => ({
      ...hand,
      rank: index + 1,
      winnings: hand.bid * (index + 1),
    }))
    .reduce((acc, curr) => acc + curr.winnings, 0)
    .value();
};

/**
 * Calculates the total winnings for each hand in the input, based on the bid and rank.
 * The hands are sorted in ascending order of their score with a joker.
 *
 * @param input - The input string representing the hands.
 * @returns The total winnings for all hands.
 */
export const partTwo = (input: string) => {
  return chain(prepare(input))
    .orderBy("scoreWithJoker", "asc")
    .map((hand, index) => ({
      ...hand,
      rank: index + 1,
      winnings: hand.bid * (index + 1),
    }))
    .reduce((acc, curr) => acc + curr.winnings, 0)
    .value();
};
