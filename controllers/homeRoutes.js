const router = require('express').Router();
const { Children, User } = require('../models/index');
const withAuth = require('../utils/auth');
// const withAuth2 = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Childrens and JOIN with user data
    const ChildrenData = await Children.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const Children = ChildrenData.map((Children) => Children.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      Children, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/Children/:id', async (req, res) => {
  try {
    const ChildrenData = await Children.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const Children = ChildrenData.get({ plain: true });

    res.render('Children', {
      ...Children,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Children }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
