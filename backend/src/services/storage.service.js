import ImageKit, { toFile } from '@imagekit/nodejs';
import { appConfig } from '../configs/app.config.js';

const imagekit = new ImageKit({
    privateKey: appConfig.IMAGEKIT_API_KEY
});

export const uploadFile = async({buffer, fileName, folder = "snitch"}) => {
    try {
        const result = await imagekit.files.upload({
            file: await toFile(buffer),
            fileName,
            folder
        });

        return result;
    } catch(err) {
        console.log("Upload file error:", err);
        throw err;
    }
}