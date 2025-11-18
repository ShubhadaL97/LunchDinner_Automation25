// pages/Location_Day_MealType.js
import testData from '../data/testData.json' assert { type: 'json' };

export class Location_Day_MealType {
  constructor(page) {
    this.page = page;
    this.viewWeekBtn = 'text=View Weekly Menu';
    this.LocationTitle = 'text=Free yourself from cooking';
    this.pickupSection = 'text=Choose Pickup Location';
    this.TextSelectMeal = 'text=Choose Meal Type';
    this.selectaLocation = '//span[contains(text(), "Select a location")]';
    this.mealType = '//span[contains(text(), "Choose Meal Type")]';
    this.Lunch = '(//button[contains(text(), "Lunch")])[2]';
    this.Dinner = '(//button[contains(text(), "Dinner")])[2]';
    // New locators
    this.pickupDaySection = this.page.getByText('Select Pickup Day', { exact: false }); // text with brackets
    this.pickupDayContainer = this.page.locator('[data-testid="pickup-day-list"]'); // adjust if needed
    this.pickupDayItems = this.page.locator('[data-testid="pickup-day-item"]');      // adjust if needed
    //this.mealTypeSection = this.page.getByText('Choose Meal Type', { exact: false });
    this.mealTypeOptions = this.page.locator('[data-testid="meal-type-option"]');
  }

  async verifyPickupSectionVisible() {
    // Click "View Weekly Menu"
    await this.page.click(this.viewWeekBtn);
    // Wait for pickup section text to appear
    await this.page.waitForSelector(this.pickupSection, { timeout: 15000 });
    const pickup = this.page.getByText('Choose Pickup Location', { exact: false });
    await pickup.scrollIntoViewIfNeeded();
    const visible = await pickup.isVisible();
    console.log('Pickup section visible:', visible);
    return visible;
  }

  async selectMainLocation() {
    // 1. Click the "Select a location" dropdown/field
    const selectLocation = this.page.getByText('Select a location', { exact: false });
    await selectLocation.waitFor({ state: 'visible', timeout: 15000 });
    await selectLocation.click();
    console.log('Clicked "Select a location".');
    // 2. Get all options in the dropdown
    const allOptions = this.page.locator('[role="option"]');
    const total = await allOptions.count();
    console.log('TOTAL [role="option"] elements:', total);

    // 3. Filter ENABLED options (exclude aria-disabled / data-disabled)
    const enabledOptions = allOptions.filter({
      hasNot: this.page.locator('[aria-disabled="true"], [data-disabled]'),
    });

    const enabledCount = await enabledOptions.count();
    console.log('Number of ENABLED location options found:', enabledCount);

    if (enabledCount > 0) {
      const firstEnabled = enabledOptions.first();
      await firstEnabled.waitFor({ state: 'visible', timeout: 10000 });
      const label = (await firstEnabled.innerText()).trim();
      console.log('Selecting enabled location:', label);

      if (label === 'No locations available') {
        // if you want to re-open/close the dropdown:
        //const selectLocationAgain = this.page.locator(this.selectaLocation);
        // await selectLocationAgain.click();   
        console.log('No locations and exit');
        return; // exit the function
      } else {
        await firstEnabled.click();
        console.log('Selected first ENABLED pickup location.');
      }
    } else {
      // ❗ No enabled options → expect "No locations available"
      const firstOption = allOptions.first();
      const text = (await firstOption.innerText()).trim();
      console.log('First disabled option text:', `"${text}"`);
    }

    await this.page.waitForTimeout(3000);
  }

  async selectRandomPickupDay() {
    // 1. Validate header text
    await this.pickupDaySection.waitFor({ state: 'visible', timeout: 15000 });
    const headerText = (await this.pickupDaySection.innerText()).trim();
    console.log('Pickup day header text:', headerText);

    if (!headerText.toLowerCase().includes('select pickup day')) {
      throw new Error(`Expected pickup day text to contain "Select Pickup Day" but got: "${headerText}"`);
    }

    // 2. Wait for dates to load
    await this.pickupDayItems.first().waitFor({ state: 'visible', timeout: 15000 });

    const count = await this.pickupDayItems.count();
    console.log('Total pickup day options:', count);

    if (count === 0) {
      throw new Error('No pickup days available to select.');
    }

    // 3. Build array of day labels
    const dayLabels = [];
    for (let i = 0; i < count; i++) {
      const el = this.pickupDayItems.nth(i);
      const text = (await el.innerText()).trim();
      dayLabels.push(text);
    }

    console.log('All pickup day labels:', dayLabels);

    // 4. Pick random index
    const randomIndex = Math.floor(Math.random() * count);
    const randomDay = this.pickupDayItems.nth(randomIndex);
    const randomLabel = dayLabels[randomIndex];
    console.log(`Clicking random pickup day: [${randomIndex}] -> ${randomLabel}`);

    await randomDay.click();
    await this.page.waitForTimeout(1000);
    return randomLabel; // in case you want to assert later
  }

  async Mealtype() {
    const mealTypeHeader = this.page.getByText('Choose Meal Type', { exact: false });
    await mealTypeHeader.waitFor({ state: 'visible', timeout: 15000 });
    console.log('Meal type header text:', mealTypeHeader);
    const Meal=testData.user.MealType;
    switch(Meal){
      case 'Lunch':
        await this.page.click(this.Lunch);
        console.log('Lunch selected');
        break;
      case 'Dinner':
        await this.page.click(this.Dinner);
        console.log('Dinner selected');
        break;  
    }
}
}