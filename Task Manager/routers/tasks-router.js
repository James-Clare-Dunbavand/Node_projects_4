

const express = require('express');
const router = express.Router();

const { getTasks, postNewTask, getTask, modifyTask, deleteTask } = require('../controlers/tasks-controlers.js');

router.get('/', getTasks);
router.post('/', postNewTask);
router.get('/:taskID', getTask);
router.patch('/:taskID', modifyTask);
router.delete('/:taskID', deleteTask);



module.exports = router;
