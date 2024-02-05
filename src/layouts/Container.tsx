const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-zinc-300">
      <div className="flex flex-row">{children}</div>
    </div>
  );
};

export default Container;
