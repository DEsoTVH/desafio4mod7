import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

const verPosts = async () => {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
};

const agregarPost = async (post) => {
  const { titulo, img, descripcion } = post;

  if (!titulo?.trim() || !img?.trim() || !descripcion?.trim()) {
    throw { code: '400' };
  }

  const consulta = 'INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *';
  const values = [titulo, img, descripcion, 0];
  const result = await pool.query(consulta, values);

  return result.rows[0];
};

const modificarPost = async (likes, id) => {
  const consulta = 'UPDATE posts SET likes = $1 WHERE id = $2';
  const values = [likes, id];
  const result = await pool.query(consulta, values);

  if (result.rowCount === 0) {
    throw { code: '404' };
  }

  return { id, likes };
};

const eliminarPost = async (id) => {
  const consulta = 'DELETE FROM posts WHERE id = $1';
  const values = [id];
  const result = await pool.query(consulta, values);

  if (result.rowCount === 0) {
    throw { code: '404' };
  }

  return id;
};

export { verPosts, agregarPost, modificarPost, eliminarPost };