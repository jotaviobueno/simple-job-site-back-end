import express from 'express';
export const router = express.Router();

import multer from 'multer';
const upload = multer({dest: 'src/upload'});

//Controller
import registerController from '../http/controller/user/register.controller.js';
import loginController from '../http/controller/user/login.controller.js';
import permissionController from '../http/controller/user/permission.controller.js';
import createJobController from '../http/controller/article/createArticle.controller.js';
import findAllJobsController from '../http/controller/article/findAllJobs.controller.js';
import sendCvController from '../http/controller/article/Cv.controller.js';

//Request
import userRegisterRequest from '../request/user/userRegister.request.js';
import LoginRequest from '../request/user/login.request.js';
import givePermissionRequest from '../request/user/permission.request.js';
import createJobRequest from '../request/article/createArticle.request.js';
import findOneRequest from '../request/article/findOne.request.js';
import sendCvRequest from '../request/article/sendCv.request.js';

router.post('/register', userRegisterRequest.validateRegister, registerController.register);
router.post('/login', LoginRequest.validateLogin, loginController.login);
router.post('/give/permission/:token', givePermissionRequest.validatePermission, permissionController.permission);
router.post('/create/job/:token', createJobRequest.validateCreateJob, createJobController.createJob);
router.get('/job', findAllJobsController.findAll);
router.get('/job/:id',findOneRequest.validateFindOne, findAllJobsController.findOne);
router.post('/join/job/:token/:id', sendCvRequest.validateSendCv, upload.single('file'), sendCvController.sendToResume);