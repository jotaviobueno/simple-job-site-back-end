import loginRepository from '../../repository/user/login.repository.js';
import sharedServicesRepository from '../../repository/shared.services.js';

class loginController {
    async login (req, res) {
        const {email, password} = req.body;
        const informationIP = await sharedServicesRepository.getIP ();

        await sharedServicesRepository.verifySessionHours()

        if (! informationIP)
        return res.status(502).json ({message: '?'});

        if (informationIP.proxy != false)
        return res.status(502).json({message: 'proxy detected'});

        if (! await loginRepository.existUser (email))
        return res.status(400).json({message: 'not found email'});

        await loginRepository.verifySession (email);

        if (! await loginRepository.comparePassword (email, password))
        return res.status(401).json({message: 'password is invalid'});

        const getToken = await loginRepository.createNewSession (email, informationIP);
        return res.status(200).json({message: 'login accomplished', token: getToken});
    }
}

export default new loginController();