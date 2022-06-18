import loginModel from '../../../model/user/login.model.js';
import registerModel from '../../../model/user/register.model.js';

import bcrypt from 'bcrypt';

class permissionRepository {
    constructor () {
        this.loginModel = loginModel;
        this.registerModel = registerModel;
    }

    async verifySessionAndUser (token) {
        const find = await this.loginModel.findOne({session_token: token, disconnected_in: null});

        if (find === null)
        return false;

        const findUser = await this.registerModel.findOne({email: find.email, deleted_in: null});

        if (findUser === null)
        return false;

        return true, findUser;
    }

    async verifyPermission (email) {
        const find =  await this.registerModel.findOne({email: email, deleted_in: null})
        if (find.extra_permission === true)
        return false;

        return true;
    }

    async verifyCnpj (cnpj) {
        if (await this.registerModel.findOne({cnpj: cnpj, deleted_in: null}) === null)
        return true;

        return false;
    }

    async verifyCompanyName (company_name) {
        if (await this.registerModel.findOne({company_name: company_name, deleted_in: null}) === null)
        return true;

        return false;
    }

    async comparePassword (password, hash) {
        return await bcrypt.compare(password, hash);
    }
    
    async givePermission (userInfo, cnpj, company_name) {
        try {
            await this.registerModel.findOneAndUpdate({email: userInfo.email, deleted_in: null}, 
                {extra_permission: true, cnpj: cnpj, company_name: company_name});
                return true;
        } catch (e) {
            return false;
        }
        
    }
}

export default new permissionRepository();