<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
    <meta name="author" content="DesignForLife"/>
    <meta name="description" content="we are youth Socio-entrepreneurship movement started by a dynamic group of serial entrepreneurs"/>
    <title>GenY Awakening India</title>
    <link rel="stylesheet" type="text/css" href="assets/css/style.css"/>
    <!--[if lte IE 8]>
    <link rel="stylesheet" type="text/css" href="assets/css/ie8.css"/>
    <![endif]-->
</head>
<body>
<!-- container full -->
<div class="container_full">
<!-- header -->
<div id="header_wrapper" class="clearfix withSlider">
    <!-- menu -->
    <div id="header">
        <!-- logo -->
        <div id="logo"><a href="index.php"><img src="assets/images/logo.png" alt="logo"/></a></div>
        <ul id="mainmenu">
            <li><a href="index.php">Home</a></li>
            <li>
                <a href="vision.php">Vision</a>
            </li>
            <li>
                <a href="mission.php">Mission</a>
            </li>
            <li>
                <a href="training.php">Training</a>
                <ul>
                    <li><a href="training.php#ecell">Ecell</a></li>
                </ul>
            </li>
            <li>
                <a href="inspiration.php">Inspiration inside</a>
            </li>
            <li><a href="contact.php" class="active">Contact</a></li>
        </ul>
        <!-- search bar end -->
    </div>
    <!-- menu end -->
    <!-- google map -->
    <div id="map_canvas"></div>
    <!-- google map end -->
</div>
<!-- header end -->
<div class="clearfix"></div>
<!-- header text -->
<div class="header_text">
    <div class="container_12">
        <div class="grid_12">
            <h1>CONTACT US</h1>
        </div>
    </div>
</div>
<!-- header text end -->
<!-- container 12 -->
<div class="container_12">
    <!-- container with sidebar -->
    <div class="content right grid_9">
        <div class="divider_page"><h4>Get In Touch With Us!</h4></div>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look even slightly believable. If you are
            going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
            middle of text.</p>

        <div class="contact_form">
            <form action="contact.php" method="post" name="messageform">
                <div class="grid_3 alpha">
                    <input name="namesurname" type="text" value="Name:" class="input-text"/>
                </div>
                <div class="grid_3 lambda">
                    <input name="email" type="text" value="E-Mail:" class="input-text"/>
                </div>
                <div class="grid_3 omega">
                    <input name="subject" type="text" value="Subject:" class="input-text"/>
                </div>
                <div class="grid_9 alpha omega">
                    <textarea name="message" class="text-area">Message:</textarea>

                    <div class="alert-contact"></div>
                    <span class="send-message sc_button medium">Send Message</span>
                </div>
            </form>
        </div>
    </div>
    <!-- container with sidebar end -->
    <!-- sidebar left -->
    <div class="sidebar left grid_3">
        <div class="divider_page"><h4>Contact Info</h4></div>
        <p><b>Address:</b><br>Sokullu Mehmet Pasa Street 1234, Country<br><b>Telephone:</b><br>+90(123) 456-78 90<br><b>Fax:</b><br>+90(123)
            456-78 91</p>

        <div class="divider_page"><h4>Get Social</h4></div>
        <p>
            <a href="#" class="social_icons16 icon16_1 tooltip_s" title="Digg"></a>
            <a href="#" class="social_icons16 icon16_5 tooltip_s" title="Vimeo"></a>
            <a href="#" class="social_icons16 icon16_11 tooltip_s" title="Google Plus"></a>
            <a href="#" class="social_icons16 icon16_15 tooltip_s" title="DropBox"></a>
            <a href="#" class="social_icons16 icon16_16 tooltip_s" title="Moby Picture"></a>
            <a href="#" class="social_icons16 icon16_28 tooltip_s" title="Twitter"></a>
            <a href="#" class="social_icons16 icon16_21 tooltip_s" title="LinkedIn"></a>
            <a href="#" class="social_icons16 icon16_22 tooltip_s" title="Facebook"></a>
            <a href="#" class="social_icons16 icon16_2 tooltip_s" title="Facebook"></a>
            <a href="#" class="social_icons16 icon16_3 tooltip_s" title="Twitter"></a>
            <a href="#" class="social_icons16 icon16_4 tooltip_s" title="iChat"></a>
            <a href="#" class="social_icons16 icon16_6 tooltip_s" title="StubleUpon"></a>
            <a href="#" class="social_icons16 icon16_7 tooltip_s" title="Digg"></a>
            <a href="#" class="social_icons16 icon16_8 tooltip_s" title="Tumbler"></a>
            <a href="#" class="social_icons16 icon16_9 tooltip_s" title="Last FM"></a>
            <a href="#" class="social_icons16 icon16_10 tooltip_s" title="Vimeo"></a>
            <a href="#" class="social_icons16 icon16_13 tooltip_s" title="Google Buzz"></a>
            <a href="#" class="social_icons16 icon16_17 tooltip_s" title="Skype"></a>
            <a href="#" class="social_icons16 icon16_19 tooltip_s" title="Delicious"></a>
            <a href="#" class="social_icons16 icon16_25 tooltip_s" title="Dribbble"></a>
            <a href="#" class="social_icons16 icon16_29 tooltip_s" title="Gowalla"></a>
        </p>
    </div>
</div>
<!-- container 12 end -->
<!-- footer -->
    <?php include 'footer.php';?>
<!-- footer end -->
</div>
<!-- container full end -->
<script src="assets/js/jquery-1.9.0.min.js" type="text/javascript"></script>
<script src="assets/js/jquery.components.js" type="text/javascript"></script>
<script src="assets/js/custom.js" type="text/javascript"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;sensor=false"></script>
<script type="text/javascript">
    function initialize() {
        var myLatlng = new google.maps.LatLng(40.714353, -74.005973);
        var mapOptions = {
            zoom: 12,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            scrollwheel: false,
            scaleControl: false,
            streetViewControl: false,
            draggable: false,
            panControl: true,
            panControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.LEFT_CENTER
            }
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"),
                mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

// To add the marker to the map, call setMap();
        marker.setMap(map);
    }
    initialize();
</script>
</body>
</html>