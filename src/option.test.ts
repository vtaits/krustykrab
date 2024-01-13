import { expect, test } from "vitest";
import * as optionExports from "./option";
import { None, Some } from "./option_result";

test("correct exports", () => {
	expect(optionExports.None).toBe(None);
	expect(optionExports.Some).toBe(Some);
});
