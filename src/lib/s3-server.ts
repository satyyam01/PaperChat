import  AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

export async function downloadFromS3(fileKey: string) {
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        });
        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: 'us-east-1',
        });
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: fileKey,
        };

        const obj = await s3.getObject(params).promise();
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
        const file_name = path.join(tempDir, `pdf-${Date.now()}.pdf`);
        fs.writeFileSync(file_name, obj.Body as Buffer);
        return file_name;
    } catch (error) {
        console.error(error);
        return null;
    }
}