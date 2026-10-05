import { expect, test } from "bun:test";
import * as optionExports from "./option.js";
import { None, Some } from "./option_result.js";

test("correct exports", () => {
	expect(optionExports.None).toBe(None);
	expect(optionExports.Some).toBe(Some);
});
