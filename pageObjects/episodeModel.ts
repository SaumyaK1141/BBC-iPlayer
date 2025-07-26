import { Page, Locator } from '@playwright/test';

export class EpisodeModel {
    readonly page: Page;
    readonly episodeItems: Locator;
    readonly playButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.episodeItems = page.locator('a[href*="/iplayer/episode/"]')
        this.playButton = page.locator('[class="play-cta__icon"]')

    }

    selectEpisodeItem(episode: string): Locator {
        return this.episodeItems.filter({ hasText: episode });
    }
}
