import { ceil, includes } from "lodash";
import pointInPolygon from "point-in-polygon";

type Coordinate = {
  x: number;
  y: number;
  value: "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";
};

/**
 * Converts the input string into an array of coordinates.
 * Each coordinate represents a point on a grid.
 * @param input The input string representing the grid.
 * @returns An array of coordinates.
 */
const prepare = (input: string): Coordinate[] => {
  const arrays = input.split(/\n/).map((n) => n.split(""));
  const coordinates: Coordinate[] = [];
  arrays.forEach((row, y) => {
    row.forEach((value, x) => {
      coordinates.push({ x, y, value: value as Coordinate["value"] });
    });
  });
  return coordinates;
};

/**
 * Represents a set of coordinates and provides methods for movement and processing.
 */
class Coordinates {
  private coordinates: Coordinate[];
  private previous: Coordinate | undefined = undefined;
  points: Coordinate[] = [];
  current: Coordinate;
  steps: number = 0;

  constructor(coordinates: Coordinate[]) {
    this.coordinates = coordinates;
    this.previous = coordinates.find((n) => n.value === "S")!;
    this.current = coordinates.find((n) => n.value === "S")!;
    this.setStarting();
  }

  /**
   * Sets the starting point for the coordinates.
   * Determines the initial direction of movement.
   */
  setStarting() {
    const above = this.find(this.current.x, this.current.y - 1);
    const below = this.find(this.current.x, this.current.y + 1);
    const left = this.find(this.current.x - 1, this.current.y);
    const right = this.find(this.current.x + 1, this.current.y);
    if (above?.value !== ".") {
      return this.moveUp();
    }
    if (right?.value !== ".") {
      return this.moveRight();
    }
    if (below?.value !== ".") {
      return this.moveDown();
    }
    if (left?.value !== ".") {
      return this.moveLeft();
    }
  }

  /**
   * Finds a coordinate with the specified x and y values.
   * @param x The x value of the coordinate.
   * @param y The y value of the coordinate.
   * @returns The found coordinate, or undefined if not found.
   */
  private find = (x: Coordinate["x"], y: Coordinate["y"]) => {
    return this.coordinates.find((n) => n.x === x && n.y === y);
  };

  private moveUp() {
    this.previous = this.current;
    this.current = this.find(this.current.x, this.current.y - 1)!;
    this.points.push(this.current);
    this.steps += 1;
  }

  private moveDown() {
    this.previous = this.current;
    this.current = this.find(this.current.x, this.current.y + 1)!;
    this.points.push(this.current);
    this.steps += 1;
  }

  private moveLeft() {
    this.previous = this.current;
    this.current = this.find(this.current.x - 1, this.current.y)!;
    this.points.push(this.current);
    this.steps += 1;
  }

  private moveRight() {
    this.previous = this.current;
    this.current = this.find(this.current.x + 1, this.current.y)!;
    this.points.push(this.current);
    this.steps += 1;
  }

  /**
   * Processes the next step in the movement.
   * Determines the direction based on the current coordinate value.
   */
  process() {
    const prev = this.previous!;
    const curr = this.current;

    if (curr?.value === "|") {
      if (prev.y < curr.y) {
        this.moveDown();
      } else {
        this.moveUp();
      }
    } else if (curr?.value === "-") {
      if (prev.x > curr.x) {
        this.moveLeft();
      } else {
        this.moveRight();
      }
    } else if (curr?.value === "L") {
      if (prev.y < curr.y) {
        this.moveRight();
      } else {
        this.moveUp();
      }
    } else if (curr?.value === "J") {
      if (prev.y < curr.y) {
        this.moveLeft();
      } else {
        this.moveUp();
      }
    } else if (curr?.value === "7") {
      if (prev.x < curr.x) {
        this.moveDown();
      } else {
        this.moveLeft();
      }
    } else if (curr?.value === "F") {
      if (prev.x > curr.x) {
        this.moveDown();
      } else {
        this.moveRight();
      }
    }
  }

  /**
   * Returns the coordinates that are inside the polygon formed by the points.
   * @returns An array of coordinates inside the polygon.
   */
  getPointsPolygon() {
    const polygon = this.points.map((n) => [n.x, n.y]);
    const inside: Coordinate[] = [];
    this.coordinates.forEach((n) => {
      if (includes(this.points, n)) return;
      const point = [n.x, n.y];
      if (pointInPolygon(point, polygon)) {
        inside.push(n);
      }
    });
    return inside;
  }

  /**
   * Prints the map with different symbols representing the coordinates.
   * 🟩: Starting point
   * 🟥: Points inside the polygon
   * 🟨: Other coordinates
   * ⬛︎: Empty space
   */
  printMap() {
    const highestX = Math.max(...this.coordinates.map((n) => n.x));
    const highestY = Math.max(...this.coordinates.map((n) => n.y));
    let row = "";
    const pointsInPolygon = this.getPointsPolygon();
    for (let y = 0; y <= highestY; y++) {
      for (let x = 0; x <= highestX; x++) {
        const coord = this.find(x, y);
        const point = pointsInPolygon.find((n) => n.x === x && n.y === y);
        if (coord?.value === "S") {
          row += "🟩";
        } else if (!!point) {
          row += "🟥";
        } else if (coord?.value !== ".") {
          row += "🟨";
        } else {
          row += "⬛︎";
        }
      }
      row += "\n";
    }
    console.log(row);
  }
}

/**
 * Calculates the solution for part one of the Advent of Code challenge.
 * @param input The input string.
 * @returns The solution for part one.
 */
export const partOne = (input: string) => {
  const data = prepare(input);
  const coords = new Coordinates(data);
  while (coords.current.value !== "S") {
    coords.process();
  }
  return ceil(coords.steps / 2);
};

/**
 * Calculates the solution for part two of the Advent of Code challenge.
 * @param input The input string.
 * @returns The solution for part two.
 */
export const partTwo = (input: string) => {
  const data = prepare(input);
  const coords = new Coordinates(data);
  while (coords.current.value !== "S") {
    coords.process();
  }
  const points = coords.getPointsPolygon();
  coords.printMap();
  return points.length;
};
