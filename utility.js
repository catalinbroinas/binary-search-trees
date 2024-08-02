function ArrayMethod() {
    // Sort array
    const compareNumbers = (a, b) => a - b;
    const sortArray = (arr) => arr.sort(compareNumbers);

    // Unique values
    const removeDuplicate = (arr) => Array.from(new Set(arr));

    return { sortArray, removeDuplicate };
}

export { ArrayMethod };