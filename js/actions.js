jQuery(document).ready(function($) {
	var $selector = '.sleep-details-header a';
	//Hide details sections on load:
	hideDetails($selector);
	$($selector).attr('showing','false');
	//Shows/hides on click:
	$($selector).click(function(e){
		toggleDetails(this);
	});
});
//Function to show or hide (toggle) details section of sleep profile:
function toggleDetails(selector){
	$showing = $(selector).attr('showing');
	if ($showing == 'false'){
		showDetails(selector);
		$showing = 'true';
	}
	else {
		hideDetails(selector);
		$showing = 'false';
	}
}
//Hides details:
function hideDetails(selector){
	$(selector).parent('td').css('border-bottom', '1px solid #999999');
	$(selector).parent('td').parent('tr').siblings('tr').children('td.sleep-details-table').css('position', 'absolute');
	$(selector).css('background', 'url(img/details-arrow-hidden.png) center left no-repeat');
	$(selector).attr('showing', 'false');
}
//Show details:
function showDetails(selector){
	$(selector).parent('td').css('border-bottom', 'none');
	$(selector).parent('td').parent('tr').siblings('tr').children('td.sleep-details-table').css('position', 'static');
	$(selector).css('background', 'url(img/details-arrow.png) center left no-repeat');
	$(selector).attr('showing', 'true');
}
