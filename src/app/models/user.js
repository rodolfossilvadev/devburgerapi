import { Sequelize, Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
    static init(sequelize) { 
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                try {
                    user.password_hash = await bcrypt.hash(user.password, 10);
                } catch (error) {
                    console.error('Erro ao gerar hash da senha:', error);
                    throw error; 
                }
            } else {
                console.warn('Senha não fornecida para o usuário:', user);
            }
        });

        return this;
    }

   
    async checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
