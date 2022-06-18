import createArticleRepository from '../../repository/article/createArticle.repository.js';
import sharedServicesRepository from '../../repository/shared.services.js';

class createArticleController {
    async createJob (req, res) {
        const {token} = req.params;
        const {job_name, job_description, job_text, salary, password} = req.body;
        const informationIP = await sharedServicesRepository.getIP ();

        await sharedServicesRepository.verifySessionHours();
        
        if (! informationIP)
        return res.status(500).json ({message: 'server error'});

        if (informationIP.proxy != false)
        return res.status(502).json({message: 'proxy detected'});

        const getUserInfo = await createArticleRepository.verifySessionAndUser(token);
        if (! getUserInfo)
        return res.status(400).json({message: 'session invalid'});

        if (! await createArticleRepository.verifyPermission(getUserInfo.email))
        return res.status(400).json({message: 'you already have this permission'});

        if (! await createArticleRepository.comparePassword(password, getUserInfo.password))
        return res.status(401).json({message: 'invalid password'});

        if (await createArticleRepository.createJob(getUserInfo.email, job_name, job_description, job_text, salary))
        return res.status(200).json({message: 'job created'});

        return res.status(500).json({message: 'error'});
    }
}

export default new createArticleController();