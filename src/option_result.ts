export type Result<R, E> = Readonly<{
	isOk: () => boolean;
	isOkAnd: (fn: (arg: R) => boolean) => boolean;
	isErr: () => boolean;
	isErrAnd: (fn: (arg: E) => boolean) => boolean;
	ok: () => Option<R>;
	err: () => Option<E>;
	map: <U>(fn: (arg: R) => U) => Result<U, E>;
	mapOr: <U>(defaultValue: U, fn: (arg: R) => U) => U;
	mapOrElse: <U>(getDefaultValue: (arg: E) => U, fn: (arg: R) => U) => U;
	mapErr: <F>(fn: (arg: E) => F) => Result<R, F>;
	expect: (msg: string) => R;
	expectErr: (msg: string) => E;
	unwrap: () => R;
	unwrapErr: () => E;
	unwrapOr: (defaultValue: R) => R;
	unwrapOrElse: (getDefaultValue: (arg: E) => R) => R;
	and: <U>(res: Result<U, E>) => Result<U, E>;
	andThen: <U>(getRes: (arg: R) => Result<U, E>) => Result<U, E>;
	or: <F>(res: Result<R, F>) => Result<R, F>;
	orElse: <F>(getRes: (arg: E) => Result<R, F>) => Result<R, F>;
}>;

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

export type Option<T> = Readonly<{
	and: <R>(opt: Option<R>) => Option<R>;
	andThen: <R>(fn: (arg: T) => Option<R>) => Option<R>;
	expect: (msg: string) => T;
	filter: (fn: (arg: T) => boolean) => Option<T>;
	isSome: () => boolean;
	isSomeAnd: (fn: (arg: T) => boolean) => boolean;
	isNone: () => boolean;
	map: <R>(fn: (arg: T) => R) => Option<R>;
	mapOr: <R>(defaultValue: R, fn: (arg: T) => R) => R;
	mapOrElse: <R>(getDefaultValue: () => R, fn: (arg: T) => R) => R;
	okOr: <E>(err: E) => Result<T, E>;
	okOrElse: <E>(getErr: () => E) => Result<T, E>;
	or: (opt: Option<T>) => Option<T>;
	orElse: (fn: () => Option<T>) => Option<T>;
	unwrap: () => T;
	unwrapOr: (defaultValue: T) => T;
	unwrapOrElse: (getDefaultValue: () => T) => T;
	xor: (opt: Option<T>) => Option<T>;
}>;

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
