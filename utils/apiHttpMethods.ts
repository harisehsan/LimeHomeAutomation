import { APIRequestContext, APIResponse } from '@playwright/test';

export async function GET(request: APIRequestContext, url: string): Promise<APIResponse> {
    return await request.get(url);
}