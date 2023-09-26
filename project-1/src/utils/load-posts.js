export const loadPosts = async () => {
    const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
    // const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
    const postsJson = await postResponse.json();
    const photosJson = await photosResponse.json();
    const postAndPhotos = postsJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url }
    });

    return postAndPhotos;
}