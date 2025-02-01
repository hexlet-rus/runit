import {inject as test} from "../fixture";
import {faker} from "@faker-js/faker";
import {DEFAULT_PASSWORD, generateSignupData} from "../data/users/auth";

test.describe('Registration and login', () => {
    test('Workflow registration and login', async ({app: {login, signup, mySnippetsPage}}) => {
        const signupData = {
            email: faker.internet.email(),
            username: faker.person.firstName(),
            password: '12344321',
        }
        await signup.open();

        await signup.register(signupData)

        await login.open();
        await login.login(signupData.email, signupData.password);
        await mySnippetsPage.expectedUserName(signupData.username);
    });

    const invalidDataCases = [
        {
            title: 'Invalid email format',
            email: 'test222@.t',
            username: 'testLogin',
            password: DEFAULT_PASSWORD,
            error: 'Incorrect email'
        },
        {
            title: 'Password too short',
            email: faker.internet.email(),
            username: faker.person.firstName(),
            password: '1234567',
            error: 'From 8 to 30 characters'
        },
        {
            title: 'Unsupported password characters',
            email: faker.internet.email(),
            username: faker.person.firstName(),
            password: 'Проверка',
            error: 'Only Latin letters, numbers and punctuation are allowed!'
        },
        {
            title: 'Username too short',
            email: faker.internet.email(),
            username: 'te',
            password: DEFAULT_PASSWORD,
            error: 'From 3 to 16 characters'
        },
        {
            title: 'Username too long',
            email: faker.internet.email(),
            username: 'testLogintestLogintestLogin',
            password: DEFAULT_PASSWORD,
            error: 'From 3 to 16 characters\n'
        },
    ];

    for (const {title, email, username, password, error} of invalidDataCases) {
        test(`Unable to register - ${title}`, async ({app: {signup}}) => {
            await signup.open();

            await signup.register({email, username, password});

            await signup.expectErrorMessage(error);
        });
    }

    test('Unable to register with an already registered email', async ({app: {signup}, steps}) => {
        const signupData = generateSignupData();
        await steps.authStep.signUp(signupData);
        await steps.authStep.signOut();

        await signup.open();
        await signup.register(signupData);

        await signup.expectErrorMessage('This username is already taken');
        await signup.expectErrorMessage('This email address is already');
    });


    const invalidAuthCases = [
        {email: 'invalid_email@test', password: '12344321', error: 'Incorrect email'},
        {email: faker.internet.email(), password: 'wrongpassword', error: 'Wrong email or password'},
    ];

    for (const {email, password, error} of invalidAuthCases) {
        test(`Unable to authorize with invalid credentials: ${error}`, async ({app: {login}, steps}) => {
            const signupData = generateSignupData();
            await steps.authStep.signUp(signupData);
            await steps.authStep.signOut();

            await login.open();
            await login.login(email, password);

            await login.expectErrorMessage(error);
        });
    }
});
