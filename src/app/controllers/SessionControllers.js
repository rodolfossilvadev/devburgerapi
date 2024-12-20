import * as Yup from 'yup';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class SessionController {
    async store(request, response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: 'Validation fails', messages: err.errors });
        }

        const { email, password } = request.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return response.status(401).json({ error: 'Os dados estão incorretos' });
        }

        const isSamePassword = await user.checkPassword(password);
        if (!isSamePassword) {
            return response.status(401).json({ error: 'Os dados estão incorretos' });
        }

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: jwt.sign(
                { id: user.id, name: user.name },
                authConfig.secret,
                { expiresIn: authConfig.expiresIn }
            ),
        });
    }
}

export default new SessionController();
