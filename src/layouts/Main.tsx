const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-white w-screen rounded-md h-screen">{children}</div>
  );
};

export default Main;
