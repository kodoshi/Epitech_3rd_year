const request = require('supertest')
const app = require('../App')

let token = ''

describe('Auth', () => {
    it('Should get a missing email error to register a user', async () => {
        let res = await request(app)
            .post('/signin')
            .send({
                password: 'yes',
                name: '1234567'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should get a missing password error to register a user', async () => {
        let res = await request(app)
            .post('/signup')
            .send({
                email: 'test@test.com',
                name: '1234567'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should get a missing name error to register a user', async () => {
        let res = await request(app)
            .post('/signup')
            .send({
                email: 'test.test@test.fr',
                password: '1234567'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})


describe('Auth', () => {
    it('Should get an invalid email error to register a user', async () => {
        let res = await request(app)
            .post('/signup')
            .send({
                email: 'test123',
                password: '1234567',
                name: 'yesyes'
            })
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should get an invalid password error to register a user', async () => {
        let res = await request(app)
            .post('/signup')
            .send({
                email: 'apitest@gmail.com',
                password: 'aaa',
            })
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should get an invalid username error to register a user', async () => {
        let res = await request(app)
            .post('/signup')
            .send({
                email: 'test@yes.com',
                password: '1234567',
                name: ''
            })
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should register a user', async () => {
        let res = await request(app)
            .post('/signup')
            .send({
                email: 'apitest1@gmail.com',
                password: '123456',
                name: 'test'
            })
        expect(res.statusCode).toEqual(200)
    })
})

describe('Auth', () => {
    it('Should get an error already existing user', async () => {
        let res = await request(app)
            .post('/signin')
            .send({
                email: 'apitest@gmmail.com',
                password: 'testtest1',
            })
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should connect the user', async () => {
        let res = await request(app)
            .post('/signin')
            .send({
                email: 'apitest@gmail.com',
                password: '123456',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
        expect(res.body.token.length).not.toBe(0)
        token = res.body.token
    })
})

describe('Auth', () => {
    it('Should get an error for inexisting user', async () => {
        let res = await request(app)
            .post('/signin')
            .send({
                email: 'test123123123@gmail.com',
                password: 'testt111',
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should get an error for missing email field', async () => {
        let res = await request(app)
            .post('/signin')
            .send({
                password: 'testtesttest'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should get an error for missing password field', async () => {
        let res = await request(app)
            .post('/signin')
            .send({
                email: 'testtest@test.fr'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should get an error logout', async () => {
        let res = await request(app)
            .post('/signout')
            .set('Authorization', 'jru121212o')
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Auth', () => {
    it('Should logout', async () => {
        let res = await request(app)
            .post('/signout')
            .set('Authorization', token)
        expect(res.statusCode).toEqual(200)
    })
})