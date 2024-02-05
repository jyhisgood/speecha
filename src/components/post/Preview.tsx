'use client';

import type { Post } from '@/types';

const Preview = ({ title, content }: Post.Partial) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{content}</p>
    </>
  );
};

export default Preview;
