class InfiniteScroll {
    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        window.onload = this.getData;
    }

    getData = async () => {
        // Adres serwera
        const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=4`;

        try {
            const res = await fetch(apiUrl);
            const photosArray = await res.json();
            this.displayPosts(photosArray);
        } catch(err) {
            console.log(err);
        }
    }
    // wyświetalnie danych z serwera
    displayPosts = (posts) => {
        this.container.innerHTML += posts.map( post => {
            return `
                <div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                </div>
            `;
        } ).join("");
    }
}

// instancja klasy InfiniteScroll
const iScroll = new InfiniteScroll(document.querySelector(".container"));