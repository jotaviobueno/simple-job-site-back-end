import permissionRepository from '../../repository/user/permission.repository.js';
import sharedServicesRepository from '../../repository/shared.services.js';

class permissionController {

    async permission (req, res) {
        const { token } = req.params;
        const {cnpj, company_name, password} = req.body;
        const informationIP = await sharedServicesRepository.getIP ();

        if (! informationIP)
        return res.status(500).json ({message: 'server error'});

        if (informationIP.proxy != false)
        return res.status(502).json({message: 'proxy detected'});

        const getUserInfo = await permissionRepository.verifySessionAndUser(token);
        if (! getUserInfo)
        return res.status(400).json({message: 'session invalid'});

        if (! await permissionRepository.verifyPermission(getUserInfo.email))
        return res.status(400).json({message: 'you already have this permission'});

        if (! await permissionRepository.verifyCnpj(cnpj))
        return res.status(400).json({message: 'cnpj already registered'});

        if (! await permissionRepository.verifyCompanyName(company_name))
        return res.status(400).json({message: 'company name already registered'});

        if (! await permissionRepository.comparePassword(password, getUserInfo.password))
        return res.status(401).json({message: 'invalid password'});

        if (await permissionRepository.givePermission(getUserInfo, cnpj, company_name))
        return res.status(200).json({message: 'permission give'});

        return res.status(400).json({message: 'bad request'});
    }
}

export default new permissionController();