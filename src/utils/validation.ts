import z from 'zod';
import { LOCALES } from '../types';

export const MAXIMUM_FILE_UPLOAD_SIZE = 50_000_000

const fileRefinement = (files: File[], ctx: z.RefinementCtx) => {
  if (files.length > 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: 10,
      type: "array",
      inclusive: true,
      message: "You can add at most 10 course files. Please contact us at ccg@lboro.ac.uk if you need to upload additional files.",
    });
  }
  const isTooBigfile = files.find(file => file.size > MAXIMUM_FILE_UPLOAD_SIZE)
  if (isTooBigfile) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: MAXIMUM_FILE_UPLOAD_SIZE / 1_000_000,
      type: "number",
      inclusive: true,
      message: `Each file must be at most ${MAXIMUM_FILE_UPLOAD_SIZE / 1_000_000}MB in size, please contact us at ccg@lboro.ac.uk if you need to upload bigger files.`,
    });
  }
}

export const courseSchema = z.object({
  email: z.coerce.string().email({ message: "Please fill in a valid email." }),
  courseTitle: z.string().min(1, { message: "Please fill in a title for the course." }),
  courseAbstract: z.string().min(1, { message: "Please fill in an abstract for the course." }),
  courseFiles: z.array(
    z.instanceof(File))
    .superRefine(fileRefinement),
  locale: z.enum(LOCALES, { message: "A valid locale is needed." }),
  lectures: z.array(z.object({
    title: z.string().min(1, { message: "Please fill in a title for the lecture." }),
    abstract: z.string().min(1, { message: "Please fill in an abstract for the lecture." }),
    files: z.array(
      z.instanceof(File))
      .superRefine(fileRefinement),
  })).min(1, { message: "You must add at least one lecture per course." }).max(10, { message: "You can submit at most 10 lectures per course. Please contact us at ccg@lboro.ac.uk if you need to add additional lectures." })
});


export type FieldErrors = {
  email?: { _errors: string[] };
  courseTitle?: { _errors: string[] };
  courseAbstract?: { _errors: string[] };
  courseFiles?: { _errors: string[] };
  locale?: { _errors: string[] };
  lectures?: Record<number | string,
    {
      title?: { _errors: string[] },
      abstract?: { _errors: string[] },
      files?: { _errors: string[] }
    }
  > & { _errors: string[] };
}