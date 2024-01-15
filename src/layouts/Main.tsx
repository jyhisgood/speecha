const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-white w-screen flex rounded-md ml-3">{children}</div>
  );
};

export default Main;
