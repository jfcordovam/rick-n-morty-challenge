

const apicalls = require('./src/apicalls')
const utils = require('./src/utils')
const { performance } = require("perf_hooks")

const express = require('express')
const app = express()
const port = 3000

let results = '',
  mainRunTime = null,
  apiCallsExecTimes = [],
  apiRunTime = null;

app.listen(port, () => {
  // console.log(`App listening at http://localhost:${port}`)

  // First challenge: character counter
  //  for each resource, find the number of ocurrences of its first letter in names
  performance.mark("first-challenge-start")
  let resources = ['character', 'episode', 'location']

  resources.forEach(resource => {
    apicalls.get(resource).then(response => {
      performance.mark(resource + "-start")

      let names = utils.getNames(response.results),
        char = resource[0],
        count = utils.getTotalCharCount(char, names);

      results += `\ The character "` + char + `" has ` + count + ` ocurrences in ` + resource + ` names. \n`

      performance.mark(resource + "-end")
      performance.measure(resource + '-results', resource + "-start", resource + "-end")

      apiCallsExecTimes.push(performance.nodeTiming.duration);
      apiRunTime = Math.max(...apiCallsExecTimes);

      app.get('/', (req, res) => {
        res.send(results + `Execution time duration for first challenge : ` + (mainRunTime + apiRunTime))
      })
    });
  })

  performance.mark("first-challenge-end")
  performance.measure("first-challenge", "first-challenge-start", "first-challenge-end")


  mainRunTime = performance.nodeTiming.duration

  // results += `Execution time duration for first challenge : ` + (mainRunTime + apiRunTime)


})

async function returnExecTime() {
  return Math.max(apiCallsExecTimes)
}

async function sendContent(content) {
  app.get('/', (req, res) => {
    res.send(content)
  })
}

// app.get('/', (req, res) => {
//   // apiRunTime = Math.max(apiCallsExecTimes);
//   // console.log(apiCallsExecTimes);
//   // console.log(mainRunTime);
//   // results += `Execution time duration for first challenge : ` + (mainRunTime + apiRunTime)

//   res.send('<h1>Rick and Morty code challenge</h1>'
//     + '<h2>Results:</h2> '
//     + results
//   )
// })

