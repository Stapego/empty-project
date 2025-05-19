// src/lib/image-utils.ts
import fs from 'fs/promises';
import path from 'path';

export interface ImageData {
  filename: string;
}

export async function getRecentImages(): Promise<ImageData[]> {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Проверяем существует ли директория
    try {
      await fs.access(uploadsDir);
    } catch {
      return [];
    }
    
    const files = await fs.readdir(uploadsDir);
    
    return files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(filename => ({ filename }));
      
  } catch (error) {
    console.error('Error reading uploads directory:', error);
    return [];
  }
}