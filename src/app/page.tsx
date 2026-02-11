import Maintence from "@/components/maintence";
// import { redirect } from "next/navigation";

export default function Page() {
  // redirect("/linktree");
  return (
      <main
        style={{
          width:"100%",
          height: "100dvh"
        }}
      >
        <Maintence />
      </main>
    );
}