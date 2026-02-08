export interface ButtonProps {
  id: string;
  name: string;
  link: string;
  svg: string;
}

interface ButtonsProps {
  items: ButtonProps[];
}

export default function Buttons({ items }: ButtonsProps) {
  return (
    <div id="buttons">
      {items.map((item: ButtonProps) => (
        <a
          key={item.id}
          id={item.id.toString()}
          href={item.link}
          target="_blank"
        >
          <div style={{
            border: "solid var(--color-aux-blue) 2px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            width: "100%",
            padding: "0px",
          }}>
            {/* <div dangerouslySetInnerHTML={{ __html: item.svg }} /> */}
            <h2 style={{fontSize: "30px"}}>{item.name}</h2>
          </div>
        </a>
      ))}
    </div>
  );
}