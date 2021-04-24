# rick-n-morty-challenge
Coding test using the Rick and Morty API (https://rickandmortyapi.com/).

## Challenges
First challenge is to count ocurrences of a given character in the names of the show characters, episodes and locations. ("c" for character names, "e" for episode names and "l" for location names, case insensitive.)
Second challenge is to get the quantity and a list of locations (origins) for each character that appears in each episode.
For both challenges execution time has to be calculated (which has to be less than ~3sec).
## Solution
For both challenges API calls are made with Fetch in the form of promises, which after solving, the required data processing was made, e.g. count characters and iterate over all episodes to get character origins. All of the API calls are measured in terms of time execution. 
#### Design strategies
##### Divide and conquer
Through modules exports and imports, modularization was achieved as far as needed, in order to decouple the solution and reduce cognitive load when reading code.
##### DRY (Don't repeat yourself)
Anything that is made twice or more is a sign to become a function and be reused, therefore considering this approach, the repeating parts of the solution were made functions (as reflected in utils.js and apicalls.js)
## Installation

#### Prerequisites
node, npm, git

#### Instructions

1. git clone https://github.com/jfcordovam/rick-n-morty-challenge.git
2. cd rick-n-morty-challenge
3. npm install
4. node app.js
5. Go to [localhost:3000](http://localhost:3000 "localhost:3000") in a browser

#### Testing (with Jest)
npm test

#### Directory composition

    rick-n-morty-challenge/
		src/
			js/
				apicalls.js
				main.js
				utils.js
			tests/
				apicalls.test.js
				utils.test.js
		views/
			index.ejs
		app.js
		...

## Dependencies
- Node
- Express
- Jest
- EJS
- Node-fetch
- Require
