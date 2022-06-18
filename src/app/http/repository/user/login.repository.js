import loginModel from '../../../model/user/login.model.js';
import registerModel from '../../../model/user/register.model.js';

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class loginRepository {
    constructor () {
        this.loginModel = loginModel;
        this.registerModel = registerModel;
    }
   
    async existUser (email) {
       
        if ( await this.registerModel.findOne({email: email, deleted_in: null}) === null )
        return false;

        return true;
    }

    async verifySession (email) {
        const lengthSession = await this.loginModel.find({ email: email });

        if (lengthSession.length >= 1)
        await this.loginModel.updateMany({email: email}, {disconnected_in: new Date().setHours( new Date().getHours()) });
    }

    async comparePassword (email, password) {
        const getHash = await this.registerModel.findOne({email: email, deleted_in: null});

        return await bcrypt.compare(password, getHash.password)
    } 
    
    async createNewSession (email, informationIP) {

        const sessionToken = uuidv4();

        await this.loginModel.create({

            email: email,
            session_token: sessionToken,
            login_efetued_in: new Date(),
            login_expires_in: new Date().setHours(new Date().getHours() + 6),
            disconnected_in: null,

            allSettingIP: {
                countryCode: informationIP.countryCode,
                region: informationIP.region,
                regionName: informationIP.regionName,
                city: informationIP.city,
                isp: informationIP.isp,
                org: informationIP.org,
                as: informationIP.as,
                asname: informationIP.asname,
                query: informationIP.query
            }
        });
        return sessionToken
    }
}

export default new loginRepository();