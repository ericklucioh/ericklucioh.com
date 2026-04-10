import DecorRenderer from "@/components/decorations/DecorRenderer";
import { siteDecorItems } from "@/components/decorations/decorConfigs";

export default function SiteDecor() {
	return <DecorRenderer items={siteDecorItems} />;
}
