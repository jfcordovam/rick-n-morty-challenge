const utils = require('./utils')
const { performance } = require("perf_hooks");

module.exports = {

   async main() {
      // Measure main execution time
      let mainRunTime = 0;
      performance.mark("main-start")
      let results = []

      //  For each resource, make the api calls and measure runtime
      Promise.all([
         utils.fetchResource('character'),
         utils.fetchResource('episode'),
         utils.fetchResource('location')
      ]).then(([characters, episodes, locations]) => {

         // *** First challenge: character counter ***
         results.push('First challenge: char counter');
         let apiRunTime = Math.max(characters.time, episodes.time, locations.time); // Get max time between each of the calls

         results.push(utils.charCounter("l", locations.resource, locations.collection.map(e => e.name)))
         results.push(utils.charCounter("e", episodes.resource, episodes.collection.map(e => e.name)))
         results.push(utils.charCounter("c", characters.resource, characters.collection.map(e => e.name)))

         performance.mark("main-end")
         performance.measure("main", "main-start", "main-end")
         mainRunTime = performance.nodeTiming.duration

         results.push(`Execution time duration for first challenge: ${Math.trunc(mainRunTime + apiRunTime)}ms.`) // Add main runtime and api call runtime

         mainRunTime = 0
         performance.clearMarks();

         // *** Second challenge: get episode locations ***
         performance.mark("main-start")
         results.push('Second challenge: episode locations')

         episodes.collection.forEach(episode => {

            let locations = new Set()

            episode.characters.forEach(character => {

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


