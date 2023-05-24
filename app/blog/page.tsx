import { Metadata } from "next";
import Link from "next/link";

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/postss", {
    next: {
      revalidate: 60,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(`Failed to fetch`);

  return data;
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Description",
};

async function Blog() {
  const posts = await getData();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: any) => {
          return (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Blog;
