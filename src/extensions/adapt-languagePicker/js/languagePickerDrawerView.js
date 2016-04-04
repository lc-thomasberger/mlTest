define([
  'coreJS/adapt',
  'backbone'
], function(Adapt, Backbone) {
  
  var LanguagePickerDrawerView = Backbone.View.extend({
    
    events: {
      'click button': 'onButtonClick'
    },
    
    initialize: function () {
      this.listenTo(Adapt, 'remove', this.remove);
      this.listenTo(Adapt, 'languagepicker:changelanguage:yes', this.onDoChangeLanguage);
      this.listenTo(Adapt, 'languagepicker:changelanguage:no', this.onDontChangeLanguage);
      this.render();
    },
    
    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates[this.constructor.template];
      this.$el.html(template(data));
    },
    
    onButtonClick: function (event) {
      var newLanguge = $(event.target).attr('data-language');
      this.model.set('newLanguge', newLanguge);
      var data = this.model.getLanguageDetails(newLanguge);
      
      var promptObject = {
        title: data.warningTitle,
        body: data.warningMessage,
        _prompts:[
          {
            promptText: data._buttons.yes,
            _callbackEvent: "languagepicker:changelanguage:yes",
          },
          {
            promptText: data._buttons.no,
            _callbackEvent: "languagepicker:changelanguage:no"
          }
        ],
        _showIcon: true
      }

      Adapt.trigger('notify:prompt', promptObject);
      Adapt.trigger('drawer:closeDrawer');
    },
    
    onDoChangeLanguage: function () {
      // set default languge
      var newLanguge = this.model.get('newLanguge');
      this.model.setDefaultLanguage(newLanguge);
      // reset progress
      // this.model.resetCourseProgress();
      // reload course Data
      this.model.reloadCourseData();
      
      this.remove();
    },
    
    onDontChangeLanguage: function () {
      this.remove();
    }
    
  }, {
    template: 'languagePickerDrawerView'
  });

  return LanguagePickerDrawerView;

});
