import { Page } from "@playwright/test";

export class LoginPage {
    constructor(
        public page: Page,
        public pageUrl = '/',
        public inputEmail= 'input[name="email"]',
        public inputPass= 'input[name="password"]',
        public loginBtn= 'button[type="submit"]',
    ) {
        //
    }

    async goToLogin() {
        await this.page.goto(this.pageUrl)
    }

    async fillForm(email: string, password: string) {
        await this.page.locator(this.inputEmail).fill(email)
        await this.page.locator(this.inputPass).fill(password)
    }

    async submitForm() {
        await this.page.locator(this.loginBtn).click()
    }
}