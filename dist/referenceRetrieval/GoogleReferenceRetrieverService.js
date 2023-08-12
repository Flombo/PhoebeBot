"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleReferenceRetrieverService = void 0;
const tslib_1 = require("tslib");
const puppeteer_1 = tslib_1.__importStar(require("puppeteer"));
const ReferenceRetrieverService_1 = require("./ReferenceRetrieverService");
class GoogleReferenceRetrieverService extends ReferenceRetrieverService_1.ReferenceRetrieverService {
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
                headless: "new",
                timeout: 30 * 1000,
                args: [
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                    "--disable-setuid-sandbox",
                    "--no-sandbox"
                ]
            });
            const context = await this.browser.createIncognitoBrowserContext();
            this.page = await context.newPage();
            this.alreadyInstantiatedBrowser = true;
        }
        await this.page.goto('https://www.google.de/imghp?hl=de&ogbl');
        await this.makeReferenceSelection(this.page, command);
        await this.page.waitForNetworkIdle();
        const referenceAmountOption = command.options.find(option => option.name = "referenceamount");
        const orderOption = command.options.find(option => option.name === "order");
        const amount = referenceAmountOption ? referenceAmountOption.value : 1;
        const order = orderOption ? orderOption.value : 'rnd';
        const references = await this.retrieveReferenceUrl(this.page, amount, order);
        return references;
    }
    async makeReferenceSelection(page, command) {
        await page.evaluate((options) => {
            const discardAllButton = document.querySelector('button[id="W0wltc"]');
            if (discardAllButton) {
                discardAllButton.click();
            }
            const searchbar = document.querySelector(`textarea[type="search"]`);
            const searchString = options.find(option => option.name === 'searchstring');
            if (searchString === undefined) {
                return;
            }
            if (searchbar && searchString.value !== undefined) {
                searchbar.click();
                const searchStringValue = searchString.value.toString();
                searchbar.value = searchStringValue;
            }
            const searchButton = document.querySelector('button[aria-label="Google Suche"]');
            if (searchButton === null) {
                throw new Error("Searchbutton couldn't be retrieved!");
            }
            searchButton.click();
            const nsfwOption = options.find(option => option.name = "nsfw");
            console.log(nsfwOption);
            if (nsfwOption !== undefined) {
                const nsfwDropDown = document.querySelector('div[class="CgGjZc"]');
                console.log(nsfwDropDown);
                if (nsfwDropDown) {
                    nsfwDropDown.click();
                    const nsfwValue = nsfwOption.value;
                    const nsfwDropDownValue = nsfwValue ? "Sexuell explizite Ergebnisse filtern" : "Aus";
                    const dropDownOption = document.querySelector(`a[text()="${nsfwDropDownValue}"]`);
                    if (dropDownOption) {
                        dropDownOption.click();
                    }
                }
            }
            return;
        }, command.options);
    }
    async retrieveReferenceUrl(page, referenceAmount, order) {
        console.log('reference url');
        const referencesJSON = await page.evaluate(async () => {
            const imageReferences = new Array();
            const imageContainers = document.querySelectorAll('div[class="isv-r PNCib MSM1fd BUooTd"]');
            const imageContainerLength = imageContainers.length - 1;
            switch (order) {
                case 'asc':
                    for (let i = imageContainerLength; i > imageContainerLength - referenceAmount; i--) {
                        const imageContainer = imageContainers[i];
                        const ownerDiv = imageContainer.querySelector('div[class= "LAA3yd"]');
                        const image = imageContainer.querySelector('img[class="rg_i Q4LuWd"]');
                        if (image === null) {
                            throw new Error('Image not found!');
                        }
                        const imageData = {
                            url: image.src,
                            width: image.naturalWidth,
                            height: image.naturalHeight,
                            owner: ownerDiv ? ownerDiv.textContent : '',
                            imageData: ''
                        };
                        imageReferences.push(imageData);
                    }
                    break;
                case 'desc':
                    for (let i = 0; i > 0 + referenceAmount; i++) {
                        const imageContainer = imageContainers[i];
                        const ownerDiv = imageContainer.querySelector('div[class= "LAA3yd"]');
                        const image = imageContainer.querySelector('img[class="rg_i Q4LuWd"]');
                        if (image === null) {
                            throw new Error('Image not found!');
                        }
                        const imageData = {
                            url: image.src,
                            width: image.naturalWidth,
                            height: image.naturalHeight,
                            owner: ownerDiv ? ownerDiv.textContent : '',
                            imageData: ''
                        };
                        imageReferences.push(imageData);
                    }
                    break;
                case 'rnd':
                    let i = 0;
                    while (i < referenceAmount) {
                        const imageContainer = imageContainers[Math.floor(Math.random() * (imageContainerLength))];
                        const ownerDiv = imageContainer.querySelector('div[class= "LAA3yd"]');
                        const image = imageContainer.querySelector('img[class="rg_i Q4LuWd"]');
                        if (image === null) {
                            throw new Error('Image not found!');
                        }
                        const imageData = {
                            url: image.src,
                            width: image.naturalWidth,
                            height: image.naturalHeight,
                            owner: ownerDiv ? ownerDiv.textContent : '',
                            imageData: ''
                        };
                        imageReferences.push(imageData);
                        i++;
                    }
                    break;
            }
            return await new Promise(resolve => {
                resolve(JSON.stringify(imageReferences));
            });
        });
        const references = Object.assign(new Array(), JSON.parse(referencesJSON));
        console.log(references);
        return references;
    }
}
exports.GoogleReferenceRetrieverService = GoogleReferenceRetrieverService;
//# sourceMappingURL=GoogleReferenceRetrieverService.js.map