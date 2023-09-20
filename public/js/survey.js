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

