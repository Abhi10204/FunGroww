const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();

  } catch (err) {
    const status = 422;

    // ✅ get actual Zod error
    const message = err.errors[0].message;

    const error = {
      status,
      message, // ✅ real message instead of hardcoded
    };

    console.log(error);

    next(error);
  }
};

module.exports = validate;