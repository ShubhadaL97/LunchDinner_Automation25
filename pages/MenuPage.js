// pages/MenuPage.js
export class MenuPage {
  constructor(page) {
    this.page = page;    
  }
  

  async selectCategory(category) {
    await this.page.click(`text=${category}`);
  }

  async selectItem(itemName) {
    await this.page.click(`text=${itemName}`);
  }
}