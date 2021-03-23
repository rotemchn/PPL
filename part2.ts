import * as R from "ramda";
const stringToArray = R.split("");

/* Question 1 */
export const isVowel:(c:string) => boolean = (c:string ) => { //checks if a letter is a vowel
    return (c === 'a' || c === 'o' ||c === 'u' ||c === 'i' ||c === 'e' || 
            c === 'A' ||c === 'O' ||c === 'U' ||c === 'I' ||c === 'E' );
}

export const countVowels:(str: string) => number = (str:string) => {
    const bool = R.map(x => isVowel(x),stringToArray(str));
    return (bool.filter(x => x===true)).length;
} 

/* Question 2 */
export const runLengthEncoding: (str: string) => string = (str: string) => {
    const arr = stringToArray(str);

    const counts = R.toPairs(arr.reduce((map, val) => {map[val] = (map[val] || 0)+1; return map}, {} ));
    const a = R.map(R.map(x => x===1? "": x),counts);
    return R.reduce((acc,cur) => acc+cur,"",R.map( R.join(''),a));
}

/* Question 3 */
export const removeFromArray : ( openChar:string ,closeChar :string ,arr : string[])=> string[] = (openChar:string ,closeChar :string, arr: string[]) => {
    const indexO = arr.indexOf(openChar);
    const indexC = arr.indexOf(closeChar);
    if (indexC < indexO) //check the closer parentheses is after the open parentheses 
       return arr;
    return R.slice(0,indexC,arr).concat(R.slice(indexC+1,Infinity,arr));
}

export const isPaired : (str: string) => boolean = (str:string) => {
    const arr = stringToArray(str);
    const newArr = arr.reduce((acc, cur) => cur==='(' ? removeFromArray ('(',')',arr) : acc , "");
    console.log(newArr);
    if (R.includes(')',newArr))
        return false;
    return true;
}

console.log(isPaired("(rotem)"));
console.log(isPaired("()rotem()"));