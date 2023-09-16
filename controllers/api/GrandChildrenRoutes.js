const router = require('express').Router();
const { GrandChildren, User, Children } = require('../../models');
const withAuth = require('../../utils/auth');
// const withAuth2 = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // we will try to find all grandchildren
    // be sure to include its associated children data
    const GrandChildrenData = await GrandChildren.findAll({
      //It filters GrandChildren records where the id column matches the user_id stored in the user's session. This is likely used to retrieve only the GrandChildren associated with the currently authenticated user.
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: Children,
        },
      ]

      //   ...req.body,
      //   user_id: req.session.user_id,
    }
    );

    res.status(200).json(GrandChildrenData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
    try {
    const singleGrandChildData = await GrandChildren.findByPk(req.params.id, {
      include: [
          {
              model: Children,
          },

      ],
  })
    res.status(200).json(singleGrandChildData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newGrandChildren = await GrandChildren.create({
      ...req.body,
      user_id: req.session.user_id,

      
      
    });

    res.status(200).json(newGrandChildren);
  if (res == 200) {
    readAndAppend(newGrandChildren, '../../db/family/family.json');
    res.json(`grandchildData added successfully`);
  } else {
    res.error('Error in adding grandchildData');
  }

  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
