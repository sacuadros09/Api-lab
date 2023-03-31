import styles from "./card.css"
export enum Attribute {
    "name" = "name",
    "description" = "description",
    "character" = "character",

}

class Card extends HTMLElement {
    name?: string;
    description?: string;
    character?: string;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            description: null,
            name: null,
            character:null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {

                default:
                this[propName] = newValue;
                break;
            }

            this.render();
        }

        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``

                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);

                this.shadowRoot.innerHTML += `
                <section class = "card">
                <h1>Name: ${this.name}</h1>
                <p>Description: ${this.description}</p>
                <img src="${this.character}"> 
                </section>
                `;
            }
        }
    }

customElements.define("my-card", Card);
export default Card;
