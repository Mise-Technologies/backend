const dishLogic = require('../../logic/dishes');
const logger = require('../../utils/logger');

async function deleteDish(req, res) {
  const { dishId } = req.params;

  try {
    const dish = await dishLogic.getDishById(dishId);
    await dishLogic.deleteDish(dish);
    res.status(200).send({
      message: 'Dish deleted successfully',
    });
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: `An error occured while deleting dish with dishId=${dishId}`,
    });
  }
}

module.exports = deleteDish;
