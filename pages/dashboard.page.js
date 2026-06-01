import {BasePage} from './base.page.js';

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);

        this.addTaskButton = page.getByRole('button', { name: 'Add task', exact: true });
        this.taskNameInput = page.getByRole('textbox', { name: 'Task name', exact: true });
        this.createTaskButton = page.getByTestId('task-editor-submit-button');
    }

    async clickAddTaskButton() {
        await this.addTaskButton.click();
    }

    async createTask(taskName) {
        await this.clickAddTaskButton();
        await this.taskNameInput.fill(taskName);
        await this.createTaskButton.click();
    }

}