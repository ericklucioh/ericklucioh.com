type SquareProps = {
  sizeX?: number;
  sizeY?: number;
  borderWidth?: number;
};

export default function Square({
  sizeX = 100,
  sizeY = 100,
  borderWidth = 1,
}: SquareProps) {
  return (
    <div
      className="square"
      style={{
        width: `${sizeX}px`,
        height: `${sizeY}px`,
        border: `${borderWidth}px solid white`,
      }}
    />
  );
}
