import cvModel from '../../model/article/Cv.model.js';
import articleModel from '../../model/article/article.model.js';
import loginModel from '../../model/user/login.model.js';
import registerModel from '../../model/user/register.model.js';

import axios from 'axios';

class sharedServicesRepository {
    constructor () {
        this.articleModel = articleModel;
        this.loginModel = loginModel;
        this.registerModel = registerModel;
        this.cvModel = cvModel;
        this.link = 'http://ip-api.com/json/?fields=21130783?fields=status,country,countryCode,region,regionName,city,isp,org,as,asname,proxy,hosting,query'
    }
    
    async getIP () {
        try {

            const consumption = await axios.get(this.link);

            if (consumption === null)
            return false;

            return consumption.data

        } catch (e) {

            return false;
        }
    }

    async verifySessionHours () {

        const findLength = await this.loginModel.find({}).select({
            _id: 0,
            __v: 0,
        email: 0,
        login_efetued_in: 0,
        login_expires_in: 0,
        disconnected_in: 0, 
        allSettingIP: {
            countryCode: 0,
            region: 0,
            regionName: 0,
            city: 0,
            isp: 0,
            org: 0,
            as: 0,
            asname: 0,
            query: 0,
        }});

        try {
            findLength.forEach( async (verifySession) => {
                const findSession = await this.loginModel.findOne({ session_token: verifySession.session_token });

                if ( new Date() >= findSession.login_expires_in )
                await this.loginModel.findOneAndUpdate({session_token: verifySession.session_token}, {disconnected_in: new Date()});

            }) 
        } catch (e) {

            return false;
        }
    }

    async verifySessionV2 (token) {
        const sessionFind = await this.loginModel.findOne({session_token: token, disconnected_in: null});

        if (sessionFind  === null)
        return false;

        return true, sessionFind.email;
    }
    //colocar abaixo do outro verify
        
}

export default new sharedServicesRepository();