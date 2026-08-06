import { body, param, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

const commonParamsValidator = [
    param('productId')
        .notEmpty().withMessage('Product ID is required.')
        .isMongoId().withMessage('Invalid product ID.'),
    param('variantId')
        .customSanitizer(value => value === 'undefined' ? undefined : value)
        .optional()
        .isMongoId().withMessage('Invalid variant ID.')
];

export const validateAddToCart = [
    ...commonParamsValidator,
    validateRequest
];

export const validateUpdateCart = [
    ...commonParamsValidator,
    body('action')
        .notEmpty().withMessage("action is required.")
        .isString().withMessage("action should be in string form.")
        .trim()
        .isIn(["inc", "dec"]).withMessage("action must be either 'inc' or 'dec'."),
    validateRequest
];