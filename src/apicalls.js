const fetch = require("node-fetch");
const BASE_API_URL = "https://rickandmortyapi.com/api/"


module.exports = {
   get(endpoint) {
      return fetch(BASE_API_URL + endpoint)
         .then(response => response.json())
         .then(data => data);
   },
}



