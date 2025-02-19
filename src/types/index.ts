type FixedLengthArray<T, L extends number> = {
	0: T;
	length: L;
} & ReadonlyArray<T>;

export type TDate = Date | string | number;

export type Unit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export interface Formats {
	YYYY: string;
	YY: string;
	M: string;
	MM: string;
	MMM: string;
	MMMM: string;
	D: string;
	DD: string;
	DDD: string;
	DDDD: string;
	H: string;
	HH: string;
	m: string;
	mm: string;
	s: string;
	ss: string;
}

export type Months = FixedLengthArray<string, 12>;

export type Weekdays = FixedLengthArray<string, 7>;
