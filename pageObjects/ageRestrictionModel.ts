import { Page, Locator } from '@playwright/test';

export class AgeRestrictionModel {
    readonly page: Page;
    readonly ageRestrictionModel: Locator;
    readonly okayButton: Locator;
    readonly closeIcon: Locator;
    readonly ageRestrictionTitleText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ageRestrictionModel = page.locator('.modal-dialog');
        this.okayButton = page.locator('.js-close-age-restricted-modal');
        this.closeIcon = page.locator('.js-close-modal');
        this.ageRestrictionTitleText = page.locator("[id='modal-overlay-title']");

    }
}
