const apicalls = require('../js/apicalls')

describe('get api call response is not null for each resource', () => {

   test('get characters api call response is not null', () => {
      return apicalls.get('character').then((response) => {
         expect(response).not.toBeNull();
      })
   });

   test('get episodes api call response is not null', () => {
      return apicalls.get('episode').then((response) => {
         expect(response).not.toBeNull();
      })
   });

   test('get locations api call response is not null', () => {
      return apicalls.get('location').then((response) => {
         expect(response).not.toBeNull();
      })
   });
});

describe('get api call has 20 results for each resource', () => {

   test('get characters api call has 20 results', () => {
      return apicalls.get('character').then((response) => {
         expect(response.results.length).toBe(20)
      })
   });

   test('get episodes api call has 20 results', () => {
      return apicalls.get('episode').then((response) => {
         expect(response.results.length).toBe(20)
      })
   });

   test('get locations api call has 20 results', () => {
      return apicalls.get('location').then((response) => {
         expect(response.results.length).toBe(20)
      })
   });
});



