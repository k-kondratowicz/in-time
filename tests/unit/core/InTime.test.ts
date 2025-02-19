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

	it('should compare dates correctly', () => {
		const date1 = new InTime('2025-02-19T12:34:56');
		const date2 = new InTime('2025-02-20T12:34:56');

		expect(date1.isSame(date2)).toBe(false);
		expect(date1.isSame(date2, 'year')).toBe(true);
		expect(date1.isSame(date2, 'month')).toBe(true);
		expect(date1.isSame(date2, 'day')).toBe(false);

		expect(date1.isAfter(date2)).toBe(false);
		expect(date1.isBefore(date2)).toBe(true);
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

		const days = date2.isLeapYear() ? 366 : 365;

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
