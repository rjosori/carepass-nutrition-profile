(function($){

var Core = {
	ondomready: function(){
		// Core.function();
		
		$(".chooseImages a").click(function(e) {
			e.preventDefault();
			$(this).parent().find("a").toggleClass("active", false);
			$(this).toggleClass("active");
		});
	},
}

window.Core = Core;
$(document).ready(function(){Core.ondomready()});
})(jQuery);
