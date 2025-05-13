import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true }));

app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('Файл не загружен.');
  }

  const file = req.files.image;
  const uploadDir = path.join(__dirname, 'public', 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  await file.mv(path.join(uploadDir, file.name));
  res.send('Файл загружен!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});