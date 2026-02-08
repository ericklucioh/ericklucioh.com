import * as styleImport from "@/components/buttons.module.css";
const style = styleImport as any;
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
    <div
    className={style["buttonLink"]}
    >
      {items.map((item: ButtonProps) => (
        <a
          key={item.id}
          id={item.id.toString()}
          href={item.link}
          target="_blank"
        >
          <div className={style["button"]}>
            {/* <div dangerouslySetInnerHTML={{ __html: item.svg }} /> */}
            <h2
            className={style["buttonText"]}
            >{item.name}</h2>
          </div>
        </a>
      ))}
    </div>
  );
}