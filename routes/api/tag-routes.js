const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tagData = await Tag.findAll({ include: [{ model: Product }] });
    res.status(200).json(tagData);
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: 'Internal server error!', error: err });
  }
});

// Get one tag by id
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its primary key and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // Send 200 status with tag data if found, otherwise send 404 status
    tagData
      ? res.status(200).json(tagData)
      : res.status(404).json({ message: 'Tag not found' });
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: 'Internal server error!', error: err });
  }
});

// Create new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag with the data provided in the request body
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: 'Internal server error!', error: err });
  }
});

// Update tag
router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    // If no rows were updated, send a 404 status
    updated
      ? res.status(200).json({ message: 'Tag updated successfully' })
      : res.status(404).json({ message: 'Tag not found' });
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: 'Internal server error!', error: err });
  }
});

// Delete one tag by id
router.delete('/:id', async (req, res) => {
  try {
    // Delete the tag with the matching ID
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    // If the tag is not found, send a 404 status, otherwise send 200 status
    deleted
      ? res.status(200).json({ message: 'Tag deleted successfully' })
      : res.status(404).json({ message: 'Tag not found' });
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: 'Internal server error!', error: err });
  }
});

module.exports = router;
