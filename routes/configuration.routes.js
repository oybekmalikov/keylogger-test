const {
	getAllConfigurations,
	getConfigurationById,
	createConfiguration,
	updateConfiguration,
	deleteConfiguration,
} = require('../controllers/configurations.controller')
const router = require('express').Router()
router.get('/', getAllConfigurations)
router.get('/:id', getConfigurationById)
router.post('/', createConfiguration)
router.patch('/:id', updateConfiguration)
router.delete('/:id', deleteConfiguration)
module.exports = router
