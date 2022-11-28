
import express from 'express';
import controllers from '../controllers/signatureDish';

const router = express.Router();

router.get('/', controllers.getSignatureDish);
router.get('/:country', controllers.getSignatureDishByCountry);
router.post('/', controllers.addSignatureDish);
router.delete('/:country', controllers.deleteSignatureDish);
router.put('/:country', controllers.updateSignatureDish);


export default router;


