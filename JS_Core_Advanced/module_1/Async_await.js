async function asyncRequest(firstUrl, secondUrl) {
    try {
        const data = await fetch(firstUrl).then((res) => res.json());
        const result = await fetch(secondUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((res) => res.json());
        return result;
    } catch (err) {
        console.error(err);
    }
}

asyncRequest('https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts').then((res) => console.log(res));