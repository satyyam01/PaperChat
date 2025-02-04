import { NextResponse } from "next/server";
import { loadS3IntoPinecone } from "@/lib/pinecone";
//import { Request } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { file_key, file_name } = body;
        console.log(file_key, file_name);
        const pages = await loadS3IntoPinecone(file_key).catch((error) => {
            console.error(error);
            return null;
        });
        if (!pages) {
            return NextResponse.json({ error: 'Failed to load PDF' }, { status: 500 });
        }
        // Return a valid success response
        return NextResponse.json({ pages });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}