import yup from 'yup';

class findJob {
    async validateFindOne (req, res, next) {
        req.headers;

        const schema1 = yup.object().shape({

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

export default new findJob();