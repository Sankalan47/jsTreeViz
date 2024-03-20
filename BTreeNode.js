/* The class `BTreeNode` represents a node in a binary tree data structure with methods to set left and
right child nodes and calculate the height of the binary tree. */
export class BTreeNode {
  value = null;
  leftChild = null;
  rightChild = null;

  /**
   * The constructor function initializes a node with a value and sets its left and right child nodes to
   * null.
   * @param value - The `value` parameter in the constructor function is used to initialize the value of
   * the node in a binary tree. It represents the data that the node holds.
   */
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }

  /**
   * The setLeftChild function assigns a value to the leftChild property of an object.
   * @param value - The `setLeftChild` function you provided is a method that sets the `leftChild`
   * property of an object to the value passed as an argument. The `value` parameter in this context
   * represents the value that will be assigned to the `leftChild` property.
   */
  setLeftChild(value) {
    this.leftChild = value;
  }
  /**
   * The function `setRightChild` sets the right child of a node to a specified value in a binary tree.
   * @param value - It looks like you are trying to define a method `setRightChild` in a class or object.
   * The `setRightChild` method takes a parameter `value`, which represents the value you want to set as
   * the right child of a node or element in a tree data structure.
   */
  setRightChild(value) {
    this.rightChild = value;
  }

  /**
   * The `getBTreeHeight` function calculates the height of a binary tree recursively.
   * @returns The `getBTreeHeight` method is returning the height of a binary tree starting from the
   * current node. It calculates the height by recursively calling the `getBTreeHeight` method on the
   * left and right child nodes, and then returning the maximum height between the left and right
   * subtrees plus 1.
   */
  getBTreeHeight() {
    const leftHeight = this.leftChild?.getBTreeHeight() || 0;
    const rightHeight = this.rightChild?.getBTreeHeight() || 0;

    return Math.max(leftHeight, rightHeight) + 1;
  }
}
