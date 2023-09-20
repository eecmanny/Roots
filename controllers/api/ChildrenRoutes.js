const router = require('express').Router();
const { Children, User } = require('../../models');
const withAuth = require('../../utils/auth');
// const withAuth2 = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    // we will try to find all grandchildren
    const newChildren = await Children.findAll({
      //It filters GrandChildren records where the id column matches the user_id stored in the user's session. This is likely used to retrieve only the GrandChildren associated with the currently authenticated user.
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: User,
        },
      ]

      //   ...req.body,
      //   user_id: req.session.user_id,
    }
    );

    res.status(200).json(newChildren);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
    const singleChildData = await Children.findByPk(req.params.id, {
      include: [
          {
              model: User,
          },

      ],
  })
    res.status(200).json(singleChildData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  // create a new child
      try {
      const newChildata = await Children.create(req.body);
      res.status(200).json(newChildata);
    } catch (err) {
      res.status(400).json(err);
    }
});


module.exports = router;
