import { Page, Locator } from '@playwright/test';

export class HomeModel {
    readonly page: Page;

    readonly homeSection: Locator;
    readonly carouselSelction: Locator;
    readonly carouselTrackSelection: Locator;
    readonly programSelection: Locator;
    readonly forwardArrowButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.homeSection = page.locator('section');
        this.carouselSelction = page.locator('.carousel, .carrousel.carrousel--with-arrows');
        this.carouselTrackSelection = page.locator('.carrousel__track');
        this.programSelection = page.locator("li[class*='carrousel__item']");
        this.forwardArrowButton = page.locator('button[data-bbc-content-label="forward"]').first();


    }

    episodeItem(episode: string): Locator {
        return this.programSelection.filter({ hasText: episode });
    }
}
