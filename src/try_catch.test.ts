import { expect, test } from "bun:test";
import { tryCatch } from "./try_catch";

test("success", () => {
	const result = tryCatch(() => JSON.parse('{"foo": "bar"}'));

	expect(result.unwrap()).toEqual({ foo: "bar" });
});

test("fail", () => {
	const result = tryCatch(() => JSON.parse('{foo: "bar"}'));

	expect(result.isErr()).toBeTruthy();
});
