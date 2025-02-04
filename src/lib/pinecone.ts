import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


let pinecone : Pinecone | null = null;

export const getPineconeClient = async () => {
    if (!pinecone) {
        pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY || ''
        })
    }
    return pinecone;
}

export async function loadS3IntoPinecone(fileKey: string) {
    try {
        console.log('Donwloading S3 into File System', fileKey);
        const file_name = await downloadFromS3(fileKey);
        if (!file_name) {
            console.error('Could not download file from S3');
            return null;
        }
        const loader = new PDFLoader(file_name);
        const pages = await loader.load();
        console.log();
        return pages;
    } catch (error) {
        console.error(error);
        return null;
    }
}


