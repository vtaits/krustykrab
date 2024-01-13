import { Err, Ok, type Result } from "./option_result";

export function getResult<R, E>(fn: () => Promise<R>): Promise<Result<R, E>> {
	return fn().then(
		(response) => Ok(response),
		(err) => Err(err),
	);
}
