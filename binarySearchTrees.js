import { ArrayMethod } from "./utility.js";

function CreateNode(data, left = null, right = null) {
    return {
        data,
        left,
        right
    };
}

function Tree() {
    const { sortArray, removeDuplicate } = ArrayMethod();

    // Convert the sorted, unique array to a balanced BST
    const buildTree = (arr) => {
        // Check if the array is valid
        if (!Array.isArray(arr) || !arr.length) {
            return null;
        }

        // Sort and remove duplicates
        const treeArr = sortArray(removeDuplicate(arr));

        // Initialize the root node with the middle element
        const mid = Math.floor(treeArr.length / 2);
        const root = CreateNode(treeArr[mid]);

        // Initialize the queue with the root node and the initial subarray ranges
        const q = [[root, [0, mid - 1]], [root, [mid + 1, treeArr.length - 1]]];

        while (q.length > 0) {
            const [parent, [left, right]] = q.shift();

            // Process subarrays
            if (left <= right) {
                const mid = Math.floor((left + right) / 2);
                const child = CreateNode(treeArr[mid]);

                // Attach the child to the parent node
                if (treeArr[mid] < parent.data) {
                    parent.left = child;
                } else {
                    parent.right = child;
                }

                // Add child nodes and their respective subarray ranges to the queue
                q.push([child, [left, mid - 1]]);
                q.push([child, [mid + 1, right]]);
            }
        }

        return root;
    };

    return {
        buildTree
    };
}

export { Tree };