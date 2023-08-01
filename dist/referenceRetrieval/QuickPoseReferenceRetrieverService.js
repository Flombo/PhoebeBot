"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickPoseReferenceRetrieverService = void 0;
const tslib_1 = require("tslib");
const puppeteer_1 = tslib_1.__importStar(require("puppeteer"));
const QuickPoseReference_1 = require("./QuickPoseReference");
const ReferenceRetrieverService_1 = require("./ReferenceRetrieverService");
class QuickPoseReferenceRetrieverService extends ReferenceRetrieverService_1.ReferenceRetrieverService {
    browser;
    page;
    alreadyInstantiatedBrowser;
    constructor() {
        super();
        this.browser = new puppeteer_1.Browser();
        this.page = new puppeteer_1.Page();
        this.alreadyInstantiatedBrowser = false;
    }
    async getReference(command) {
        if (!this.alreadyInstantiatedBrowser || this.page.isClosed()) {
            this.browser = await puppeteer_1.default.launch({
                headless: true,
                args: [
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                    "--disable-setuid-sandbox",
                    "--no-sandbox",
                ]
            });
            this.page = await this.browser.newPage();
            this.alreadyInstantiatedBrowser = true;
        }
        await this.page.goto('https://quickposes.com/en/gestures/random');
        await this.makeReferenceSelection(this.page, command);
        await this.page.waitForNetworkIdle();
        const reference = await this.retrieveReferenceUrl(this.page);
        reference.owner = await this.retrieveReferenceOwner(this.page);
        return reference;
    }
    async makeReferenceSelection(page, command) {
        await page.evaluate((commandType, options) => {
            const typeInput = document.querySelector(`input[name="type"][data-value="${commandType}`);
            if (typeInput !== null) {
                typeInput.click();
            }
            options.forEach((option) => {
                option.choices.forEach((choice) => {
                    if (choice.selected) {
                        const items = document.querySelectorAll(`input[name="${option.name}"][data-value="${choice.value}"]`);
                        if (items === undefined) {
                            return;
                        }
                        items.forEach((item) => {
                            item.click();
                        });
                    }
                });
            });
            const startButton = document.querySelector('div[role="button"]');
            if (startButton !== null) {
                startButton.click();
            }
        }, command.name, command.options);
    }
    async retrieveReferenceOwner(page) {
        return await page.evaluate(async () => {
            let owner = 'No owner data found';
            const spanImgOwner = document.querySelector('span.qp-image-owner');
            if (spanImgOwner !== null && spanImgOwner.textContent !== null && spanImgOwner.textContent.length > 0) {
                owner = spanImgOwner.textContent;
            }
            return await new Promise(resolve => {
                resolve(owner);
            });
        });
    }
    async retrieveReferenceUrl(page) {
        const imageData = await page.evaluate(async () => {
            const images = document.querySelectorAll("img");
            const image = images[images.length - 1];
            const imageData = {
                url: image.src,
                width: image.naturalWidth,
                height: image.naturalHeight,
                owner: '',
                imageData: ''
            };
            return await new Promise(resolve => {
                resolve(JSON.stringify(imageData));
            });
        });
        const reference = Object.assign(new QuickPoseReference_1.QuickPoseReference(), JSON.parse(imageData));
        return reference;
    }
}
exports.QuickPoseReferenceRetrieverService = QuickPoseReferenceRetrieverService;
//# sourceMappingURL=QuickPoseReferenceRetrieverService.js.map