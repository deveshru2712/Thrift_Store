import { z } from "zod";

const authValidator = (schema) => async (req, res, next) => {
  try {
    //validating the req.body
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    next(error);
  }
};

export default authValidator;
