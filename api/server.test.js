const db = require('../data/dbConfig');

const request = require('supertest');
const server = require('./server');

// -------------------------- //

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('users').truncate();
});

// -------------------------- //

test('sanity', () => {
  expect(true).toBe(false);
});
