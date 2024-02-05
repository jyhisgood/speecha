import React, { PropsWithChildren } from 'react';
import prisma from '@/lib/prisma';
import PostItem from './PostItem';

const MyPosts = async () => {
  const titles = await prisma.post.findMany({
    select: { id: true, title: true },
  });

  return (
    <div className="h-[90%] overflow-y-scroll">
      {titles.map((item) => (
        <PostItem {...item} />
      ))}
    </div>
  );
};

export default MyPosts;
