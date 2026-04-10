"use client";

import { useState } from "react";

const STORAGE_KEY = "site-decor-animation-epoch";

export default function usePersistentAnimationElapsed() {
	const [elapsedSeconds] = useState(() => {
		if (typeof window === "undefined") {
			return 0;
		}

		const now = Date.now();
		let epoch = now;

		try {
			const storedEpoch = window.sessionStorage.getItem(STORAGE_KEY);
			if (storedEpoch) {
				const parsedEpoch = Number(storedEpoch);
				if (Number.isFinite(parsedEpoch) && parsedEpoch > 0) {
					epoch = parsedEpoch;
				}
			} else {
				window.sessionStorage.setItem(STORAGE_KEY, String(now));
			}
		} catch {
			epoch = now;
		}

		return (now - epoch) / 1000;
	});

	return elapsedSeconds;
}
