const express = require('express')
const path = require('path');
const app = express()
const port = 3000
app.set('view engine', 'ejs');

const firstChallenge = require('./src/js/firstChallenge')


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)

  // *** First challenge: character counter ***
  firstChallenge.charCounter().then(results => {
    console.log("results: " + results)

    app.get('/', (req, res) => {
      res.render('index', { results1: results });
    });
  })

  // Second challenge


})


