({
    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['HistoricalSummary']);
        this._super('initialize', [options]);

        // obtain ID value for current user
        var u_id = app.user.id;
    },


    render: function(options)
    {
        var business_email = this.model.attributes.business_email_c;
        var personal_email = this.model.attributes.personal_email_c;
        var school_email = this.model.attributes.school_email_c;

        _.each(this.model.attributes.email, function(email) {

                email.has_email_types = true;

                email.school_email = email.email_address === school_email ? true : false;
                email.business_email = email.email_address === business_email ? true : false;
                email.personal_email = email.email_address === personal_email ? true : false;
         });

        this._super('render', [options]);
    },

    _renderHtml: function(ctx, options){
        this._super('_renderHtml', [ctx, options]);
    }
})
