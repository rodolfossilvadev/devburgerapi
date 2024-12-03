import express from 'express';
import multer from 'multer';
import path from 'path';
import multerConfig from './multerConfig';

const app = express();
const upload = multer(multerConfig);

app.post('/upload', upload.single('file'), (req, res) => {
    return res.json({ file: req.file });
});

app.use('/product-file', express.static(path.resolve(__dirname, '..', '..', 'Uploads')));

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001...");
});
