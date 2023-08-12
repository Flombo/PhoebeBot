import puppeteer, { Browser, BrowserContext, Page } from "puppeteer";
import { CommandOptionChoice } from "../commands/CommandOptionChoice";
import { IReferenceCommand } from "../commands/IReferenceCommand";
import { IReference } from "./IReference";
import { Reference } from "./Reference";
import { ReferenceRetrieverService } from "./ReferenceRetrieverService";

export class QuickPoseReferenceRetrieverService extends ReferenceRetrieverService {

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

        await this.page.goto('https://quickposes.com/en/gestures/random');

        await this.makeReferenceSelection(this.page, command);
        // Need to wait until the DOM is completely loaded, else the reference won't be there.
        await this.page.waitForNetworkIdle();
        const reference: IReference = await this.retrieveReferenceUrl(this.page);
        reference.owner = await this.retrieveReferenceOwner(this.page);

        const references: Array<IReference> = new Array();
        references.push(reference);

        return references;
    }

    /**
     * Selects the reference options on the side equal to the entered command options and clicks on the Start-button.
     * @param page
     * @param options
     * @private
     */
    private async makeReferenceSelection(page: Page, command: IReferenceCommand): Promise<void> {
        await page.evaluate((commandType: string, options: Array<CommandOptionChoice>) => {
            const typeInput: HTMLInputElement | null = document.querySelector(`input[name="type"][data-value="${commandType}"]`);

            if (typeInput !== null) {
                typeInput.click();
            }

            options.forEach((option: CommandOptionChoice) => {
                const items: NodeListOf<HTMLInputElement> = document.querySelectorAll(`input[name="${option.name}"][data-value="${option.value}"]`);
                if (items === undefined) {
                    return;
                }

                items.forEach((item: HTMLInputElement) => {
                    item.click();
                });
            });

            const startButton: HTMLDivElement | null = document.querySelector('div[role="button"]');

            if (startButton !== null) {
                startButton.click();
            }

            return;

        }, command.name, command.options);
    }

    private async retrieveReferenceOwner(page: Page): Promise<string> {
        return await page.evaluate(async (): Promise<string> => {
            let owner = 'No owner data found';
            const spanImgOwner: HTMLSpanElement | null = document.querySelector('span.qp-image-owner');

            if (spanImgOwner !== null && spanImgOwner.textContent !== null && spanImgOwner.textContent.length > 0) {
                owner = spanImgOwner.textContent;
            }

            return await new Promise(resolve => {
                resolve(owner);
            });
        });
    }

    private async retrieveReferenceUrl(page: Page): Promise<IReference> {

        const imageData: string = await page.evaluate(async (): Promise<string> => {
            const images: NodeListOf<HTMLImageElement> = document.querySelectorAll("img");
            const image = images[images.length - 1];

            const imageData: Object = {
                url: image.src,
                width: image.naturalWidth,
                height: image.naturalHeight,
                owner: '',
                imageData: ''
            }
            return await new Promise(resolve => {
                resolve(JSON.stringify(imageData));
            });
        });

        const reference: IReference = Object.assign(new Reference(), JSON.parse(imageData));

        return reference;
    }

}