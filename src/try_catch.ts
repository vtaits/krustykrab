import { Err, Ok, type Result } from "./option_result";

/**
 * Wrap the result of a function call with `Result`
 *
 * @param fn target function
 *
 * ```ts
 * const successResult = tryCatch(() => JSON.parse('{"foo": "bar"}'));
 * successResult.unwrap(); // returns `{ foo: "bar" }`
 *
 * const errorResult = tryCatch(() => JSON.parse('{invalid json}'));
 * errorResult.isErr(); // returns `true`
 * ```
 */
export function tryCatch<R, E>(fn: () => R): Result<R, E> {
	let result: R;

	try {
		result = fn();
	} catch (e) {
		return Err(e as E);
	}

	return Ok(result);
}
