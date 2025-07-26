import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { PageUrl } from '../common/enum/urls';

test.describe('Home Page Scenarios', () => {
    let homePage: HomePage;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);

    })
    test('Verfiy home page Title', async () => {
        const title = 'BBC iPlayer - Home';

        await homePage.navigate(PageUrl.IPLAYER);
        await homePage.acceptCookiesIfPresent();
        await homePage.verifyPageTitle(title);
    })

    test('Verify page has at least 4 sections with one carousel', async () => {
        await homePage.navigate(PageUrl.IPLAYER);
        await homePage.acceptCookiesIfPresent();
        await homePage.verifyAtLeastFourSectionsWithCarousel();
    });

    test('Verify carousel displays 4 programme items ', async () => {
        await homePage.navigate(PageUrl.IPLAYER);
        await homePage.acceptCookiesIfPresent();
        await homePage.verifyCarouselsProgrammeItems();
    });

    test('Verify more items in the carousel are shown when clicking on the forword arrow', async () => {
        await homePage.navigate(PageUrl.IPLAYER);
        await homePage.acceptCookiesIfPresent();
        await homePage.verifyCarouselItemsIncreaseAfterArrowClick();
    });
})



