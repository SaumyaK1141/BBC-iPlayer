import { Locator, Page, expect } from '@playwright/test';
import { Utils } from '../common/utils';

export abstract class BasePageModel {
    readonly page: Page;
    readonly url?: string;
    readonly clickSearchBox: Locator;
    readonly inputSearchEpisode: Locator;
    readonly episodeItems: Locator;

    readonly utils: Utils

    constructor(page: Page, url?: string) {
        this.page = page;
        this.url = url;
        this.utils = new Utils(page);
        this.clickSearchBox = page.locator("div[role='search']");
        this.inputSearchEpisode = page.locator("[id='search-bar-input']");
        this.episodeItems = page.locator("li[class*='grid__item']")


    }

    async navigate(url?: string, options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }): Promise<void> {
        if (url || this.url) {
            await this.page.goto(url ?? this.url!, options);
        } else {
            throw new Error('No URL provided to navigate');
        }
    };

    async verifyURL(url: string | RegExp): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 2000 });
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL(url);
    };

    async verifyURLContains(partial: string): Promise<void> {
        await this.verifyURL(new RegExp(partial));
    };

    async acceptCookiesIfPresent(): Promise<void> {
        const acceptBtn = this.page.locator('#bbccookies-accept-button');
        try {
            await acceptBtn.waitFor({ state: 'visible', timeout: 3000 });
            await acceptBtn.click();
        } catch {
        }
    }

    async verifyPageTitle(title: string): Promise<void> {
        const pageTitle = await this.page.title();
        expect(pageTitle).toBe(title);
    }


    async searchEpisode(episode: string): Promise<void> {
        await this.clickSearchBox.click();
        await this.inputSearchEpisode.fill(episode);
        await this.page.waitForTimeout(2000);
        await this.episodeItems.filter({hasText: episode}).click();

    }
}
