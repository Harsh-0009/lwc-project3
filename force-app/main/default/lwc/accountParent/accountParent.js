import { LightningElement } from 'lwc';

export default class AccountParent extends LightningElement {

searchtextParent;

handleEvent(event){
    this.searchtextParent = event.detail;
}



}