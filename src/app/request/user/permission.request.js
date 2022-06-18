import yup from 'yup';

class givePermission {
    async validatePermission (req, res, next) {
        req.headers;

        const schema1 = yup.object().shape({

            token: yup.object ('token is not defined')
            .required ("the token is required")
        });

        const schema2 = yup.object().shape({

            cnpj: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .email ('send in email format'),

            company_name: yup.string ('company_name is not defined')
            .required ("the email is required for give permission"),

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

export default new givePermission();