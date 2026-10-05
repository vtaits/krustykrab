/**
 * Returns the value if it's not `null` or `undefined`, or returns the default value
 * @template T
 * @param {T | null | undefined} value Target value
 * @param {T} defaultValue Default value that will be returned if target is `null` or `undefined`
 * @returns {T} Unchanged value if it's not `null` or `undefined` or the default value
 *
 * ```ts
 * const foo: Partial<Record<string, string>> = { bar: 'baz' };
 *
 * unwrapOr(foo.bar, 'qux'); // returns 'baz'
 * unwrapOr(foo.bat, 'qux'); // returns 'qux'
 * ```
 */
export function unwrapOr(value, defaultValue) {
	if (value === null || value === undefined) {
		return defaultValue;
	}

	return value;
}
