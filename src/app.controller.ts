import {Controller, Get, NotFoundException, Post, Res, Response, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    private file;

    @Get('file')
    getFile(@Response() res) {
        if (this.file) {
            res.contentType(this.file.mimetype);
            res.end(this.file.buffer);
        } else {
            throw new NotFoundException();
        }
    }

    @Post('pushFile')
    @UseInterceptors(FileInterceptor('file'))
    pushFile(@UploadedFile() file) {
        this.file = file;
    }
}
