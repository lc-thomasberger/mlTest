define([
  'coreJS/adapt',
  'backbone',
  './languagePickerDrawerView'
], function(Adapt, Backbone, LanguagePickerDrawerView) {
  
  var LanguagePickerNavView = Backbone.View.extend({
    
    tagName: 'button',
    
    className: 'base icon languagepicker-icon',
    
    events: {
      'click': 'onClick'
    },
    
    initialize: function () {
      this.listenTo(Adapt, 'remove', this.remove);
      this.render();
    },
    
    render: function () {
      this.$el.html(this.model.get('_defaultLanguage'));
    },
    
    onClick: function (event) {
      Adapt.drawer.triggerCustomView(new LanguagePickerDrawerView({model: this.model}).$el, false);
    }
    
  });

  return LanguagePickerNavView;

});
