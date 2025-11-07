// pages/CheckoutPage.js
export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillDetails(name, email, address) {
    await this.page.fill('#name', name);
    await this.page.fill('#email', email);
    await this.page.fill('#address', address);
  }

  async placeOrder() {
    await this.page.click('text=Place Order');
  }
}