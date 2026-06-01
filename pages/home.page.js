import {BasePage} from './base.page.js';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);

        this.loginLink = page.getByRole('link', { name: 'Log in', exact: true });
    }

    async navigateHomePage() {
        await this.navigate('https://todoist.com/');
    }

    async clickLoginLink() {
        await this.loginLink.click();
    }
}