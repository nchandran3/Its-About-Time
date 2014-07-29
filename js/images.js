var imagesJSON = '{\
   "raval" :\
   {\
        "name": "Rambla de Raval",\
        "location": [388,228],\
        "images" : [\
            {\
                "url": "images/raval1.jpg",\
                "time": 14\
            }          \
        ]\
    },\
    "fortpienc" : \
    {\
        "name": "Fort Pienc",\
        "location": [159,1092],\
        "images" : []\
    },\
    "placareial" :\
    {\
        "name": "Pla&ccedil;a Reial",\
        "location": [487,418],\
        "images" : []\
    },\
    "arc" :\
    {\
        "name": "Arc de Triomf",\
        "location": [287,900],\
        "images" : []\
    },\
    "macba" :\
    {\
        "name": "MACBA",\
        "location": [201,305],\
        "times" : {\
            "day" :\
            {\
                "name": "Day",\
                "thumb": "images/macbadaythumb.jpg",\
                "images" : [\
                    {\
                        "url": "images/macbaday1.jpg",\
                        "caption": "During the day at the MACBA"\
                    },\
                    {\
                        "url": "images/macbaday2.jpg",\
                        "caption": "During the day at the MACBA"\
                    }\
                ]\
            },\
            "evening" :\
            {\
                "name": "Evening",\
                "thumb": "images/macbaeveningthumb.jpg",\
                "images" : [\
                    {\
                        "url": "images/macba2.jpg",\
                        "caption": "This is a caption"\
                    }\
                ]\
            },\
            "night" :\
            {\
                "name": "Night",\
                "thumb": "images/macbanightthumb.jpg",\
                "images": [\
                    {\
                        "url": "images/macba3.jpg",\
                        "caption": "This is a caption"\
                    }\
                ]\
            }\
        }\
    }\
}';
var images = $.parseJSON(imagesJSON);
