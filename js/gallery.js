var onDisplay = 0;

// This can be done before the document is ready, because they are then reset
// and animated into place
placeMarkers(images);

$(document).ready(function() {
    $(".marker").click(function() {
        showDisplay(this.id);
    });

    $("#exitdisplay").click(function() {
        $("#display").fadeOut(250);
    });

});

/*
 * Position markers to correct coordinates
 */
function placeMarkers(images) {
    $.each(images, function(key, value) {
        $marker = $("#" + key);
        $marker.css({top: value.location[0], left: value.location[1]});
        $marker.children(".name").html(value.name)
    });
}

/*
 * Displays image by index with caption, and updates nav arrows
 */
function loadImage(image) {
    $("#slide").fadeOut(50, function() {
        $("#slide").css({"background-image": "url('" + image["url"] + "')"});
        $("#slidecaption").html(image["caption"]);
        $(this).fadeIn(200);
    });

}

/*
 * Loads gallery images and handles picture navigation
 */
function loadGallery(location, time) {
    var gallery = images[location]["times"][time];

    $("#slidetitle").html(images[location]["name"]);

    loadImage(gallery["images"][onDisplay]);

    // This off/on stuff deals with removing previous listeners created at each loadGallery call, and creating new ones
    $("#goleft").off("click").on("click", function() {
        // Force a positive index
        onDisplay = (onDisplay - 1 + gallery["images"].length) % gallery["images"].length;

        loadImage(gallery["images"][onDisplay]);
    });

    $("#goright").off("click").on("click", function() {
        onDisplay = (onDisplay + 1) % gallery["images"].length;

        loadImage(gallery["images"][onDisplay]);
    });
}

/*
 * Makes visible the slideshow window. Populates by default with the first gallery
 */
function showDisplay(location) {
    $("#display").fadeIn(250);
    $("#galleries").empty();

    // Dictionary of gallery times
    timesList = images[location]["times"];

    $.each(timesList, function(key, value) {
        var activeCss = "";
        if (key == "day") {
            loadGallery(location, key);
            activeCss = "galleryActive";
        }
        $("#galleries").append("<div class='gallery " + activeCss + "' " + 
            "data-id='" + key + "'>" +
            "<div class='gallerythumb' style='background-image: url(\"" +
            value.thumb + "\")'></div>" + "<div class='galleryname'>" +
            value.name + "</div></div>");
    });


    $(".gallery").click(function() {
        $(".gallery").removeClass("galleryActive");
        $(this).addClass("galleryActive");
        loadGallery(location, $(this).data("id"));
    }).hover(function () {
        $(this).children(".galleryname").addClass("selected");
    } ,function() {
        $(this).children(".galleryname").removeClass("selected");
    });


}