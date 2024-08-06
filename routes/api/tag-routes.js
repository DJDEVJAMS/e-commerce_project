const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags

  // be sure to include its associated Product data  --> Update Block
  try {
    const tagData = await Tag.findAll({ include: [{ model: Product }],
  });
    if (!tagData) {
      res.status(404).json({ message: 'No Tags with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' });
  }
});

router.get('/tags/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data --> UPdate Block
  try {
    const tagData = Tag.findByPk(req.params.id);
    if (!tagData) {
      res.status(404).json({ message: 'No Tags with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    if (!tagData) {
      res.status(404).json({ message: 'No Tags with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' });
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No Tags with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value ->> Needs updating
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tags with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' });
  }
});

module.exports = router;
