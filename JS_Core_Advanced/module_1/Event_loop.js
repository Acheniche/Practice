async function fetchData(url, time) {
    try {
        const start = Date.now();
        const response = await fetch(url);
        const end = Date.now();
        if (end - start > time) {
          console.log('Canceling');
          return null;
        }
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

fetchData('https://jsonplaceholder.typicode.com/posts/1', 100)
  .then((data) => console.log(data));