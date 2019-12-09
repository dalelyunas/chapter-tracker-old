export const getOrDefault = (obj, objKey, defaultVal) => {
    return obj[objKey] || defaultVal;
};

export const insertIntoSortedNumberArray = (arr, val) => {
    const resultArr = new Array(arr.length + 1);
    let arrIndex = 0;
    for (let i = 0; i < arr.length + 1; i++) {
        if (arr[i] == val) {
            return arr;
        } else if (arr[i] > val) {
            resultArr[i] = val;
        } else {
            resultArr[i] = arr[arrIndex];
            arrIndex += 1;
        }
    }

    return resultArr;
}
