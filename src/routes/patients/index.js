const Patient = require('../../controllers/patient');
const router = require('express').Router();

router.get('/:id?', Patient.find);
router.post('/', Patient.create);
router.patch('/:id(\\d+)', Patient.update);
router.delete('/:id(\\d+)', Patient.destroy);

module.exports = router;
