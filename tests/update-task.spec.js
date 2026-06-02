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
        // Todoist routes to /app/ not /upcoming/
        await page.waitForURL(/app/, { timeout: 10000 });
        
        await dashboardPage.createTask(originalTaskName);

        // TODO: Fix modal appearing in CI/CD before enabling
        // await dashboardPage.updateTask(originalTaskName, updatedTaskName);     

        // Assert - check that task was created
        await expect(page.getByText(originalTaskName).first()).toBeVisible();
    });
});
