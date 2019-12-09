const getDomain = url => {
    var hostName = getHostName(url);
    var domain = hostName;
    
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];
                
            if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
              domain = parts[2] + '.' + domain;
            }
        }
    }
    
    return domain;
}

const insertIntoSortedNumberArray = (arr, val) => {
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

export { 
    getDomain,
    insertIntoSortedNumberArray
};