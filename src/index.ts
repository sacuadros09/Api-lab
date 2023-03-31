import "./components/index";
import {traer_api} from "./components/data"
import Card, { Attribute } from "./components/card/card"

class AppContainer extends HTMLElement {
    ValList: Card[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const dataVal = await traer_api();
        dataVal.forEach((data: any) => {
            console.log(data);
        });

        dataVal.forEach((data: any) => {
            const ValCard = this.ownerDocument.createElement("my-card") as Card;
                ValCard.setAttribute(Attribute.description, data.description);
                ValCard.setAttribute(Attribute.name, data.displayName);
                ValCard.setAttribute(Attribute.character, data.fullPortrait);
                this.ValList.push(ValCard);
        });
        this.render(this.ValList);
    }

    render(ValList:any) {
        const ValCards = this.ownerDocument.createElement("section")
        ValCards.className = "ValSection"
        this.ValList.forEach((ValCard) => {
            ValCards.appendChild(ValCard)
        });
        this.shadowRoot?.appendChild(ValCards);
    }
}

customElements.define("app-container", AppContainer);
