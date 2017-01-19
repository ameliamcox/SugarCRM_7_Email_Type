/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */
/**
 * @class View.Fields.Base.EmailField
 * @alias SUGAR.App.view.fields.BaseEmailField
 * @extends View.Fields.Base.BaseField
 */
({
    events: {
        'click  .btn-edit':        'toggleExistingAddressPropertyEmailTypes',
    },

    toggleExistingAddressPropertyEmailTypes: function(evt) {
        if (!evt) return;

        var $property = this.$(evt.currentTarget),
            property = $property.data('emailproperty'),
            $properties = this.$('[data-emailproperty='+property+']'),
            index = $properties.index($property);

        if (property === 'business_email' || property === 'personal_email' || property === 'school_email') {
            $properties.removeClass('active');
        }

        this._toggleExistingAddressPropertyInModel(index, property);
    },

    _toggleExistingAddressPropertyInModel: function(index, property) {

        var existingAddresses = app.utils.deepCopy(this.model.get(this.name));

        //If property is business_address or personal_address_, we want to make sure one and only one primary email is set
        //As a consequence we reset all the primary_address properties to 0 then we toggle property for this index.
        if (property === 'business_email' || property === 'personal_email') {
            existingAddresses[index][property] = false;
            _.each(existingAddresses, function(email, i) {
                if (email[property]) {
                    existingAddresses[i][property] = false;
                }
            });
        }

        // Toggle property for this email
        if (existingAddresses[index][property]) {
            existingAddresses[index][property] = false;
        } else {
            existingAddresses[index][property] = true;
        }

        this.model.set(this.name, existingAddresses);
    },
})
