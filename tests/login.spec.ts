import {expect, test} from '@playwright/test';
import {LoginPage} from "@/test_pom/LoginPage";

test.describe('log in', () => {
    test(
        'fail with incorrect credentials',
        {tag: ['@login']},
        async ({page, browserName}, testInfo) => {

            const p = new LoginPage(page)

            await p.goToLogin()

            if (browserName == 'webkit') {
                /**
                 * NOTE : ---------------------------------
                 * Turning off the following makes the test fail with headed mode also.
                 * This is only required with "webkit" browsers.
                 */
                await page.waitForLoadState("networkidle")
            }

            await p.fillForm('admin10@gmail.com', '123456')
            await p.submitForm()

            await expect(page.getByText('Invalid credential'))
                .toBeVisible()

            // // -- take a screenshot on preferred time -- //
            // const screenshotPath = testInfo.outputPath(`failure-${browserName}-${Date.now()}.png`);
            // testInfo.attachments.push({name: 'screenshot', path: screenshotPath, contentType: 'image/png'});
            // await page.screenshot({path: screenshotPath, timeout: 5000, fullPage: true});

            await page.close()
        }
    )
})