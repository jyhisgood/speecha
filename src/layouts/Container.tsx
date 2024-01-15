const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-zinc-300">
      <div className="p-3 flex flex-row">{children}</div>
    </div>
  );
};

export default Container;
