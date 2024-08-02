import { Tree } from "./binarySearchTrees.js";

const { buildTree } = Tree();

const myArr = [1, 7, 4, 9, 2, 3, 1, 2, 3, 4, 5, 6, 6, 6, 21, 12];
console.log(buildTree(myArr));
