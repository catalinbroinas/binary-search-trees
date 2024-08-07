// ========================
// This file contains tests for the `binarySearchTrees` modules.
// ========================

import { Tree } from "./binarySearchTrees.js";

const {
    buildTree,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    toArray,
    heightOfTree,
    height,
    depth,
    isBalanced,
    rebalance
} = Tree();

// Initialize the tree with an array of values
const myArr = [1, 7, 4, 9, 2, 3, 1, 2, 3, 4, 5, 6, 6, 6, 21, 12];
console.log("Initial tree:");
console.log(buildTree(myArr));

// Insert new nodes into the tree
insert(30);
insert(8);
insert(17);
insert(0);

// Print the tree and perform operations
console.log("Tree after insertions:");
console.log(prettyPrint());

// Delete specific nodes
deleteItem(0);
deleteItem(21);

// Print the updated tree and check node existence
console.log("Tree after deletions:");
console.log(prettyPrint());
console.log("Find operations:");
console.log(find(9));
console.log(find(21));
console.log(find(30));
console.log(find(0));

// Binary Tree Traversal: Breadth-first and Depth-first traversals
console.log("Binary Tree Traversals:");
const levelOrderArray = toArray(levelOrder);
const inOrderArray = toArray(inOrder);
const preOrderArray = toArray(preOrder);
const postOrderArray = toArray(postOrder);

console.log("Level-order traversal:", levelOrderArray);
console.log("In-order traversal:", inOrderArray);
console.log("Pre-order traversal:", preOrderArray);
console.log("Post-order traversal:", postOrderArray);

// Height of the tree and specified nodes
console.log(`Height of the tree is ${heightOfTree()}.`);

let node = find(3);
if (node) {
    console.log(`Height of the "${node.data}" node is ${height(node)}.`);
}

// Depth of the specified node
node = find(9);
if (node) {
    console.log(`Depth of the "${node.data}" node is ${depth(node)}.`);
}

// Check if the tree is balanced
console.log("Initial balance check:");
console.log("Tree is:");
console.log(prettyPrint());
console.log("The tree is balanced:", isBalanced());

// Delete a node and check balance
deleteItem(17);
console.log("Tree after removing a node:");
console.log(prettyPrint());
console.log("The tree is balanced:", isBalanced());

// Insert nodes to unbalance the tree
insert(17);
insert(16);
console.log("Tree after inserting nodes to unbalance:");
console.log(prettyPrint());
console.log("The tree is balanced:", isBalanced());

// Rebalance the tree and check balance
console.log("Tree after rebalancing:");
rebalance();
console.log("The tree is balanced:", isBalanced());
