// pages/CartPage.js
export class CartPage {
  constructor(page) {
    this.page = page;
   // Define locators for login fields and buttons
    this.viewWeekBtn = 'text=View Weekly Menu';          
    this.LocationTitle = 'text=Free yourself from cooking';   
    this.Locationheading = 'text=Choose Pickup Location';
  }
  
  async Click_ViewWeekly() {
    await this.page.click(this.viewWeekBtn);
  }

  async SelectLocation() {
    await this.page.isVisible(this.LocationTitle);
    await this.page.isVisible(this.Locationheading);
  }

//=====
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