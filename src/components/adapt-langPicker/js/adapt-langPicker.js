define([
  'coreJS/adapt',
  'coreViews/componentView',
  '../../../extensions/adapt-languagePicker/js/languagePickerModel'
], function(Adapt, ComponentView, LanguagePickerModel) {

    var LangPicker = ComponentView.extend({

        events: {
          "click .languagepicker-language": "onLanguageClick"
        },

        onLanguageClick: function (event) {
          var userLanguage = $(event.target).val();
          this.model.setDefaultLanguage(userLanguage);
          this.model.reloadCourseData();
        },

        preRender: function() {
            // Checks to see if the text should be reset on revisit
            this.checkIfResetOnRevisit();
            this.model = _.extend(this.model, LanguagePickerModel.prototype);
        },

        postRender: function() {
            this.setReadyStatus();
        },

        // Used to check if the text should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        }

    });

    Adapt.register('langPicker', LangPicker);

    return LangPicker;

});
