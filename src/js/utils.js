const { performance } = require("perf_hooks");
const apicalls = require('./apicalls')

/* 
*  Makes a GET api call and measures its execution time
*  @param    (String) resource      
*  @return   { 'resource': <String>, 'collection': <Array>, 'time': <float> }
*/
async function fetchResource(resource) {

   performance.mark(`${resource}-start`) // measure runtime of api calls

   return apicalls.get(resource).then(response => { // first get number of pages

      let pages = response.info.pages,
         apiPromises = [];

      // then for each page make the rest of the calls as promises 
      for (let i = 1; i <= pages; i++) {
         apiPromises.push(apicalls.get(`${resource}?page=${i}`));
      }

      return Promise.all(apiPromises)
         .then(responses => {

            let collection = responses.reduce((acc, response) => [...acc, ...response.results], []) // get all accumulated pages results

            performance.mark(`${resource}-end`)
            performance.measure(`${resource}-results`, `${resource}-start`, `${resource}-end`)
            let runTime = performance.nodeTiming.duration

            return { 'resource': resource, 'collection': collection, 'time': runTime } // 'resource' works as identifier 
         }).then(results => results)
   })
}
/* 
*  Returns a phrase that describes how many characters there are for given character and resource
*  @param    (String) char, (String) resource, (Array) collection
*  @return   String
*/
function getCharOcurrences(char, resource, collection) {
   return `The char "${char}" has ${countChars(char, collection)} ocurrences in ${resource} names.`
}

/* Returns how many times a 'char' appears in a collection of strings (case insensitive) 
*  @param    (String) char, (Array) collection
*  @return   Number
*/
function countChars(char, collection) {
   return collection.reduce((i, name) => {
      let re = new RegExp(char, "gi");
      return i + (name.match(re) || []).length
   }, 0)
}


module.exports = {
   fetchResource: fetchResource,
   getCharOcurrences: getCharOcurrences,
   countChars: countChars
}