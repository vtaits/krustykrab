/**
 * An implementation of `Result` from Rust stdlib
 *
 * https://doc.rust-lang.org/std/result/enum.Result.html
 *
 * @template R The success type
 * @template E The error type
 * @typedef {Object} Result
 *
 * @property {() => boolean} isOk
 * ```ts
 * Ok('foo').isOk(); // returns `true`
 * Err('foo').isOk(); // returns `false`
 * ```
 * @property {(fn: (arg: R) => boolean) => boolean} isOkAnd
 * ```ts
 * Ok(123).isOkAnd((value) => value > 100); // returns `true`
 * Ok(12).isOkAnd((value) => value > 100); // returns `false`
 * Err(123).isOkAnd((value) => value > 100); // returns `false`
 * ```
 * @property {() => boolean} isErr
 * ```ts
 * Ok('foo').isErr(); // returns `false`
 * Err('foo').isErr(); // returns `true`
 * ```
 * @property {(fn: (arg: E) => boolean) => boolean} isErrAnd
 * ```ts
 * Ok(123).isErrAnd((value) => value > 100); // returns `false`
 * Err(123).isErrAnd((value) => value > 100); // returns `true`
 * Err(12).isErrAnd((value) => value > 100); // returns `false`
 * ```
 * @property {() => Option<R>} ok
 * ```ts
 * Ok('foo').ok(); // returns `Some('foo')`
 * Err('foo').ok(); // returns `None()`
 * ```
 * @property {() => Option<E>} err
 * ```ts
 * Ok('foo').err(); // returns `None()`
 * Err('foo').err(); // returns `Some('foo')`
 * ```
 * @property {<U>(fn: (arg: R) => U) => Result<U, E>} map
 * ```ts
 * Ok(1).map((value) => value * 2); // returns `Ok(2)`
 * Err(1).map((value) => value * 2); // returns `Err(1)`
 * ```
 * @property {<U>(defaultValue: U, fn: (arg: R) => U) => U} mapOr
 * ```ts
 * Ok(1).mapOr(10, (value) => value * 2); // returns `2`
 * Err(1).mapOr(10, (value) => value * 2); // returns `10`
 * ```
 * @property {<U>(getDefaultValue: (arg: E) => U, fn: (arg: R) => U) => U} mapOrElse
 * ```ts
 * Ok(1).mapOrElse((err) => err * 10, (value) => value * 2); // returns `2`
 * Err(1).mapOrElse((err) => err * 10, (value) => value * 2); // returns `10`
 * ```
 * @property {<F>(fn: (arg: E) => F) => Result<R, F>} mapErr
 * ```ts
 * Ok(1).mapErr((err) => err * 2); // returns `Ok(1)`
 * Err(1).mapErr((err) => err * 2); // returns `Err(2)`
 * ```
 * @property {(msg: string) => R} expect
 * ```ts
 * Ok('foo').expect('error message'); // returns `'foo'`
 * Err('foo').expect('error message'); // throws `new Error('error message')`
 * ```
 * @property {(msg: string) => E} expectErr
 * ```ts
 * Ok('foo').expectErr('error message'); // throws `new Error('error message')`
 * Err('foo').expectErr('error message'); // returns `'foo'`
 * ```
 * @property {() => R} unwrap
 * ```ts
 * Ok('foo').unwrap(); // returns `'foo'`
 * Err('foo').unwrap(); // throws
 * ```
 * @property {() => E} unwrapErr
 * ```ts
 * Ok('foo').unwrapErr(); // throws
 * Err('foo').unwrapErr(); // returns `'foo'`
 * ```
 * @property {(defaultValue: R) => R} unwrapOr
 * ```ts
 * Ok('foo').unwrapOr('bar'); // returns `'foo'`
 * Err('foo').unwrapOr('bar'); // returns `'bar'`
 * ```
 * @property {(getDefaultValue: (arg: E) => R) => R} unwrapOrElse
 * ```ts
 * Ok(1).unwrapOrElse('bar'); // returns `1`
 * Err(1).unwrapOrElse((err) => err * 2); // returns `2`
 * ```
 * @property {<U>(res: Result<U, E>) => Result<U, E>} and
 * ```ts
 * Ok('foo').and(otherResult); // returns `otherResult`
 * Err('foo').and(otherResult); // returns `Err('foo')`
 * ```
 * @property {<U>(getRes: (arg: R) => Result<U, E>) => Result<U, E>} andThen
 * ```ts
 * Ok(1).andThen((value) => Ok(value * 2)); // returns `Ok(2)`
 * Ok(1).andThen((value) => Err(value * 2)); // returns `Err(2)`
 * Err(1).andThen((value) => Ok(value * 2)); // returns `Err(1)`
 * ```
 * @property {<F>(res: Result<R, F>) => Result<R, F>} or
 * ```ts
 * Ok('foo').or(otherResult); // returns `Ok('foo').`
 * Err('foo').or(otherResult); // returns `otherResult`
 * ```
 * @property {<F>(getRes: (arg: E) => Result<R, F>) => Result<R, F>} orElse
 * ```ts
 * Ok(1).orElse((value) => Ok(value * 2)); // returns `Ok(1)`
 * Err(1).orElse((value) => Ok(value * 2)); // returns `Ok(2)`
 * Err(1).orElse((value) => Err(value * 2)); // returns `Err(2)`
 * ```
 */

/**
 * @template R, E
 * @param {R} result The success value
 * @returns {Result<R, E>} The success result
 *
 * https://doc.rust-lang.org/std/result/enum.Result.html#variant.Ok
 */
export function Ok(result) {
	/** @type {Result<R, E>} */
	const self = {
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
 * @template R, E
 * @param {E} err The error value
 * @returns {Result<R, E>} The error result
 *
 * https://doc.rust-lang.org/std/result/enum.Result.html#variant.Err
 */
export function Err(err) {
	/** @type {Result<R, E>} */
	const self = {
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
 *
 * @template T
 * @typedef {Object} Option
 *
 * @property {<R>(opt: Option<R>) => Option<R>} and
 * ```ts
 * Some('foo').and(otherOption); // returns `otherOption`
 * None().and(otherOption); // returns `None()`
 * ```
 *
 * @property {<R>(fn: (arg: T) => Option<R>) => Option<R>} andThen
 * ```ts
 * Some(1).andThen((value) => Some(value * 2)); // returns `Some(2)`
 * None().andThen((value) => Some(value * 2)); // returns `None()`
 * ```
 *
 * @property {(msg: string) => T} expect
 * ```ts
 * Some('foo').expect('error message'); // returns `'foo'`
 * None().expect('error message'); // throws `new Error('error message')`
 * ```
 *
 * @property {(fn: (arg: T) => boolean) => Option<T>} filter
 * ```ts
 * Some(123).filter((value) => value > 100); // returns `Some(123)`
 * Some(12).filter((value) => value > 100); // returns `None()`
 * None().filter((value) => value > 100); // returns `None()`
 * ```
 *
 * @property {() => boolean} isSome
 * ```ts
 * Some('foo').isSome(); // returns `true`
 * None().isSome(); // returns `false`
 * ```
 *
 * @property {(fn: (arg: T) => boolean) => boolean} isSomeAnd
 * ```ts
 * Some(123).isSomeAnd((value) => value > 100); // returns `true`
 * Some(12).isSomeAnd((value) => value > 100); // returns `false`
 * None().isSomeAnd((value) => value > 100); // returns `false`
 * ```
 *
 * @property {() => boolean} isNone
 * ```ts
 * Some('foo').isNone(); // returns `false`
 * None().isNone(); // returns `true`
 * ```
 *
 * @property {<R>(fn: (arg: T) => R) => Option<R>} map
 * ```ts
 * Some(1).map((value) => Some(value * 2)); // returns `Some(2)`
 * None().map((value) => Some(value * 2)); // returns `None()`
 * ```
 *
 * @property {<R>(defaultValue: R, fn: (arg: T) => R) => R} mapOr
 * ```ts
 * Some(1).mapOr(10, (value) => Some(value * 2)); // returns `2`
 * None().mapOr(10, (value) => Some(value * 2)); // returns `10`
 * ```
 *
 * @property {<R>(getDefaultValue: () => R, fn: (arg: T) => R) => R} mapOrElse
 * ```ts
 * Some(1).mapOrElse(() => 10, (value) => Some(value * 2)); // returns `2`
 * None().mapOrElse(() => 10, (value) => Some(value * 2)); // returns `10`
 * ```
 *
 * @property {<E>(err: E) => Result<T, E>} okOr
 * ```ts
 * Some('foo').okOr('err'); // returns `Ok('foo')`
 * None().okOr('err'); // returns `Err('err')`
 * ```
 *
 * @property {<E>(getErr: () => E) => Result<T, E>} okOrElse
 * ```ts
 * Some('foo').okOrElse(() => 'err'); // returns `Ok('foo')`
 * None().okOrElse(() => 'err'); // returns `Err('err')`
 * ```
 *
 * @property {(opt: Option<T>) => Option<T>} or
 * ```ts
 * Some('foo').or(otherOption); // returns `Some('foo')`
 * None().or(otherOption); // returns `otherOption`
 * ```
 *
 * @property {(fn: () => Option<T>) => Option<T>} orElse
 * ```ts
 * Some('foo').or(() => Some('bar')); // returns `Some('foo')`
 * None().or(() => Some('bar')); // returns `Some('bar')`
 * None().or(() => None()); // returns `None()`
 * ```
 *
 * @property {() => T} unwrap
 * ```ts
 * Some('foo').unwrap(); // returns `'foo'`
 * None().unwrap(); // throws
 * ```
 *
 * @property {(defaultValue: T) => T} unwrapOr
 * ```ts
 * Some('foo').unwrapOr('bar'); // returns `'foo'`
 * None().unwrapOr('bar'); // returns `'bar'`
 * ```
 *
 * @property {(getDefaultValue: () => T) => T} unwrapOrElse
 * ```ts
 * Some('foo').unwrapOrElse(() => 'bar'); // returns `'foo'`
 * None().unwrapOrElse(() => 'bar'); // returns `'bar'`
 * ```
 *
 * @property {(opt: Option<T>) => Option<T>} xor
 * ```ts
 * Some('foo').xor(Some('bar')); // returns `None()`
 * Some('foo').xor(None()); // returns `Some('foo')`
 * None().xor(Some('bar')); // returns `Some('bar')`
 * None().xor(None()); // returns `None()`
 * ```
 */

/**
 * https://doc.rust-lang.org/std/option/enum.Option.html#variant.None
 *
 * @template T
 * @returns {Option<T>} Empty option
 */
export function None() {
	/** @type {Option<T>} */
	const self = {
		and: () => None(),
		andThen: () => None(),
		expect: (msg) => {
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
 * https://doc.rust-lang.org/std/option/enum.Option.html#variant.Some
 *
 * @template T
 * @param {T} value Some value
 * @returns {Option<T>} Filled option
 */
export function Some(value) {
	/** @type {Option<T>} */
	const self = {
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
