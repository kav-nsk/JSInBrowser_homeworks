// Для проверки отклика на события.
document.addEventListener('click', () => {
  console.log('CLICK');
});

const request = new XMLHttpRequest();
request.addEventListener('load', () => {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
});
request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.send();