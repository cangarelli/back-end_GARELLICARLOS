// Importación de modulos requeridos

import { expect } from 'chai';
import supertest from 'supertest';

import { Faker, fakerES, es } from '@faker-js/faker';

const spanishFaker = new Faker({
    locale: [es],
});

const requester = supertest(`http://localhost:8080`);

describe('Testing ecommerce', () => {
    let token;
    describe('Testing products routes', () => {
        it('El endpoint api/products GET debe retornar un objeto con las propiedades status y payload', async () => {
            const { statusCode, ok, _body } = await requester.get('/api/products');
            expect(_body).to.have.property('status');
            expect(_body).to.have.property('payload');
        });
        it('El endpoint api/products/ GET debe retornar un payload con las propiedades docs y page', async () => {
            const { statusCode, ok, _body } = await requester.get('/api/products');
            expect(_body.payload).to.have.property('docs');
            expect(_body.payload).to.have.property('page');
        });
    });
    describe('Testing sessions routes', () => {
        it('El endpoit api/sessions/loguin POST debe retornar una cookie llamada token', async () => {
            const userData = { email: 'agarelli91@gmail.com', password: 'asd_123' };

            const res = await requester.post('/api/sessions/loguin').send(userData);
            const cookieRes = res.headers['set-cookie'][0];
            expect(cookieRes).to.be.ok;
            const cookie = {
                name: cookieRes.split('=')[0],
                value: cookieRes.split('=')[1],
            };
            expect(cookie.name).to.be.ok.and.eql('token');
            expect(cookie.value).to.be.ok;

            if (expect(res._body.token).to.be.ok) {
                token = res._body.token;
            }
        });
        it('El endpoint api/sessions/register POST debe retornar un objeto con la propiedad payload y esta debe contener la propiedad id', async () => {
            const mockUser = {
                first_name: spanishFaker.person.firstName(),
                last_name: spanishFaker.person.lastName(),
                email: `${spanishFaker.person.lastName()}@gmail.com`,
                age: 33,
                password: spanishFaker.internet.password({ length: 10 }),
            };
            const { statusCode, ok, _body } = await requester.post('/api/sessions/register').send(mockUser);
            expect(_body.payload).to.be.ok.and.to.have.property('id');
        });
    });
    describe('Testing carts routes', () => {
        it('El endpoint api/carts/:cid GET debe retornar', async () => {
            const { statusCode, ok, _body } = await requester
                .get('/api/carts/register')
                .set('Authorization', `Bearer ${token}`);
            expect(_body).to.be.ok.and.to.have.property('payload');
        });
    });
});
