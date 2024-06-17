function loadUrls(urls) {
    return Promise.all(urls.map((url) => fetch(url).then((response) => response.json())));
  }

const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2', 'https://jsonplaceholder.typicode.com/posts/3'];
loadUrls(urls).then((result) => {
  console.log(result);
});