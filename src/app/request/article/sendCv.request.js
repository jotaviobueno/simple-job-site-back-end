import yup from 'yup';

class createJob {
    async validateSendCv (req, res, next) {
        req.headers;

        const schema1 = yup.object().shape({

            token: yup.object ('token is not defined')
            .required ("the token is required"),

            id: yup.object ('id is not defined')
            .required ("the id is required")
        });
    
        try {
            await schema1.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
}

export default new createJob();