const utils = require('./utils')
const { performance } = require("perf_hooks");

module.exports = {

   async main() {
      // Measure main execution time
      let mainRunTime = 0;
      performance.mark("main-start")
      let results = [] // Array of strings, it makes it easier to render in template

      //  For each resource, make the api calls and measure runtime
      Promise.all([
         utils.fetchResource('character'),
         utils.fetchResource('episode'),
         utils.fetchResource('location')
      ]).then(([characters, episodes, locations]) => { // each one is structured as: { 'resource': <string>, 'collection': <array>, 'time': <float> }

         // *** First challenge: character counter ***
         results.push('First challenge: char counter');
         let apiRunTime = Math.max(characters.time, episodes.time, locations.time); // Get max time between each of the calls

         // Count ocurrences of given character in each resources names
         results.push(utils.getCharOcurrences("l", locations.resource, locations.collection.map(e => e.name)))
         results.push(utils.getCharOcurrences("e", episodes.resource, episodes.collection.map(e => e.name)))
         results.push(utils.getCharOcurrences("c", characters.resource, characters.collection.map(e => e.name)))

         performance.mark("main-end")
         performance.measure("main", "main-start", "main-end")
         mainRunTime = performance.nodeTiming.duration
         let totalRunTime = Math.trunc(Math.max(mainRunTime, apiRunTime)) // Get max runtime between main and api call runtime, since they are async

         results.push(`Execution time duration for first challenge: ${totalRunTime}ms.`)

         mainRunTime = 0
         performance.clearMarks();

         // *** Second challenge: get episode locations ***
         performance.mark("main-start")
         results.push('Second challenge: episode locations')

         // Iterate each character in each episode to get their origin location
         episodes.collection.forEach(episode => {

            let locations = new Set() // A set avoids repetition

            episode.characters.forEach(character => {

               // get origin name and add it to set
               let characterId = parseInt(character.split('/')[5]);
               locations.add(characters.collection.find(c => c.id === characterId).origin.name)
            });

            results.push(`For the characters of episode: "${episode.episode} - ${episode.name}", there are ${locations.size} origins: ${Array.from(locations).join(", ")}.`)
         });

         performance.mark("main-end")
         performance.measure("main", "main-start", "main-end")
         mainRunTime = performance.nodeTiming.duration
         performance.clearMarks();

         results.push(`Execution time duration for second challenge: ${Math.trunc(mainRunTime)}ms.`)
      })
      return results
   }
}


