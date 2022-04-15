/** capitalize all words of a string
 * @param {string} string - a string of words, seperated by spaces, to each be capitalized.
 * @return {string} the input string now with each word capitalized letter */
export const capitalizeEachWord = (string: string): string => {
    return string.toLowerCase().replace(/(?:^|\s|\d|[&-])\S/g, (a) => a.toUpperCase()) // regex matches first character and every character after any white space, digits, '&' or '-' characters.
}
