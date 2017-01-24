Please assist in create customized email types

Any advice is appreciated.

I am in the process of upgrading our school (Johnson County Community College, Overland Park, KS) to Sugar 7 and I need to redo this customization that I created in the past, but was not upgrade safe. 
I have started the process, but I need help.

I have modified the email field in the Contact Module:
	<UL>
	<LI>added 2 additional buttons for business and personal in edit mode (edit-email-field.hbs)</LI>
	<LI>added 3 possiable labels school, business and personal in detail mode (detail.hbs)</LI>
	<LI>added code to only let one business and one personal button to be selected, like the primary email address button (select_one_email_type.js)</LI>
	<LI>buttons(edit view) and labels(detail view) are selected when page is rendered base off of two text field also on the form containing the emails  school_email_c, business_email_c and personal_email_c field (Note: school email button is missing from edit view, because it on our system the source of record is an other application)</LI>
	<LI>made changes to javascript to allow function that calls the handlebar edit-email-field.hbs to include business_email, personal_email, school_email, and has_email_types</LI>
	</UL>
I have copied from original and customized the record view render function to:
	<UL>
	<LI> pull this.model.attributes.business_email_c, this.model.attributes.personal_email_c, this.model.attributes.school_email_c</LI>
	<LI> for each email array in this.model.attributes.email</LI>
	<UL>
		<LI> creates and sets email.has_email_types to TRUE</LI>
		<LI> creates and sets email.school_email based on whether email.email_address === school_email (value of business_email_c text field)</LI>
		<LI> creates and sets email.business_email based on whether email.email_address === business_email (value of personal_email_c text field)</LI>
		<LI> creates and sets email.personal_email based on whether email.email_address === personal_email (value of school_email_c text field)</LI>
	</UL>
