import { flatten } from "lodash";

/**
 * Represents a coordinate with x and y values, along with an id.
 */
type Coordinate = {
  x: number;
  y: number;
  id: string;
  value: string;
};

/**
 * Expands the given 2D boolean array by duplicating rows and columns that do not contain `true` values.
 * @param rows The 2D boolean array to expand.
 * @returns The expanded 2D boolean array.
 */
const expand = (rows: Coordinate[], multiplier: number = 1): Coordinate[] => {
  const maxY = Math.max(...rows.map((r) => r.y));
  const maxX = Math.max(...rows.map((r) => r.x));

  // Loop through the rows and get the ones that are blank
  let missingRows: number[] = [];
  for (let y = 0; y < maxY; y++) {
    const index = rows.findIndex((r) => r.y === y);
    if (index === -1) {
      missingRows.push(y);
    }
  }

  // Loop through the columns and get the ones that are blank
  let missingColumns: number[] = [];
  for (let x = 0; x < maxX; x++) {
    const index = rows.findIndex((r) => r.x === x);
    if (index === -1) {
      missingColumns.push(x);
    }
  }

  // Map them and add the multiplier value to show expansion
  return rows.map((row, i) => {
    const newX = missingColumns.filter((v) => v < row.x).length * multiplier;
    const newY = missingRows.filter((v) => v < row.y).length * multiplier;
    row.x += newX;
    row.y += newY;
    row.id = `${row.x},${row.y}`;
    return row;
  });
};

/**
 * Converts the input string into an array of Coordinate objects.
 * @param input The input string.
 * @returns An array of Coordinate objects.
 */
const prepare = (input: string): Coordinate[] => {
  return flatten(
    input.split(/\n/).map((row, rowIndex) =>
      row
        .split("")
        .map((col, colIndex) => ({
          x: colIndex,
          y: rowIndex,
          id: `${colIndex},${rowIndex}`,
          value: col,
        }))
        .filter((v) => v.value === "#")
    )
  );
};

/**
 * Calculates the Manhattan distance between two Coordinate objects.
 * @param a The first Coordinate.
 * @param b The second Coordinate.
 * @returns The Manhattan distance between the two Coordinates.
 */
const getDistance = (a: Coordinate, b: Coordinate) => {
  const distance = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  return distance;
};

/**
 * Calculates the total distance between all pairs of Coordinates in the input string.
 * @param input The input string.
 * @returns The total distance.
 */
export const partOne = (input: string) => {
  const rows = prepare(input);
  const data = expand(rows);
  let total = 0;
  let visited: string[] = [];
  data.forEach((firstValue, i) => {
    data
      .filter((d) => !visited.includes(d.id))
      .forEach((secondValue) => {
        if (!firstValue || !secondValue) return;
        if (firstValue?.id === secondValue?.id) return;
        total += getDistance(firstValue, secondValue);
      });
    visited.push(firstValue.id);
  });
  return total;
};

/**
 * Calculates the total distance between all pairs of Coordinates in the input string.
 * @param input The input string.
 * @returns The total distance.
 */
export const partTwo = (input: string, multiplier: number) => {
  const rows = prepare(input);
  const data = expand(rows, multiplier - 1);
  let total = 0;
  let visited: string[] = [];
  data.forEach((firstValue, i) => {
    data
      .filter((d) => !visited.includes(d.id))
      .forEach((secondValue) => {
        if (!firstValue || !secondValue) return;
        if (firstValue?.id === secondValue?.id) return;
        total += getDistance(firstValue, secondValue);
      });
    visited.push(firstValue.id);
  });
  return total;
};
