// app/api/swagger/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static'; // Ensure static generation

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'swagger-output.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { 
          error: 'Swagger documentation not generated',
          message: 'Please run "npm run generate-swagger" first'
        },
        { status: 404 }
      );
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const swaggerDocument = JSON.parse(fileContents);
    
    return NextResponse.json(swaggerDocument);
  } catch (error) {
    console.error('Error loading swagger documentation:', error);
    return NextResponse.json(
      { 
        error: 'Failed to load swagger documentation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}