import { successToast, errorToast } from "./utils/toast";
import { useEffect, useState } from "react";

import {
  getPosts,
  addPost,
  deletePost,
  likePost,
} from "./services/postService";

import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        errorToast("Error al obtener los posts");
      });
  }, []);

  const createPost = (post) => {
    addPost(post)
      .then((data) => {
        setPosts([...posts, data]);
        successToast("Post creado correctamente");
      })
      .catch((err) => {
        errorToast("Error al crear el post");
      });
  };

  const deletePostById = (id) => {
    deletePost(id).then(() => {
      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
      successToast("Post eliminado correctamente");
    });
  };

  const likePostById = (id) => {
    likePost(id).then(() => {
      const newPosts = posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      );
      setPosts(newPosts);
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">📷 Like Me 📷</h1>
      <main className="row">
        <section className="col-12 col-md-4 mt-5">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h2>Add Post</h2>
              <AddPost createPost={createPost} />
            </div>
          </div>
        </section>
        <section className="col-12 col-md-4 mt-5">
          {Array.isArray(posts) ? (
            posts.map((post) => (
              <CardPost
                key={post.id}
                post={post}
                deletePostById={deletePostById}
                likePostById={likePostById}
              />
            ))
          ) : (
            <div className="card">
              <div className="card-body">
                <h2>No hay posts</h2>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}