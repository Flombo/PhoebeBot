import puppeteer, { Browser, Page } from "puppeteer";
import { ICommand } from "../commands/ICommand";
import { IReference } from "./IReference";
import { IReferenceRetrieverService } from "./IReferenceRetrieverService";
import { QuickPoseReference } from "./QuickPoseReference";
import { CommandOptionChoice } from "../commands/CommandOptionChoice";
import { Choice } from "../commands/Choice";
import { SlashCommand } from "../commands/SlashCommand";
import { PoseCommand } from "../commands/poseCommands/PoseCommand";

export class QuickPoseReferenceRetrieverService implements IReferenceRetrieverService {

    private browser : Browser;
    private page : Page;

    constructor() {
        this.browser = new Browser();
        this.page = new Page();
    }
    
    public async getReference(command: ICommand): Promise<IReference> {

        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox",
                "--no-sandbox",
            ]
        });

        this.page = await this.browser.newPage();
        await this.page.goto('https://quickposes.com/en/gestures/random');

        await this.makeReferenceSelection(this.page, command);
        // Need to wait until the DOM is completely loaded, else the reference won't be there.
        await this.page.waitForNetworkIdle();
        const reference : IReference = await this.retrieveReferenceUrl(this.page);
        reference.owner = await this.retrieveReferenceOwner(this.page);

        return reference;
    }

    public mirrorHorizontal(reference: IReference): IReference {
        throw new Error("Method not implemented.");
    }

    public mirrorVertical(reference: IReference): IReference {
        throw new Error("Method not implemented.");
    }

    public rotateClockwise(reference: IReference): IReference {
        throw new Error("Method not implemented.");
    }

    public rotateCounterClockwise(reference: IReference): IReference {
        throw new Error("Method not implemented.");
    }

    /**
     * Selects the reference options on the side equal to the entered command options and clicks on the Start-button.
     * @param page
     * @param options
     * @private
     */
    private async makeReferenceSelection(page : Page, command : any) : Promise<void> {
        await page.evaluate((name : string, options : Array<CommandOptionChoice>) => {

            const items : NodeListOf<HTMLSpanElement> = document.querySelectorAll('span.ui-button-text');
            if(items !== undefined) {
                items.forEach((item : HTMLSpanElement) => {

                    if (item.innerText === name) {
                        item.click();
                    }

                    options.forEach((option : CommandOptionChoice) => {
                        option.choices.forEach((choice : Choice) => {
                            if(item.innerText === choice.name) {
                                item.click();
                            }
                        });
                    });

                    if(item.innerText === 'Start') {
                        item.click();
                    }
                });
            }
        }, command.name, command.options);
    }

    private async retrieveReferenceOwner(page : Page) : Promise<string> {
        return await page.evaluate(async () : Promise<string> => {
            let owner = 'No owner data found';
            const spanImgOwner : HTMLSpanElement | null = document.querySelector('span.qp-image-owner');

            if(spanImgOwner !== null && spanImgOwner.textContent !== null  && spanImgOwner.textContent.length > 0) {
                owner = spanImgOwner.textContent;
            }
            
            return await new Promise(resolve => {
                resolve(owner);
            });
        });
    }

    private async retrieveReferenceUrl(page : Page) : Promise<IReference> {

        const imageData : string = await page.evaluate(async() : Promise<string> => {
            const images : NodeListOf<HTMLImageElement> = document.querySelectorAll("img");
            const image = images[images.length - 1];

            const imageData : Object = {
                url: image.src,
                width : image.naturalWidth,
                height : image.naturalHeight,
                owner : '',
                imageData : ''
            }
            return await new Promise(resolve => {
                resolve(JSON.stringify(imageData));
            });
        });

        console.log(imageData)
        const reference : IReference = Object.assign(new QuickPoseReference(), JSON.parse(imageData));

        return reference;
    }
    
}