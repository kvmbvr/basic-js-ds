const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (data === undefined || data === null) {
      throw new Error("Invalid parameter: 'data' cannot be null or undefined.");
    }
    this.rootNode = this.#addNode(this.rootNode, data);
  }

  #addNode(node, data) {
    if (node === null) {
      return new Node(data);
    } else if (data > node.data) {
      node.right = this.#addNode(node.right, data);
    } else if (data < node.data) {
      node.left = this.#addNode(node.left, data);
    }

    return node;
  }

  has(data) {
    return this.#hasNode(this.rootNode, data);
  }

  #hasNode(node, data) {
    if (node === null) {
      return false;
    }

    if (data < node.data) {
      return this.#hasNode(node.left, data);
    } else if (data > node.data) {
      return this.#hasNode(node.right, data);
    } else {
      return true;
    }
  }

  find(data) {
    return this.#findNode(this.rootNode, data);
  }

  #findNode(node, data) {
    while (node !== null && node.data !== data) {
      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    return node;
  }
  remove(data) {
    this.rootNode = this.#removeNode(this.rootNode, data);
  }

  #removeNode(node, data) {
    if (node == null) {
      return null;
    }
    if (data == node.data) {
      if (node.left == null && node.right == null) {
        return null;
      }
      if (node.left == null) {
        return node.right;
      }
      if (node.right == null) {
        return node.left;
      }
      let tempNode = node.right;
      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }
      node.data = tempNode.data;

      node.right = this.#removeNode(node.right, tempNode.data);
      return node;
    } else if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
      return node;
    } else {
      node.right = this.#removeNode(node.right, data);
      return node;
    }
  }

  min() {
    let node = this.rootNode
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
