const router = require('express').Router();
const { Children } = require('../../models');
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

router.post('/', withAuth, async (req, res) => {
  try {
    const newChildren = await Children.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newChildren);
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
