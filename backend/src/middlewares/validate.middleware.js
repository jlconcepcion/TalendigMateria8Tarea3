export const validateSchema = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    }));
    return res.status(400).json({
      error: 'Validation error',
      details,
    });
  }
  req.body = result.data;
  next();
};
