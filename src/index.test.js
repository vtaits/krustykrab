import { expect, test } from "bun:test";
import { getResult } from "./get_result.js";
import * as lib from "./index.js";
import { None, Some } from "./option.js";
import { Err, Ok } from "./result.js";
import { toOption } from "./to_option.js";
import { tryCatch } from "./try_catch.js";
import { unwrap } from "./unwrap.js";
import { unwrapOr } from "./unwrap_or.js";
import { unwrapOrElse } from "./unwrap_or_else.js";

test("correct exports", () => {
	expect(lib.toOption).toBe(toOption);
	expect(lib.tryCatch).toBe(tryCatch);
	expect(lib.getResult).toBe(getResult);
	expect(lib.unwrap).toBe(unwrap);
	expect(lib.unwrapOr).toBe(unwrapOr);
	expect(lib.unwrapOrElse).toBe(unwrapOrElse);
	expect(lib.None).toBe(None);
	expect(lib.Some).toBe(Some);
	expect(lib.Ok).toBe(Ok);
	expect(lib.Err).toBe(Err);
});
