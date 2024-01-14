import { None, type Option, Some } from "./option_result";

/**
 * Convert a nullable variable to `Option`
 * @param arg nullable variable
 * @returns Option
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
export function toOption<T>(arg: T | null | undefined): Option<T> {
	if (arg === null || arg === undefined) {
		return None();
	}

	return Some<T>(arg);
}
