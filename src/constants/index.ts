import { Months, Weekdays } from '@/types';

export const ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;

export const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;

export const MINUTE_IN_MILLISECONDS = 1000 * 60;

export const SECOND_IN_MILLISECONDS = 1000;

export const MONTH_NAMES: Months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const MONTH_NAMES_SHORT: Months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export const WEEKDAYS: Weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const WEEKDAYS_SHORT: Weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
