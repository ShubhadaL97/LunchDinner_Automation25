export class LoginPage {
  constructor(page) {
    this.page = page;

    // Define locators for login fields and buttons
    this.loginButton = 'text=Login';          // Button to open login form
    this.emailField = 'input[type="email"]';               // Email input
    this.passwordField = 'input[type="password"]';         // Password input
    this.submitButton = 'button[type="submit"]'; // Submit/login button
    this.logoutButton = 'text=Logout';        // Logout link/button
  }

  // Navigate to website
  async navigate() {
    await this.page.goto('https://lunchdinner.co.nz/');
  }

  // Open login form (if there’s a login button)
  async openLoginForm() {
    await this.page.click(this.loginButton);
  }

  // Fill credentials
  async enterCredentials(email, password) {
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);
  }

  // Click submit button
  async submitLogin() {
    await this.page.click(this.submitButton);
  }

  // Verify login success (example check)
  async verifyLoginSuccess() {
    await this.page.waitForSelector(this.logoutButton);
    return await this.page.isVisible(this.logoutButton);
  }

  // Logout action
  async logout() {
    await this.page.click(this.logoutButton);
  }
}