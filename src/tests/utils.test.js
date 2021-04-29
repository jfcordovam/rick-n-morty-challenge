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
      expect(utils.getCharOcurrences('c', 'character', collection)).not.toBeUndefined();
   });

   test('char counter returns a defined string for episode', () => {
      expect(utils.getCharOcurrences('e', 'episode', collection)).not.toBeUndefined();
   });

   test('char counter returns a defined string for location', () => {
      expect(utils.getCharOcurrences('l', 'location', collection)).not.toBeUndefined();
   });
});

const characters = ['Rick Sanchez', 'Morty Smith', 'Summer Smith', 'Albert Einstein', 'Centaur', 'Chris'], // Has 4 "c"
   episodes = ['Pilot', 'Lawnmower Dog', 'Anatomy Park', 'Meeseeks and Destroy'], // Has 6 "e"
   locations = ['Earth (C-137)', 'Abadango', 'Citadel of Ricks', 'Anatomy Park']; // Has 1 "l"


describe('char counter has to count characters correctly (case insensitive)', () => {

   test('char counter returns the correct string for characters', () => {
      expect(utils.countChars('c', characters)).toEqual(4);
   });

   test('char counter returns the correct string for episodes', () => {
      expect(utils.countChars('e', episodes)).toEqual(6);
   });

   test('char counter returns the correct string for locations', () => {
      expect(utils.countChars('l', locations)).toEqual(1);
   });
});

