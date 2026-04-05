import Menu from "@/components/layout/Menu";

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
