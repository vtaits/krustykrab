/**
 * Panics if the value is `null` or `undefined` or returns it otherwise
 * @template T
 * @param {T | null | undefined} value Target value
 * @returns {T} Unchanged value
 * @throws If the value is `null` or `undefined`
 *
 * ```ts
 * const fooOrUndefined = document.getElementById('foo'); // html element or `undefined`
 * const foo = unwrap(fooOrUndefined); // exactly html element
 * ```
 */
export function unwrap(value) {
	if (value === null || value === undefined) {
		throw new Error(`panic! call \`unwrap\` on a \`${value}\` value`);
	}

	return value;
}
