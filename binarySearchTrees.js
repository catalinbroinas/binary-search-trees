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
    let root = null;

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
        root = CreateNode(treeArr[mid]);

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

        // Print the tree structure for visualization
        prettyPrint(root);

        // Return the root of the constructed BST
        return root;
    };

    // Print the tree in a structured format (for debugging and visualization)
    const prettyPrint = (node = root, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }

        return true;
    };

    // Insert a value into the BST
    const insert = (value) => {
        if (!Number.isInteger(value)) {
            console.error('Value must be an integer');
            return false;
        }

        // Helper function to recursively insert a value
        const insertRecursively = (node, value) => {
            if (node === null) {
                return CreateNode(value);
            }

            if (value < node.data) {
                node.left = insertRecursively(node.left, value);
            } else if (value > node.data) {
                node.right = insertRecursively(node.right, value);
            }

            return node;
        };

        root = insertRecursively(root, value);
        return true;
    };

    // Delete item from the BST
    const deleteItem = (value) => {
        if (!Number.isInteger(value)) {
            console.error('Value must be an integer');
            return false;
        }

        // Recursive function to delete a node
        const deleteRecursively = (node, value) => {
            if (node === null) {
                return node;
            }

            if (value < node.data) {
                node.left = deleteRecursively(node.left, value);
            } else if (value > node.data) {
                node.right = deleteRecursively(node.right, value);
            } else {
                // Node with no children
                if (node.left === null && node.right === null) {
                    return null;
                }

                // Node with one child
                if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                }

                // Node with two children: Get the inorder successor
                const minValueNode = findMinValue(node.right);

                // Copy the successor's content to this node
                node.data = minValueNode.data;

                // Delete the successor
                node.right = deleteRecursively(node.right, minValueNode.data);
            }

            // Returns the updated node
            return node;
        };

        // Find the smallest node in a subtree
        const findMinValue = (node) => {
            let current = node;
            while (current.left !== null) {
                current = current.left;
            }
            return current;
        };

        // Update root
        root = deleteRecursively(root, value);
        return true;
    };

    // Find a node with the specified value
    const find = (value) => {
        if (!Number.isInteger(value)) {
            console.error('Value must be an integer');
            return false;
        }

        // Helper function for recursive search
        const findRecursively = (node, value) => {
            if (node === null) {
                return false;
            }

            if (value === node.data) {
                return true;
            }

            if (value < node.data) {
                return findRecursively(node.left, value);
            } else {
                return findRecursively(node.right, value);
            }
        };

        return findRecursively(root, value);
    };

    // Breadth-first traversal: level-order
    const levelOrder = (callback) => {
        if (typeof callback !== 'function') {
            console.error('Callback must be a function');
            return;
        }

        // Check if the tree is empty
        if (root === null) {
            return;
        }

        // Initialize a queue with the root node
        const queue = [root];

        // Process nodes until the queue is empty
        while (queue.length > 0) {
            // Dequeue the front node
            const node = queue.shift();

            // Call the callback function on the current node
            callback(node);

            // Enqueue the left child if it exists
            if (node.left !== null) {
                queue.push(node.left);
            }

            // Enqueue the right child if it exists
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    };

    // Depth-first traversal: In-order
    const inOrder = (callback) => {
        if (typeof callback !== 'function') {
            console.error('Callback must be a function');
            return;
        }

        // Helper function for recursive in-order traversal
        const inOrderRecursively = (node) => {
            if (node === null) {
                return;
            }

            // Traverse left subtree
            inOrderRecursively(node.left);

            // Process current node
            callback(node);

            // Traverse right subtree
            inOrderRecursively(node.right);
        };

        // Start recursion from the root node
        inOrderRecursively(root);
    };

    // Depth-first traversal: pre-order
    const preOrder = (callback) => {
        if (typeof callback !== 'function') {
            console.error('Callback must be a function');
            return;
        }

        // Helper function for recursive in-order traversal
        const preOrderRecursively = (node) => {
            if (node === null) {
                return;
            }

            // Process current node
            callback(node);

            // Traverse left subtree
            preOrderRecursively(node.left);

            // Traverse right subtree
            preOrderRecursively(node.right);
        };

        // Start recursion from the root node
        preOrderRecursively(root);
    };

    return {
        buildTree,
        prettyPrint,
        insert,
        deleteItem,
        find,
        levelOrder,
        inOrder,
        preOrder
    };
}

export { Tree };