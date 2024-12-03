import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

function authMiddlewares(request, response, next) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: 'Token não validado' });
    }

    const token = authToken.split(' ')[1];

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return response.status(401).json({ error: 'Token não validado' });
        }

        request.userId = decoded.id;
        request.userName = decoded.name;
        return next();
    });
}

export default authMiddlewares;
