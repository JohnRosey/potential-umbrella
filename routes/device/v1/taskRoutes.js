/**
 * taskRoutes.js
 * @description :: CRUD API routes for task
 */

const express = require('express');
const router = express.Router();
const taskController = require('../../../controller/device/v1/taskController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/task/create').post(auth(PLATFORM.DEVICE),checkRolePermission,taskController.addTask);
router.route('/device/api/v1/task/list').post(auth(PLATFORM.DEVICE),checkRolePermission,taskController.findAllTask);
router.route('/device/api/v1/task/count').post(auth(PLATFORM.DEVICE),checkRolePermission,taskController.getTaskCount);
router.route('/device/api/v1/task/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,taskController.getTask);
router.route('/device/api/v1/task/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,taskController.updateTask);    
router.route('/device/api/v1/task/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,taskController.partialUpdateTask);
router.route('/device/api/v1/task/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,taskController.softDeleteTask);
router.route('/device/api/v1/task/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,taskController.softDeleteManyTask);
router.route('/device/api/v1/task/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,taskController.bulkInsertTask);
router.route('/device/api/v1/task/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,taskController.bulkUpdateTask);
router.route('/device/api/v1/task/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,taskController.deleteTask);
router.route('/device/api/v1/task/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,taskController.deleteManyTask);

module.exports = router;
