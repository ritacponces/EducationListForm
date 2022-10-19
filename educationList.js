import { LightningElement, wire,track  } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Education__c.Name';
import BEGIN_FIELD from '@salesforce/schema/Education__c.Begin_Date__c';
import END_FIELD from '@salesforce/schema/Education__c.End_Date__c';
import FIELDOFSTUDIES_FIELD from '@salesforce/schema/Education__c.Field_of_studies__c';
import INSTITUTION_FIELD from '@salesforce/schema/Education__c.Institution__c';
import GRADES_FIELD from '@salesforce/schema/Education__c.Average_Grades__c';
import LEVEL_FIELD from '@salesforce/schema/Education__c.Education_level__c';

import RelatedEducation from '@salesforce/apex/RelatedEducation.RelatedEducation';

import {loadStyle} from 'lightning/platformResourceLoader';
import lwcDatatableStyle from '@salesforce/resourceUrl/lwcDatatableStyle'
const fields = [NAME_FIELD, BEGIN_FIELD, FIELDOFSTUDIES_FIELD, INSTITUTION_FIELD, LEVEL_FIELD, END_FIELD, GRADES_FIELD];
const columns = [
    { label: 'COURSE', fieldName: NAME_FIELD.fieldApiName, editable: true, },
    { label: 'BEGIN DATE', fieldName: BEGIN_FIELD.fieldApiName, editable: true },
    { label: 'END DATE', fieldName: END_FIELD.fieldApiName, editable: true },
    { label: 'FIELD OF STUDIES', fieldName: 'Education__c.Field_of_studies__r', editable: true },
    { label: 'INSTITUTION', fieldName: 'Education__c.Institution__r', editable: true },
    { label: 'AVERAGE GRADES', fieldName: GRADES_FIELD.fieldApiName, editable: true },
    { label: 'LEVEL', fieldName: LEVEL_FIELD.fieldApiName, editable: true },

  ];

export default class EducationList extends LightningElement {
    columns = columns;
    fields = fields;
    showFields = false;

    nameField = NAME_FIELD;
    beginDate = BEGIN_FIELD;
    fieldOfStudies = FIELDOFSTUDIES_FIELD;
    institution = INSTITUTION_FIELD;
    averageGrades = GRADES_FIELD;
    level = LEVEL_FIELD;
    endDate = END_FIELD;
    
    handleSuccess(event) {
        this.accountId = event.detail.id;
        this.isModalOpen = false;
    }

    /*connectedCallback() {
        const contacts = getContacts({ accountId: "0017Q00000TVb1AQAT" });
        this.contacts = contacts;
    }*/
    @track data
    @wire(RelatedEducation)
    wireddata({ error, data }){
        if (data) 
        {
           this.data =  data.map(
           record => Object.assign(
             { 'Education__c.Field_of_studies__r': record.Field_of_studies__r.Name, "Education__c.Institution__r": record.Institution__r.Name },
             record
             )
             );
          
         }
     else if (error) {
             this.error = error;
             this.data = undefined;
         }
     }
    
   
    toggleFields() {
        this.showFields = !this.showFields;
    }
    //Open and close pop-up
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

    renderedCallback(){ 
        if(this.isCssLoaded){
            return
        } 
 
        this.isCssLoaded = true
 
        loadStyle(this, lwcDatatableStyle).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.log(error)
        });
    }
}