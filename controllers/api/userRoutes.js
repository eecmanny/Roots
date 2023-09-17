const router = require('express').Router();
const { User , Children, GrandChildren } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    const currentUser = await User.findAll({
      where: {
        id: req.session.user_id
      },
      include:[Children , GrandChildren]
      //   ...req.body,
      //   user_id: req.session.user_id,
    }
    );

    res.status(200).json(currentUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);

    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/', async (req, res) => {
//   try {
//     // Create a new user
//     const userData = await User.create(req.body);

//     // If user data was successfully created
//     if (userData) {
//       // Save user information in the session
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       // Add user data to a JSON file
//       readAndAppend(userData, '../../db/family/family.json');

//       // Respond with a success message
//       res.status(200).json({ message: 'User and grandchildData added successfully', userData });
//     } else {
//       // Handle the case where user data creation failed
//       res.status(500).json({ error: 'Error in adding user and grandchildData' });
//     }
//   } catch (err) {
//     // Handle other errors
//     res.status(400).json({ error: err.message });
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });

    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/login', withAuth, async (req, res) => {
//   try {
//     const currentUser = await User.findOne({
//       where: {
//         id: req.session.user_id
//       },
//       include:[Children , GrandChildren]
//       //   ...req.body,
//       //   user_id: req.session.user_id,
//     }
//     );

//     res.status(200).json(currentUser);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


//http://localhost:3001/api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);

      // if (res.status == 200) {
      //   readAndAppend(userData, '../../db/family/family.json');
      //   res.json(`grandchildData added successfully`);
      // } else {
      //   res.error('Error in adding grandchildData');
      // }
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//This sign up works it not writing to the JSON file
// router.post('/signup', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);
//     if (userData) {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
//       readAndAppend(userData, '../../db/family/family.json');
//       return res.status(200).json(`Grandchild data added successfully`);
//     } else {
//       return res.status(400).json('Error in adding grandchild data');
//     }
//   } catch (err) {
//     return res.status(500).json('Internal server error');
//   }
// });

module.exports = router;
