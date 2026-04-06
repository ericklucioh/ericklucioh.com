import Maintenance from "@/components/pages/Maintenance";
import { redirect } from "next/navigation";

export default function Page() {
	redirect("/pt");
	return (
		<main
			style={{
				width: "100%",
				height: "100dvh",
			}}
		>
			<Maintenance />
		</main>
	);
}
