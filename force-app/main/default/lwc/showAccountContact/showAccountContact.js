import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement,wire } from 'lwc';
import Comrevo from '@salesforce/messageChannel/Comrevo__c';
import getAccountContact from '@salesforce/apex/AccountClass.getAccountContact';

export default class ShowAccountContact extends LightningElement {
    subscription =null;
    
    title = 'Contacts';
    contacts;
    hasContacts;

    
    @wire(MessageContext)
    messageContext;


    accountId;

    accountName;

    connectedCallback(){

        this.handleSubscribe();

    }

    disconnectedCallback(){
        this.handleUnsubscribe();

    }

    handleSubscribe(){
       if(!this.subscription){
       this.subscription = subscribe(this.messageContext, Comrevo , 
        
        (parameter) => {
           this.accountId= parameter.accountId;
            this.accountName= parameter.accountName;
            this.title = this.accountName+"'s Contacts";
            this.getContacts();
            
        });
       }
            }
       
           async getContacts(){

                this.contacts = await getAccountContact({accountId: this.accountId})
                this.hasContacts =this.contacts.length>0?true:false;
                   
            }


    handleUnsubscribe(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    
}