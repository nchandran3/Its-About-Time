var currentImage = 0;
var currentGallery = 0;
var currentLocation;

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

    $(this).keydown(function(e) {
        switch(e.which) {
            case 38:
                e.preventDefault();
                navigate("up");
                break;
            case 40:
                e.preventDefault();
                navigate("down");
                break;
            case 37:
                e.preventDefault();
                navigate("left");
                break;
            case 39:
                e.preventDefault();
                navigate("right");
                break;
        }
    });

    $("#goleft").click( function() {
        navigate("left");
    });

    $("#goright").click(function() {
        navigate("right");
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
function loadGallery(location, index) {
    var gallery = images[location]["times"][index];

    $("#slidetitle").html(images[location]["name"]);
    $(".gallery").removeClass("galleryActive");
    $(".gallery[data-id='" + index + "']").addClass("galleryActive");
        

    loadImage(gallery["images"][currentImage]);
}

/*
 * Makes visible the slideshow window. Populates by default with the first gallery
 */
function showDisplay(location) {
    $("#display").fadeIn(250);
    $("#galleries").empty();

    // List of gallery times
    timesList = images[location]["times"];

    currentGallery, currentImage = 0;
    currentLocation = location;

    $.each(timesList, function(i, value) {
        var activeCss = "";
        if (i == currentGallery) {
            loadGallery(location, i);
            activeCss = "galleryActive";
        }
        $("#galleries").append("<div class='gallery " + activeCss + "' " + 
            "data-id='" + i + "'>" +
            "<div class='gallerythumb' style='background-image: url(\"" +
            value.thumb + "\")'></div>" + "<div class='galleryname'>" +
            value.name + "</div></div>");
    });


    $(".gallery").click(function() {
        currentGallery = $(this).data("id");
        loadGallery(location, currentGallery);

    }).hover(function () {
        $(this).children(".galleryname").addClass("selected");
    } ,function() {
        $(this).children(".galleryname").removeClass("selected");
    });


}

function hideDisplay() {
    $("#display").fadeOut(250);
}

function navigate(dir) {
    var gallery = images[currentLocation]["times"][currentGallery];
    var galleriesSize = images[currentLocation]["times"].length;
    var imagesSize = gallery["images"].length;

    switch(dir) {
        case "up":
            currentGallery = (currentGallery - 1 + galleriesSize) % galleriesSize;
            loadGallery(currentLocation, currentGallery);
            break;
        case "down":
            currentGallery = (currentGallery + 1) % galleriesSize; 
            loadGallery(currentLocation, currentGallery);

            break;
        case "left":
            currentImage = (currentImage - 1 + imagesSize) % imagesSize;
            loadImage(gallery["images"][currentImage]);

            break;
        case "right":
            currentImage = (currentImage + 1) % imagesSize;
            loadImage(gallery["images"][currentImage]);

            break;
    }
}