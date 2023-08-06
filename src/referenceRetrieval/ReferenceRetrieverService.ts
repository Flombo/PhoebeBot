import sharp from "sharp";
import { IReferenceCommand } from "../commands/IReferenceCommand";
import { IReference } from "./IReference";
import { IReferenceRetrieverService } from "./IReferenceRetrieverService";

export abstract class ReferenceRetrieverService implements IReferenceRetrieverService {

    private angle: number = 270;

    getReference(command: IReferenceCommand): Promise<IReference> {
        throw new Error("Method not implemented. Used command: " + command);
    }

    private async getBuffer(reference: IReference): Promise<Buffer> {
        let buffer: Buffer = reference.imageData;

        if (buffer.length == 0) {
            const image: Response = await fetch(reference.url);
            buffer = Buffer.from(await image.arrayBuffer());
        }
        return buffer;
    }

    public async mirrorHorizontal(reference: IReference): Promise<IReference> {
        const buffer: Buffer = await this.getBuffer(reference);
        reference.imageData = await sharp(buffer).flop().toBuffer();
        return reference;
    }

    public async mirrorVertical(reference: IReference): Promise<IReference> {
        const buffer: Buffer = await this.getBuffer(reference);
        reference.imageData = await sharp(buffer).flip().toBuffer();
        return reference;
    }

    public async rotateClockwise(reference: IReference): Promise<IReference> {
        const buffer: Buffer = await this.getBuffer(reference);
        reference.imageData = await sharp(buffer).rotate(-this.angle).toBuffer();
        return reference;
    }

    public async rotateCounterClockwise(reference: IReference): Promise<IReference> {
        const buffer: Buffer = await this.getBuffer(reference);
        reference.imageData = await sharp(buffer).rotate(this.angle).toBuffer();
        return reference;
    }

    public async negate(reference: IReference): Promise<IReference> {
        const buffer: Buffer = await this.getBuffer(reference);
        reference.imageData = await sharp(buffer).negate().toBuffer();
        return reference;
    }

    public async blur(reference: IReference): Promise<IReference> {
        const buffer: Buffer = await this.getBuffer(reference);
        reference.imageData = await sharp(buffer).blur().toBuffer();
        return reference;
    }

    public async sharpen(reference: IReference): Promise<IReference> {
        const buffer: Buffer = await this.getBuffer(reference);
        reference.imageData = await sharp(buffer).sharpen().toBuffer();
        return reference;
    }

    public async greyscale(reference: IReference): Promise<IReference> {
        const buffer: Buffer = await this.getBuffer(reference);
        reference.imageData = await sharp(buffer).grayscale().toBuffer();
        return reference;
    }

}