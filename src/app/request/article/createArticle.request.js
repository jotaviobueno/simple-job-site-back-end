import yup from 'yup';

class createJob {
    async validateCreateJob (req, res, next) {
        req.headers;

        const schema1 = yup.object().shape({

            token: yup.object ('token is not defined')
            .required ("the token is required")
        });

        const schema2 = yup.object().shape({

            job_name: yup.string ('job_name is not defined')
            .required ("the job_name is required for registration the job"),

            job_description: yup.string ('job_description is not defined')
            .required ("the job_description is required for give permission"),

            job_text: yup.string ('job_text is not defined')
            .required ('the job_text is required'),
            
            salary: yup.string ('salary is not defined')
            .required ('the salary is required'),
            
            password: yup.string ('password is not defined')
            .required ('the password is required')

        });
    
        try {
            await schema1.validate(req.params);
            await schema2.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
}

export default new createJob();