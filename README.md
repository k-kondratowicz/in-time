# InTime

The `InTime` class provides a comprehensive set of methods for date manipulation and formatting. It supports parsing dates from various formats, comparing dates, adding and subtracting time units, and more.

## Properties

- `date: Date` - The internal `Date` object.
- `day: number` - The day of the month.
- `weekDay: number` - The day of the week.
- `month: number` - The month (0-indexed).
- `year: number` - The year.
- `hour: number` - The hour.
- `minute: number` - The minute.
- `second: number` - The second.

## Constructor

### `constructor(givenDate?: TDate | InTime)`

Creates a new `InTime` instance.

- `givenDate` (optional): The date to initialize the instance with. It can be a string, number (timestamp), `Date` object, or another `InTime` instance.

## Getters

### `isValid: boolean`

Returns `true` if the date is valid, `false` otherwise.

### `timestamp: number`

Returns the timestamp of the date.

### `isLeapYear: boolean`

## Methods

Returns `true` if the year is a leap year, `false` otherwise.

### `format(format: string): string`

Formats the date according to the given format string.

- `format`: The format string. Supported tokens:
  - `YYYY`: Full year (e.g., 2025)
  - `YY`: Last two digits of the year (e.g., 25)
  - `MMMM`: Full month name (e.g., February)
  - `MMM`: Short month name (e.g., Feb)
  - `MM`: Month with leading zero (e.g., 02)
  - `M`: Month without leading zero (e.g., 2)
  - `DDDD`: Full weekday name (e.g., Wednesday)
  - `DDD`: Short weekday name (e.g., Wed)
  - `DD`: Day with leading zero (e.g., 19)
  - `D`: Day without leading zero (e.g., 19)
  - `HH`: Hour with leading zero (e.g., 12)
  - `H`: Hour without leading zero (e.g., 12)
  - `mm`: Minute with leading zero (e.g., 34)
  - `m`: Minute without leading zero (e.g., 34)
  - `ss`: Second with leading zero (e.g., 56)
  - `s`: Second without leading zero (e.g., 56)

### `clone(): InTime`

Returns a new `InTime` instance with the same date.

### `add(value: number, unit: Unit): InTime`

Adds the specified amount of time to the date.

- `value`: The amount of time to add.
- `unit`: The unit of time (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `subtract(value: number, unit: Unit): InTime`

Subtracts the specified amount of time from the date.

- `value`: The amount of time to subtract.
- `unit`: The unit of time (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `isSame(other: TDate | InTime, unit?: Unit): boolean`

Checks if the date is the same as another date.

- `other`: The date to compare with.
- `unit` (optional): The unit of time to compare (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `isAfter(other: TDate | InTime, unit?: Unit): boolean`

Checks if the date is after another date.

- `other`: The date to compare with.
- `unit` (optional): The unit of time to compare (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `isBefore(other: TDate | InTime, unit?: Unit): boolean`

Checks if the date is before another date.

- `other`: The date to compare with.
- `unit` (optional): The unit of time to compare (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `isSameOrAfter(other: TDate | InTime, unit?: Unit): boolean`

Checks if the date is the same as or after another date.

- `other`: The date to compare with.
- `unit` (optional): The unit of time to compare (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `isSameOrBefore(other: TDate | InTime, unit?: Unit): boolean`

Checks if the date is the same as or before another date.

- `other`: The date to compare with.
- `unit` (optional): The unit of time to compare (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `isBetween(start: TDate | InTime, end: TDate | InTime, unit?: Unit): boolean`

Checks if the date is between two other dates.

- `start`: The start date.
- `end`: The end date.
- `unit` (optional): The unit of time to compare (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `diff(other: TDate | InTime, unit?: Unit): number`

Calculates the difference between the date and another date.

- `other`: The date to compare with.
- `unit` (optional): The unit of time to calculate the difference (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `startOf(unit: Unit): InTime`

Returns a new `InTime` instance representing the start of the specified unit of time.

- `unit`: The unit of time (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `endOf(unit: Unit): InTime`

Returns a new `InTime` instance representing the end of the specified unit of time.

- `unit`: The unit of time (`year`, `month`, `day`, `hour`, `minute`, `second`).

### `toString(): string`

Returns the date as a string.

### `toISOString(): string`

Returns the date as an ISO string.

### `toJSON(): string`

Returns the date as a JSON string.

## Usage Examples

```typescript
import { InTime } from 'source';

// Creating an InTime instance
const date1 = new InTime('2025-02-19T12:34:56');
const date2 = new InTime(new Date());
const date3 = new InTime(Date.now());
const date4 = new InTime(date1);

// Formatting a date
console.log(date1.format('YYYY-MM-DD HH:mm:ss')); // Output: 2025-02-19 12:34:56

// Adding and subtracting time
const addedDate = date1.add(1, 'day');
const subtractedDate = date1.subtract(1, 'month');

// Comparing dates
console.log(date1.isSame(date2)); // Output: false
console.log(date1.isAfter(date2)); // Output: false
console.log(date1.isBefore(date2)); // Output: true

// Checking leap year
console.log(date1.isLeapYear); // Output: false

// Calculating differences
console.log(date1.diff(date2, 'day')); // Output: difference in days

// Getting start and end of units
const startOfYear = date1.startOf('year');
const endOfMonth = date1.endOf('month');

// Converting to string, ISO string, and JSON
console.log(date1.toString());
console.log(date1.toISOString());
console.log(date1.toJSON());
```