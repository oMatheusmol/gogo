/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { assert } = require('chai');
const supertest = require('supertest');
const nock = require('nock');
const index = require('../src/index');

describe('Testes:', () => {
  it('Teste-unitario', () => {
    const body = {
      placa: 'hhh6565',
      chassi: '12345678911234567',
      renavam: 12345678911,
      modelo: 'ferrari',
      marca: 'ferrari',
      ano: 2020,
    };
    const result = new Vehicle(body);
    assert.strictEqual(result.placa, body.placa);
    assert.strictEqual(result.chassi, body.chassi);
    assert.strictEqual(result.renavam, Number(body.renavam));
    assert.strictEqual(result.modelo, body.modelo);
    assert.strictEqual(result.marca, body.marca);
    assert.strictEqual(result.ano, body.ano);
  });

  it('Post ferrari', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .post('/vehicle')
      .send({
        placa: 'hhh1111',
        chassi: '12345678911234567',
        renavam: 12345678911,
        modelo: 'ferrari1',
        marca: 'ferrari',
        ano: 1980,
      })
      .expect(201)
      .end(done);
  });

  it('Post fail', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .post('/vehicle')
      .send({
        placa: '111',
        chassi: 111,
      })
      .expect(405)
      .end(done);
  });

  it('Patch chassi to 222', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .patch('/vehicle/update/hhh1111')
      .send({
        placa: 'hhh1111',
        chassi: '22222222222222222',
        renavam: 12345678911,
        modelo: 'ferrari1',
        marca: 'ferrari',
        ano: 2022,
      })
      .expect(301)
      .end(done);
  });

  it('Patch fail', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .patch('/vehicle/update/fail')
      .send({
        placa: '3',
        chassi: 333,
      })
      .expect(404)
      .end(done);
  });

  it('Get /vehicles/ferrari', (done) => {
    supertest(index.server)
      .get('/vehicles/ferrari')
      .expect(226)
      .end(done);
  });

  it('Get chassi 111 fail', (done) => {
    supertest(index.server)
      .get('/vehicle/chassi/facil')
      .expect(404)
      .end(done);
  });

  it('Get vehicles', (done) => {
    supertest(index.server)
      .get('/vehicles')
      .expect(302)
      .end(done);
  });

  it('Get no existing route.', (done) => {
    supertest(index.server)
      .get('/fail')
      .expect(404)
      .end(done);
  });

  it('Delete fail', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .delete('/vehicle/delete/222')
      .send()
      .expect(404)
      .end(done);
  });

  it('Delete placa 111', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/vehicle')
      .reply(200);
    supertest(index.server)
      .delete('/vehicle/delete/hhh1111')
      .send()
      .expect(303)
      .end(done);
  });
});
