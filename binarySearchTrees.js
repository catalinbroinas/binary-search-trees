import { ArrayMethod } from "./utility.js";

function CreateNode(data, left = null, right = null) {
    return {
        data,
        left,
        right
    };
}

function Tree(root = null) {
    const { sortArray, removeDuplicate } = ArrayMethod();
}

export { Tree };