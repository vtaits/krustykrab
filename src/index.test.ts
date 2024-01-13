import { expect, test } from "vitest";
import { getResult } from "./get_result";
import * as lib from "./index";
import { None, Some } from "./option";
import { Err, Ok } from "./result";
import { unwrap } from "./unwrap";
import { unwrapOr } from "./unwrap_or";
import { unwrapOrElse } from "./unwrap_or_else";

test("correct exports", () => {
	expect(lib.getResult).toBe(getResult);
	expect(lib.unwrap).toBe(unwrap);
	expect(lib.unwrapOr).toBe(unwrapOr);
	expect(lib.unwrapOrElse).toBe(unwrapOrElse);
	expect(lib.None).toBe(None);
	expect(lib.Some).toBe(Some);
	expect(lib.Ok).toBe(Ok);
	expect(lib.Err).toBe(Err);
});
