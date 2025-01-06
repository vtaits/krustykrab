import { expect, test } from "bun:test";
import { Err, Ok } from "./option_result";
import * as resultExports from "./result";

test("correct exports", () => {
	expect(resultExports.Ok).toBe(Ok);
	expect(resultExports.Err).toBe(Err);
});
