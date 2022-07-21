import joi from "joi";
export const postTestSchema = joi.object({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().required(),
  teacherDisciplineId: joi.number().required(),
});
