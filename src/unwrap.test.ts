import { describe, expect, test } from "vitest";
import { unwrap } from "./unwrap";

describe("success", () => {
	test.each([[0], [1], [NaN], [true], [false], [{}], [[]], [""], ["foo"]])(
		"%s",
		(arg) => {
			expect(unwrap(arg)).toBe(arg);
		},
	);
});

describe("panic", () => {
	test.each([[null], [undefined]])("%s", (arg) => {
		expect(() => {
			unwrap(arg);
		}).toThrow();
	});
});
