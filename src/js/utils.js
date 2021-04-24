const { performance } = require("perf_hooks");
const apicalls = require('./apicalls')

module.exports = {
   async fetchResource(resource) {

      performance.mark(`${resource}-start`) // measure runtime of api calls

      // first get number of pages
      return apicalls.get(resource).then(response => {

         let pages = response.info.pages,
            apiPromises = [];

         // then for each page make the rest of the calls as promises 
         for (let i = 1; i <= pages; i++) {
            apiPromises.push(apicalls.get(`${resource}?page=${i}`));
         }

         return Promise.all(apiPromises)
            .then(responses => {

               let collection = responses.reduce((acc, response) => [...acc, ...response.results], []) // get all pages results

               performance.mark(`${resource}-end`)
               performance.measure(`${resource}-results`, `${resource}-start`, `${resource}-end`)
               let runTime = performance.nodeTiming.duration

               return { 'resource': resource, 'collection': collection, 'time': runTime } // 'resource' works as identifier 
            }).then(results => results)
      })
   },

   charCounter(char, resource, collection) {
      let count = collection.reduce((i, name) => {
         let re = new RegExp(char, "g");
         return i + (name.match(re) || []).length
      }, 0)
      return `The char "${char}" has ${count} ocurrences in ${resource} names.`;
   }

}


