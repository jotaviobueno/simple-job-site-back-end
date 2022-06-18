import findAllJobsRepository from '../../repository/article/findAllJobs.repository.js';
import sharedServicesRepository from '../../repository/shared.services.js';

class findAllJobsController {

    async findAll (req, res) {
        const informationIP = await sharedServicesRepository.getIP ();

        if (! informationIP)
        return res.status(500).json ({message: 'server error'});

        if (informationIP.proxy != false)
        return res.status(502).json({message: 'proxy detected'});

        return res.status(200).json({message: await findAllJobsRepository.findAll()});
    }

    async findOne (req, res) {
        const {id} = req.params;

        const informationIP = await sharedServicesRepository.getIP ();

        if (! informationIP)
        return res.status(500).json ({message: 'server error'});

        if (informationIP.proxy != false)
        return res.status(502).json({message: 'proxy detected'});
        
        const verifyFind =  await findAllJobsRepository.findOne(id);
        if (! verifyFind)
        return res.status(400).json({message: "error"});

        return res.status(200).json({message: verifyFind});
    }
}

export default new findAllJobsController();