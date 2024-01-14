import { describe, expect, test } from "vitest";
import { toOption } from "./to_option";

describe("Some", () => {
	test.each([[0], [1], [NaN], [true], [false], [{}], [[]], [""], ["foo"]])(
		"%s",
		(arg) => {
			const option = toOption(arg);

			expect(option.unwrap()).toBe(arg);
		},
	);
});

describe("None", () => {
	test.each([[null], [undefined]])("%s", (arg) => {
		const option = toOption(arg);

		expect(option.isNone()).toBe(true);
	});
});
