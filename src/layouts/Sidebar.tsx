import UploadDirectory from '@/components/UploadDirectory';

const Sidebar = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-screen min-w-[330px] relative">
      {children}
      <div className="absolute bottom-2 left-2">
        <UploadDirectory />
      </div>
    </div>
  );
};

export default Sidebar;
