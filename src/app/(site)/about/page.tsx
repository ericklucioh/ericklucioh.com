import Menu from "@/components/header/menu";

export default function Page() {
  return (
    <main>
<Menu
  isOpen={true}
  buttons={[
    { label: "home", href: "/home" },
    { label: "contato", href: "/contato" },
    { label: "projetos", href: "/projetos" },
  ]}
/>

    </main>
    );
}