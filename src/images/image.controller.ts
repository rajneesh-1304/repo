import { Controller, Get,  } from "@nestjs/common";
import { ImageService } from "./image.service";

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @Get()
    getImages() {
        return this.imageService.getImages();
    }
}