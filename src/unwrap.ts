/**
 * Panics if the value is `null` or `undefined` or returns it otherwise
 * @param value Target value
 * @returns Unchanged value
 * @throws If the value is `null` or `undefined`
 *
 * ```ts
 * const fooOrUndefined = document.getElementById('foo'); // html element or `undefined`
 * const foo = unwrap(fooOrUndefined); // exactly html element
 * ```
 */
export function unwrap<T>(value: T | null | undefined): T {
	if (value === null || value === undefined) {
		throw new Error(`panic! call \`unwrap\` on a \`${value}\` value`);
	}

	return value;
}
