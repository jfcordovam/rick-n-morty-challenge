const apicalls = require('./apicalls')
const utils = require('./utils')
const { performance } = require("perf_hooks")

module.exports = {
   charCounter() {
      // Measure main execution time
      let mainRunTime = 0;
      performance.mark("first-challenge-start")

      //  For each resource, make an api call and then find the number of ocurrences of its first letter in its names
      let characters = performCountChars('character'),
         episodes = performCountChars('episode'),
         locations = performCountChars('location');

      performance.mark("first-challenge-end")
      performance.measure("first-challenge", "first-challenge-start", "first-challenge-end")
      mainRunTime = performance.nodeTiming.duration

      // After each of the api calls (promises) solve, pack into a single results variable and return
      return Promise.all([characters, episodes, locations])
         .then((values) => { // values -> [ [string, float], ... , [string, float]]

            let results = '',
               apiRunTime = 0;

            values.forEach(([result, time]) => {
               results += result // Concatenate each of the call results
               apiRunTime = (apiRunTime < time) ? time : apiRunTime; // Get max time between each of the calls
            });

            results += `Execution time duration for first challenge: ${Math.trunc(mainRunTime + apiRunTime)}ms` // Add main runtime and api call runtime
            return results
         })
   }
}


let performCountChars = async function (resource) {


   return apicalls.get(resource) // make api call
      .then(response => {
         performance.mark(`${resource}-start`) // Measure runtime of api call

         // get char count on names
         let names = utils.getNames(response.results),
            char = resource[0],
            count = utils.getTotalCharCount(char, names),
            result = `The char "${char}" has ${count} ocurrences in ${resource} names \n`;

         performance.mark(`${resource}-end`)
         performance.measure(`${resource}-results`, `${resource}-start`, `${resource}-end`)

         let runTime = performance.nodeTiming.duration

         return [result, runTime]
      }).then(results => {
         return results
      })
}


