import { InTime } from '@/core/InTime';

describe('InTime', () => {
	it('should parse date correctly from string', () => {
		const date = new InTime('2025-02-19T12:34:56');

		expect(date.year).toBe(2025);
		expect(date.month).toBe(1);
		expect(date.day).toBe(19);
		expect(date.hour).toBe(12);
		expect(date.minute).toBe(34);
		expect(date.second).toBe(56);
	});

	it('should parse date correctly from timestamp', () => {
		const timestamp = new Date('2025-02-19T12:34:56').getTime();
		const date = new InTime(timestamp);

		expect(date.year).toBe(2025);
		expect(date.month).toBe(1);
		expect(date.day).toBe(19);
		expect(date.hour).toBe(12);
		expect(date.minute).toBe(34);
		expect(date.second).toBe(56);
	});

	it('should parse date correctly from Date instance', () => {
		const dateInstance = new Date('2025-02-19T12:34:56');
		const date = new InTime(dateInstance);

		expect(date.year).toBe(2025);
		expect(date.month).toBe(1);
		expect(date.day).toBe(19);
		expect(date.hour).toBe(12);
		expect(date.minute).toBe(34);
		expect(date.second).toBe(56);
	});

	it('should parse date correctly from InTime instance', () => {
		const inTimeInstance = new InTime('2025-02-19T12:34:56');
		const date = new InTime(inTimeInstance);

		expect(date.year).toBe(2025);
		expect(date.month).toBe(1);
		expect(date.day).toBe(19);
		expect(date.hour).toBe(12);
		expect(date.minute).toBe(34);
		expect(date.second).toBe(56);
	});

	it('should format date correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');

		expect(date.format('YYYY-MM-DD HH:mm:ss')).toBe('2025-02-19 12:34:56');
		expect(date.format('YY-M-D H:m:s')).toBe('25-2-19 12:34:56');
		expect(date.format('MMMM DDDD')).toBe('February Wednesday');
		expect(date.format('MMM DDD')).toBe('Feb Wed');
	});

	it('should compare dates correctly with isSame', () => {
		const date1 = new InTime('2025-02-19T12:34:56');
		const date2 = new InTime('2025-02-19T12:34:56');
		const date3 = new InTime('2026-03-21T13:35:57');

		expect(date1.isSame(date2)).toBe(true);
		expect(date1.isSame(date2, 'year')).toBe(true);
		expect(date1.isSame(date2, 'month')).toBe(true);
		expect(date1.isSame(date2, 'day')).toBe(true);
		expect(date1.isSame(date2, 'hour')).toBe(true);
		expect(date1.isSame(date2, 'minute')).toBe(true);
		expect(date1.isSame(date2, 'second')).toBe(true);

		expect(date1.isSame(date3)).toBe(false);
		expect(date1.isSame(date3, 'year')).toBe(false);
		expect(date1.isSame(date3, 'month')).toBe(false);
		expect(date1.isSame(date3, 'day')).toBe(false);
		expect(date1.isSame(date3, 'hour')).toBe(false);
		expect(date1.isSame(date3, 'minute')).toBe(false);
		expect(date1.isSame(date3, 'second')).toBe(false);
	});

	it('should compare dates correctly with isBefore', () => {
		const date1 = new InTime('2025-02-19T12:34:56');
		const date2 = new InTime('2025-02-19T12:34:56');
		const date3 = new InTime('2026-03-21T13:35:57');

		expect(date1.isBefore(date2)).toBe(false);
		expect(date1.isBefore(date2, 'year')).toBe(false);
		expect(date1.isBefore(date2, 'month')).toBe(false);
		expect(date1.isBefore(date2, 'day')).toBe(false);
		expect(date1.isBefore(date2, 'hour')).toBe(false);
		expect(date1.isBefore(date2, 'minute')).toBe(false);
		expect(date1.isBefore(date2, 'second')).toBe(false);

		expect(date1.isBefore(date3)).toBe(true);
		expect(date1.isBefore(date3, 'year')).toBe(true);
		expect(date1.isBefore(date3, 'month')).toBe(true);
		expect(date1.isBefore(date3, 'day')).toBe(true);
		expect(date1.isBefore(date3, 'hour')).toBe(true);
		expect(date1.isBefore(date3, 'minute')).toBe(true);
		expect(date1.isBefore(date3, 'second')).toBe(true);
	});

	it('should compare dates correctly with isAfter', () => {
		const date1 = new InTime('2025-02-19T12:34:56');
		const date2 = new InTime('2025-02-20T12:34:56');

		expect(date1.isAfter(date2)).toBe(false);
		expect(date2.isAfter(date1)).toBe(true);
		expect(date1.isAfter(date2, 'year')).toBe(false);
	});

	it('should compare dates correctly with isSameOrAfter', () => {
		const date1 = new InTime('2025-02-19T12:34:56');
		const date2 = new InTime('2025-02-19T12:34:56');
		const date3 = new InTime('2025-02-20T12:34:56');

		expect(date1.isSameOrAfter(date2)).toBe(true);
		expect(date1.isSameOrAfter(date3)).toBe(false);
		expect(date3.isSameOrAfter(date1)).toBe(true);
	});

	it('should compare dates correctly with isSameOrBefore', () => {
		const date1 = new InTime('2025-02-19T12:34:56');
		const date2 = new InTime('2025-02-19T12:34:56');
		const date3 = new InTime('2025-02-20T12:34:56');

		expect(date1.isSameOrBefore(date2)).toBe(true);
		expect(date1.isSameOrBefore(date3)).toBe(true);
		expect(date3.isSameOrBefore(date1)).toBe(false);
	});

	it('should compare dates correctly with isBetween', () => {
		const date1 = new InTime('2025-02-19T12:34:56');
		const date2 = new InTime('2025-02-20T12:34:56');
		const date3 = new InTime('2025-02-21T12:34:56');

		expect(date2.isBetween(date1, date3)).toBe(true);
		expect(date1.isBetween(date2, date3)).toBe(false);
		expect(date3.isBetween(date1, date2)).toBe(false);
	});

	it('should check leap year correctly', () => {
		const leapYearDate = new InTime('2024-02-19T12:34:56');
		const nonLeapYearDate = new InTime('2025-02-19T12:34:56');

		expect(leapYearDate.isLeapYear).toBe(true);
		expect(nonLeapYearDate.isLeapYear).toBe(false);
	});

	it('should check validity of date correctly', () => {
		const validDate = new InTime('2025-02-19T12:34:56');

		expect(validDate.isValid).toBe(true);
		expect(() => new InTime('invalid-date')).toThrow(new Error('Invalid date'));
		expect(() => new InTime('19/13/2001')).toThrow(new Error('Invalid date'));
	});

	it('should add and subtract days correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');

		const addedDate = date.add(1, 'day');
		expect(addedDate.day).toBe(20);

		const subtractedDate = date.subtract(1, 'day');
		expect(subtractedDate.day).toBe(18);
	});

	it('should add and subtract months correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');

		const addedDate = date.add(1, 'month');
		expect(addedDate.month).toBe(2);

		const subtractedDate = date.subtract(1, 'month');
		expect(subtractedDate.month).toBe(0);
	});

	it('should add and subtract years correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');

		const addedDate = date.add(1, 'year');
		expect(addedDate.year).toBe(2026);

		const subtractedDate = date.subtract(1, 'year');
		expect(subtractedDate.year).toBe(2024);
	});

	it('should add and subtract minutes correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');

		const addedDate = date.add(1, 'minute');
		expect(addedDate.minute).toBe(35);

		const subtractedDate = date.subtract(1, 'minute');
		expect(subtractedDate.minute).toBe(33);
	});

	it('should add and subtract seconds correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');

		const addedDate = date.add(1, 'second');
		expect(addedDate.second).toBe(57);

		const subtractedDate = date.subtract(1, 'second');
		expect(subtractedDate.second).toBe(55);
	});

	it('should get start and end of units correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');

		const startOfYear = date.startOf('year');
		expect(startOfYear.format('YYYY-MM-DD HH:mm:ss')).toBe('2025-01-01 00:00:00');

		const endOfYear = date.endOf('year');
		expect(endOfYear.format('YYYY-MM-DD HH:mm:ss')).toBe('2025-12-31 23:59:59');

		const startOfMonth = date.startOf('month');
		expect(startOfMonth.format('YYYY-MM-DD HH:mm:ss')).toBe('2025-02-01 00:00:00');

		const endOfMonth = date.endOf('month');
		expect(endOfMonth.format('YYYY-MM-DD HH:mm:ss')).toBe('2025-02-28 23:59:59');
	});

	it('should calculate differences correctly', () => {
		const date1 = new InTime('2025-02-19T12:34:56');
		const date2 = new InTime('2024-02-19T12:34:56');

		const days = date2.isLeapYear ? 366 : 365;

		expect(date1.diff(date2, 'year')).toBe(1);
		expect(date1.diff(date2, 'month')).toBe(12);
		expect(date1.diff(date2, 'day')).toBe(days);
		expect(date1.diff(date2, 'hour')).toBe(days * 24);
		expect(date1.diff(date2, 'minute')).toBe(days * 24 * 60);
		expect(date1.diff(date2, 'second')).toBe(days * 24 * 60 * 60);
	});

	it('should convert to string correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');
		expect(date.toString()).toBe(new Date('2025-02-19T12:34:56').toString());
	});

	it('should convert to ISO string correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');
		expect(date.toISOString()).toBe(new Date('2025-02-19T12:34:56').toISOString());
	});

	it('should convert to JSON correctly', () => {
		const date = new InTime('2025-02-19T12:34:56');
		expect(date.toJSON()).toBe(new Date('2025-02-19T12:34:56').toJSON());
	});
});
