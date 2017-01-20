Any advice is appreciated.

 

About a year ago I created a customization to Sugar 6.5 that added email types to the email field. (At the bottom I have what my customization looks like in Sugar 6.5)  At the time there was not a way to make it upgrade safe. 

 

I am in the process of upgrading our school (Johnson County Community College, Overland Park, KS) to Sugar 7 and I need to redo this customization. I have started the process, but I need help.

 

I have modified the email field to contain 2 additional buttons for business and personal.  I have created code that selects them based on two other fields when the record is loaded.  I need help changing the business_email_c and personal_email_c field when the new custom buttons are selected. That way when the record is saved, the changes are saved.

 

The following GitHub Repo has the customization I have done up to now. In additional to adding this code, one must also create a text field called business_email_c, school_email_c and personal_email_c in the Contact module and added them to the form.  (Although they are text fields now, my plan is to make them hidden in the future. That way they can be reported on using SugarCRM, but the user can’t touch them except using the custom email buttons.)

 

GitHub - ameliamcox/SugarCRM_7_Email_Type: Project to create School, Personal, and Business Email Types in SugarCRM Cont… 

 

Here is what I have done to this point.

1) Copied original code Contact record.js to custom and added additional code to (custom/modules/Contacts/client/base/view/record/record.js):

   a. Pull business_email_c, personal_email_c, and school_email_c from the model. (render)

   b. Loop through emails in email field and add additional variables that flag whether or not email is school_email, business_email, personal_email. (render)

  2) Copied email field to custom directory and made some changes code to Email field (custom/clients/base/fields/email/email.js)

      a. Added business_email, school_email, personal_email, and has_email_type to array used when calling editEmailFieldTemplate. (_buildEmailFieldHtml)

      b. I also added personal_email, school_email and business_email to _flag2Deco, if change may or may not be needed.

3) Copied and changed edit-email-field.hbs to include check to see if email types are needed and adds the buttons. (custom/clients/base/fields/email/edit-email-field.hbs

   Note: I don't have a button for School Email, because the scores of record is another application, so it can't be changed here.

4) Copied and changed detail.hbs to show icons if an email is of a certain type. (custom/clients/base/fields/email/detail.hbs)

5) Created additional email.js to be run by Contacts module that restricts only one business and personal address to be selected.  Note both custom/clients/base/fields/email/email.js and custom/modules/Contacts/clients/base/fields/email/email.js will run.

 

Customization in SugarCRM 7.

Note: When customization is complete I am planning on making business email, personal email and school email fields hidden on the form.  They are needed in the module, so that they can be used in reporting.

 

 

Customization in SugarCRM 6.5

 

   I have started the process by modifying the Handlebar template for:

 

      custom/clients/base/fields/email/edit-email-field.hbs

      (Note: I really only wanted it in Contacts, but it wouldn't allow me to override it at custom/modules/clients/base/email/edit-email-field.hbs)
