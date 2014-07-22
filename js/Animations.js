/**
 * Javascript that contains all animation functions used on the site. 
 * 
 * @author Naveen Chandran
 */





/**
 * On document load, drop markers
 */
$(window).load(function()
{
    dropMarkers();
});




/**
 * Function to drop markers onto the map on page load
 */
function dropMarkers()
{
	var markers = $(".marker");     //contains all marker objects
	var finalPositions_arr = [];
	
	$.each(markers, function()         //put markers on top to fall down
		{
		  finalPositions_arr.push($(this).css("top"));      //contains where the markers should fall
		  $(this).css("top" , "0");                         //the markers are all now at the top of the map
		  $(this).find(".name").css({"display" : "none"});  //get rid of marker labels until later
		});
		
		console.log("Final Positions" + finalPositions_arr);
		
	
	//actually animate markers to fall
	$.each(markers , function(i,value)
	{
	    var pos = finalPositions_arr[i];
	    drop($(this), pos);
	});
	
	$(".marker").find(".name").delay(200).fadeIn(3500);            //fade in marker labels
}

/**
 * Given a jQuery object marker, drop it down from the screen to its position
 * @param {Object} $marker  the jQuery object
 * @param {Object} pos      The final position to drop the object to
 */
function drop($marker, pos)
{
    var time = Math.random()*300;     //amount of delay before the marker should fall
    $marker
        .delay(time)
        .animate({top : pos} , Math.random()*500 + 100);
}


/**
 * Flashes the background and then fades back to original color
 * To be used once the markers are done falling
 */
function flashBackground(duration)
{
    var $body = $("body");
    
    var orig_bg_color = $body.css("background-color");
    var rgb_array = orig_bg_color.split("(")[1].split(")")[0].split(",");   //rgb array of values for background color
    var rgb_vals = [];
    
    //convert from string values to int values
    for (var color_string in rgb_array)
    {
        rgb_vals.push(parseInt(color_string));
    }
    
    //find rgb deltas
    var dr = 255 - rgb_vals[0] / duration;
    var dg = 255 - rgb_vals[1] / duration;
    var db = 255 - rgb_vals[2] / duration;
    
    //begin animating background to fade back to original color from white
    var red = 255;
    var green = 255;
    var blue = 255;
    $body.css({"background-color": "black"});
    
    while (red < rgb_vals[0])
    {
        red += dr;
        green -= dg;
        blue -= db;
        $body.css({"background:color": "rgb("+red+","+green+","+blue+")"});
    }
    
}
