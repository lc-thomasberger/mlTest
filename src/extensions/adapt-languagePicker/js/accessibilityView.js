define([
    'coreJS/adapt'
], function(Adapt) {

    var AccessibilityView = Backbone.View.extend({

        el: '#accessibility-toggle',

        initialize: function() {
            this.setupHelpers();

            Adapt.offlineStorage.get();
            Adapt.config.get("_accessibility")._isActive = Adapt.offlineStorage.get("a11y") || false;
            
            this.configureAccessibility();
            this.setupUsageInstructions();

            this.render();
        },

        events: {
            'click' : 'toggleAccessibility'
        },

        render: function() {
            var hasAccessibility = Adapt.config.has('_accessibility')
                && Adapt.config.get('_accessibility')._isEnabled;

            if (!hasAccessibility) {
                return;
            } else {
                var isActive = Adapt.config.get('_accessibility')._isActive;
                var offLabel = this.model.get("_accessibility") && this.model.get("_accessibility")._accessibilityToggleTextOff;
                var onLabel = this.model.get("_accessibility") && this.model.get("_accessibility")._accessibilityToggleTextOn;

                var toggleText = isActive ? offLabel : onLabel;

                this.$el.html(toggleText);

                if (isActive) {
                    $("html").addClass('accessibility');
                    $("#accessibility-instructions").a11y_focus();
                } else {
                    $("html").removeClass('accessibility');
                }
            }
        },

        toggleAccessibility: function(event) {
            event.preventDefault();

            var hasAccessibility = Adapt.config.get('_accessibility')._isActive;

            var toggleAccessibility = (hasAccessibility) ? false : true;

            Adapt.config.get('_accessibility')._isActive = toggleAccessibility;

            Adapt.trigger('languagepicker:accessibility:toggle');

            this.configureAccessibility();
            this.setupUsageInstructions();

            this.render();           
            
            window.location.reload();
        },

        setupHelpers: function() {
            var config = Adapt.config.get("_accessibility");

            Handlebars.registerHelper('a11y_text', function(text) {
                //ALLOW ENABLE/DISABLE OF a11y_text HELPER
                if (config && config._isTextProcessorEnabled === false) {
                    return text;
                } else {
                    return $.a11y_text(text);
                }
            });
        },

        configureAccessibility: function() {

            var isActive = Adapt.config.get('_accessibility')._isActive;

            if (isActive) {
                if (!Modernizr.touch) {
                    //save accessibility state
                    Adapt.offlineStorage.set("a11y", Adapt.config.get("_accessibility")._isActive);
                }
            } else {
                Adapt.offlineStorage.set("a11y", Adapt.config.get("_accessibility")._isActive);
            }

            if (isActive) {

                _.extend($.a11y.options, {
                    isTabbableTextEnabled: true,
                    isUserInputControlEnabled: true,
                    isFocusControlEnabled: true,
                    isFocusLimited: true,
                    isRemoveNotAccessiblesEnabled: true,
                    isAriaLabelFixEnabled: true,
                    isFocusWrapEnabled: true,
                    isScrollDisableEnabled: true,
                    isScrollDisabledOnPopupEnabled: false,
                    isSelectedAlertsEnabled: true,
                    isAlertsEnabled: true
                });
            } else {
                _.extend($.a11y.options, {
                    isTabbableTextEnabled: false,
                    isUserInputControlEnabled: true,
                    isFocusControlEnabled: true,
                    isFocusLimited: false,
                    isRemoveNotAccessiblesEnabled: true,
                    isAriaLabelFixEnabled: true,
                    isFocusWrapEnabled: true,
                    isScrollDisableEnabled: true,
                    isScrollDisabledOnPopupEnabled: false,
                    isSelectedAlertsEnabled: false,
                    isAlertsEnabled: false
                });
            }

            $.a11y.ready();
        },

        setupUsageInstructions: function() {
            if (!this.model.get("_accessibility") || !this.model.get("_accessibility")._accessibilityInstructions) {
                $("#accessibility-instructions").remove();
                return;
            }

            var instructionsList =  this.model.get("_accessibility")._accessibilityInstructions;

            var usageInstructions;
            if (instructionsList[Adapt.device.browser]) {
                usageInstructions = instructionsList[Adapt.device.browser];
            } else if (Modernizr.touch) {
                usageInstructions = instructionsList.touch || "";
            } else {
                usageInstructions = instructionsList.notouch || "";
            }

           $("#accessibility-instructions").html( usageInstructions );
        }

    });

    return AccessibilityView;

});
