'use client';

import { useRouter } from 'next/navigation';
import type { Post } from '@/types';

const PostItem = ({ title, id }: Post.TitleWithId) => {
  const router = useRouter();
  const goToPage = () => {
    router.push(`/${id}`);
  };
  return <div onClick={goToPage}>{title}</div>;
};

export default PostItem;
