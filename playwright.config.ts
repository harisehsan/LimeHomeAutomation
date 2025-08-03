import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',
    workers: 2,
    use: {
        actionTimeout: 10000,
        baseURL: process.env.BASE_URL,
        browserName: 'chromium',
        headless: true,
        // viewport: null,
        // launchOptions: {
        //     args: ['--start-maximized'],
        // },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    timeout: 90 * 1000,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'always' }],
        ['junit', { outputFile: 'results.xml' }]
    ],
});
