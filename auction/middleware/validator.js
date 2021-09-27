import pkg from "express-validator";
const { validationResult } = pkg;

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    console.log("validation error!!!", errors);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ message: errors.array()[0].msg });
};
