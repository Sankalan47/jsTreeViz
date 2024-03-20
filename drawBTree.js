import { BTreeNode } from "./BTreeNode.js";
import {
  DEFAULT_NODE_CONFIG,
  connectEdges,
  drawNode,
  getRequiredHeightWidth,
  treeConstructor,
} from "./treeUtils.js";

/* The line `const canvas = document.querySelector("canvas");` is selecting the `<canvas>` element from
the HTML document using the `document.querySelector()` method. It is assigning the reference to this
canvas element to the variable `canvas`, which can then be used to interact with and draw on the
canvas within the JavaScript code. */
const canvas = document.querySelector("canvas");

/**
 * The function `drawBTree` sets up and draws a binary tree structure on a canvas element within the
 * browser window.
 * @param rootEl - The `rootEl` parameter in the `drawBTree` function represents the root element of a
 * binary tree data structure. This element serves as the starting point for drawing the binary tree on
 * the canvas.
 * @param canvasEl - The `canvasEl` parameter in the `drawBTree` function is the HTML canvas element
 * where the binary tree will be drawn. It is the element on the webpage where the tree visualization
 * will be displayed.
 */
function drawBTree(rootEl, canvasEl) {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;

  //initialize canvas dimensions
  canvasEl.width = maxWidth;
  canvasEl.height = maxHeight;

  const { canvasWidth, canvasHeight } = getRequiredHeightWidth(rootEl);

  const windowCenter = maxWidth / 2;
  const widthCenter = canvasWidth / 2;

  const xStart = windowCenter - widthCenter;
  const xEnd = windowCenter + widthCenter;

  const horizontalConfig = { xStart, xEnd };

  //Draw
  recursivelyDrawNodes(rootEl, canvasEl, 0.5, horizontalConfig);
}

/**
 * The function recursivelyDrawNodes draws nodes on a canvas in a tree-like structure with connections
 * between them.
 * @param {BTreeNode} root - The `root` parameter in the `recursivelyDrawNodes` function represents the current
 * node being processed in the recursive drawing algorithm. It contains information about the value of
 * the node and its left and right children.
 * @param {HTMLCanvasElement} canvasEl - The `canvasEl` parameter is the HTML canvas element where the nodes will be drawn.
 * It is the target canvas element on which the nodes and edges will be visually represented.
 * @param {number} currentLevel - The `currentLevel` parameter in the `recursivelyDrawNodes` function represents
 * the level of the current node in the binary tree. It helps in determining the vertical position
 * (y-coordinate) of the node on the canvas based on the spacing between levels defined in
 * `DEFAULT_NODE_CONFIG.nodeHeightSpacing`.
 * @param horizontalConfig - The `horizontalConfig` parameter in the `recursivelyDrawNodes` function is
 * an object that contains information about the horizontal positioning of the nodes being drawn. It
 * typically includes the `xStart` and `xEnd` values which represent the starting and ending
 * x-coordinates for the current level of nodes
 */
function recursivelyDrawNodes(root, canvasEl, currentLevel, horizontalConfig) {
  //algo
  // 1. Find root cordinates
  // 2. Draw root circle
  // 3. Recursively draw left and right
  // 4. Connect Nodes
  const { xStart, xEnd } = horizontalConfig;

  const xPos = (xStart + xEnd) / 2;
  const yPos = currentLevel * DEFAULT_NODE_CONFIG.nodeHeightSpacing;
  drawNode(root.value, canvasEl, xPos, yPos);

  if (root.leftChild && root.leftChild !== null) {
    const leftNodeHorizontalConfig = { xStart, xEnd: xPos };

    recursivelyDrawNodes(root.leftChild, canvasEl, currentLevel + 1, leftNodeHorizontalConfig);

    connectEdges(
      canvasEl,
      { xStart: xPos, xEnd: (xStart + xPos) / 2 },
      {
        yStart: yPos + DEFAULT_NODE_CONFIG.radius,
        yEnd:
          (currentLevel + 1) * DEFAULT_NODE_CONFIG.nodeHeightSpacing - DEFAULT_NODE_CONFIG.radius,
      }
    );
  }
  if (root.rightChild && root.rightChild !== null) {
    const rightNodeHorizontalConfig = { xStart: xPos, xEnd };

    recursivelyDrawNodes(root.rightChild, canvasEl, currentLevel + 1, rightNodeHorizontalConfig);

    connectEdges(
      canvasEl,
      { xStart: xPos, xEnd: (xPos + xEnd) / 2 },
      {
        yStart: yPos + DEFAULT_NODE_CONFIG.radius,
        yEnd:
          (currentLevel + 1) * DEFAULT_NODE_CONFIG.nodeHeightSpacing - DEFAULT_NODE_CONFIG.radius,
      }
    );
  }
}

const textarea = document.querySelector(".form-control");
const applyButton = document.querySelector(".apply__button");
const clearButton = document.querySelector(".clear__button");

applyButton.addEventListener("click", () => {
  if (textarea?.value.length === 0) return;

  init(textarea.value);
});

clearButton.addEventListener("click", () => {
  textarea.value = "";
  clearCanvas();
});

let prevInput = "";

/**
 * The `init` function initializes a binary tree with the given value and draws it on a canvas.
 * @param {string} value - The `init` function takes a parameter called `value`, which is used to
 * initialize the canvas with a binary tree structure. The `value` parameter represents the
 * initial value or data that will be used to construct the binary tree.
 */
function init(value) {
  prevInput = value;

  clearCanvas();

  const root = treeConstructor(value);
  drawBTree(root, canvas);
}

/**
 * The function `clearCanvas` clears the content of a canvas element using the HTML5 Canvas API.
 */
function clearCanvas() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", () => {
  if (textarea.value === "") return;
  init(prevInput);
});
