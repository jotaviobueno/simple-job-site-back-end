import yup from 'yup';

class validateRegister {
    async validateRegister (req, res, next) {
        req.headers;

        const schema = yup.object().shape({

            full_name: yup.string ("name is not defined")
            .required ("the name is required for registration")
            .min (3,"the name cannot be less than 3")
            .max (30,"the name cannot be greater than 30"),

            email: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .email ('send in email format'),

            birth_date: yup.string ('birth date is not defined')
            .required ("the birth date is required for registration")
            .min (9,"the cpf cannot be less than 11")
            .max (11,"the cpf cannot be greater than 11"),

            password: yup.string ('password is not defined')
            .required ('the password is required for registration')
            .min (6,'the password cannot be less than 3')
            .max (35,'the password cannot be greater than 35'),

            age: yup.string ('age is not defined')
            .required ('the age is required for registration'),

            cep: yup.string ('cep is not defined')
            .required ('the cep is required for registration')
            .min (8,'the password cannot be less than 3')
            .max (8,'the password cannot be greater than 35'),
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

export default new validateRegister();