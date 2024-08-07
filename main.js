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

const myArr = [1, 7, 4, 9, 2, 3, 1, 2, 3, 4, 5, 6, 6, 6, 21, 12];
console.log(buildTree(myArr));

insert(30);
insert(8);
insert(17);
insert(0);

console.log(prettyPrint());

deleteItem(0);
deleteItem(21);

console.log(prettyPrint());

console.log(find(9));
console.log(find(21));
console.log(find(30));
console.log(find(0));

// Binary Tree Traversal: Breadth-first traversal
const levelOrderArray = toArray(levelOrder);
console.log(levelOrderArray);

// Binary Tree Traversal: Depth-first traversal
const inOrderArray = toArray(inOrder);
const preOrderArray = toArray(preOrder);
const postOrderArray = toArray(postOrder);

console.log(inOrderArray);
console.log(preOrderArray);
console.log(postOrderArray);

// Print the height of the tree
const treeHeight = heightOfTree();
console.log(`Height of the tree is ${treeHeight}.`);

// Print the height of the specified node
let node = find(3);
const nodeHeight = height(node);
if (node) {
    console.log(`Height of the "${node.data}" node is ${nodeHeight}.`);
}

// Print the depth of the specified node
node = find(9);
const depthNode = depth(node);
if (node) {
    console.log(`Depth of the "${node.data}" node is ${depthNode}.`);
}

// Check if the tree is balanced and print the result
console.log('Tree is:');
console.log(prettyPrint());
console.log('The tree is balanced:', isBalanced());

// Delete node 17
deleteItem(17);

// Check if the tree is balanced and print the result
console.log('Tree after remove a node is:');
console.log(prettyPrint());
console.log('The tree is balanced:', isBalanced());

// Insert nodes for to unbalanced tree
insert(17);
insert(16);

// Check if the tree is balanced and print the result
console.log('Tree after insert two nodes is:');
console.log(prettyPrint());
console.log('The tree is balanced:', isBalanced());

// Rebalanced the tree and print new result
console.log('Tree after balanced is:');
rebalance();
console.log('The tree is balanced:', isBalanced());
