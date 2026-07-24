import { body, param, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export const validateCart = [
    param('productId')
        .notEmpty().withMessage('Product ID is required.')
        .isMongoId().withMessage('Invalid product ID.'),
    param('variantId')
        .customSanitizer(value => value === 'undefined' ? undefined : value)
        .optional()
        .isMongoId().withMessage('Invalid variant ID.'),
    body('quantity')
        .optional()
        .isInt({ min: 1 }).withMessage('Quantity must be atleast 1.'),
    validateRequest
];