import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

export const validateToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, SECRET);
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, error: error.message };
    }
};