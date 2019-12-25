// TODO: Improve this
export const insertIntoSortedNumberArray = (arr, val) => {
    if (arr.length === 0) {
        return [val];
    }
    const resultArr = new Array(arr.length + 1);
    let arrIndex = 0;
    let placed = false;
    for (let i = 0; i < arr.length + 1; i++) {
        if (arr[i] == val) {
            return arr;
        } else if (arr[i] > val && !placed) {
            resultArr[i] = val;
            placed = true;
        } else if (i === arr.length && !placed) {
            resultArr[i] = val;
        } else {
            resultArr[i] = arr[arrIndex];
            arrIndex += 1;
        }
    }

    return resultArr;
}
