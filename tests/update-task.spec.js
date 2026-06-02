import { test, expect} from '@playwright/test';

import { HomePage } from '../pages/home.page.js';
import { LoginPage } from '../pages/login.page.js';
import { DashboardPage } from '../pages/dashboard.page.js'; 
import { environment } from '../config/environments.js';

test.describe('task management', () => {
    test('user can create a new task successfully', async ({ page }) => {
        //Arrange
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page); 

        const originalTaskName = `Task-${Date.now()}`;
        const updatedTaskName = `${originalTaskName}-edited`;

        //Act
        await homePage.navigateHomePage();
        await homePage.clickLoginLink();

        await loginPage.login(
            environment.todoistEmail,
            environment.todoistPassword
        );
        await expect(page).toHaveURL(/upcoming/);
        
        await dashboardPage.createTask(originalTaskName);

        await dashboardPage.updateTask(originalTaskName, updatedTaskName);     

        // Assert
        //await expect(dashboardPage.getTaskLocator(updatedTaskName)).toBeVisible();
        await expect(page.getByText(updatedTaskName).first()).toBeVisible();

    });

});