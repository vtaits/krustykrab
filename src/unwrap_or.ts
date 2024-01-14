/**
 * Returns the value if it's not `null` or `undefined`, or returns the default value
 * @param value Target value
 * @returns Unchanged value if it's not `null` or `undefined` or the default value
 *
 * ```ts
 * const foo: Partial<Record<string, string>> = { bar: 'baz' };
 *
 * unwrapOr(foo.bar, 'qux'); // returns 'baz'
 * unwrapOr(foo.bat, 'qux'); // returns 'qux'
 * ```
 */
export function unwrapOr<T>(value: T | null | undefined, defaultValue: T): T {
	if (value === null || value === undefined) {
		return defaultValue;
	}

	return value;
}
