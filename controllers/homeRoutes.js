const router = require('express').Router();
// const { geoClipRectangle } = require('d3');
const { Children, User } = require('../models/index');
const withAuth = require('../utils/auth');
// const withAuth2 = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // console.log(1);
    // Get all Childrens and JOIN with user data
    let ChildrenData = await Children.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    });
    // console.log(2);
    // Serialize data so the template can read it
    console.log(ChildrenData);
    ChildrenData = ChildrenData.map((Children) => Children.get({ plain: true }));
    // console.log(3);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      ChildrenData, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/Children/:id', async (req, res) => {
//   try {
//     const ChildrenData = await Children.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const Children = ChildrenData.get({ plain: true });

//     res.render('Children', {
//       ...Children,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// Use withAuth middleware to prevent access to route
router.get('/survey', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Children }],
    });

    const user = userData.get({ plain: true });

    res.render('survey', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/tree', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Children }],
    });

    const user = userData.get({ plain: true });

    res.render('tree', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('signup');
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/survey');
    return;
  }

  res.render('login');
});

module.exports = router;
