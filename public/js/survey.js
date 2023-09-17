// const surveyFormHandler = async (event) => {
//   event.preventDefault();

//   let FullName = document.querySelector('#full-name').value.trim();
//   let RelativedTo = document.querySelector('#relationship').value.trim();

//   console.log(FullName, RelativedTo);

//   if (FullName && RelativedTo) {
//     const response = await fetch('/api/Children', {
//       method: 'POST',
//       body: JSON.stringify({ FullName, RelativedTo }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/logout');
//     } else {
//       alert('Failed to create family tree');
//     }
//   }
// };

document
.querySelector('.new-family-tree-form')
.addEventListener('submit', console.log(4));

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