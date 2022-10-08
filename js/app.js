class InfiniteScroll {
    constructor() {
        this.init();
    }

    init() {
        window.onload = this.getData;
    }

    async getData() {
        // Adres serwera
        const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=4`;

        try {
            const res = await fetch(apiUrl);
            const photosArray = await res.json();
            console.log(photosArray);
        } catch(err) {
            console.log(err);
        }
    }
}

// instancja klasy InfiniteScroll
const iScroll = new InfiniteScroll();