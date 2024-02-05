import MyPosts from '@/components/MyPosts.server';
import UploadDirectory from '@/components/UploadDirectory';

const Sidebar = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-screen pl-4 pt-4 w-[400px] relative flex flex-col gap-3">
      {children}
      <MyPosts />
      {/* <div className="absolute ottom-2 left-2">
        <UploadDirectory />
      </div> */}
    </div>
  );
};

export default Sidebar;
