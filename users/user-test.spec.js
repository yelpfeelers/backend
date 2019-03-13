const request = require('supertest');
const knex = require('knex');

const bcrypt = require('bcryptjs')
const config = require('../knexfile');
const server = require('../server');

const db = knex(config.test)

describe('bookmarks crud', () => {
  afterEach(async () => {
    await db('users').truncate();

  })
  describe('register route', () => {
    it('should return a status code of 200 upon success', async (done) => {
      const response = await request(server).post('/api/users/register').send({
        username: 'miranda2',
        password: 'miranda',
      });
      expect(response.status).toBe(200);
      done();
    });

    it('should return status code 400 if body is invalid', async () => {
      const response = await request(server).post('/api/users/register').send({
        usernaame: '',
        password: '',

      });

      expect(response.status).toBe(400);

    });

    it('should send back user name, id, and token if registration is successful', async () => {

      const response = await request(server).post('/api/users/register').send({
        username: 'user1',
        password: 'pass1',
      });

      expect(response.body.user.id).not.toBe(null);
      expect(response.body.user.username).not.toBe(null);
      expect(response.body.user.avatar).not.toBe(null);
      expect(response.body.token).not.toBe(null);

    });

    it('should send status of 400 and message if username or email are duplicated', async () => {

      await db.insert({
        username: 'user1',
        password: 'pass1',
      }).into('users');

      const response = await request(server).post('/api/users/register').send({
        username: 'user1',
        password: 'pass1',
      });

      expect(response.status).toBe(400);
      expect(response.body.duplicateUser).toBe(true);


    });

  });

  describe('login route', () => {

    beforeEach(async () => {

      await db.insert({
        username: 'user1',
        password: bcrypt.hashSync('pass1', 1),
      }).into('users');

    });

    it('should return status code of 200 upon success', async () => {

      const response = await request(server).post('/api/users/login').send({
        username: 'user1',
        password: 'pass'
      });

      expect(response.status).toBe(200);

    });

    it('should return status code of 400 if body is invalid', async () => {

      const response = await request(server).post('/api/users/login').send({
        usernaame: 'user1',
        password: 'pass'
      });

      expect(response.status).toBe(400);

    });

    it('should return status code of 401 if wrong credentials are entered', async () => {

      const response = await request(server).post('/api/users/login').send({
        username: 'user1',
        password: 'passs'
      });

      expect(response.status).toBe(401);

    });

  });

});