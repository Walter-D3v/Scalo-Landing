import { createClient } from '@content-island/api-client';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const tokenMatch = envFile.match(/CONTENT_ISLAND_TOKEN=(.+)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';

const client = createClient({ accessToken: token });

async function run() {
  try {
    let configsAll = await client.getContentList({ contentType: 'Landing sections' });
    console.log("Response Default:", JSON.stringify(configsAll, null, 2));

    let configsEs = await client.getContentList({ contentType: 'Landing sections', language: 'es' }).catch(() => null);
    console.log("Response ES:", JSON.stringify(configsEs, null, 2));
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
