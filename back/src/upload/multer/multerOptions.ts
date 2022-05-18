import { BadRequestException, HttpException } from "@nestjs/common"
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdir, mkdirSync } from "fs"
import { diskStorage } from "multer";
import { extname, join } from "path";

export const multerOptions: MulterOptions = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg | jpeg | png)$/)) {
            cb(null, true);
        } else {
            cb(new BadRequestException("지원하지 않는 이미지 형식입니다."), false);
        }

    },
    storage: diskStorage({
        destination: (req, file, cb) => {
            const uploadPath: string = "public";

            if (!existsSync(uploadPath)) { // path 가 있는지 없는지
                mkdirSync(uploadPath);
            }

            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, file.filename)
        }
    }),
    limits: {
        fileSize: 50 * 1024 * 1024 // 50mb
    }
}

export const createImageUrl = (file): string => {
    const serverAddress: string = join(__dirname);
    console.log(__dirname)

    return `http://localhost:3002/public/${file.filename}`;
}