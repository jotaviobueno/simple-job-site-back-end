import CvRepository from '../../repository/article/Cv.repository.js';
import sharedServicesRepository from '../../repository/shared.services.js';

class sendCvController {

    async sendToResume (req, res) {
        const file = req.file;
        const {token, id} = req.params;
        const informationIP = await sharedServicesRepository.getIP ();
        
        //validateSession
        const getUserInfo = await CvRepository.verifySessionAndUser(token);
        if (! getUserInfo)
        return res.status(400).json({message: 'session invalid'});

        await sharedServicesRepository.verifySessionHours();

        const findSession = await sharedServicesRepository.verifySessionV2(token);
        if (! findSession)
        return res.status(400).json({message: 'session invalid'});
        
        const getInfo = await CvRepository.getInformationFromTheJobCreator(id);
        if (findSession === getInfo)
        return res.status(400).json({message: 'you cannot apply for a job you have created'});
        //

        //verifyFile
        if (file === undefined || file === null)
        return res.status(400).json({message: 'file cv its undefined'});

        if (file.mimetype != 'application/pdf')
        return res.status(400).json({message: 'file type its invalid'});

        if (! await CvRepository.verifyCv(getUserInfo.email, file.path))
        return res.status(400).json({message: 'you already have a registered cv'});
        //

        //verifyProxyAndIP
        if (! informationIP)
        return res.status(500).json ({message: 'server error'});

        if (informationIP.proxy != false)
        return res.status(502).json({message: 'proxy detected'});
        //

        //insert
        await CvRepository.insertCv(getUserInfo, id, file)
        return res.status(200).json({message: 'resume done'});

    }
}

export default new sendCvController();