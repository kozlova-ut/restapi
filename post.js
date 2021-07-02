(() => {

    async function getContent(link, number) {
        const response = await fetch(link + number);
        const data = await response.json();
        return data.data;
    };

    async function createPostPage(id, container){
        const post = await getContent(`https://gorest.co.in/public-api/posts/`, id);
        const comments = await getContent(`https://gorest.co.in/public-api/comments?post_id=`, id);
        const postTitle = document.createElement('h1');
        const postContent = document.createElement('p');
        const postComments = document.createElement('ul');
        postTitle.textContent = post.title;
        postContent.textContent = post.body;
        postComments.classList.add('list-group');

        comments.forEach(comment => {
            const commentItem = document.createElement('li');
            const commenterName = document.createElement('h5');
            const commentMessage = document.createElement('p');
            commenterName.textContent = comment.name;
            commentMessage.textContent = comment.body;
            commentItem.classList.add('list-group-item');
            commentItem.append(commenterName);
            commentItem.append(commentMessage);
            postComments.append(commentItem);
        });

        container.append(postTitle);
        container.append(postContent);
        container.append(postComments);
    };

    async function createApp() {
            const postPage = document.getElementById('post-page');

            const currenPostId = new URLSearchParams(window.location.search).get('id');

            createPostPage(currenPostId, postPage);
    };

    createApp();
})();
