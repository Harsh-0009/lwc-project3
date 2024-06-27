public with sharing class AccountClass {
    

@AuraEnabled(cacheable=true)
public static List<Account> getAccounts(String searchTextClass){
    try {
        if(String.isEmpty(searchTextClass)){

        return [Select id, Name from Account];

        }
        
        else{
            searchTextClass='%'+searchTextClass+'%';
            return [Select id, Name from Account where Name LIKE :searchTextClass];
        }
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}
 @AuraEnabled
 public static List<Contact> getAccountContact(String accountId){
    try {
        return [Select Id, Name FROM Contact WHERE accountId= :accountId];
    } 
    catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
 }
    
 

}