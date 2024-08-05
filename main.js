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
    height
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

// Find the node with value 6
const myNode = 6;
const heightOfNode = height(myNode);
console.log(`Height of the '${myNode}' node is ${heightOfNode}.`);
