const router = require('express').Router();
const { Children, User } = require('../../models');
const withAuth = require('../../utils/auth');
// const withAuth2 = require('../../utils/auth');

// router.get('/survey', withAuth, async (req, res) => {
//   try {
//     const newChildren = await Children.findAll({
//       where: {
//         id: req.session.user_id
//       },
//       include:[]

//       //   ...req.body,
//       //   user_id: req.session.user_id,
//     }
//     );

//     res.status(200).json(newChildren);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

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
  try {
    const newChildren = await Children.create({
      ...req.body,
      user_id: req.session.user_id,
    });

  //to be able to append family json file
    res.status(200).json(newChildren);
  if (res == 200) {
    readAndAppend(newChildren, '../../db/family/family.json');
    res.json(`grandchildData added successfully`);
  } else {
    res.error('Error in adding grandchildData');
  }

  } catch (err) {
    res.status(400).json(err);
  }
});

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const ChildrenData = await Children.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!ChildrenData) {
//       res.status(404).json({ message: 'No Children found with this id!' });
//       return;
//     }

//     res.status(200).json(ChildrenData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
