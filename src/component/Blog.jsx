import React, { useState } from "react";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    const newPost = { id: Date.now(), title: "New Blog Post" };
    setPosts([...posts, newPost]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Blog</h2>
      <button
        onClick={addPost}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-red-600"
      >
        Add Post
      </button>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="p-2 border-b">{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
