'use client';

import { useRouter } from 'next/navigation';
import type { Post } from '@/types';

const PostItem = ({ title, id }: Post.TitleWithId) => {
  const router = useRouter();
  const goToPage = () => {
    router.push(`/${id}`);
  };
  return (
    <div className="truncate pr-3" onClick={goToPage}>
      {title}
    </div>
  );
};

export default PostItem;
