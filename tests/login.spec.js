import {test, expect} from '@playwright/test';

import {HomePage} from '../pages/home.page.js';
import {LoginPage} from '../pages/login.page.js';

import { environment } from '../config/environments.js';

test.describe('login', () => { 

    test('user can login successfully', async ({page}) => {
        //Arrange
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        //Act
        await homePage.navigateHomePage();
        await homePage.clickLoginLink();

        await loginPage.login(
            environment.todoistEmail, 
            environment.todoistPassword);

        //Assert
        await expect(page).toHaveURL(/app/);

    });

});
