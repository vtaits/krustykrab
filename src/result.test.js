import { expect, test } from "bun:test";
import { Err, Ok } from "./option_result.js";
import * as resultExports from "./result.js";

test("correct exports", () => {
	expect(resultExports.Ok).toBe(Ok);
	expect(resultExports.Err).toBe(Err);
});
