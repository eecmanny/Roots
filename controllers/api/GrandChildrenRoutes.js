const router = require('express').Router();
const { GrandChildren, User, Children } = require('../../models');
const withAuth = require('../../utils/auth');
// const withAuth2 = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const GrandChildrenData = await GrandChildren.findAll({
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: Children
          // model: [Children, User]
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

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newGrandChildren = await GrandChildren.create({
//       ...req.body,
//       user_id: req.session.user_id,

      
      
//     });

//     res.status(200).json(newGrandChildren);

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/', withAuth, async (req, res) => {
  // create a new child
      try {
      const newGrandChildata = await GrandChildren.create(req.body);
      res.status(200).json(newChildata);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;
