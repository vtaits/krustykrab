import { Err, Ok, type Result } from "./option_result";

/**
 * Converts `Promise` to `Result`
 * @param promise target `Promise`
 * @returns success result for resolved promise or error result for rejected promise
 *
 * ```ts
 * const successResult = await getResult(Promise.resolve('foo'));
 * successResult.unwrap(); // returns 'foo'
 *
 * const errorResult = await getResult(Promise.reject('bar'));
 * errorResult.unwrapErr(); // returns 'bar'
 * ```
 */
export function getResult<R, E>(promise: Promise<R>): Promise<Result<R, E>> {
	return promise.then(
		(response) => Ok(response),
		(err) => Err(err),
	);
}
