// pages/CartPage.js
export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async addItem(itemName) {
    await this.page.click(`text=${itemName}`);
  }

  async removeItem(itemName) {
    await this.page.click(`button[aria-label="Remove ${itemName}"]`);
  }

  async getTotal() {
    const totalText = await this.page.textContent('.cart-total');
    return parseFloat(totalText?.replace('$', '') || '0');
  }

  async checkout() {
    await this.page.click('text=Checkout');
  }
}