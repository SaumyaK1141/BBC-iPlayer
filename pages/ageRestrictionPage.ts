import { Page } from '@playwright/test';
import { BasePageModel } from './basePageModel';
import { AgeRestrictionModel } from '../pageObjects/ageRestrictionModel';

export class AgeRestrictionPage extends BasePageModel {
    readonly ageRestrictionPage: AgeRestrictionModel

    constructor(page: Page) {
        super(page);
        this.ageRestrictionPage = new AgeRestrictionModel(page);
    }

    async ageRestrictedModel(): Promise<void> {
        await this.ageRestrictionPage.ageRestrictionModel.isVisible()
    }

    async agrRestrictionModelText(testToVerify: string): Promise<void> {
        await this.utils.verifyExpectedTextIsDisplayed(this.ageRestrictionPage.ageRestrictionTitleText, testToVerify)
    }

    async agrRestrictionCloseIcon(): Promise<void> {
        await this.ageRestrictionPage.closeIcon.click();
    }

}
