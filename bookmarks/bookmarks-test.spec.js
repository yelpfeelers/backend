const request = require('supertest');
const knex = require('knex');

const bcrypt = require('bcryptjs')
const config = require('../knexfile');
const server = require('../server');

const db = knex(config.test)

let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInVzZXJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzI0YzllMTVlNTJhZmM0N2MyMjViNzU3ZTdiZWUxZjlkP3M9MjAwJnI9cGcmZD1tbSIsImlhdCI6MTU1MjM2Njg2NiwiZXhwIjoxNjM4NzY2ODY2fQ.HQ_rCd4ijOPxnqsEPV34FGuqVT14Cyq8XsPQL31Grtk"
let user_id = 16;

describe('bookmarks crud', () => {
  afterEach(async () => {
    await db('bookmarks').truncate();
    await db('users').truncate();

  })
  describe('get routes', () => {
    console.log('token', token);

    it('should return a status code of 200 upon success', async (done) => {
      const response = await request(server).get('/api/bookmarks').set('Authorization', token);
      expect(response.status).toBe(200);
      done();
    });

  })
})