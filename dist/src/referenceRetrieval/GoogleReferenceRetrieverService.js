"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleReferenceRetrieverService = void 0;
const tslib_1 = require("tslib");
const puppeteer_1 = require("puppeteer");
const ReferenceRetrieverService_1 = require("./ReferenceRetrieverService");
const puppeteer_extra_1 = tslib_1.__importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = tslib_1.__importDefault(require("puppeteer-extra-plugin-stealth"));
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
            const puppeteer = puppeteer_extra_1.default;
            const stealthPlugin = (0, puppeteer_extra_plugin_stealth_1.default)();
            puppeteer.use(stealthPlugin);
            this.browser = await puppeteer.launch({
                headless: false,
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
            this.page.setBypassCSP(true);
            this.alreadyInstantiatedBrowser = true;
        }
        await this.page.goto('https://www.google.de/imghp?hl=de&ogbl');
        await this.makeReferenceSelection(this.page, command);
        await this.page.waitForNetworkIdle();
        const referenceAmountOption = command.options.find(option => option.name = "referenceamount");
        const orderOption = command.options.find(option => option.name === "order");
        const amount = referenceAmountOption ? referenceAmountOption.value : 1;
        const order = orderOption ? orderOption.value : 'rnd';
        console.log(order, amount);
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
        const referencesJSON = await page.evaluate(async () => {
            const imageReferences = new Array();
            const imageContainers = document.querySelectorAll('div[class="isv-r PNCib MSM1fd BUooTd"]');
            const imageContainerLength = imageContainers.length - 1;
            console.log(imageContainerLength, imageContainers);
            for (let i = imageContainerLength; i > imageContainerLength - 1; i--) {
                const imageContainer = imageContainers[i];
                const ownerDivContainer = imageContainer.querySelector('div[class="mEQved Yx2mie GdCiyb"]');
                const ownerDiv = ownerDivContainer?.querySelector('div[class= "LAA3yd"]');
                const image = imageContainer.querySelector('img[class="rg_i Q4LuWd"]');
                console.log(ownerDivContainer, ownerDiv, image);
                if (image === null) {
                    return await new Promise((reject) => {
                        reject("No image found!");
                    });
                }
                const imageData = {
                    url: image.src !== undefined && image.src.length > 0 ? image.src : image.getAttribute('data-src'),
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                    owner: ownerDiv ? ownerDiv.textContent : '',
                    imageData: ''
                };
                imageReferences.push(imageData);
            }
            console.log(imageReferences);
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
