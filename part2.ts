import * as R from "ramda";
const stringToArray = R.split("");

/* Question 1 */
export const isVowel =(c:string) : boolean =>  { //checks if a letter is a vowel
    return (c === 'a' || c === 'o' ||c === 'u' ||c === 'i' ||c === 'e' || 
            c === 'A' ||c === 'O' ||c === 'U' ||c === 'I' ||c === 'E' );
}

export const countVowels= (str: string) : number  => {
    const bool = R.map(x => isVowel(x),stringToArray(str));
    return (bool.filter(x => x===true)).length;
} 

/* Question 2 */
const increaseAmount = (c: string , str : string) : string => {
    //example : str = a2b3c1 , c = 'b' ----> a2b4c1
    const arr = stringToArray(str);                     // example: arr = ['a','2','b',3','c','1'] 
    const a = R.slice(0,R.indexOf(c,arr)+1,arr);        // example : a = ['a','2','b']
    const b = parseInt(arr[R.indexOf(c,arr)+1])+1;      // example: b = 4
    const d = R.concat(a,[b]);                          //example : d = ['a','2','b','4']
    const e = R.slice(R.indexOf(c,arr)+2,Infinity,arr); //example: e = ['c','1']
    return R.join('',R.concat(d,e));
}

export const runLengthEncoding= (str: string) : string => {
    const arr = stringToArray(str);
    const a = arr.reduce((acc,cur) => R.includes(cur,acc) ? increaseAmount(cur,acc) : acc.concat(cur+1), "");
    return R.join('',stringToArray(a).filter(x => x!=='1'));
}

/* Question 3 */
export const isPaired = (str: string) : boolean  => {
    const onlyParen = stringToArray(str).filter(x => x==='('||x==='['||x==='{'||x===')'||x===']'||x==='}');
    const a = R.map (x => x === '(' ? (R.slice(onlyParen.indexOf(x),Infinity,onlyParen).indexOf(')') !== -1 ? '#':x):x, onlyParen);
        // # - the char was ( , and it has a )
    const b = R.map (x => x === '[' ? (R.slice(a.indexOf(x),Infinity,a).indexOf(']') !== -1 ? '#':x):x, a);
    const c = R.map (x => x === '{' ? (R.slice(b.indexOf(x),Infinity,b).indexOf('}') !== -1 ? '#':x):x, b);

    if (R.includes('(',c) || R.includes('{',c) || R.includes('[',c) || c.filter(x => x==='#').length !== c.length/2)
        return false;
    return true;
}