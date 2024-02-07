import MyPosts, { SideBarTopMenu } from '@/components/MyPosts.server';
import Upload from '@/components/Upload';
import type { UploadProps } from '@/components/Upload';
import { onSuccessReturn } from '@/components/Upload/types';
import { extractFolders } from '@/components/Upload/utils';

import prisma from '@/lib/prisma';
import { PostFile } from '@/types';

const Sidebar = async () => {
  const postList = await prisma.postFile.findMany({
    select: { id: true },
  });

  const onFileCreateMany: UploadProps['onSuccess'] = async (
    data,
    uploadType
  ) => {
    'use server';
    if (uploadType === 'folders') {
      const folderData = extractFolders(data) as onSuccessReturn[];
      await Promise.all(
        folderData.map(async ({ path }) => {
          const filesInFolder: PostFile.CreatePayload[] = data
            .filter((item) => item.path === path)
            .map((item) => ({
              title: item.title,
              content: item.content,
            }));

          return await prisma.postFolder.upsert({
            where: { path: path || '' },
            update: {},
            create: {
              path: path || '',
              postFiles: {
                create: filesInFolder,
              },
            },
          });
        })
      );
    } else {
      await Promise.all(
        data.map(async (item) => {
          return await prisma.postFile.create({
            data: { title: item.title, content: item.content },
          });
        })
      );
    }
  };

  return (
    <div className="h-screen pl-4 pt-4 w-[400px] relative flex flex-col gap-3">
      <SideBarTopMenu />
      <MyPosts postList={postList} />
      <div className="absolute bottom-2 right-2 flex">
        <Upload.File onSuccess={onFileCreateMany} />
        <Upload.Folder onSuccess={onFileCreateMany} />
      </div>
    </div>
  );
};

export default Sidebar;
