const request = require('supertest');
const concat = require('concat');
const app = require('../server/app');
const { getBundle, writeBundle } = require('../server/helpers/serviceBundleHandler');
const {
  getBundleAndWrite,
  getAllBundles,
} = require('../server/helpers/superBundleHandler');
const { bundleTagCache } = require('../server/routes/pathCacheVariables');

jest.mock('../server/helpers/serviceBundleHandler');
jest.mock('../server/app');
// describe root path
describe('## SERVER PATHS ##', () => {
  describe('Testing the root path', () =>
    it('Should respond to a GET', () =>
      request(app).get('/').then(response =>
        expect(response.statusCode).toBe(200))));

  // describe item path
  describe('Testing the /item path', () => {
    it('Should respond to the GET', () =>
      request(app).get('/item/1/reviews').then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toBeInstanceOf(Object);
        expect(response.statusCode).toBe(200);
      }));

    it('Should get a 404 for a non-existent query', () =>
      request(app).get('/item/BAD/description').then(response =>
        expect(response.statusCode).toBe(404)));
  });

  // describe bundle path
  describe('Testing the /bundle path', () =>
    it('Should response to the GET', () =>
      request(app).get('/bundle').then((response) => {
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('string');
        expect(response.body.length).toBeGreaterThanOrEqual(70000);
      })));
});

// describe the bun route
describe('## SUPER BUNDLE HELPERS ##', () => {
  beforeEach(() => {
    getBundle.mockClear();
    writeBundle.mockClear();
  });

  describe('Testing the getAllBundles method', () => {
    it('Should call getBundle and writeBundle once', () => {
      getBundleAndWrite()
        .then((result) => {
          expect(getBundle).toHaveBeenCalledTimes(1);
          expect(writeBundle).toHaveBeenCalledTimes(1);
          expect(result).toBe('12345ABCDE');
        })
        .catch(e => console.log(e));
    });
  });

  describe('Testing the getAllBundles method', () => {
    it('Should call getBundle and writeBundle four times', () =>
      getAllBundles(['similar', 'reviews', 'images', 'description'])
        .then((result) => {
          expect(getBundle).toHaveBeenCalledTimes(4);
          expect(writeBundle).toHaveBeenCalledTimes(4);
          expect(result).toBeInstanceOf(Array);
          expect(result.length).toBe(4);
        })
        .catch(e => console.log(e)));

    it('Should not write for functions are up to date', () => {
      const setbundleTagCache = () => {
        for (const tag in bundleTagCache) {
          bundleTagCache[tag] = '12345ABCDE';
        }
      };

      setbundleTagCache();
      const expected = Array(4).fill(undefined);

      return getAllBundles(['similar', 'reviews', 'images', 'description'])
        .then((result) => {
          expect(getBundle).toHaveBeenCalledTimes(4);
          expect(writeBundle).not.toHaveBeenCalled();
          expect(result).toBeInstanceOf(Array);
          expect(result).toEqual(expect.arrayContaining(expected));
        })
        .catch(e => console.log(e));
    });
  });
});
