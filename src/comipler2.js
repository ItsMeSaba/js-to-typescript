import { 
    matchArrayVariables, 
    arrayValues, 
    matchObjectVariables, 
    objectValues,
    matchNumberVariables, 
    numberValues,
    matchStringVariables, 
    stringValues
} from "./regexPatterns";
// const modifyInput = inp => inp.trim().replace(/\s{2,}/g, ' ').replace(/\n/g, '@@').split(/' '|@/g);


export default function(input) {
    let compiled = [];

    let matchedArr = matchArrayVariables(input);
    let arrays = matchedArr?.map(x => x?.match(arrayValues)[0]);
    arrays?.forEach(x => console.log(JSON.parse(x)))

    let matchedObj = matchObjectVariables(input);
    let object = matchedObj?.map(x => x?.match(objectValues)[0]);
    object?.forEach(x => console.log(JSON.parse(x)));

    let matchedNums = matchNumberVariables(input);
    let nums = matchedNums?.map(x => x?.match(numberValues)[0]);
    console.log(nums)
    // nums?.forEach(x => console.log(JSON.parse(x)))

    let matchedStrs = matchStringVariables(input);
    let strs = matchedStrs?.map(x => x?.match(stringValues)[0]);
    console.log(strs)
    // strs?.forEach(x => console.log(JSON.parse(x)))

    console.log('-----------------------')
}