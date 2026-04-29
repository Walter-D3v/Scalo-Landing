import type { APIRoute } from 'astro';
import { getLandingSectionsConfig } from '../../lib/content-island';

export const GET: APIRoute = async () => {
  try {
    const data = await getLandingSectionsConfig();
    
    return new Response(
      JSON.stringify({
        success: true,
        data: data
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
