export function pickRandom<T>(arr: T[], k: number) {
	const a = [...arr]
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a.slice(0, k)
}

// src/utils/pickRandom.ts (DB’da random qilishdan ko‘ra, topib, keyin JS’da aralashtirish tez-tez qulay):
