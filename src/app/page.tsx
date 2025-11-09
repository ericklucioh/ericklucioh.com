import { redirect } from "next/navigation";

export default function Page() {
  redirect("/linktree");
  return (
    <main>
      hello world
    </main>
  );
}