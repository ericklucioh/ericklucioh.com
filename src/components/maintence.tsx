// app/page.tsx
import Image from "next/image";
import Buttons from "@/components/Buttons";
import style from "./page.module.css";
import BaseDecor from "@/components/baseDecor";
import Square from "@/components/square";
import DotGrid from "@/components/dot-grid";
import { Settings } from "@mui/icons-material";

export default function Page() {
  return (
    <main className="relative flex flex-col justify-center items-center h-screen w-full overflow-hidden text-white">
                <header style={{ marginTop: "-100px" }} className="mb-8    text-center">
          <h2 className="text-2xl font-bold mb-1">Oops!</h2>
          <h3 className="text-[#38bdf8] font-mono tracking-widest uppercase">
            #Under Construction
          </h3>
        </header>
      {/* Elementos Decorativos (Posicionados conforme a imagem) */}
      <BaseDecor top left x={2} y={5}>
        <DotGrid rows={4} cols={3} gap={15} />
      </BaseDecor>
      
      <BaseDecor top right x={2} y={5}>
        <Square sizeX={120} sizeY={120} />
      </BaseDecor>

      <BaseDecor bottom left x={2} y={5}>
        <Square sizeX={100} sizeY={100} />
        <div className="mt-4"><DotGrid rows={3} cols={3} gap={10} /></div>
      </BaseDecor>

      <BaseDecor bottom right x={2} y={5}>
        <DotGrid rows={4} cols={4} gap={15} />
      </BaseDecor>

      {/* Conteúdo Centralizado */}
      <section className="z-10 flex flex-col items-center text-center max-w-[800px] px-4">


        <article className="flex flex-col items-center">
          <h1 
            className="font-bold mb-8 leading-tight"
            style={{ fontSize: "clamp(22px, 6vw, 54px)", fontFamily: "monospace" }}
          >
            Website undergoing <br /> scheduled maintenance.
          </h1>

          {/* Ícone de Engrenagem Central */}
          <div className="text-[#38bdf8] mb-8 animate-spin-slow">
            <Settings fontSize="large" />
          </div>

          <div className="space-y-2 mb-12">
            <p className="text-gray-400 text-xl">We'll be back online shortly!</p>
            <p className="text-[#38bdf8] text-lg font-medium">Thank you for your patience.</p>
          </div>
        </article>
      </section>
    </main>
  );
}