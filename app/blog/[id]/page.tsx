import { Metadata } from "next";
import React from "react";

async function getData(id: string) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const post = await getData(id);
  return {
    title: `${post?.title}`,
  };
}

const Post = async ({ params: { id } }: Props) => {
  const post = await getData(id);
  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
    </div>
  );
};

export default Post;
