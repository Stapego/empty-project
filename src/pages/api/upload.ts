import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    // Валидация файла
    if (!file || file.size === 0) {
      return new Response(
        JSON.stringify({ error: 'Файл не получен' }),
        { status: 400 }
      );
    }

    // Проверка типа файла
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: 'Недопустимый тип файла. Разрешены только JPG, PNG и WebP' }),
        { status: 400 }
      );
    }

    // Проверка размера файла (5MB максимум)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: 'Файл слишком большой (максимум 5MB)' }),
        { status: 400 }
      );
    }

    // Создаем папку uploads если ее нет
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Генерируем уникальное имя файла
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(file.name);
    const filename = `${path.basename(file.name, ext)}-${timestamp}-${randomString}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Сохраняем файл
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return new Response(
      JSON.stringify({ 
        success: true,
        filename: filename,
        message: 'Файл успешно загружен' 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Внутренняя ошибка сервера',
        
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

// Добавляем обработчик OPTIONS для CORS (если нужно)
export const OPTIONS: APIRoute = () => {
  return new Response(null, {
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};