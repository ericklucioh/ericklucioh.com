// app/components/Buttons.tsx
export interface ButtonProps {
  id: string;
  name: string;
  link: string;
  img: string;
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
          id={item.id}
          className="button"
          href={item.link}
          target="_blank"
        >
          <div className="intern">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <image href={item.img} alt={item.name} />
            </svg>
            <h2>{item.name}</h2>
          </div>
        </a>
      ))}
    </div>
  );
}
