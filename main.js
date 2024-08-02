import { Tree } from "./binarySearchTrees.js";

const { buildTree, prettyPrint, insert } = Tree();

const myArr = [1, 7, 4, 9, 2, 3, 1, 2, 3, 4, 5, 6, 6, 6, 21, 12];
console.log(buildTree(myArr));

insert(30);
insert(8);
insert(17);
insert(0);

console.log(prettyPrint());
