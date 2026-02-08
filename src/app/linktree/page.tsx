// app/page.tsx
import Image from "next/image";
import Buttons from "@/components/Buttons";
import style from "./page.module.css";
import * as db from "./db";
import  "@/../public/logo white.svg";
// app/page.tsx
export default function Page() {
return (
  <main  
  style={{

    width: "100%"
  }}
  className="flex justify-center items-center h-screen ">
    
    <section style={{width: "600px"}}>
      <article 
      className="flex flex-col items-center">
        <div className="flex direct-row">
          <img width={70} height={20} src="/logo white.svg" alt="Logo White" />
        <h1 
        className="flex justify-center text-[60px]">
          Érick Lúcio
        </h1>
        </div>
        <h2 
        className="flex justify-center text-[35px]"
        style={{color: "var(--color-aux-blue)"}}>
          Software Developer
        </h2>
      </article>

      <article 
      style={{
        width: "100%",

      }}>
        <Buttons items={db.contents} />
      </article>
    </section>
  </main>
);

}
