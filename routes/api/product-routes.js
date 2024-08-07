const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    // Find all products and include associated Category and Tag data
    const prodData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(prodData);
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: 'Internal server error!', error: err });
  }
});

// Get one product by id
router.get('/:id', async (req, res) => {
  try {
    // Find a product by its primary key and include associated Category and Tag data
    const prodData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    // Send 200 status with product data if found, otherwise send 404 status
    prodData
      ? res.status(200).json(prodData)
      : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    // Create a new product with the data provided in the request body
    const prodData = await Product.create(req.body);
    // If tagIds are provided, create associations in the ProductTag table
    if (req.body.tagIds?.length) {
      const productTagIdArr = req.body.tagIds.map(tag_id => ({
        product_id: prodData.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(prodData);
  } catch (err) {
    // Handle errors and send a 400 status
    res.status(400).json({ message: 'Creation failed', error: err });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });

    // Check if req.body.tagIds exists and has some length
    if (req.body.tagIds && req.body.tagIds.length > 0) {
      // Retrieve product tags and their IDs
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      // Filter new product tags and create new ones
      const newProductTags = req.body.tagIds
        .filter(tag_id => !productTagIds.includes(tag_id))
        .map(tag_id => ({
          product_id: req.params.id,
          tag_id,
        }));

      // Filter product tags to remove and delete them
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Respond with updated product
    const product = await Product.findByPk(req.params.id, { include: [{ model: Tag }] });
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
});

// Delete one product by id
router.delete('/:id', async (req, res) => {
  try {
    // Delete the product with the matching ID
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    // If the product is not found, send a 404 status, otherwise send 200 status
    deleted
      ? res.status(200).json({ message: 'Product deleted successfully' })
      : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: 'Product not deleted!', error: err });
  }
});

module.exports = router;
