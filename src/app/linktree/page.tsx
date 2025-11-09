// app/page.tsx
import Image from "next/image";
import Buttons from "@/components/Buttons";
import style from "page.module.css";
import * as db from "./db";
// app/page.tsx
export default function Page() {
  return (
    <main>
        <section>
        <article id="header">
            <Image src="/foto.png" alt="myPicture" width={128} height={128} />
            <h1>Érick Lúcio</h1>
            </article>

            <article id="buttons">
            <Buttons items={db.contents} />
            </article>  
        </section>
    </main> 

  );
}
