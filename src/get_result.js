import { Err, Ok } from "./option_result.js";

/**
 * @import {Result} from "./option_result.js"
 */

/**
 * Converts `Promise` to `Result`
 *
 * @template R, E
 * @param {Promise<R>} promise target `Promise`
 * @returns {Promise<Result<R, E>>} success result for resolved promise or error result for rejected promise
 *
 * ```ts
 * const successResult = await getResult(Promise.resolve('foo'));
 * successResult.unwrap(); // returns 'foo'
 *
 * const errorResult = await getResult(Promise.reject('bar'));
 * errorResult.unwrapErr(); // returns 'bar'
 * ```
 */
export function getResult(promise) {
	return promise.then(
		(response) => Ok(response),
		(err) => Err(err),
	);
}
