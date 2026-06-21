import { redirect } from "next/navigation";
import { DEFAULT_LANG, swapLangPath } from "@/lib/i18n";

export default function LinksPage() {
	redirect(swapLangPath("/links", DEFAULT_LANG));
}
