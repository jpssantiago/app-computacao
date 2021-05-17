export default class Address {
    zip: string;
    street: string;
    number: number;
    otherInfo: string;

    public getFormattedAddress(): string {
        if (!this.street || !this.number || !this.zip) {
            return 'Endereço não informado.';
        }
        
        return `${this.street}, ${this.number}, ${this.zip}`;
    }
}