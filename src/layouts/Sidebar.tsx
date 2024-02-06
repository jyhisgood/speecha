import MyPosts, { SideBarTopMenu } from '@/components/MyPosts.server';
import Upload from '@/components/Upload';
import type { UploadProps } from '@/components/Upload';

import prisma from '@/lib/prisma';

const Sidebar = async () => {
  const postList = await prisma.post.findMany({
    select: { id: true, title: true, path: true },
  });
  const onFileUpload: UploadProps['onSuccess'] = async (title, content) => {
    'use server';
    try {
      await prisma.post.create({ data: { title, content } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen pl-4 pt-4 w-[400px] relative flex flex-col gap-3">
      <SideBarTopMenu />
      <MyPosts postList={postList} />
      <div className="absolute bottom-2 right-2 flex">
        <Upload.File onSuccess={onFileUpload} />
        <Upload.Folder onSuccess={onFileUpload} />
      </div>
    </div>
  );
};

export default Sidebar;
