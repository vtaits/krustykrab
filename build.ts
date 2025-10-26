await Bun.build({
	entrypoints: ["src/index.ts"],
	outdir: "dist",
	sourcemap: "linked",
});

export {};
