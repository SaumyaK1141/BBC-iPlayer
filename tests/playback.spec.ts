import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { EpisodePage } from '../pages/episodePage';
import { PageUrl } from '../common/enum/urls';

test.describe('Home Page', () => {
    let homePage: HomePage;
    let episodePage: EpisodePage;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        episodePage = new EpisodePage(page);

    })
    test('Verify the relevant Playback page is displayed when an episode is clicked', async () => {
        const episodeProgramme = 'Billion Dollar Playground';
        const selectEpisode = 'Series 1: Episode 1';

        await homePage.navigate(PageUrl.IPLAYER);
        await homePage.acceptCookiesIfPresent();
        await homePage.searchEpisode(episodeProgramme);
        await episodePage.verifyURLContains(PageUrl.BILLION_DOLLAR_PLAYGROUND)
        await episodePage.clickSelectedEpisode(selectEpisode);
        await episodePage.verifyURLContains(PageUrl.BILLION_DOLLAR_EPISODES)
        await episodePage.verifyPlayButtonVisible();

    })

})



