import { Page, expect } from '@playwright/test';
import { BasePageModel } from './basePageModel';
import { EpisodeModel } from '../pageObjects/episodeModel';


export class EpisodePage extends BasePageModel {
    readonly episodePage: EpisodeModel;

    constructor(page: Page) {
        super(page);
        this.episodePage = new EpisodeModel(page);
    }
    
     async clickSelectedEpisode(episode: string): Promise<void> {
        await this.episodePage.selectEpisodeItem(episode).click();

    }
    async verifyPlayButtonVisible(): Promise<void> {
        await expect(this.episodePage.playButton).toBeVisible();


  }};