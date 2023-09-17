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