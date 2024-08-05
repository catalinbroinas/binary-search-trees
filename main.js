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
    postOrder
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
levelOrder(prettyPrint);    // Level order

// Binary Tree Traversal: Depth-first traversal
inOrder(prettyPrint);       // In order
preOrder(prettyPrint);      // Pre order
postOrder(prettyPrint);     // Post order
