const deleteBlog = document.getElementById("delete");


deleteBlog.addEventListener('click', (e) => {
    console.log(deleteBlog.dataset.doc);

    fetch(`/blogs/${deleteBlog.dataset.doc}`, {
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
        console.log('error delete request');
    });;
});