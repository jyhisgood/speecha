import MyPosts, { SideBarTopMenu } from '@/components/MyPosts.server';
import UploadDirectory from '@/components/UploadDirectory';
import prisma from '@/lib/prisma';

const Sidebar = async () => {
  const postList = await prisma.post.findMany({
    select: { id: true, title: true },
  });

  return (
    <div className="h-screen pl-4 pt-4 w-[400px] relative flex flex-col gap-3">
      <SideBarTopMenu />
      <MyPosts postList={postList} />
      {/* <div className="absolute ottom-2 left-2">
        <UploadDirectory />
      </div> */}
    </div>
  );
};

export default Sidebar;
