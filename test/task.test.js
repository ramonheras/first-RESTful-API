import { expect } from 'chai';
import app from '../src/app';

const request = require('supertest'); // Importing this way due to supertest issue #215

describe('Testing: /tasks/:id GET', () => {
    it('Attempt to read an invalid ID', (done) => {
        request(app)
            .get('/tasks/0')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/) // todo wWTF /this/
            .expect(404, done);
    });
});

describe('Testing: /tasks/:id POST', () => {
    describe('POST a valid task', () => {
        const insertValidTask_test = (title, validTask) => {
            describe(title, () => {
                let returnedId;

                it(`POST a valid task (${title}) `, (done) => {
                    request(app)
                        .post('/tasks')
                        .send(validTask)
                        .set('Accept', 'application/json')
                        .expect('Content-type', /json/)
                        .expect((res) => {
                            returnedId = res.body.id;
                        })
                        .expect(200, done);
                });
                it(`GET prev task (Check it's actually saved)`, (done) => {
                    request(app)
                        .get(`/tasks/${returnedId}`)
                        .set('Accept', 'application/json')
                        .expect((res) => {
                            expect(JSON.stringify(res.body))
                                .to.be.equal(JSON.stringify(validTask));
                        })
                        .expect('Content-type', /json/)
                        .expect(200, done);
                });
            });
        };

        insertValidTask_test('valid-title, valid-body', {
            title: 'This is a valid title',
            body: 'This is a valid body',
        });
        insertValidTask_test('valid-title, no-body', {
            title: 'This is a valid title',
        });
    });

    describe('POST an invalid task', () => {
        const insertInvalidTask_test = (title, invalidTask, expectedErrorMessage) => {
            it(title, (done) => {
                request(app)
                    .post('/tasks')
                    .send(invalidTask)
                    .set('Accept', 'application/json')
                    .expect('Content-type', /json/)
                    .expect(expectedErrorMessage)
                    .expect(400, done);

                // Check the task has not been actually saved;
            });
        };

        insertInvalidTask_test('no-title', {
            body: 'A valid body',
        }, '"\\"title\\" is required"');

        insertInvalidTask_test('long-title', {
            title: 'T'.repeat(31),
        }, '"\\"title\\" length must be less than or equal to 30 characters long"');

        insertInvalidTask_test('long-body', {
            title: 'A valid title',
            body: 'B'.repeat(501),
        }, '"\\"body\\" length must be less than or equal to 500 characters long"');
    });
});
