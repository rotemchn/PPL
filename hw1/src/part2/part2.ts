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
const map = {
    '(': ')',
    '[': ']',
    '{': '}'
} 


export const isPaired : (str: string) => boolean = (str:string) => {
    //R.reduce((acc,cur) => {});

    const b =R.replace("/(/)/","",str);
    console.log(b);
    if (R.has('(',b) || R.has(")",b))
        return false;
    return true;
}

console.log(isPaired("((h))"));
console.log(isPaired("(()"));