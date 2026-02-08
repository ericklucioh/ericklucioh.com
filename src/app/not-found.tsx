"use client";
import BaseDecor from "@/components/base-decor";
import DotGrid from "@/components/dot-grid";
import Square from "@/components/square";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";
import { use } from "react";

export default function NotFound() {
  return (
    <>
        <BaseDecor bottom left x={0} y={0}>
            <DotGrid/>
        </BaseDecor>
        <BaseDecor top right x={10} y={10}>
            <Square/> 
        </BaseDecor>
        <BaseDecor bottom right x={0} y={0}>
            <DotGrid/>
        </BaseDecor>
                <BaseDecor top left x={0} y={0}>
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
                    padding:"20px",
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
        
            <section
                style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    height:"100%",
                    marginTop:"-7%",
                }}
            >
                <article
                    style={{
                        display:"flex",
                        alignItems:"start",
                        justifyContent:"center",
                        flexDirection:"column",
                        margin:"0",
                    }}
                >
                    <p
                        style={{
                            fontSize: "200px",
                            margin:"0",
                            fontWeight: "600"
                        }}
                    >
                        <span 
                            style={{
                                color: "var(--text-accent)"
                            }}
                        >
                            /</span>
                        404
                    </p>
                    <p
                    style={{
                        marginTop: "-50px",
                        fontSize: "15px",
                    }}
                    >Page not Found</p>
                </article>
                <article
                style={{
                    display:"flex",
                    alignContent:"end",
                    justifyContent:"right",
                    width:"100%",
                    marginTop:"10px",
                    marginRight:"-50px",
                }}
                >
                    <Button
                    onClick={() => 
                        redirect("/")
                    }
                    style={{
                        margin:"20px",
                        border: "1px solid var(--text-primary)",
                        padding:"3px 30px",
                        fontFamily:"var(--font-fira-code)",
                        fontSize:"26px",
                        borderRadius:"0px",
                        color:"var(--text-primary)",
                    }}
                    sx={{ textTransform: "none" }}
                    >Go home</Button>
                </article>
            </section>
        </main>
    
    </>
 );
}