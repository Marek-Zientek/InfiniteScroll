class InfiniteScroll {
    constructor(container, loader) {
        this.container = container;
        this.page = 1;
        this.init();
        this.loader = loader;
        this.loading = false;
    }

    init() {
        window.onload = this.getData;
        if ( this.loading ) return;
        window.addEventListener('scroll', () => {
           if ( window.scrollY + window.innerHeight >= document.body.offsetHeight ) {
               this.setLoading(true);
               this.getData();
           }
        });
    }

    setLoading(flag) {
        if ( flag ) {
            this.loader.classList.remove("hidden");
        } else {
            this.loader.classList.add("hidden");
        }

        this.loading = flag;
    }

    getData = async () => {
        // Adres serwera
        const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=4`;

        try {
            const res = await fetch(apiUrl);
            const photosArray = await res.json();
            this.displayPosts(photosArray);
        } catch(err) {
            console.log(err);
        }
        this.setLoading(false);
        this.page++;
    }
    // wyświetalnie danych z serwera
    displayPosts = (posts) => {
        this.container.innerHTML += posts.map( post => {
            return `
                <div class="post">
                <h3>${this.capitalizeFirstLetter(post.title)}</h3>
                <p>${this.capitalizeFirstLetter(post.body)}</p>
                </div>
            `;
        } ).join("");
    }

    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// instancja klasy InfiniteScroll
const iScroll = new InfiniteScroll(
                                    document.querySelector(".container"),
                                    document.querySelector(".loader-box")
                                    );