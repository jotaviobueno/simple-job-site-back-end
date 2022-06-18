import cvModel from '../../../model/article/Cv.model.js';
import articleModel from '../../../model/article/article.model.js';
import loginModel from '../../../model/user/login.model.js';
import registerModel from '../../../model/user/register.model.js';

import fs from 'fs';

class sendCvRepository {
    constructor () {
        this.articleModel = articleModel;
        this.loginModel = loginModel;
        this.registerModel = registerModel;
        this.cvModel = cvModel
    }

    async verifyCv (email, path) {
        const find = await this.cvModel.find({person_email: email});

        if (find.length >= 1) {

            fs.unlink(`${path}`, 
             function (err) {
                if (err) 
                return false;
                
             return false;
             
            });
            return false;
        }

        return true;
    }

    async getInformationFromTheJobCreator (id) {
        const idInfo = await  this.articleModel.findOne({_id: id, deleted_in: null})
        if (idInfo === null)
        return false;

        return true, idInfo.created_by;
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

    async insertCv (getUserInfo, id, file) {
        const findJob = await this.articleModel.findOne({_id: id, deleted_in: null});

        if (findJob === null)
        return false;

            await this.cvModel.create({
                person_email: getUserInfo.email,
                job_id: id,
                cv_id: file.filename,
                cv_path_link: file.path,
                
                cv_settings: {
                fieldname: file.fieldname,
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                destination: file.destination,
                filename: file.filename,
                size: file.size,
                },
                
                job_settings: {
                job_created_by: findJob.created_by,
                job_name: findJob.job_name,
                job_description: findJob.job_description,
                job_text: findJob.job_text,
                salary: findJob.salary,
                created_in: findJob.created_in
            }  
        });
        return true;
    }
}

export default new sendCvRepository();