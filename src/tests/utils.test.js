const utils = require('../js/utils')


describe('fetchResource returns object with data for each call', () => {

   test('character call has data', () => {
      return utils.fetchResource('character').then((response) => {
         expect(response.collection.length).toBeGreaterThan(0);
      })
   });

   test('episode call has data', () => {
      return utils.fetchResource('episode').then((response) => {
         expect(response.collection.length).toBeGreaterThan(0);
      })
   });

   test('location call has data', () => {
      return utils.fetchResource('location').then((response) => {
         expect(response.collection.length).toBeGreaterThan(0);
      })
   });
});

describe('fetch has calculated run time for each call', () => {

   test('character call has calculated run time', () => {
      return utils.fetchResource('character').then((response) => {
         expect(response.time).not.toBeNull();
      })
   });

   test('episode call has calculated run time', () => {
      return utils.fetchResource('episode').then((response) => {
         expect(response.time).not.toBeNull();
      })
   });

   test('location call has calculated run time', () => {
      return utils.fetchResource('location').then((response) => {
         expect(response.time).not.toBeNull();
      })
   });

});



const collection = ['Pilot',
   'Meeseeks and Destroy',
   'Something Ricked This Way Comes']


describe('char counter returns a defined string for each resource', () => {

   test('char counter returns a defined string for character', () => {
      expect(utils.charCounter('c', 'character', collection)).not.toBeUndefined();
   });

   test('char counter returns a defined string for episode', () => {
      expect(utils.charCounter('e', 'episode', collection)).not.toBeUndefined();
   });

   test('char counter returns a defined string for location', () => {
      expect(utils.charCounter('l', 'location', collection)).not.toBeUndefined();
   });
});

const characters = ['Rick Sanchez', 'Morty Smith', 'Summer Smith', 'Albert Einstein'], // Has 2 "c"
   episodes = ['Pilot', 'Lawnmower Dog', 'Anatomy Park', 'Meeseeks and Destroy'], // Has 6 "e"
   locations = ['Earth (C-137)', 'Abadango', 'Citadel of Ricks', 'Anatomy Park']; // Has 1 "l"


describe('char counter has to count characters correctly', () => {

   test('char counter returns the correct string for characters', () => {
      expect(utils.charCounter('c', 'character', characters))
         .toEqual(`The char "c" has 2 ocurrences in character names.`);
   });

   test('char counter returns the correct string for episodes', () => {
      expect(utils.charCounter('e', 'episode', episodes))
         .toEqual(`The char "e" has 6 ocurrences in episode names.`);
   });

   test('char counter returns the correct string for locations', () => {
      expect(utils.charCounter('l', 'location', locations))
         .toEqual(`The char "l" has 1 ocurrences in location names.`);
   });
});

