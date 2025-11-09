// app/components/Buttons.tsx
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
          <div className="ml-[9%] flex justify-start items-center h-full w-[250px]">
            <div dangerouslySetInnerHTML={{ __html: item.svg }} />
            <h2>{item.name}</h2>
          </div>
        </a>
      ))}
    </div>
  );
}