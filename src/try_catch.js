import { Err, Ok } from "./option_result.js";

/**
 * @import {Result} from "./option_result.js"
 */

/**
 * Wrap the result of a function call with `Result`
 *
 * @template R, E
 * @param {() => R} fn target function
 * @returns {Result<R, E>}
 *
 * ```ts
 * const successResult = tryCatch(() => JSON.parse('{"foo": "bar"}'));
 * successResult.unwrap(); // returns `{ foo: "bar" }`
 *
 * const errorResult = tryCatch(() => JSON.parse('{invalid json}'));
 * errorResult.isErr(); // returns `true`
 * ```
 */
export function tryCatch(fn) {
	/** @type {R} */
	let result;

	try {
		result = fn();
	} catch (e) {
		return Err(/** @type {E} */ (e));
	}

	return Ok(result);
}
