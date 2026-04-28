import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Get form data
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const problem = data.get('problem') || 'No especificado';

    // 2. Validate basic required fields
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Nombre y correo son requeridos.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Environment variables
    const OUTLINE_URL = import.meta.env.OUTLINE_URL;
    const OUTLINE_API_KEY = import.meta.env.OUTLINE_API_KEY;
    const OUTLINE_COLLECTION_ID = import.meta.env.OUTLINE_COLLECTION_ID;

    if (!OUTLINE_URL || !OUTLINE_API_KEY || !OUTLINE_COLLECTION_ID) {
      console.error('Missing Outline configuration in environment variables.');
      return new Response(
        JSON.stringify({ error: 'Server configuration error.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Prepare Markdown content
    const dateStr = new Date().toISOString();
    const markdownContent = `
# Nuevo Registro en Waitlist

**Fecha:** ${dateStr}
**Nombre:** ${name}
**Correo:** ${email}

## ¿Qué problema quiere resolver?
${problem}
`;

    // 5. Send to Outline API
    const outlineEndpoint = `${OUTLINE_URL}/api/documents.create`;
    
    const outlineResponse = await fetch(outlineEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OUTLINE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `Waitlist - ${name}`,
        text: markdownContent,
        collectionId: OUTLINE_COLLECTION_ID,
        publish: true,
      }),
    });

    if (!outlineResponse.ok) {
      const errorText = await outlineResponse.text();
      console.error('Outline API Error:', outlineResponse.status, errorText);
      throw new Error(`Outline API responded with ${outlineResponse.status}`);
    }

    const outlineResult = await outlineResponse.json();

    // 6. Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Registrado correctamente.',
        documentId: outlineResult.data?.id 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Waitlist POST error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
