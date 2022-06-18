import yup from 'yup';

class validateLogin {
    async validateLogin (req, res, next) {
        req.headers;

        const schema = yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required for login")
            .email ('send in email format'),

            password: yup.string ('password is not defined')
            .required ('the password is required for login')

        });
    
        try {
            await schema.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
}

export default new validateLogin();