const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
  const catData = await Category.findAll({ include: [{ model: Product}]});
  res.status(200).json(catData);
} catch (err) {
    res.status(500).json({ message: 'categories not found'});
}
  });






router.get('/:id', async (req, res) => {
  try{
  // find one category by its `id` value
  const catData =  await Category.findByPk(req.params.id, {include: [{ model: Product}]});
  // be sure to include its associated Products
 
  if (!catData) { res.status(404).json({ message: "Catagory doest't exist"}); 
  return;
}
res.status(200).json(catData);
}
  catch (err) {
    res.status(500).json({ message: "Internal Server Error"});
  }

  });



// Create new category
router.post ('/', async (req, res) => {
  try{
const catData = await Category.create(req.body);
res.status(200).json(catData);
} catch (err) {
  res.status(400).json(err);
}}
);

router.put ('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const newCatData = await Category.create(req.body);
    res.status(200).json(newCatData);
  } catch (err) {
    res.status(400).json({ message: 'Category creation failed'});
  
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
    try{
    const catData = await Category.destroy({ where: { id: req.params.id}});
  
  !catData
  ? res.status(404).json({message: "Category not found"})
  : res.statu(200).json(catData);
  } catch (err) {
    res.status(505).json({message: "Category not deleted.", error: err });
  }
  });

module.exports = router;
