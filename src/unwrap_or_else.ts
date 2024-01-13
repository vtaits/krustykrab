export function unwrapOrElse<T>(
	arg: T | null | undefined,
	getDefaultValue: () => T,
): T {
	if (arg === null || arg === undefined) {
		return getDefaultValue();
	}

	return arg;
}
