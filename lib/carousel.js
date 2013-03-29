var automatic = true; // Automatic sliding
var autoManual = false; //Both automatic and manual sliding
var wrapNextPrev = false; //Wrap slides at end to beginning 
var enableKeyboardArrows = true; //Use keyboard arrows to iterate 
var bannerInterval = 10000; //Time (ms) interval between slides 
var carouselDirection = "right"; //Direction of slides default movement

var iCurDisplayItemIndex = 0;
var r = 0;
var $leftControl = $(".hasCarousel .previous");
var $rightControl = $(".hasCarousel .next");

$(function() {
	iTotalBannerItems = $(".hasCarousel .slider").length;
	$('.hasCarousel .controls').empty();
	createControls(iTotalBannerItems);
	
	$(".hasCarousel .control").click(function () {
        rotateToItem($(".control").index($(this)), "next");
        clearInterval(r);
    	r = setInterval(rotateToNextItem, bannerInterval);
        if(autoManual == false)rotatePicks(false);
    });
    
    $rightControl.click(function(){
    	rightControl = $(this);
    	nextSlide();
    });
    
    $leftControl.click(function(){
    	leftControl = $(this);
    	previousSlide();
    });
    
    if(enableKeyboardArrows == true){
    	$(document).keydown(function (e) {
    		if(e.keyCode == 37){
    			console.log("left key");
    			previousSlide();
    		}
    		else if(e.keyCode == 39){
    			console.log("right key");
    			nextSlide();
    		}
    	});
    }
    
    rotatePicks(automatic);
});

function createControls(iTotalBannerItems){
	if(iTotalBannerItems){
		for (var index=1;index<=iTotalBannerItems;index=index+1){
		  var controlDiv;
		  if(index == 1){
			controlDiv = '<div class="control selected" id="control_' + index + '">O</div>';
		  }else{
			controlDiv = '<div class="control" id="control_' + index + '">O</div>';
		  }
		  $('.hasCarousel .controls').append(controlDiv);
		}
	}	
}

//Slide to next frame
function nextSlide(){
	console.log("WrapNextPrev = " + wrapNextPrev + " iCurDisplayItemIndex = " + iCurDisplayItemIndex);
	if(wrapNextPrev == false){
		if(iCurDisplayItemIndex != (iTotalBannerItems - 1))rotateToItem(getNextDisplayItemIndex(), "next");
		if(iCurDisplayItemIndex == (iTotalBannerItems - 1)) {$rightControl.hide('slide', {direction: "right"}, 700); console.log("Stop at last");}
	}
	else{
		rotateToItem(getNextDisplayItemIndex(), "next");
	}
	
    clearInterval(r);
    r = setInterval(rotateToNextItem, bannerInterval);
    if(autoManual == false)rotatePicks(false);
}

//Slide to previous frame
function previousSlide(){
	console.log("WrapNextPrev = " + wrapNextPrev + " iCurDisplayItemIndex = " + iCurDisplayItemIndex);
	if(wrapNextPrev == false){
		if(iCurDisplayItemIndex != 0)rotateToItem(getPreviousDisplayItemIndex(), "prev");
		if(iCurDisplayItemIndex == 0) {$leftControl.hide('slide', {direction: "left"}, 700); console.log("Stop at first");}
	}
	else{
		rotateToItem(getPreviousDisplayItemIndex(), "prev");
	}
	
    clearInterval(r);
    r = setInterval(rotateToNextItem, bannerInterval);
    if(autoManual == false)rotatePicks(false);
}

//Rotated top picks for a specific interval
function rotatePicks(automatic) {
   if (automatic == true) {
       r = setInterval(rotateToNextItem, bannerInterval);
    }
    else {
        if(r.length!=0){
            clearInterval(r);
         }
    }
}

function rotateToNextItem() {
    rotateToItem(getNextDisplayItemIndex(), "next");
}

function rotateToItem(iTemIndexToRotateTo, direction) {
	if(carouselDirection == "left") var oppDirection = "right";
	else var oppDirection = "left";
	
	if(direction == "prev") var slideDirection = oppDirection;
	else var slideDirection = carouselDirection;
	
    /*$(".hasCarousel .slider.selected").hide('slide', {direction: carouselDirection}, 700, function () {
        $(".hasCarousel .slider").eq(iTemIndexToRotateTo).show('slide', {direction: oppDirection}, 1000).addClass("selected");
    }).removeClass("selected");*/
    $currentSlide = $(".hasCarousel .slider.selected");
    $currentSlide.removeClass("overlay");
    $(".hasCarousel .slider").eq(iTemIndexToRotateTo).addClass("overlay").show('slide', {direction: slideDirection}, 1000, function() {
    	$currentSlide.hide().removeClass("selected");
    }).addClass("selected");
    
    
    $(".hasCarousel .control").removeClass("selected");
    $(".hasCarousel .control").eq(iTemIndexToRotateTo).fadeOut("slow", function(){
		$(this).addClass("selected").fadeIn();
	});
    $(".hasCarousel .stepControl").show();
    iCurDisplayItemIndex = iTemIndexToRotateTo;
    
    //Custom
    if(iCurDisplayItemIndex == 0){
    	$(".hasCarousel .stepControl.previous").addClass("gray");
    	$(".hasCarousel .stepControl.next").addClass("gray");
    }
    else{
    	$(".hasCarousel .stepControl.previous").removeClass("gray");
    	$(".hasCarousel .stepControl.next").removeClass("gray");
    }
}

function getNextDisplayItemIndex() {
    return iCurDisplayItemIndex = (iCurDisplayItemIndex + 1) % iTotalBannerItems;
}

function getPreviousDisplayItemIndex() {
     j = (iCurDisplayItemIndex - 1);
     if(j<0)return iTotalBannerItems - 1;
     return j;
}