// app/page.tsx
import Image from "next/image";
import Buttons from "@/components/Buttons";
import style from "./page.module.css";
import * as db from "./db";
import "@/../public/logo white.svg";
import BaseDecor from "@/components/base-decor";
import Square from "@/components/square";
import DotGrid from "@/components/dot-grid";
// app/page.tsx
export default function Page() {
  return (
    <main
      style={{
        width: "100%",
      }}
      className="flex justify-center items-center h-screen "
    >
      <BaseDecor top left x={1} y={10}>
        <DotGrid rows={4} cols={6} gap={20} />
      </BaseDecor>
      <BaseDecor bottom left x={2} y={18}>
        <DotGrid  rows={4} cols={6} gap={23}  />
      </BaseDecor>
      <BaseDecor bottom left x={-1} y={5}>
        <Square sizeX={90} sizeY={150} />
      </BaseDecor>
      <BaseDecor bottom right x={-5} y={15}>
        <Square sizeX={90} sizeY={210} />
      </BaseDecor>

      <BaseDecor top right x={0} y={2}>
        <DotGrid rows={6} cols={4} gap={25} />
      </BaseDecor>

      <BaseDecor top right x={5} y={-1}>
       <Square sizeX={160} sizeY={60} />
      </BaseDecor>
      <section style={{ width: "100%", maxWidth: "600px", margin: "10%" }} className="flex flex-col items-center">
        <article className="flex flex-col justify-center items-center">
          <div className="flex direct-row">
            <img className={style.logo} width={70} src="/logo white.svg" alt="Logo White" />
            <h1
            className={style.name}
            style={{
              fontSize:" clamp(26px, 5vw, 60px)"
            }}
            className="flex justify-center text-[60px]">Érick Lúcio</h1>
          </div>
          <p
          
          className="role flex justify-center text-[35px]" style={{ color: "var(--color-aux-blue)",

                          fontSize:" clamp(20px, 5vw, 40px)"

           }}>
            Software Developer
          </p>
        </article>

        <article
          style={{
            marginTop: "50px",
            width: "100%",
          }}
        >
          <Buttons items={db.contents} />
        </article>
      </section>
    </main>
  );
}
