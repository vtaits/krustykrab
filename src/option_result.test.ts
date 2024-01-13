import { describe, expect, test, vi } from "vitest";
import { Err, None, Ok, Some } from "./option_result";

describe("Option", () => {
	describe("Some", () => {
		const value = 12345;
		const option = Some(value);

		const otherValue = "otherValue";
		const otherOption = Some(otherValue);

		test("and", () => {
			expect(option.and(otherOption)).toBe(otherOption);
		});

		test("andThen", () => {
			const fn = vi.fn().mockReturnValue(otherOption);
			expect(option.andThen(fn)).toBe(otherOption);

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("expect", () => {
			expect(option.expect("test")).toBe(value);
		});

		describe("filter", () => {
			test("match", () => {
				const fn = vi.fn().mockReturnValue(true);
				expect(option.filter(fn)).toBe(option);

				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenCalledWith(value);
			});

			test("no match", () => {
				const fn = vi.fn().mockReturnValue(false);
				expect(option.filter(fn).isNone()).toBe(true);

				expect(fn).toHaveBeenCalledTimes(1);
				expect(fn).toHaveBeenCalledWith(value);
			});
		});

		test("isSome", () => {
			expect(option.isSome()).toBe(true);
		});

		test.each([[true], [false]])("isSomeAnd = %s", (fnReturn) => {
			const fn = vi.fn().mockReturnValue(fnReturn);

			expect(option.isSomeAnd(fn)).toBe(fnReturn);

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("isNone", () => {
			expect(option.isNone()).toBe(false);
		});

		test("map", () => {
			const fn = vi.fn().mockReturnValue("test");

			expect(option.map(fn).unwrap()).toBe("test");

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("mapOr", () => {
			const fn = vi.fn().mockReturnValue("test");

			expect(option.mapOr("foo", fn)).toBe("test");

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("mapOrElse", () => {
			const fn = vi.fn().mockReturnValue("test");

			expect(option.mapOrElse(() => "foo", fn)).toBe("test");

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("okOr", () => {
			const result = option.okOr("test");

			expect(result.isOk()).toBe(true);
			expect(result.unwrap()).toBe(value);
		});

		test("okOrElse", () => {
			const result = option.okOrElse(() => "test");

			expect(result.isOk()).toBe(true);
			expect(result.unwrap()).toBe(value);
		});

		test("or", () => {
			expect(option.or(Some(54321))).toBe(option);
		});

		test("orElse", () => {
			expect(option.orElse(() => Some(54321))).toBe(option);
		});

		test("unwrap", () => {
			expect(option.unwrap()).toBe(value);
		});

		test("unwrapOr", () => {
			expect(option.unwrapOr(54231)).toBe(value);
		});

		test("unwrapOrElse", () => {
			expect(option.unwrapOrElse(() => 54231)).toBe(value);
		});

		describe("xor", () => {
			test("true", () => {
				expect(option.xor(None())).toBe(option);
			});

			test("false", () => {
				expect(option.xor(Some(54321)).isNone()).toBe(true);
			});
		});
	});

	describe("None", () => {
		const option = None<number>();

		const otherValue = "otherValue";
		const otherOption = Some(otherValue);

		test("and", () => {
			expect(option.and(otherOption).isNone()).toBe(true);
		});

		test("andThen", () => {
			const fn = vi.fn().mockReturnValue(otherOption);
			expect(option.andThen(fn).isNone()).toBe(true);
			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("expect", () => {
			expect(() => {
				option.expect("test");
			}).toThrowError("test");
		});

		test.each([[true], [false]])("filter= %s", (fnReturn) => {
			const fn = vi.fn().mockReturnValue(fnReturn);
			expect(option.filter(fn)).toBe(option);
			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("isSome", () => {
			expect(option.isSome()).toBe(false);
		});

		test.each([[true], [false]])("isSomeAnd = %s", (fnReturn) => {
			const fn = vi.fn().mockReturnValue(fnReturn);
			expect(option.isSomeAnd(fn)).toBe(false);
			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("isNone", () => {
			expect(option.isNone()).toBe(true);
		});

		test("map", () => {
			const fn = vi.fn().mockReturnValue("test");
			expect(option.map(fn).isNone()).toBe(true);
			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("mapOr", () => {
			const fn = vi.fn().mockReturnValue("test");

			expect(option.mapOr("foo", fn)).toBe("foo");
			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("mapOrElse", () => {
			const fn = vi.fn().mockReturnValue("test");

			expect(option.mapOrElse(() => "foo", fn)).toBe("foo");

			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("okOr", () => {
			const result = option.okOr("test");

			expect(result.isErr()).toBe(true);
			expect(result.unwrapErr()).toBe("test");
		});

		test("okOrElse", () => {
			const result = option.okOrElse(() => "test");

			expect(result.isErr()).toBe(true);
			expect(result.unwrapErr()).toBe("test");
		});

		test("or", () => {
			const otherOption = Some(54321);
			expect(option.or(otherOption)).toBe(otherOption);
		});

		test("orElse", () => {
			const otherOption = Some(54321);
			expect(option.orElse(() => otherOption)).toBe(otherOption);
		});

		test("unwrap", () => {
			expect(() => {
				option.unwrap();
			}).toThrow();
		});

		test("unwrapOr", () => {
			expect(option.unwrapOr(54321)).toBe(54321);
		});

		test("unwrapOrElse", () => {
			expect(option.unwrapOrElse(() => 54231)).toBe(54231);
		});

		describe("xor", () => {
			test("false", () => {
				expect(option.xor(None())).toBe(option);
			});

			test("true", () => {
				const otherOption = Some(54321);

				expect(option.xor(otherOption)).toBe(otherOption);
			});
		});
	});
});

describe("Result", () => {
	describe("Ok", () => {
		const value = 12345;
		const result = Ok<number, string>(value);

		test("isOk", () => {
			expect(result.isOk()).toBe(true);
		});

		test.each([[true], [false]])("isOkAnd = %s", (fnReturn) => {
			const fn = vi.fn().mockReturnValue(fnReturn);
			expect(result.isOkAnd(fn)).toBe(fnReturn);

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("isErr", () => {
			expect(result.isErr()).toBe(false);
		});

		test.each([[true], [false]])("isOkAnd = %s", (fnReturn) => {
			const fn = vi.fn().mockReturnValue(fnReturn);
			expect(result.isErrAnd(fn)).toBe(false);

			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("ok", () => {
			expect(result.ok().unwrap()).toBe(value);
		});

		test("err", () => {
			expect(result.err().isNone()).toBe(true);
		});

		test("map", () => {
			const fn = vi.fn().mockReturnValue("foo");
			expect(result.map(fn).unwrap()).toBe("foo");

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("mapOr", () => {
			const fn = vi.fn().mockReturnValue("foo");
			expect(result.mapOr("bar", fn)).toBe("foo");

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("mapOrElse", () => {
			const getDefaultValue = vi.fn().mockReturnValue("bar");
			const fn = vi.fn().mockReturnValue("foo");
			expect(result.mapOrElse(getDefaultValue, fn)).toBe("foo");

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);

			expect(getDefaultValue).toHaveBeenCalledTimes(0);
		});

		test("mapErr", () => {
			const fn = vi.fn().mockReturnValue("foo");
			expect(result.mapErr(fn).unwrap()).toBe(value);

			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("expect", () => {
			expect(result.expect("error")).toBe(value);
		});

		test("expectErr", () => {
			expect(() => {
				result.expectErr("error");
			}).toThrow("error");
		});

		test("unwrap", () => {
			expect(result.unwrap()).toBe(value);
		});

		test("unwrapErr", () => {
			expect(() => {
				result.unwrapErr();
			}).toThrow();
		});

		test("unwrapOr", () => {
			expect(result.unwrapOr(54321)).toBe(value);
		});

		test("unwrapOrElse", () => {
			const fn = vi.fn().mockReturnValue(54321);
			expect(result.unwrapOrElse(fn)).toBe(value);

			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("and", () => {
			const other = Ok<number[], string>([1, 2, 3]);

			expect(result.and(other)).toBe(other);
		});

		test("andThen", () => {
			const other = Ok<number[], string>([1, 2, 3]);
			const fn = vi.fn().mockReturnValue(other);
			expect(result.andThen(fn)).toBe(other);

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(value);
		});

		test("or", () => {
			const other = Ok<number, string>(54321);
			expect(result.or(other).unwrap()).toBe(value);
		});

		test("orElse", () => {
			const other = Ok<number, string>(54321);
			const fn = vi.fn().mockReturnValue(other);
			expect(result.orElse(fn).unwrap()).toBe(value);

			expect(fn).toHaveBeenCalledTimes(0);
		});
	});

	describe("Err", () => {
		const err = "testError";
		const result = Err<number, string>(err);

		test("isOk", () => {
			expect(result.isOk()).toBe(false);
		});

		test.each([[true], [false]])("isOkAnd = %s", (fnReturn) => {
			const fn = vi.fn().mockReturnValue(fnReturn);
			expect(result.isOkAnd(fn)).toBe(false);

			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("isErr", () => {
			expect(result.isErr()).toBe(true);
		});

		test.each([[true], [false]])("isOkAnd = %s", (fnReturn) => {
			const fn = vi.fn().mockReturnValue(fnReturn);
			expect(result.isErrAnd(fn)).toBe(fnReturn);

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(err);
		});

		test("ok", () => {
			expect(result.ok().isNone()).toBe(true);
		});

		test("err", () => {
			expect(result.err().unwrap()).toBe(err);
		});

		test("map", () => {
			const fn = vi.fn().mockReturnValue(12345);
			expect(result.map(fn).unwrapErr()).toBe(err);

			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("mapOr", () => {
			const fn = vi.fn().mockReturnValue("foo");
			expect(result.mapOr("bar", fn)).toBe("bar");

			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("mapOrElse", () => {
			const getDefaultValue = vi.fn().mockReturnValue("bar");
			const fn = vi.fn().mockReturnValue("foo");
			expect(result.mapOrElse(getDefaultValue, fn)).toBe("bar");

			expect(fn).toHaveBeenCalledTimes(0);

			expect(getDefaultValue).toHaveBeenCalledTimes(1);
			expect(getDefaultValue).toHaveBeenCalledWith(err);
		});

		test("mapErr", () => {
			const fn = vi.fn().mockReturnValue("foo");
			expect(result.mapErr(fn).unwrapErr()).toBe("foo");

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(err);
		});

		test("expect", () => {
			expect(() => {
				result.expect("error");
			}).toThrow("error");
		});

		test("expectErr", () => {
			expect(result.expectErr("error")).toBe(err);
		});

		test("unwrap", () => {
			expect(() => {
				result.unwrap();
			}).toThrow();
		});

		test("unwrapErr", () => {
			expect(result.unwrapErr()).toBe(err);
		});

		test("unwrapOr", () => {
			expect(result.unwrapOr(54321)).toBe(54321);
		});

		test("unwrapOrElse", () => {
			const fn = vi.fn().mockReturnValue(54321);
			expect(result.unwrapOrElse(fn)).toBe(54321);

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(err);
		});

		test("and", () => {
			const other = Ok<number[], string>([1, 2, 3]);

			expect(result.and(other).unwrapErr()).toBe(err);
		});

		test("andThen", () => {
			const other = Ok<number[], string>([1, 2, 3]);
			const fn = vi.fn().mockReturnValue(other);
			expect(result.andThen(fn).unwrapErr()).toBe(err);

			expect(fn).toHaveBeenCalledTimes(0);
		});

		test("or", () => {
			const other = Ok<number, string>(54321);
			expect(result.or(other)).toBe(other);
		});

		test("orElse", () => {
			const other = Ok<number, string>(54321);
			const fn = vi.fn().mockReturnValue(other);
			expect(result.orElse(fn)).toBe(other);

			expect(fn).toHaveBeenCalledTimes(1);
			expect(fn).toHaveBeenCalledWith(err);
		});
	});
});
