(() => {

    function createNavList(pageCount, currentPage) {
        const navList = document.createElement('ul');
        navList.classList.add('pagination');
        navList.style.justifyContent = 'center';

        for (let i=(Number(currentPage))-3; i<=(Number(currentPage))+3; i++) {
            if ((i>=1) & (i<=pageCount)) {
              const navItem = document.createElement('li');
              const navLink = document.createElement('a');
              navLink.classList.add('page-link');
              navItem.classList.add('page-item');
              navItem.style.flexBasis='42.25px';
              navLink.textContent = i;
              if (i===Number(currentPage)) {
                navItem.classList.add('active');
              }
              navItem.append(navLink);
              navList.append(navItem);
            }
        }

        const previousPage = document.createElement('li');
        const previousPageLink = document.createElement('a');
        previousPage.classList.add('page-link');
        previousPageLink.classList.add('page-item');
        previousPageLink.textContent = 'Предыдущая';
        previousPage.append(previousPageLink);

        if (currentPage > 1) {
          navList.prepend(previousPage);
        }

        const nextPage = document.createElement('li');
        const nextPageLink = document.createElement('a');
        nextPage.classList.add('page-link');
        nextPageLink.classList.add('page-item');
        nextPageLink.textContent = 'Следующая';
        nextPage.append(nextPageLink);

        if (currentPage <= pageCount-1) {
          navList.append(nextPage);
        }

        return navList;
    };

    async function getContent(link, number) {
        const response = await fetch(link + number);
        const data = await response.json();
        return data.data;
    };

    async function createBlogPage(page=1, container) {
        const posts = await getContent(`https://gorest.co.in/public-api/posts?page=`, page);
        const postsList = document.createElement('ul');
        postsList.classList.add('list-group');
        posts.forEach(post => {
            const postsListItem = document.createElement('li');
            const postTitle = document.createElement('a');
            postsListItem.classList.add('list-group-item');
            postsListItem.setAttribute('id', post.id);
            postTitle.textContent = post.title;
            postsListItem.append(postTitle);
            postsList.append(postsListItem);
        });
        container.append(postsList);

        postsList.childNodes.forEach(post => post.addEventListener('click', () => {
            window.location = `post.html?id=${post.id}`;
        }));
    };

    async function createApp() {
            const pageCount = (await (await fetch(`https://gorest.co.in/public-api/posts`)).json()).meta.pagination.pages;

            const homePage = document.getElementById('blog-home-page');
            const navSection = document.createElement('nav');
            const mainSection = document.createElement('div');

            let currentPage = new URLSearchParams(window.location.search).get('page');

            if (currentPage===null) {
                currentPage = 1;
            };

            const navList = createNavList(pageCount, currentPage);

            createBlogPage(currentPage, mainSection);

            navSection.append(navList);
            homePage.append(navSection);
            homePage.append(mainSection);

            navList.childNodes.forEach(i => i.addEventListener('click', async i => {
                i.preventDefault();
                let page;

                if (i.toElement.innerHTML === 'Следующая') {
                  page = Number(currentPage)+1;
                }

                else if (i.toElement.innerHTML === 'Предыдущая') {
                  page = Number(currentPage)-1;
                }

                else {
                  page = Number(i.toElement.innerHTML);
                }

                window.location.href = `index.html?page=${page}`;
            }));
    };

    createApp();
})();
