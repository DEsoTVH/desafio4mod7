import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verPosts, agregarPost, modificarPost, eliminarPost } from './database/query.js';
import { manageErrors } from './database/managing.js';


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('servidor listo en http://localhost:' + PORT);
});

// GET
app.get('/posts', async (req, res) => {
  try {
    const result = await verPosts();
    return res.status(200).json({ ok: true, message: 'Posts registrados', result });
  } catch (error) {
    const { status, message } = manageErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

// POST
app.post('/posts', async (req, res) => {
  try {
    const post = req.body;
    const result = await agregarPost(post);
    return res.status(201).json({ ok: true, message: 'Post agregado con exito', result });
  } catch (error) {
    const { status, message } = manageErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

// PUT
app.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.query;
    const result = await modificarPost(likes, id);

    return res.status(200).json({ success: true, message: 'Post modificado correctamente', result });

  } catch (error) {
    const { status, message } = manageErrors(error.code);
    return res.status(status).json({ ok: false, result: message + ' : ' + error.column });
  }
});

// DELETE
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await eliminarPost(id);

    return res.status(200).json({ success: true, message: 'Post eliminado correctamente', id: result });

  } catch (error) {
    const { status, message } = manageErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

// Rutas no alcanzadas
app.use('*', (req, res) => {
  res.json({ ok: false, result: '404 Ruta no encontrada' });
});