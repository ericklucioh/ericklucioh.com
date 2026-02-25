import Link from "next/link";
import Logo from "../logo";
import DarkModeToggle from "../darkModeToggle";

type MenuProps =
  | {
      isOpen: boolean;
      somethingDarkModeToggle: true;
      buttons?: never; // NÃO pode passar buttons
    }
  | {
      isOpen: boolean;
      somethingDarkModeToggle?: false;
      buttons: { label: string; href: string }[]; // É obrigatório
    };


export default function Menu({ isOpen, somethingDarkModeToggle, buttons }: MenuProps) {
  return (
    <>
  {somethingDarkModeToggle ? (
    <DarkModeToggle />
  ) : (
    <div
      className={`menu ${isOpen ? "open" : ""}`}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px",
      }}
      >
      {/* Esquerda */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Logo size={30} />
        <span style={{ fontWeight: 600, fontSize: "18px" }}>
          Érick Lúcio
        </span>
      </div>

      {/* Direita */}
      <div style={{ display: "flex", gap: "20px", marginRight: "42px" }}>
        {buttons?.map((btn, index) => (
          <Link key={index} href={btn.href} style={{ textDecoration: "none", fontSize: "16px" }}>
            <span style={{ color: "var(--text-secondary)", marginRight: "4px" }}>
              #
            </span>
            {btn.label}
          </Link>
        ))}

      </div>
                        <DarkModeToggle />
    </div>
    )}  </>
  );
}
