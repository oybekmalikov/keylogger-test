const {
	getAllClients,
	getClientById,
	createClient,
	updateClient,
	deleteClient,
} = require('../controllers/clients.controller')
const router = require('express').Router()
router.get('/', getAllClients)
router.get('/:id', getClientById)
router.post('/', createClient)
router.patch('/:id', updateClient)
router.delete('/:id', deleteClient)
module.exports = router
