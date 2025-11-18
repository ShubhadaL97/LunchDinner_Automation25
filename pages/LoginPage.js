import testData from '../data/testData.json' assert { type: 'json' };
export class LoginPage {
  constructor(page) {
    this.page = page;

    // Define locators for login fields and buttons
    this.loginButton = 'text=Login';          // Button to open login form
    this.emailField = 'input[type="email"]';         // Email input
    this.passwordField = 'input[type="password"]';   // Password input
    this.submitButton = 'button[type="submit"]';     // Submit/login button
    this.logoutButton = 'text=Logout';        // Logout link/button
  }

  // Navigate to website
  async navigate() {
    await this.page.goto('https://lunchdinner.co.nz/');   
   
  }

  // Open login form 
  async LoginDetails() {
    await this.page.click(this.loginButton);
    //await page.waitForTimeout(3000);
    await this.page.fill(this.emailField, testData.user.email);
    await this.page.fill(this.passwordField, testData.user.password);
  //  await page.waitForTimeout(3000);
    await this.page.click(this.submitButton);
   // await page.waitForTimeout(3000);
  }


}