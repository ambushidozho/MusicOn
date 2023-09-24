

export class Header {
    #parent
    #config

    constructor(parent, config, loginBtn) {
        this.#parent = parent;
        this.#config = config;
    }

    get config() {
        return this.#config;
    }

    get items() {
        return Object.entries(this.config).map(([key, { href, name}]) => ({
            key,
            href,
            name,
        }));
    }


    render() {
        const template = Handlebars.templates['Header.hbs'];

        const items = this.items.map((element, index) => {
            let className = 'menu__item';
            return {...element, className};
        })

        this.#parent.innerHTML = template({items});

    }
}