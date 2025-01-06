import { expect, test } from "bun:test";
import { getResult } from "./get_result";

test("success", async () => {
	const result = await getResult(Promise.resolve("test"));

	expect(result.unwrap()).toBe("test");
});

test("fail", async () => {
	const error = new Error("test");

	const result = await getResult(Promise.reject(error));

	expect(result.unwrapErr()).toBe(error);
});
