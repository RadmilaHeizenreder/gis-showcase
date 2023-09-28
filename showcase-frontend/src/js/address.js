import {Components} from "formiojs";

const AddressComponent = Components.components.address;

export class AddressField extends AddressComponent{
    constructor() {
        super()
        this.component.provider = 'nominatim'
        this.component.label = 'Anschrift'
    }
}