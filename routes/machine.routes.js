const {
	getAllMachines,
	getMachineById,
	createMachine,
	updateMachine,
	deleteMachine,
} = require('../controllers/machines.controller')
const router = require('express').Router()
router.get('/', getAllMachines)
router.get('/:id', getMachineById)
router.post('/', createMachine)
router.patch('/:id', updateMachine)
router.delete('/:id', deleteMachine)
module.exports = router
