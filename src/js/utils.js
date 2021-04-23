
module.exports = {
   getTotalCharCount(char, collection) {
      return collection.reduce((i, name) =>
         i + countChars(char, [...name]), 0);
   },
   getNames(resources) {
      return resources.map(element => element.name)
   }
}

function countChars(char, word) {
   return word.reduce((i, letter) => {
      if (char.toLowerCase() === letter.toLowerCase()) {
         return i + 1
      } else return i
   }, 0);
}
