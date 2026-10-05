import { None, Some } from "./option_result.js";

/**
 * @import {Option} from "./option_result.js"
 */

/**
 * Convert a nullable variable to `Option`
 *
 * @template T
 * @param {T | null | undefined} arg nullable variable
 * @returns {Option<T>} Option
 *
 * ```
 * const option = toOption('foo');
 * option.isNone(); // returns `false`;
 * option.unwrap(); // returns `'foo'`;
 *
 * toOption(null).isNone(); // returns `true`
 * toOption(undefined).isNone(); // returns `true`
 * ```
 */
export function toOption(arg) {
	if (arg === null || arg === undefined) {
		return None();
	}

	return Some(/** @type {T} */ (arg));
}
