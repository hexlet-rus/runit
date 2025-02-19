import {faker} from "@faker-js/faker";

export const DEFAULT_PASSWORD = '12345678';

export const generateSignupData = () => ({
    email: faker.internet.email(),
    username: faker.person.firstName(),
    password: DEFAULT_PASSWORD
});
