import {BasePage} from './base.page.js';

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
    }

    getTaskLocator(taskName) {
        return this.page.getByRole('button', { name: `Task: ${taskName}` });
    }

    async openTask(taskName) {
        await this.getTaskLocator(taskName).click();
    }

    async updateTask(currentTaskName, updatedTaskName) {
        await this.openTask(currentTaskName);
        await this.taskDetailsModal.waitFor();
        await this.taskNameButton.click();
        await this.taskNameInput.fill(updatedTaskName);
        await this.taskEditorSubmitButton.click();
    }
}