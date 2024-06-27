import { api, LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountClass.getAccounts';
import { MessageContext, publish } from 'lightning/messageService';
import Comrevo from '@salesforce/messageChannel/Comrevo__c';

export default class AccountChild2 extends LightningElement {
    @api searchTextChild2;
    @wire(MessageContext) messageContext;

    columns =[

   { 
       label: 'Id', fieldName: 'Id'
   },    
   {   
    label: 'Name',fieldName: 'Name'
   },
   {
    label: 'Actions', fieldName: 'Actions', type:'button',typeAttributes: 
     {
        label:'View Contacts',
        value:'view_contacts'
     }
   }

    ]

    row =[

        {Id:'23', Name:'Parag Jambhulkar'},
        {Id:'30', Name:'Mayur Jambhulkar'},
        {Id:'33', Name:'Yogesh Jambhulkar'},
        {Id:'40', Name:'Manish Jambhulkar'}
    ]
    

    currentId;
    currentName;
   handleRowAction(event){

    if(event.detail.action.value=='view_contacts'){

    this.currentId = event.detail.row.id;
    this.currentName=event.detail.row.Name;
    
    const payload=
    {  
        accountId: event.detail.row.Id,
        accountName: event.detail.row.Name


    };
           publish(this.messageContext, Comrevo , payload);

    }

   }
     @wire(getAccounts , {searchTextClass: '$searchTextChild2'}) accountRecords;


    
}