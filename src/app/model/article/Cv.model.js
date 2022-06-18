import mongoose from 'mongoose';

const insertFile = mongoose.model('insertFile', {

    person_email: String,
    job_id: String,
    cv_id: String,
    cv_path_link: String,

    cv_settings: {
     fieldname: String,
     originalname: String,
     encoding: String,
     mimetype: String,
     destination: String,
     filename: String,
     size: String,
    },

    job_settings: {
     job_created_by: String,
     job_name: String,
     job_description: String,
     job_text: String,
     salary:String,
     created_in: String
    }

});

export default insertFile;
