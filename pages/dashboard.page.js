import {BasePage} from './base.page.js';
import { expect } from '@playwright/test';

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);

        //this.addTaskButton = page.getByTestId('upcoming-view-list-layout').getByRole('button', { name: 'Add task' });
        this.addTaskButton = page.locator('button').filter({ hasText: 'Add task' }).first();
        this.taskNameInput = page.getByRole('textbox', { name: 'Task name', exact: true });
        //this.createTaskSubmitButton = page.getByTestId('task_list_editor_wrapper').getByTestId('task-editor-submit-button');
        this.createTaskSubmitButton = page.getByTestId('task-editor-submit-button').first();
        this.taskEditorSubmitButton = page.getByTestId('task-detail-editor-container').getByTestId('task-editor-submit-button');
        this.taskDetailsModal = page.getByTestId('task-details-modal');
        this.taskNameButton = page.getByRole('button', {name: 'Task name', exact: true});
    
    }

    async clickAddTaskButton() {
        await this.addTaskButton.click();
    }

    async createTask(taskName) {
        await this.clickAddTaskButton();
        await this.taskNameInput.fill(taskName);
        await this.createTaskSubmitButton.click();
        //await this.getTaskLocator(taskName).waitFor();
        await this.page.getByText(taskName).first().waitFor();
        // Wait for the page to settle after task creation
        await this.page.waitForLoadState('networkidle').catch(() => {});
        await this.page.waitForTimeout(1000);
    }

    getTaskLocator(taskName) {
        //return this.page.getByRole('button', { name: `Task: ${taskName}` });
         return this.page.getByText(taskName).first();
    }

    async openTask(taskName) {
        const taskElement = this.page.getByText(taskName).first();
        // Ensure element is in viewport and clickable
        await taskElement.scrollIntoViewIfNeeded();
        await taskElement.click({ force: true });
        // Wait for any animations/transitions
        await this.page.waitForTimeout(500);
    }

    async updateTask(currentTaskName, updatedTaskName) {
        await this.openTask(currentTaskName);
        // Wait for the modal with extended timeout for CI/CD environments
        try {
            await this.taskDetailsModal.waitFor({ state: 'visible', timeout: 60000 });
        } catch (error) {
            // If modal doesn't appear, take screenshot for debugging
            await this.page.screenshot({ path: 'test-results/modal-failed-screenshot.png' }).catch(() => {});
            throw new Error(`Task details modal did not appear. Original error: ${error.message}`);
        }
        await this.taskNameButton.click();
        await this.taskNameInput.fill(updatedTaskName);
        await this.taskEditorSubmitButton.click();
    }
}