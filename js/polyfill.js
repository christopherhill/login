/* jQuery plugin
 * placeholder polyfill
 * IE9 does not support the placeholder attribute
 */

$(document).ready(function() {

  Window.ltie9 = Window.ltie9 || false;
  
  if (Window.ltie9) {

    // patch the jQuery val() method
    var originalValFn = $.fn.val;
    $.fn.val = function(value) {
      var originalValue = originalValFn.apply(this, arguments),
          placeholder   = this.eq(0).attr("placeholder");
      if (value === undefined && this.eq(0).hasClass("placeholder") && originalValue === placeholder) {
        return '';
      }
      return originalValue;
    };
    
    $('[placeholder]').focus(function() {
      console.log('here');
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();

  }

});