import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized, login again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
         if (!req.body) req.body = {};
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid token or Error" });
    }
};

export default authMiddleware;
