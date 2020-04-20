const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const request = require('../base');

describe('/whitelist', () => {
    describe('No query params', () => {
        const test = () => request().get('/whitelist');
        let response;
        before('fetch endpoint', done => {
            test().end((err, res) => {
                response = res;
                done();
            });
        });
        it('returns the correct CORS and Cache headers', done => {
            expect(response).to.have.header('Access-Control-Allow-Origin', '*');
            expect(response).to.have.header('Cache-Control', 'public, max-age=21600'); // 6 hours
            done();
        });
        it('returns a JSON body with \'extensions\' and \'categories\' properties', done => {
            expect(response).to.be.json;
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('extensions').that.is.an('array');
            expect(response.body).to.have.property('categories').that.is.an('object');
            done();
        });
        it('has no other properties', done => {
            expect(Object.keys(response.body)).to.have.lengthOf(2);
            done();
        });
        describe('Extensions array', () => {
            it('only has string elements', done => {
                for (const result of response.body.extensions) {
                    expect(result).to.be.a('string');
                }
                done();
            });
        });
        describe('Categories object', () => {
            it('has a key for each value in \'extensions\'', done => {
                const keys = Object.keys(response.body.categories);
                for (const result of response.body.extensions) {
                    expect(keys).to.include(result);
                }
                done();
            });
            it('has a string value for each key', done => {
                for (const result of Object.values(response.body.categories)) {
                    expect(result).to.be.a('string');
                }
                done();
            });
        });
    });

    describe('Requesting a field (?fields=extensions)', () => {
        const test = () => request().get('/whitelist?fields=extensions');
        let response;
        before('fetch endpoint', done => {
            test().end((err, res) => {
                response = res;
                done();
            });
        });
        it('returns the correct CORS and Cache headers', done => {
            expect(response).to.have.header('Access-Control-Allow-Origin', '*');
            expect(response).to.have.header('Cache-Control', 'public, max-age=21600'); // 6 hours
            done();
        });
        it('returns a JSON body with the \'extensions\' property', done => {
            expect(response).to.be.json;
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('extensions').that.is.an('array');
            done();
        });
        it('has no other properties', done => {
            expect(Object.keys(response.body)).to.have.lengthOf(1);
            done();
        });
    });

    describe('Requesting all fields (?fields=*)', () => {
        const test = () => request().get('/whitelist?fields=*');
        let response;
        before('fetch endpoint', done => {
            test().end((err, res) => {
                response = res;
                done();
            });
        });
        it('returns the correct CORS and Cache headers', done => {
            expect(response).to.have.header('Access-Control-Allow-Origin', '*');
            expect(response).to.have.header('Cache-Control', 'public, max-age=21600'); // 6 hours
            done();
        });
        it('returns a JSON body with \'extensions\' and \'categories\' properties', done => {
            expect(response).to.be.json;
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('extensions').that.is.an('array');
            expect(response.body).to.have.property('categories').that.is.an('object');
            done();
        });
        it('has no other properties', done => {
            expect(Object.keys(response.body)).to.have.lengthOf(2);
            done();
        });
    });
});
