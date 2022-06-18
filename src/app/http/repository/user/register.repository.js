import registerModel from '../../../model/user/register.model.js';

import bcrypt from 'bcrypt';

class registerUserRepository {
    constructor () {
        this.model = registerModel;
    }

    async existEmail (email) {

        if (await this.model.findOne({email: email, deleted_in: null}) === null)
        return true;

        return false;
    }

    async createUser (full_name, email, password, age, birth_date, cep, city, UF, ip) {
        await this.model.create ({

            full_name: full_name,
            email: email,
            password: await bcrypt.hash(password, 10),
            age: age,
            birth_date: birth_date,
            cep: cep,
            state: UF,
            City: city,
            //extras
            extra_permission: false,
            cnpj: null,
            company_name: null,  
            //settings
            created_in: new Date(),
            last_updated: null,
            deleted_in: null,
            andressIP: ip,
            
        });
    }
}

export default new registerUserRepository();