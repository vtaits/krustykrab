/**
 * An implementation of `Result` from Rust stdlib
 *
 * https://doc.rust-lang.org/std/result/enum.Result.html
 */
export type Result<R, E> = Readonly<{
	/**
	 * ```ts
	 * Ok('foo').isOk(); // returns `true`
	 * Err('foo').isOk(); // returns `false`
	 * ```
	 */
	isOk: () => boolean;
	/**
	 * ```ts
	 * Ok(123).isOkAnd((value) => value > 100); // returns `true`
	 * Ok(12).isOkAnd((value) => value > 100); // returns `false`
	 * Err(123).isOkAnd((value) => value > 100); // returns `false`
	 * ```
	 */
	isOkAnd: (fn: (arg: R) => boolean) => boolean;
	/**
	 * ```ts
	 * Ok('foo').isErr(); // returns `false`
	 * Err('foo').isErr(); // returns `true`
	 * ```
	 */
	isErr: () => boolean;
	/**
	 * ```ts
	 * Ok(123).isErrAnd((value) => value > 100); // returns `false`
	 * Err(123).isErrAnd((value) => value > 100); // returns `true`
	 * Err(12).isErrAnd((value) => value > 100); // returns `false`
	 * ```
	 */
	isErrAnd: (fn: (arg: E) => boolean) => boolean;
	/**
	 * ```ts
	 * Ok('foo').ok(); // returns `Some('foo')`
	 * Err('foo').ok(); // returns `None()`
	 * ```
	 */
	ok: () => Option<R>;
	/**
	 * ```ts
	 * Ok('foo').err(); // returns `None()`
	 * Err('foo').err(); // returns `Some('foo')`
	 * ```
	 */
	err: () => Option<E>;
	/**
	 * ```ts
	 * Ok(1).map((value) => value * 2); // returns `Ok(2)`
	 * Err(1).map((value) => value * 2); // returns `Err(1)`
	 * ```
	 */
	map: <U>(fn: (arg: R) => U) => Result<U, E>;
	/**
	 * ```ts
	 * Ok(1).mapOr(10, (value) => value * 2); // returns `2`
	 * Err(1).mapOr(10, (value) => value * 2); // returns `10`
	 * ```
	 */
	mapOr: <U>(defaultValue: U, fn: (arg: R) => U) => U;
	/**
	 * ```ts
	 * Ok(1).mapOrElse((err) => err * 10, (value) => value * 2); // returns `2`
	 * Err(1).mapOrElse((err) => err * 10, (value) => value * 2); // returns `10`
	 * ```
	 */
	mapOrElse: <U>(getDefaultValue: (arg: E) => U, fn: (arg: R) => U) => U;
	/**
	 * ```ts
	 * Ok(1).mapErr((err) => err * 2); // returns `Ok(1)`
	 * Err(1).mapErr((err) => err * 2); // returns `Err(2)`
	 * ```
	 */
	mapErr: <F>(fn: (arg: E) => F) => Result<R, F>;
	/**
	 * ```ts
	 * Ok('foo').expect('error message'); // returns `'foo'`
	 * Err('foo').expect('error message'); // throws `new Error('error message')`
	 * ```
	 */
	expect: (msg: string) => R;
	/**
	 * ```ts
	 * Ok('foo').expectErr('error message'); // throws `new Error('error message')`
	 * Err('foo').expectErr('error message'); // returns `'foo'`
	 * ```
	 */
	expectErr: (msg: string) => E;
	/**
	 * ```ts
	 * Ok('foo').unwrap(); // returns `'foo'`
	 * Err('foo').unwrap(); // throws
	 * ```
	 */
	unwrap: () => R;
	/**
	 * ```ts
	 * Ok('foo').unwrapErr(); // throws
	 * Err('foo').unwrapErr(); // returns `'foo'`
	 * ```
	 */
	unwrapErr: () => E;
	/**
	 * ```ts
	 * Ok('foo').unwrapOr('bar'); // returns `'foo'`
	 * Err('foo').unwrapOr('bar'); // returns `'bar'`
	 * ```
	 */
	unwrapOr: (defaultValue: R) => R;
	/**
	 * ```ts
	 * Ok(1).unwrapOrElse('bar'); // returns `1`
	 * Err(1).unwrapOrElse((err) => err * 2); // returns `2`
	 * ```
	 */
	unwrapOrElse: (getDefaultValue: (arg: E) => R) => R;
	/**
	 * ```ts
	 * Ok('foo').and(otherResult); // returns `otherResult`
	 * Err('foo').and(otherResult); // returns `Err('foo')`
	 * ```
	 */
	and: <U>(res: Result<U, E>) => Result<U, E>;
	/**
	 * ```ts
	 * Ok(1).andThen((value) => Ok(value * 2)); // returns `Ok(2)`
	 * Ok(1).andThen((value) => Err(value * 2)); // returns `Err(2)`
	 * Err(1).andThen((value) => Ok(value * 2)); // returns `Err(1)`
	 * ```
	 */
	andThen: <U>(getRes: (arg: R) => Result<U, E>) => Result<U, E>;
	/**
	 * ```ts
	 * Ok('foo').or(otherResult); // returns `Ok('foo').`
	 * Err('foo').or(otherResult); // returns `otherResult`
	 * ```
	 */
	or: <F>(res: Result<R, F>) => Result<R, F>;
	/**
	 * ```ts
	 * Ok(1).orElse((value) => Ok(value * 2)); // returns `Ok(1)`
	 * Err(1).orElse((value) => Ok(value * 2)); // returns `Ok(2)`
	 * Err(1).orElse((value) => Err(value * 2)); // returns `Err(2)`
	 * ```
	 */
	orElse: <F>(getRes: (arg: E) => Result<R, F>) => Result<R, F>;
}>;

/**
 * @param result The success value
 * @returns The success result
 *
 * https://doc.rust-lang.org/std/result/enum.Result.html#variant.Ok
 */
export function Ok<R, E>(result: R): Result<R, E> {
	const self: Result<R, E> = {
		isOk: () => true,
		isOkAnd: (fn) => fn(result),
		isErr: () => false,
		isErrAnd: () => false,
		ok: () => Some(result),
		err: () => None(),
		map: (fn) => Ok(fn(result)),
		mapOr: (_, fn) => fn(result),
		mapOrElse: (_, fn) => fn(result),
		mapErr: () => Ok(result),
		expect: () => result,
		expectErr: (msg) => {
			throw new Error(msg);
		},
		unwrap: () => result,
		unwrapErr: () => {
			throw new Error(`${result}`);
		},
		unwrapOr: () => result,
		unwrapOrElse: () => result,
		and: (res) => res,
		andThen: (getRes) => getRes(result),
		or: () => Ok(result),
		orElse: () => Ok(result),
	};

	return self;
}

/**
 * @param err The error value
 * @returns The error result
 *
 * https://doc.rust-lang.org/std/result/enum.Result.html#variant.Err
 */
export function Err<R, E>(err: E): Result<R, E> {
	const self: Result<R, E> = {
		isOk: () => false,
		isOkAnd: () => false,
		isErr: () => true,
		isErrAnd: (fn) => fn(err),
		ok: () => None(),
		err: () => Some(err),
		map: () => Err(err),
		mapOr: (defaultValue) => defaultValue,
		mapOrElse: (getDefaultValue) => getDefaultValue(err),
		mapErr: (fn) => Err(fn(err)),
		expect: (msg) => {
			throw new Error(msg);
		},
		expectErr: () => err,
		unwrap: () => {
			throw new Error(`${err}`);
		},
		unwrapErr: () => err,
		unwrapOr: (defaultValue) => defaultValue,
		unwrapOrElse: (getDefaultValue) => getDefaultValue(err),
		and: () => Err(err),
		andThen: () => Err(err),
		or: (res) => res,
		orElse: (getRes) => getRes(err),
	};

	return self;
}

/**
 * An implementation of `Option` from Rust stdlib
 *
 * https://doc.rust-lang.org/std/option/enum.Option.html
 */
export type Option<T> = Readonly<{
	/**
	 * ```ts
	 * Some('foo').and(otherOption); // returns `otherOption`
	 * None().and(otherOption); // returns `None()`
	 * ```
	 */
	and: <R>(opt: Option<R>) => Option<R>;
	/**
	 * ```ts
	 * Some(1).andThen((value) => Some(value * 2)); // returns `Some(2)`
	 * None().andThen((value) => Some(value * 2)); // returns `None()`
	 * ```
	 */
	andThen: <R>(fn: (arg: T) => Option<R>) => Option<R>;
	/**
	 * ```ts
	 * Some('foo').expect('error message'); // returns `'foo'`
	 * None().expect('error message'); // throws `new Error('error message')`
	 * ```
	 */
	expect: (msg: string) => T;
	/**
	 * ```ts
	 * Some(123).filter((value) => value > 100); // returns `Some(123)`
	 * Some(12).filter((value) => value > 100); // returns `None()`
	 * None().filter((value) => value > 100); // returns `None()`
	 * ```
	 */
	filter: (fn: (arg: T) => boolean) => Option<T>;
	/**
	 * ```ts
	 * Some('foo').isSome(); // returns `true`
	 * None().isSome(); // returns `false`
	 * ```
	 */
	isSome: () => boolean;
	/**
	 * ```ts
	 * Some(123).isSomeAnd((value) => value > 100); // returns `true`
	 * Some(12).isSomeAnd((value) => value > 100); // returns `false`
	 * None().isSomeAnd((value) => value > 100); // returns `false`
	 * ```
	 */
	isSomeAnd: (fn: (arg: T) => boolean) => boolean;
	/**
	 * ```ts
	 * Some('foo').isNone(); // returns `false`
	 * None().isNone(); // returns `true`
	 * ```
	 */
	isNone: () => boolean;
	/**
	 * ```ts
	 * Some(1).map((value) => Some(value * 2)); // returns `Some(2)`
	 * None().map((value) => Some(value * 2)); // returns `None()`
	 * ```
	 */
	map: <R>(fn: (arg: T) => R) => Option<R>;
	/**
	 * ```ts
	 * Some(1).mapOr(10, (value) => Some(value * 2)); // returns `2`
	 * None().mapOr(10, (value) => Some(value * 2)); // returns `10`
	 * ```
	 */
	mapOr: <R>(defaultValue: R, fn: (arg: T) => R) => R;
	/**
	 * ```ts
	 * Some(1).mapOrElse(() => 10, (value) => Some(value * 2)); // returns `2`
	 * None().mapOrElse(() => 10, (value) => Some(value * 2)); // returns `10`
	 * ```
	 */
	mapOrElse: <R>(getDefaultValue: () => R, fn: (arg: T) => R) => R;
	/**
	 * ```ts
	 * Some('foo').okOr('err'); // returns `Ok('foo')`
	 * None().okOr('err'); // returns `Err('err')`
	 * ```
	 */
	okOr: <E>(err: E) => Result<T, E>;
	/**
	 * ```ts
	 * Some('foo').okOrElse(() => 'err'); // returns `Ok('foo')`
	 * None().okOrElse(() => 'err'); // returns `Err('err')`
	 * ```
	 */
	okOrElse: <E>(getErr: () => E) => Result<T, E>;
	/**
	 * ```ts
	 * Some('foo').or(otherOption); // returns `Some('foo')`
	 * None().or(otherOption); // returns `otherOption`
	 * ```
	 */
	or: (opt: Option<T>) => Option<T>;
	/**
	 * ```ts
	 * Some('foo').or(() => Some('bar')); // returns `Some('foo')`
	 * None().or(() => Some('bar')); // returns `Some('bar')`
	 * None().or(() => None()); // returns `None()`
	 * ```
	 */
	orElse: (fn: () => Option<T>) => Option<T>;
	/**
	 * ```ts
	 * Some('foo').unwrap(); // returns `'foo'`
	 * None().unwrap(); // throws
	 * ```
	 */
	unwrap: () => T;
	/**
	 * ```ts
	 * Some('foo').unwrapOr('bar'); // returns `'foo'`
	 * None().unwrapOr('bar'); // returns `'bar'`
	 * ```
	 */
	unwrapOr: (defaultValue: T) => T;
	/**
	 * ```ts
	 * Some('foo').unwrapOrElse(() => 'bar'); // returns `'foo'`
	 * None().unwrapOrElse(() => 'bar'); // returns `'bar'`
	 * ```
	 */
	unwrapOrElse: (getDefaultValue: () => T) => T;
	/**
	 * ```ts
	 * Some('foo').xor(Some('bar')); // returns `None()`
	 * Some('foo').xor(None()); // returns `Some('foo')`
	 * None().xor(Some('bar')); // returns `Some('bar')`
	 * None().xor(None()); // returns `None()`
	 * ```
	 */
	xor: (opt: Option<T>) => Option<T>;
}>;

/**
 * https://doc.rust-lang.org/std/option/enum.Option.html#variant.None
 *
 * @returns Empty option
 */
export function None<T>(): Option<T> {
	const self: Option<T> = {
		and: () => None(),
		andThen: () => None(),
		expect: (msg: string) => {
			throw new Error(msg);
		},
		filter: () => self,
		isSome: () => false,
		isSomeAnd: () => false,
		isNone: () => true,
		map: () => None(),
		mapOr: (defaultValue) => defaultValue,
		mapOrElse: (getDefaultValue) => getDefaultValue(),
		okOr: (err) => Err(err),
		okOrElse: (getErr) => Err(getErr()),
		or: (opt) => opt,
		orElse: (fn) => fn(),
		unwrap: () => {
			throw new Error("panic! call `unwrap` on a `None` value");
		},
		unwrapOr: (defaultValue) => defaultValue,
		unwrapOrElse: (getDefaultValue) => getDefaultValue(),
		xor: (opt) => {
			if (opt.isSome()) {
				return opt;
			}

			return self;
		},
	};

	return self;
}

/**
 * @param value Some value
 * @returns Filled option
 *
 * https://doc.rust-lang.org/std/option/enum.Option.html#variant.Some
 */
export function Some<T>(value: T): Option<T> {
	const self: Option<T> = {
		and: (opt) => opt,
		andThen: (fn) => fn(value),
		expect: () => value,
		filter: (fn) => {
			if (fn(value)) {
				return self;
			}

			return None();
		},
		isSome: () => true,
		isSomeAnd: (fn) => fn(value),
		isNone: () => false,
		map: (fn) => Some(fn(value)),
		mapOr: (_, fn) => fn(value),
		mapOrElse: (_, fn) => fn(value),
		okOr: () => Ok(value),
		okOrElse: () => Ok(value),
		or: () => self,
		orElse: () => self,
		unwrap: () => value,
		unwrapOr: () => value,
		unwrapOrElse: () => value,
		xor: (opt) => {
			if (opt.isNone()) {
				return self;
			}

			return None();
		},
	};

	return self;
}
