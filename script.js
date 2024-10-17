document
  .getElementById('dataForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;

    const data = {
      name: name,
      address: address,
      message: message,
    };

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('result').innerText = 'Data berhasil dikirim!';
        document.getElementById('dataForm').reset();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
