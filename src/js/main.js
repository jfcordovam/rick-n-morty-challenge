const apicalls = require('./apicalls')
const utils = require('./utils')
const { performance } = require("perf_hooks");

module.exports = {

   async main() {
      // Measure main execution time
      let mainRunTime = 0;
      performance.mark("main-start")



      //  For each resource, make an api call and measure runtime
      let [characters, episodes, locations] = await Promise.all([
         fetchResource('character'),
         fetchResource('episode'),
         fetchResource('location')
      ])

      // After each of the api calls (promises) solve, pack into a single results variable and return
      // values structure -> [[string, array of objects, float], ... ]
      let results = ['First challenge: char counter'],
         apiRunTime = 0;

      // *** First challenge: character counter ***
      results.push(firstChallenge("l", locations.map(e => e.name)))
      results.push(firstChallenge("e", episodes.map(e => e.name)))
      results.push(firstChallenge("c", characters.map(e => e.name)))

      let names = utils.getNames(collection),
         char = name[0],
         count = utils.getTotalCharCount(char, names);

      results.push(`The char "${char}" has ${count} ocurrences in ${name} names.`);
      apiRunTime = (apiRunTime < time) ? time : apiRunTime; // Get max time between each of the calls

      performance.mark("main-end")
      performance.measure("main", "main-start", "main-end")
      mainRunTime = performance.nodeTiming.duration

      results.push(`Execution time duration for first challenge: ${Math.trunc(mainRunTime + apiRunTime)}ms.`) // Add main runtime and api call runtime

      mainRunTime = 0
      performance.clearMarks();

      // *** Second challenge: episode locations ***
      performance.mark("main-start")
      results.push('Second challenge: episode locations')

      let allEpisodes = values[1][1],
         allCharacters = values[0][1];

      allEpisodes.forEach(episode => {

         let locations = new Set()

         episode.characters.forEach(character => {

            let characterId = parseInt(character.split('/')[5]),
               characterOrigin = utils.getCharacterOrigin(characterId, allCharacters);
            locations.add(characterOrigin)
         });

         results.push(`For the characters of episode: "${episode.episode} - ${episode.name}", there are ${locations.size} origins: ${Array.from(locations).join(", ")}.`)
      });

      performance.mark("main-end")
      performance.measure("main", "main-start", "main-end")
      mainRunTime = performance.nodeTiming.duration
      performance.clearMarks();

      results.push(`Execution time duration for second challenge: ${Math.trunc(mainRunTime)}ms.`)

      return results

   }
}


let fetchResource = async function (resource) {

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

            let collection = responses.reduce((acc, response) => [...acc, ...response.results], [])

            performance.mark(`${resource}-end`)
            performance.measure(`${resource}-results`, `${resource}-start`, `${resource}-end`)
            let runTime = performance.nodeTiming.duration

            return { [resource]: { collection, runTime } } // 'resource' works as identifier 
         }).then(results => results)
   })
}

// "l", locations

function firstChallenge(char, collection) {
   let charCount = collection.reduce((i, name) =>
      i + utils.countChars(char, [...name]), 0);
   return   results.push(`The char "${char}" has ${count} ocurrences in ${name} names.`);
}



