public with sharing class RelatedEducation {
    @AuraEnabled(cacheable=true)
    public static List<Education__c> RelatedEducation(){
    return [Select Name, Average_Grades__c, Begin_Date__c, End_Date__c, Field_of_studies__r.Name, Institution__r.Name, Education_level__c from Education__c];
    }  
}
