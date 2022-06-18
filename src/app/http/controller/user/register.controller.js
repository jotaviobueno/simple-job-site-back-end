import registerUserRepository from '../../repository/user/register.repository.js';
import sharedServicesRepository from '../../repository/shared.services.js';

class registerUserController {

    async register (req, res) {
        const { full_name, email, password, age, birth_date, cep } = req.body;
        const dateVerified = new Date(birth_date);
        const informationIP = await sharedServicesRepository.getIP ();

        if (! informationIP)
        return res.status(502).json({message: 'error'});

        if (informationIP.proxy != false)
        return res.status(502).json({message: 'proxy detected'});

        if (! await registerUserRepository.existEmail (email))
        return res.status(422).json({message: 'account exist'});

        await registerUserRepository.createUser (full_name, email, password, age, dateVerified, cep, informationIP.city,
            informationIP.regionName, informationIP.query);
        return res.status(201).json({message: 'account is created'});
    }
}

export default new registerUserController();