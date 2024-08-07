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
                return null;
            }

            if (value === node.data) {
                return node;
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

    // Depth-first traverse: post-order
    const postOrder = (callback) => {
        if (typeof callback !== 'function') {
            console.error('Callback must be a function');
            return;
        }

        // Helper function for recursive post-order traversal
        const postOrderRecursively = (node) => {
            if (node === null) {
                return;
            }

            // Traverse left subtree
            postOrderRecursively(node.left);

            // Traverse right subtree
            postOrderRecursively(node.right);

            // Process current node
            callback(node);
        };

        // Start recursion from the root node
        postOrderRecursively(root);
    };

    // Create an array with all nodes using the specified traversal method
    const toArray = (traverse) => {
        const nodes = [];

        // Define a callback function that adds node data to the array
        const callback = (node) => {
            nodes.push(node.data);
        };

        // Call the traversal function with the callback to populate the array
        traverse(callback);

        return nodes;
    };

    // Height of the tree
    const heightOfTree = () => {
        if (root === null) {
            console.warn('Tree is empty')
            return;
        }

        // Helper function to recursively calculate the height of the tree
        const heightRecursively = (node) => {
            if (node === null) {
                return -1;
            }

            // Recursively calculate the height of left and right subtrees
            const leftHeight = heightRecursively(node.left);
            const rightHeight = heightRecursively(node.right);

            // Return the maximum of the two heights plus one (for the current node)
            return Math.max(leftHeight, rightHeight) + 1;
        };

        return heightRecursively(root);
    };

    // Height of the specified node
    const height = (node) => {
        if (node === null) {
            console.error('Node must be a valid node.');
            return null;
        }

        // Helper function to recursively find the height of the node
        const heightRecursively = (node) => {
            if (node === null) {
                return -1;
            }

            // Recursively calculate the height of left and right subtrees
            const leftHeight = heightRecursively(node.left);
            const rightHeight = heightRecursively(node.right);

            // Return the maximum of the two heights plus one (for the current node)
            return Math.max(leftHeight, rightHeight) + 1;
        };

        return heightRecursively(node);
    };

    // Depth of the specified node
    const depth = (node) => {
        if (node === null) {
            console.error('Node must be a valid node.');
            return null;
        }

        const treeHeight = heightOfTree();
        const nodeHeight = height(node);

        return treeHeight - nodeHeight;
    };

    // Check if the tree is balanced
    const isBalanced = () => {
        if (root === null) {
            console.warn('Tree is empty');
            return true;
        }

        // Helper function to calculate height and check balance
        const getHeight = (node) => {
            if (node === null) return -1;

            // Recursively get the height of left subtrees
            const leftHeight = getHeight(node.left);
            if (leftHeight === null) return null;

            // Recursively get the height of right subtrees
            const rightHeight = getHeight(node.right);
            if (rightHeight === null) return null;

            // Check if current node is balanced
            if (Math.abs(leftHeight - rightHeight) > 1) return null;

            // Return the height of the current node
            return Math.max(leftHeight, rightHeight) + 1;
        };

        // If getHeight returns null, the tree is unbalanced
        return getHeight(root) !== null;
    };

    return {
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
        isBalanced
    };
}

export { Tree };