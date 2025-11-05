const {
	getAllPolices,
	getPoliceById,
	createPolice,
	updatePolice,
	deletePolice,
} = require('../controllers/polices.controller')
const router = require('express').Router()
router.get('/', getAllPolices)
router.get('/:id', getPoliceById)
router.post('/', createPolice)
router.patch('/:id', updatePolice)
router.delete('/:id', deletePolice)
module.exports = router
