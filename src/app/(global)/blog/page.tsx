import { redirect } from "next/navigation";
import { DEFAULT_LANG, swapLangPath } from "@/lib/i18n";

export const dynamic = "error";

export default function BlogIndexPage() {
	redirect(swapLangPath("/blog", DEFAULT_LANG));
}
