/**
 * Returns the value if it's not `null` or `undefined`, or computes it
 * @param value Target value
 * @returns Unchanged value if it's not `null` or `undefined` or the computed value
 *
 * ```ts
 * const foo: Partial<Record<string, string>> = { bar: 'baz' };
 *
 * unwrapOrElse(foo.bar, () => 'qux'); // returns 'baz'
 * unwrapOrElse(foo.bat, () => 'qux'); // returns 'qux'
 * ```
 */
export function unwrapOrElse<T>(
	value: T | null | undefined,
	getDefaultValue: () => T,
): T {
	if (value === null || value === undefined) {
		return getDefaultValue();
	}

	return value;
}
