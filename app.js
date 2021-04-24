const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs');

const script = require('./src/js/main')


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)

  script.main().then(results => {

    app.get('/', (req, res) => {
      res.render('index', { results: results });
    });
  })
})


