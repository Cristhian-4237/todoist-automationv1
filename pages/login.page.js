import { BasePage } from "./base.page.js";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        //this.loginLink = page.getByRole('link', {name: 'Log in'});
        this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
        this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
        this.loginButton = page.getByRole('button', { name: 'Log in', exact: true });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}