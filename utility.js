// ========================
// This module provides utility functions for array operations:
// - `sortArray(arr)`: Sorts an array of numbers in ascending order.
// - `removeDuplicate(arr)`: Removes duplicate values from an array.
// ========================

function ArrayMethod() {
    // Sort array
    const compareNumbers = (a, b) => a - b;
    const sortArray = (arr) => arr.sort(compareNumbers);

    // Unique values
    const removeDuplicate = (arr) => Array.from(new Set(arr));

    return { sortArray, removeDuplicate };
}

export { ArrayMethod };