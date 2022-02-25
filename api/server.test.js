const db = require('../data/dbConfig');
const Users = require('./users/users-model');

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
  expect(true).toBe(true);
});

describe('Test users model', () => {
  test('Table starts empty', async () => {
    const users = await db('users');

    expect(users).toHaveLength(0);
  });

  test('Can insert new user', async () => {
    let result = await Users.insert({ username: 'test', password: 'beep' });
    expect(result).toEqual({ id: 1, username: 'test', password: 'beep' });

    let users = await db('users');
    expect(users).toHaveLength(1);

    await Users.insert({ username: 'beep', password: 'boop' });
    users = await db('users');
    expect(users).toHaveLength(2);
  });

  test('Can get user by ID', async () => {
    const [id] = await db('users').insert({ username: 'beep', password: 'boop' });
    let result = await Users.getById(id);

    expect(result).toHaveProperty('username', 'beep');
  });
});