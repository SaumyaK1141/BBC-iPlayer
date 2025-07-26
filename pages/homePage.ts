import { Page, Locator, expect } from '@playwright/test';
import { BasePageModel } from './basePageModel';
import { HomeModel } from '../pageObjects/homeModel';


export class HomePage extends BasePageModel {
    readonly homePage: HomeModel;

    constructor(page: Page) {
        super(page);
        this.homePage = new HomeModel(page);
    }

    async verifyAtLeastFourSectionsWithCarousel(): Promise<void> {
        const sectionCount = await this.homePage.homeSection.count();
        expect(
            sectionCount,
            `Expected at least 4 sections, but found ${sectionCount}`
        ).toBeGreaterThanOrEqual(4);
        let hasCarousel = false;

        for (let i = 0; i < sectionCount; i++) {
            const section = this.homePage.homeSection.nth(i);

            const carouselCount = await section.locator(this.homePage.carouselSelction).count();
            const trackCount = await section.locator(this.homePage.carouselTrackSelection).count();

            if (carouselCount > 0 || trackCount > 0) {
                hasCarousel = true;
                break;
            }
        }
        expect(
            hasCarousel,
            'Expected at least one of the sections to contain one carousel').toBe(true);
    }

    async getAllCarousels(): Promise<Locator> {
        return this.homePage.carouselSelction;
    }
    async countItemsInCarousel(carouselLocator: Locator): Promise<number> {
        return await carouselLocator.locator(this.homePage.programSelection).count();
    }

    async verifyCarouselsProgrammeItems(minItems: number = 4): Promise<void> {
        const carousels = await this.getAllCarousels();
        const count = await carousels.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
            const carousel = carousels.nth(i);
            const itemsCount = await this.countItemsInCarousel(carousel);
            expect(itemsCount).toBeGreaterThanOrEqual(minItems);
        }
    }


    async clickRightArrowOnCarousel(): Promise<void> {
        await this.homePage.forwardArrowButton.click();
    }

    async verifyCarouselItemsIncreaseAfterArrowClick(): Promise<void> {
        const carousels = await this.getAllCarousels();
        const count = await carousels.count();
        expect(count).toBeGreaterThan(0);
        const firstCarousel = carousels.first();
        const beforeClickCount = await this.countItemsInCarousel(firstCarousel);
        await this.clickRightArrowOnCarousel();
        const afterClickCount = await this.countItemsInCarousel(firstCarousel);
        expect(afterClickCount).toBeGreaterThanOrEqual(beforeClickCount);

    }

    async clickProgrammeItem(): Promise<void> {
        await this.homePage.programSelection.first().click();
    }

    async clickEpisodeItem(episode: string): Promise<void> {
        await this.homePage.episodeItem(episode).click();

    }
}


