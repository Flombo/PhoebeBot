import puppeteer, { Browser, BrowserContext, Page } from "puppeteer";
import { CommandOptionChoice } from "../commands/CommandOptionChoice";
import { IReferenceCommand } from "../commands/IReferenceCommand";
import { IReference } from "./IReference";
import { ReferenceRetrieverService } from "./ReferenceRetrieverService";

export class GoogleReferenceRetrieverService extends ReferenceRetrieverService {

    private browser: Browser;
    private page: Page;
    private alreadyInstantiatedBrowser: boolean;

    constructor() {
        super();
        this.browser = new Browser();
        this.page = new Page();
        this.alreadyInstantiatedBrowser = false;
    }

    public async getReference(command: IReferenceCommand): Promise<Array<IReference>> {

        if (!this.alreadyInstantiatedBrowser || this.page.isClosed()) {
            this.browser = await puppeteer.launch({
                headless: "new",
                timeout: 30 * 1000,
                args: [
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                    "--disable-setuid-sandbox",
                    "--no-sandbox"
                ]
            });
            const context: BrowserContext = await this.browser.createIncognitoBrowserContext();
            this.page = await context.newPage();
            this.alreadyInstantiatedBrowser = true;
        }

        await this.page.goto('https://www.google.de/imghp?hl=de&ogbl');

        await this.makeReferenceSelection(this.page, command);
        // Need to wait until the DOM is completely loaded, else the reference won't be there.
        await this.page.waitForNetworkIdle();
        const referenceAmountOption: CommandOptionChoice | undefined = command.options.find(option => option.name = "referenceamount");
        const orderOption: CommandOptionChoice | undefined = command.options.find(option => option.name === "order");

        const amount: number = referenceAmountOption ? referenceAmountOption.value as number : 1;
        const order: string = orderOption ? orderOption.value as string : 'rnd';

        const references: Array<IReference> = await this.retrieveReferenceUrl(this.page, amount, order);

        return references;
    }

    /**
     * Selects the reference options on the side equal to the entered command options and clicks on the Start-button.
     * @param page
     * @param options
     * @private
     */
    private async makeReferenceSelection(page: Page, command: IReferenceCommand): Promise<void> {
        await page.evaluate((options: Array<CommandOptionChoice>) => {
            const discardAllButton: HTMLButtonElement | null = document.querySelector('button[id="W0wltc"]');


            if (discardAllButton) {
                discardAllButton.click();
            }

            const searchbar: HTMLTextAreaElement | null = document.querySelector(`textarea[type="search"]`);
            const searchString: CommandOptionChoice | undefined = options.find(option => option.name === 'searchstring');

            if (searchString === undefined) {
                return;
            }

            if (searchbar && searchString.value !== undefined) {
                searchbar.click();
                const searchStringValue: string = searchString.value.toString();
                searchbar.value = searchStringValue;
            }

            const searchButton: HTMLButtonElement | null = document.querySelector('button[aria-label="Google Suche"]');

            if (searchButton === null) {
                throw new Error("Searchbutton couldn't be retrieved!");
            }

            searchButton.click();

            const nsfwOption: CommandOptionChoice | undefined = options.find(option => option.name = "nsfw");

            console.log(nsfwOption)
            if (nsfwOption !== undefined) {
                const nsfwDropDown: HTMLDivElement | null = document.querySelector('div[class="CgGjZc"]');
                console.log(nsfwDropDown);

                if (nsfwDropDown) {
                    nsfwDropDown.click();
                    const nsfwValue: boolean = nsfwOption.value as boolean;
                    const nsfwDropDownValue: string = nsfwValue ? "Sexuell explizite Ergebnisse filtern" : "Aus";
                    const dropDownOption: HTMLAnchorElement | null = document.querySelector(`a[text()="${nsfwDropDownValue}"]`);

                    if (dropDownOption) {
                        dropDownOption.click();
                    }
                }
            }

            return;

        }, command.options);
    }

    private async retrieveReferenceUrl(page: Page, referenceAmount: number, order: string): Promise<Array<IReference>> {

        console.log('reference url')
        const referencesJSON: string = await page.evaluate(async (): Promise<string> => {
            const imageReferences: Array<Object> = new Array();
            const imageContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll('div[class="isv-r PNCib MSM1fd BUooTd"]');
            const imageContainerLength: number = imageContainers.length - 1;

            switch (order) {
                case 'asc':
                    for (let i: number = imageContainerLength; i > imageContainerLength - referenceAmount; i--) {
                        const imageContainer: HTMLDivElement = imageContainers[i];
                        const ownerDiv: HTMLDivElement | null = imageContainer.querySelector('div[class= "LAA3yd"]');
                        const image: HTMLImageElement | null = imageContainer.querySelector('img[class="rg_i Q4LuWd"]');

                        if (image === null) {
                            throw new Error('Image not found!');
                        }

                        const imageData: Object = {
                            url: image.src,
                            width: image.naturalWidth,
                            height: image.naturalHeight,
                            owner: ownerDiv ? ownerDiv.textContent : '',
                            imageData: ''
                        }

                        imageReferences.push(imageData);
                    }
                    break;
                case 'desc':
                    for (let i: number = 0; i > 0 + referenceAmount; i++) {
                        const imageContainer: HTMLDivElement = imageContainers[i];
                        const ownerDiv: HTMLDivElement | null = imageContainer.querySelector('div[class= "LAA3yd"]');
                        const image: HTMLImageElement | null = imageContainer.querySelector('img[class="rg_i Q4LuWd"]');

                        if (image === null) {
                            throw new Error('Image not found!');
                        }

                        const imageData: Object = {
                            url: image.src,
                            width: image.naturalWidth,
                            height: image.naturalHeight,
                            owner: ownerDiv ? ownerDiv.textContent : '',
                            imageData: ''
                        }

                        imageReferences.push(imageData);
                    }
                    break;
                case 'rnd':
                    let i: number = 0;
                    while (i < referenceAmount) {
                        const imageContainer: HTMLDivElement = imageContainers[Math.floor(Math.random() * (imageContainerLength))];
                        const ownerDiv: HTMLDivElement | null = imageContainer.querySelector('div[class= "LAA3yd"]');
                        const image: HTMLImageElement | null = imageContainer.querySelector('img[class="rg_i Q4LuWd"]');

                        if (image === null) {
                            throw new Error('Image not found!');
                        }

                        const imageData: Object = {
                            url: image.src,
                            width: image.naturalWidth,
                            height: image.naturalHeight,
                            owner: ownerDiv ? ownerDiv.textContent : '',
                            imageData: ''
                        }

                        imageReferences.push(imageData);
                        i++;
                    }
                    break;
            }

            return await new Promise(resolve => {
                resolve(JSON.stringify(imageReferences));
            });
        });

        const references: Array<IReference> = Object.assign(new Array<IReference>(), JSON.parse(referencesJSON));

        console.log(references)

        return references;
    }


}