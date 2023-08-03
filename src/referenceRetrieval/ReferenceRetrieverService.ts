import sharp from "sharp";
import { IReferenceCommand } from "../commands/IReferenceCommand";
import { IReference } from "./IReference";
import { IReferenceRetrieverService } from "./IReferenceRetrieverService";

export abstract class ReferenceRetrieverService implements IReferenceRetrieverService {

    private angle: number = 270;

    getReference(command: IReferenceCommand): Promise<IReference> {
        throw new Error("Method not implemented. Used command: " + command);
    }

    public async mirrorHorizontal(reference: IReference): Promise<IReference> {
        if (reference.imageData.length > 0) {
            reference.imageData = await sharp(reference.imageData).flop().toBuffer();
        } else {
            const image: Response = await fetch(reference.url);
            const buffer: Buffer = Buffer.from(await image.arrayBuffer());
            reference.imageData = await sharp(buffer).flop().toBuffer();
        }

        return reference;
    }

    public async mirrorVertical(reference: IReference): Promise<IReference> {
        if (reference.imageData.length > 0) {
            reference.imageData = await sharp(reference.imageData).flip().toBuffer();
        } else {
            const image: Response = await fetch(reference.url);
            const buffer: Buffer = Buffer.from(await image.arrayBuffer());
            reference.imageData = await sharp(buffer).flip().toBuffer();
        }

        return reference;
    }

    public async rotateClockwise(reference: IReference): Promise<IReference> {
        if (reference.imageData.length > 0) {
            reference.imageData = await sharp(reference.imageData).rotate(-this.angle).toBuffer();
        } else {
            const image: Response = await fetch(reference.url);
            const buffer: Buffer = Buffer.from(await image.arrayBuffer());
            reference.imageData = await sharp(buffer).rotate(-this.angle).toBuffer();
        }

        return reference;
    }

    public async rotateCounterClockwise(reference: IReference): Promise<IReference> {
        if (reference.imageData.length > 0) {
            reference.imageData = await sharp(reference.imageData).rotate(this.angle).toBuffer();
        } else {
            const image: Response = await fetch(reference.url);
            const buffer: Buffer = Buffer.from(await image.arrayBuffer());
            reference.imageData = await sharp(buffer).rotate(this.angle).toBuffer();
        }

        return reference;
    }

    public negate(reference: IReference): Promise<IReference> {
        throw new Error("Method not implemented. ref: " + reference);
    }

    public blur(reference: IReference): Promise<IReference> {
        throw new Error("Method not implemented. ref: " + reference);
    }

    public sharpen(reference: IReference): Promise<IReference> {
        throw new Error("Method not implemented. ref: " + reference);
    }

    public greyscale(reference: IReference): Promise<IReference> {
        throw new Error("Method not implemented. ref: " + reference);
    }

    public blackAndWhite(reference: IReference): Promise<IReference> {
        throw new Error("Method not implemented. ref: " + reference);
    }

}