// app/page.tsx
import Image from "next/image";
import Buttons from "@/components/Buttons";
import style from "./page.module.css";
import * as db from "./db";

// app/page.tsx
export default function Page() {
return (
  <main className="flex justify-center items-center h-screen">
    <section>
      <article className="flex flex-col items-center">
        <Image
          src="/foto.png"
          alt="myPicture"
          width={200}
          height={200}
          className="mt-[50px] rounded-full border-2 border-[#1FCEF9]"
        />

        <h1 className="flex justify-center text-[30px] w-[170px] [text-shadow:1px_1px_3px_#1FCEF9]">
          Érick Lúcio
        </h1>
      </article>

      <article className={style.buttons}>
        <Buttons items={db.contents} />
      </article>
    </section>
  </main>
);

}
