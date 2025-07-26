import { test } from '@playwright/test';
import { AgeRestrictionPage } from '../pages/ageRestrictionPage';
import { PageUrl } from '../common/enum/urls';

test.describe('age Restriction Model', () => {
    let ageRestriction: AgeRestrictionPage;

    test.beforeEach(async ({ page }) => {
        ageRestriction = new AgeRestrictionPage(page);
    })
    test('Verfiy age Restriction modal dissmissed', async () => {
        const ageRestricyionText= 'Age-restricted Video';

        await ageRestriction.navigate(PageUrl.AGE_RESTRICTED);
        await ageRestriction.acceptCookiesIfPresent();
        await ageRestriction.verifyURL(PageUrl.AGE_RESTRICTED);
        await ageRestriction.ageRestrictedModel();
        await ageRestriction.agrRestrictionModelText(ageRestricyionText);
        await ageRestriction.agrRestrictionCloseIcon();

    })
})



