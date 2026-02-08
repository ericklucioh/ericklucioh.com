"use client";
import BaseDecor from "@/components/baseDecor";
import DotGrid from "@/components/dot-grid";
import Square from "@/components/square";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";
import { use } from "react";
import * as style from "@/app/styles/not-found.module.css";
export default function NotFound() {
  return (
    <>
        <BaseDecor bottom left x={6} y={9}>
            <Square sizeX={150} sizeY={110}/>
        </BaseDecor>
        <BaseDecor top right x={10} y={-1}>
            <Square sizeX={200} sizeY={25}/> 
        </BaseDecor>
        <BaseDecor bottom right x={20} y={2}>
            <DotGrid
                rows={6}
                cols={8}
                gap={15}
            />
        </BaseDecor>
        <BaseDecor bottom right x={0} y={35} enableRide={true}>
            <DotGrid
                rows={6}
                cols={4}
                gap={15}
                size={3}
            />
        </BaseDecor>
                <BaseDecor top left x={7} y={2}>
            <DotGrid/>
        </BaseDecor>
        
        {/* */}
        <main
            style={{
                width:"100%",
                display:"flex",
                alignItems:"center",
                flexDirection:"column",
                height:"100vh",
            }}
        >

            <section
                style={{
                    padding:"25px",
                    fontFamily:"var(--font-fira-code)",
                    fontSize:"20px",
                    fontWeight:"500",
                }}
            >
                <p>
                    <span 
                        style={{
                            color: "var(--text-accent)"
                        }}
                        >#</span>Sorry!
                </p>
            </section>
        
            <section className={style["section-404"]}>
    <article className={style.main}>
        <p className={style["big-number"]}>
            <span>/</span>404
        </p>
        <p className={style["small-text"]}>Page not Found</p>
    </article>
    <article className={style["button-container"]}>
        <Button
            onClick={() => redirect("/")}
            className={style["go-home-button"]}
        >
            Go home
        </Button>
    </article>
</section>

        </main>
    
    </>
 );
}