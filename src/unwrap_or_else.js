/**
 * Returns the value if it's not `null` or `undefined`, or computes it
 * @template T
 * @param {T | null | undefined} value Target value
 * @param {() => T} getDefaultValue Function that would be called to compute the value if target is `null` or `undefined`
 * @returns {T} Unchanged value if it's not `null` or `undefined` or the computed value
 *
 * ```ts
 * const foo: Partial<Record<string, string>> = { bar: 'baz' };
 *
 * unwrapOrElse(foo.bar, () => 'qux'); // returns 'baz'
 * unwrapOrElse(foo.bat, () => 'qux'); // returns 'qux'
 * ```
 */
export function unwrapOrElse(value, getDefaultValue) {
	if (value === null || value === undefined) {
		return getDefaultValue();
	}

	return value;
}
