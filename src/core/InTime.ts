import {
	DAY_IN_MILLISECONDS,
	HOUR_IN_MILLISECONDS,
	ISO_8601,
	MINUTE_IN_MILLISECONDS,
	MONTH_NAMES,
	MONTH_NAMES_SHORT,
	SECOND_IN_MILLISECONDS,
	WEEKDAYS,
	WEEKDAYS_SHORT,
} from '@/constants';
import { Formats, TDate, Unit } from '@/types';

export class InTime {
	readonly parsedDate: Date;
	private day: number = 0;
	private weekDay: number = 0;
	private month: number = 0;
	private year: number = 0;
	private hour: number = 0;
	private minute: number = 0;
	private second: number = 0;

	constructor(readonly givenDate?: TDate) {
		this.parsedDate = this.parse();

		if (!this.isValid) {
			throw new Error('Invalid date');
		}

		this.setDateDetails();
	}

	get isValid() {
		return !isNaN(this.timestamp);
	}

	get timestamp() {
		return this.parsedDate.getTime();
	}

	private setDateDetails() {
		this.day = this.parsedDate.getDate();
		this.weekDay = this.parsedDate.getDay();
		this.month = this.parsedDate.getMonth();
		this.year = this.parsedDate.getFullYear();
		this.hour = this.parsedDate.getHours();
		this.minute = this.parsedDate.getMinutes();
		this.second = this.parsedDate.getSeconds();
	}

	private parse(date?: TDate) {
		const dateToParse = date || this.givenDate;

		if (!dateToParse) {
			return new Date();
		}

		if (dateToParse instanceof Date) {
			return new Date(dateToParse);
		}

		if (typeof dateToParse === 'string' && ISO_8601.test(dateToParse)) {
			return new Date(dateToParse);
		}

		return new Date(dateToParse);
	}

	format(format: string) {
		const formats: Formats = {
			YYYY: this.year.toString(),
			YY: this.year.toString().slice(-2),
			MMMM: MONTH_NAMES[this.month],
			MMM: MONTH_NAMES_SHORT[this.month],
			MM: ('0' + (this.month + 1)).slice(-2),
			M: (this.month + 1).toString(),
			DDDD: WEEKDAYS[this.parsedDate.getDay()],
			DDD: WEEKDAYS_SHORT[this.parsedDate.getDay()],
			DD: ('0' + this.day).slice(-2),
			D: this.day.toString(),
			HH: ('0' + this.hour).slice(-2),
			H: this.hour.toString(),
			mm: ('0' + this.minute).slice(-2),
			m: this.minute.toString(),
			ss: ('0' + this.second).slice(-2),
			s: this.second.toString(),
		};

		return format.replace(
			/YYYY|YY|MMMM|MMM|MM|M|DDDD|DDD|DD|D|HH|H|mm|m|ss|s/g,
			matched => formats[matched as keyof Formats],
		);
	}

	clone() {
		return new InTime(this.parsedDate);
	}

	add(value: number, unit: Unit) {
		const { year, month, day, hour, minute, second } = this;
		const newInstance = this.clone();

		switch (unit) {
			case 'year':
				newInstance.parsedDate.setFullYear(year + value);
				break;
			case 'month':
				newInstance.parsedDate.setMonth(month + value);
				break;
			case 'day':
				newInstance.parsedDate.setDate(day + value);
				break;
			case 'hour':
				newInstance.parsedDate.setHours(hour + value);
				break;
			case 'minute':
				newInstance.parsedDate.setMinutes(minute + value);
				break;
			case 'second':
				newInstance.parsedDate.setSeconds(second + value);
				break;
		}

		return new InTime(newInstance.parsedDate);
	}

	subtract(value: number, unit: Unit) {
		return this.add(value * -1, unit);
	}

	isSame(other: TDate, unit?: Unit) {
		const date = this.parse(other);
		const { timestamp, year, month, day, hour, minute, second } = this;

		if (!unit) {
			return timestamp === date.getTime();
		}

		switch (unit) {
			case 'year':
				return year === date.getFullYear();
			case 'month':
				return month === date.getMonth();
			case 'day':
				return day === date.getDate();
			case 'hour':
				return hour === date.getHours();
			case 'minute':
				return minute === date.getMinutes();
			case 'second':
				return second === date.getSeconds();
			default:
				return false;
		}
	}

	isAfter(other: TDate, unit?: Unit) {
		const date = this.parse(other);
		const { timestamp, year, month, day, hour, minute, second } = this;

		if (!unit) {
			return timestamp > date.getTime();
		}

		switch (unit) {
			case 'year':
				return year > date.getFullYear();
			case 'month':
				return month > date.getMonth();
			case 'day':
				return day > date.getDate();
			case 'hour':
				return hour > date.getHours();
			case 'minute':
				return minute > date.getMinutes();
			case 'second':
				return second > date.getSeconds();
			default:
				return false;
		}
	}

	isBefore(other: TDate, unit?: Unit) {
		const date = this.parse(other);
		const { timestamp, year, month, day, hour, minute, second } = this;

		if (!unit) {
			return timestamp < date.getTime();
		}

		switch (unit) {
			case 'year':
				return year < date.getFullYear();
			case 'month':
				return month < date.getMonth();
			case 'day':
				return day < date.getDate();
			case 'hour':
				return hour < date.getHours();
			case 'minute':
				return minute < date.getMinutes();
			case 'second':
				return second < date.getSeconds();
			default:
				return false;
		}
	}

	isSameOrAfter(other: TDate, unit?: Unit) {
		return this.isSame(other, unit) || this.isAfter(other, unit);
	}

	isSameOrBefore(other: TDate, unit?: Unit) {
		return this.isSame(other, unit) || this.isBefore(other, unit);
	}

	isBetween(start: TDate, end: TDate, unit?: Unit) {
		return this.isAfter(start, unit) && this.isBefore(end, unit);
	}

	isLeapYear() {
		const year = this.parsedDate.getFullYear();

		return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}

	diff(other: TDate, unit?: Unit) {
		const { timestamp, year, month } = this;
		const date = this.parse(other);
		const diff = timestamp - date.getTime();

		if (!unit) {
			return diff;
		}

		switch (unit) {
			case 'year':
				return year - date.getFullYear();
			case 'month':
				return (year - date.getFullYear()) * 12 + month - date.getMonth();
			case 'day':
				return diff / DAY_IN_MILLISECONDS;
			case 'hour':
				return diff / HOUR_IN_MILLISECONDS;
			case 'minute':
				return diff / MINUTE_IN_MILLISECONDS;
			case 'second':
				return diff / SECOND_IN_MILLISECONDS;
			default:
				return 0;
		}
	}

	private instanceFactory(year = 1970, month = 0, day = 1, hour = 0, minute = 0, second = 0) {
		return new InTime(new Date(year, month, day, hour, minute, second));
	}

	startOf(unit: Unit) {
		const { year, month, day, hour, minute, second } = this;
		let newDate: number[];

		switch (unit) {
			case 'year':
				newDate = [year, 0, 1];
				break;
			case 'month':
				newDate = [year, month, 1];
				break;
			case 'day':
				newDate = [year, month, day];
				break;
			case 'hour':
				newDate = [year, month, day, hour];
				break;
			case 'minute':
				newDate = [year, month, day, hour, minute];
				break;
			case 'second':
				newDate = [year, month, day, hour, minute, second];
				break;
			default:
				return this;
		}

		return this.instanceFactory(...newDate);
	}

	endOf(unit: Unit) {
		const { year, month, day, hour, minute, second } = this;
		let newDate: number[];

		switch (unit) {
			case 'year':
				newDate = [year, 11, 31, 23, 59, 59];
				break;
			case 'month':
				newDate = [year, month + 1, 0, 23, 59, 59];
				break;
			case 'day':
				newDate = [year, month, day, 23, 59, 59];
				break;
			case 'hour':
				newDate = [year, month, day, hour, 59, 59];
				break;
			case 'minute':
				newDate = [year, month, day, hour, minute, 59];
				break;
			case 'second':
				newDate = [year, month, day, hour, minute, second];
				break;
			default:
				return this;
		}

		return this.instanceFactory(...newDate);
	}
}
