import { BTreeNode } from "./BTreeNode.js";

export const DEFAULT_NODE_CONFIG = {
  radius: 20,
  nodeWidthSpacing: 50,
  nodeHeightSpacing: 90,
  fontSize: 15,
};

/**
 * The function calculates the required height and width for a canvas based on the height of a tree
 * data structure.
 * @param root - The `root` parameter in the `getRequiredHeightWidth` function is likely referring to
 * the root node of a tree data structure. The function calculates the required height and width for a
 * canvas based on the height of the tree rooted at the provided `root` node.
 * @returns An object containing the calculated canvas width and height is being returned.
 */
export function getRequiredHeightWidth(root) {
  const heightOfTree = root.getBTreeHeight();
  const maxPosLeafNodes = Math.pow(2, heightOfTree);

  const canvasHeight = heightOfTree * DEFAULT_NODE_CONFIG.nodeHeightSpacing;
  const canvasWidth = maxPosLeafNodes * DEFAULT_NODE_CONFIG.nodeWidthSpacing;

  return { canvasWidth, canvasHeight };
}

/**
 * The `drawNode` function in JavaScript draws a circle on a canvas element with a specified value at a
 * given position.
 * @param value - The `value` parameter in the `drawNode` function represents the value that will be
 * displayed inside the circle that is being drawn on the canvas. It is the content that you want to
 * visually represent within the node.
 * @param {HTMLCanvasElement} canvasEl - The `canvasEl` parameter is the HTML `<canvas>` element on which you want to draw the
 * node. It is used to get the 2D rendering context for the canvas where the node will be drawn.
 * @param x - The `x` parameter in the `drawNode` function represents the x-coordinate where the node
 * will be drawn on the canvas. It determines the horizontal position of the center of the circle
 * representing the node.
 * @param y - The `y` parameter in the `drawNode` function represents the vertical position where the
 * node will be drawn on the canvas. It determines the distance from the top of the canvas to the
 * center of the node.
 */
export function drawNode(value, canvasEl, x, y) {
  const context = canvasEl.getContext("2d");

  //draw circle
  context.beginPath();
  context.arc(x, y, DEFAULT_NODE_CONFIG.radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();

  //draw circle border
  context.beginPath();
  context.arc(x, y, DEFAULT_NODE_CONFIG.radius, 0, 2 * Math.PI, false);
  context.lineWidth = 3;
  context.strokeStyle = "#b994f6";
  context.stroke();

  //write value inside circle
  context.font = `${DEFAULT_NODE_CONFIG.fontSize}px serif`;
  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.fillText(value, x, y + DEFAULT_NODE_CONFIG.fontSize / 3);
}

/**
 * The function `connectEdges` draws a curved line connecting two points on a canvas element using
 * bezier curves.
 * @param {HTMLCanvasElement} canvasEl - The `canvasEl` parameter is the HTML canvas element on which you want to draw the
 * curve connecting two points. This function uses the canvas 2D drawing context to create a bezier
 * curve connecting the specified coordinates.
 * @param xCordinates - The `xCordinates` parameter contains the x-axis coordinates for the start and
 * end points of the curve to be drawn. It is an object with the properties `xStart` and `xEnd`.
 * @param yCordinates - The `yCordinates` parameter in the `connectEdges` function contains the
 * starting and ending y-coordinates for drawing a curved line on a canvas element. It includes the
 * `yStart` and `yEnd` values which represent the y-coordinate of the starting point and the
 * y-coordinate of the
 */
export function connectEdges(canvasEl, xCordinates, yCordinates) {
  const { xStart, xEnd } = xCordinates;
  const { yStart, yEnd } = yCordinates;
  const xHalf = (xStart + xEnd) / 2;
  const yHalf = (yStart + yEnd) / 2;

  const start = { x: xStart, y: yStart };
  const end = { x: xEnd, y: yEnd };

  const cp1 = { x: xHalf, y: yHalf };
  const cp2 = { x: xEnd, y: yHalf };

  //draw curve
  const context = canvasEl.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#ffffff";
  context.lineWidth = 1;

  context.moveTo(start.x, start.y);
  context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);

  context.stroke();
}

/**
 * The `treeConstructor` function parses an input string into an array, creates a binary tree structure
 * based on the input, and returns the root node of the tree.
 * @param {string} input - that is meant to construct a binary tree from a given input string. The input string is
 * expected to be parsed into an array before processing.
 * @returns The `treeConstructor` function is returning the root node of a binary tree that is
 * constructed based on the input provided.
 */
export function treeConstructor(input) {
  const newinput = parseInput(input); //parse input string into array

  const queue = [];

  let idx = 0;
  const root = new BTreeNode(input[idx]);
  idx++;

  queue.push(root);

  while (queue.length > 0 && idx < newinput.length) {
    const node = queue.shift();

    //left child
    if (idx < newinput.length) {
      if (newinput[idx] !== null) {
        const leftNode = new BTreeNode(newinput[idx]);
        node.setLeftChild(leftNode);
        queue.push(leftNode);
      }
      idx++;
    }

    //right child
    if (idx < newinput.length) {
      if (newinput[idx] !== null) {
        const rightNode = new BTreeNode(newinput[idx]);
        node.setRightChild(rightNode);
        queue.push(rightNode);
      }
      idx++;
    }
  }

  return root;
}

/**
 * The function `parseInput` removes spaces from the input string, splits it by commas, and converts
 * any "null" strings to actual null values.
 * @param {string} inputVal - The `parseInput` function takes a string `inputVal` as input. This function
 * removes any spaces from the input string and then splits the string by commas. It maps over the
 * resulting array, converting any element that is the string "null" to `null`, and leaving other
 * elements unchanged.
 * @returns The `parseInput` function takes a string `inputVal`, removes any spaces, splits the string
 * by commas, and maps each element to either `null` if the element is "null" or the element itself.
 * The function returns an array of the parsed elements.
 */
function parseInput(inputVal) {
  let parsedInput = "";

  for (const c of inputVal) {
    if (c !== " ") parsedInput += c;
  }

  return parsedInput.split(",").map((e) => {
    if (e === "null") return null;
    else return e;
  });
}
