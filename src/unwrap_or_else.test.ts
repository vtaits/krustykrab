import { describe, expect, test } from "vitest";
import { unwrapOrElse } from "./unwrap_or_else";

describe("return target value", () => {
	test.each([
		[0, 100],
		[1, 100],
		[Number.NaN, 1234],
		[true, false],
		[false, false],
		[{}, { foo: "baz" }],
		[{ foo: "bar" }, { foo: "baz" }],
		[[], [4, 5, 6]],
		[
			[1, 2, 3],
			[4, 5, 6],
		],
		["", "bar"],
		["foo", "bar"],
	])("%s", (target, defaultValue) => {
		expect(unwrapOrElse(target, () => defaultValue)).toBe(target);
	});
});

describe("return default value", () => {
	test.each([
		[null, 100],
		[undefined, "foo"],
	])("%s", (target, defaultValue) => {
		expect(unwrapOrElse(target, () => defaultValue)).toBe(defaultValue);
	});
});
