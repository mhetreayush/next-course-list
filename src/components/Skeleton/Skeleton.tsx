const Skeleton = ({ height, width }: { height: string; width: string }) => {
  return (
    <div
      className="rounded-sm bg-gray-300 animate-pulse"
      style={{
        height,
        width,
      }}
    />
  );
};
export { Skeleton };
