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
export const isPaired : (str: string) => boolean = (str:string) => {
    const onlyParen = stringToArray(str).filter(x => x==='('||x==='['||x==='{'||x===')'||x===']'||x==='}');
    const a = R.map (x => x === '(' ? (R.slice(onlyParen.indexOf(x),Infinity,onlyParen).indexOf(')') !== -1 ? '#':x):x, onlyParen);
        // # - the char was ( , and it has a )
    const b = R.map (x => x === '[' ? (R.slice(a.indexOf(x),Infinity,a).indexOf(']') !== -1 ? '#':x):x, a);
    const c = R.map (x => x === '{' ? (R.slice(b.indexOf(x),Infinity,b).indexOf('}') !== -1 ? '#':x):x, b);

    if (R.includes('(',c) || R.includes('{',c) || R.includes('[',c) || c.filter(x => x==='#').length !== c.length/2)
        return false;
    return true;
}