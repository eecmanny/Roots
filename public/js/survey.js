surveyFormHandler = async (event) => {
  event.preventDefault();

  let fullName = document.querySelector('#full-name').value.trim();
  let relative_to = document.querySelector('#relationship').value.trim();

  console.log(fullName, relative_to);

  if (fullName && relative_to) {
    const response = await fetch('/api/children', {
      method: 'POST',
      body: JSON.stringify({ fullName, relative_to }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/tree');
    } else {
      alert('Failed to create family tree');
    }
  }
};

document
.querySelector('.new-family-tree-form')
.addEventListener('submit', surveyFormHandler);

//query selectors

// const sequelize = require('../../config/connection');
// const withAuth = require('../../utils/auth');
// const router = require('express').Router();
// const { QueryTypes } = require('sequelize');

// const runQ  = async (router) => {
//     console.log(1);

//     router.get('/api/users/', withAuth, async (req, res) => {
//         console.log(res);
//         const users = await sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT });
//             console.log(3);
//         console.log(users)
//         console.log(router)
//         console.log(4);
//         });
//         console.log(5);
// }



// const runQ2  = async (router) => {
//     console.log(1);
// try {
//       router.get('/api/users/', withAuth, async (req, res) => {
//         console.log(res);
//         const users = await sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT });       
//         console.log(users)
//         console.log(3)})
//       } catch {
//         console.log(4);

//         console.log(router)

//         console.log(5);
//       }};




 
// runQ(router);



// runQ2();