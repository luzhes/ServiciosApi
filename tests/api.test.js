const { describe } = require('mocha');
const request = require('supertest');
const app = require('../index');

/**Testing get all concert point */

describe("Get test concert", () => {
    it('responce with json containing a list of all concert', (done) => {
        request(app)
            .get('/api/concerts')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe("GET /concert/:sortId", () => {
    it("responce with json containing a single concert", (done) => {
        request(app)
            .get("/api/concert/CONCERT-7f9b775c-6778-49cd-828a-c65f24c3851c") //one concert?
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});