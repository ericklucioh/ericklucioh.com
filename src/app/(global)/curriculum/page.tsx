import { redirect } from "next/navigation";
import { DEFAULT_LANG, swapLangPath } from "@/lib/i18n";

export default function Page() {
	redirect(swapLangPath("/curriculum", DEFAULT_LANG));
}
