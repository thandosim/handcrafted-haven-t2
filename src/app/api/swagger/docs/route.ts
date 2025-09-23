// app/api/swagger/docs/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'swagger-output.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Swagger documentation not generated' },
        { status: 404 }
      );
    }
    
    // Read the Swagger UI HTML template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Handcrafted Haven API - Swagger UI</title>
          <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
          <style>
            body { margin: 0; padding: 0; }
            .topbar { display: none; }
            html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
            *, *:before, *:after { box-sizing: inherit; }
          </style>
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
          <script>
            fetch('/api/swagger')
              .then(response => response.json())
              .then(spec => {
                SwaggerUIBundle({
                  spec,
                  dom_id: '#swagger-ui',
                  presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIBundle.presets.standalone
                  ],
                  layout: "BaseLayout" // Changed from "StandaloneLayout" to "BaseLayout"
                });
              })
              .catch(error => {
                console.error('Error loading spec:', error);
                document.getElementById('swagger-ui').innerHTML = 
                  '<div style="padding: 20px; color: red;">Error loading API documentation</div>';
              });
          </script>
        </body>
      </html>
    `;
    
    return new NextResponse(htmlTemplate, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error loading swagger documentation:', error);
    return NextResponse.json(
      { error: 'Failed to load swagger documentation' },
      { status: 500 }
    );
  }
}