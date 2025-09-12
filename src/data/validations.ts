import { z } from "zod";

const nonEmptyString = z.string().min(1, "Cannot be empty");
const positiveNumber = z.number().positive();
const nonNegativeNumber = z.number().nonnegative();
const optionalNumber = z.number().optional().nullable()
const optionalString = z.string().optional().nullable()
const optionalBoolean = z.boolean().optional().nullable()
const optionalId = z.string().uuid().or(z.literal("")).optional().nullable()
// const dateString = z.string().datetime().or(z.literal("")).optional().nullable();
// const dateString = z.date().or(z.literal("")).optional().nullable();
const dateString = z
  .union([
    z.date(),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date string format, expected YYYY-MM-DD'),
    z.literal(''),
    z.null(),
  ])
  .optional()
  .transform((val) => {
    if (typeof val === 'string' && val !== '') {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date;
    }
    return val; // Returns Date, "", null, or undefined as-is
  })

const VALIDATION = {
  OPTIONAL_BOOLEAN: optionalBoolean,
  OPTIONAL_STRING: optionalString,
  OPTIONAL_NUMBER: optionalNumber,
  POSITIVE_NUMBER: positiveNumber,
  NON_EMPTY_STRING: nonEmptyString,
  NON_NEGATIVE_NUMBER: nonNegativeNumber,
  OPTIONAL_DATE: dateString,
  OPTIONAL_UUID: optionalId

}

export default VALIDATION