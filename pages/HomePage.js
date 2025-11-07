export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://lunchdinner.co.nz/');
  }

  async getTitle() {
    return this.page.title();
  }

    async clickMenu() {
    await this.page.click('text=Menu');
  }
}