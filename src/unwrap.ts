export function unwrap<T>(arg: T | null | undefined): T {
	if (arg === null || arg === undefined) {
		throw new Error(`panic! call \`unwrap\` on a \`${arg}\` value`);
	}

	return arg;
}
