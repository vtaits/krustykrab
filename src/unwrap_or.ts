export function unwrapOr<T>(arg: T | null | undefined, defaultValue: T): T {
	if (arg === null || arg === undefined) {
		return defaultValue;
	}

	return arg;
}
