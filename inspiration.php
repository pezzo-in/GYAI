<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
    <meta name="author" content="DesignForLife"/>
    <meta name="description"
          content="we are youth Socio-entrepreneurship movement started by a dynamic group of serial entrepreneurs"/>
    <title>GenY Awakening India</title>
    <link rel="stylesheet" type="text/css" href="assets/css/style.css"/>
    <link rel="stylesheet" type="text/css" href="assets/css/fb.wall.css"/>
    <!--[if lte IE 8]>
    <link rel="stylesheet" type="text/css" href="assets/css/ie8.css"/>

    <![endif]-->
</head>
<body>
<!-- container full -->
<div class="container_full">
    <!-- header -->
    <div id="header_wrapper" class="clearfix">
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
                        <li><a href="training.php#ecell">College integrated Ecells</a></li>
                    </ul>
                </li>
                <li>
                    <a href="inspiration.php" class="active">Inspiration inside</a>
                </li>
                <li><a href="contact.php">Contact</a></li>
            </ul>
            <!-- search bar end -->
        </div>
        <!-- menu end -->
    </div>
    <!-- header end -->
    <div class="clearfix"></div>
    <!-- header text -->
    <div class="header_text">
        <div class="container_12">
            <div class="grid_12">
                <h1>INSPIRATIONS FROM SOCIAL MEDIA</h1>
            </div>
        </div>
    </div>
    <!-- header text end -->
    <div class="container_12">
        <div class="grid_12">
            <div class="video">
                <!--<div id="facebook" class="fb-wall"></div>-->
                <div id="fb-root"></div>
                <script>(function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=236277823092390";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));</script>
                <div class="fb-like-box" data-href="https://www.facebook.com/GenYAwakeningIndia" data-width="960"
                     data-colorscheme="light" data-show-faces="true" data-header="false"
                     data-stream="true" data-show-border="false"></div>
            </div>
        </div>
    </div>
    <!-- container 12 end -->
    <?php include 'footer.php';?>

</div>
<!-- container full end -->
<script src="assets/js/jquery-1.9.0.min.js" type="text/javascript"></script>
<script src="assets/js/jquery.components.js" type="text/javascript"></script>
<script src="assets/js/custom.js" type="text/javascript"></script>
<script src="assets/js/fb.wall.js"></script>
<script>
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-45561423-1', 'gyai.in');
    ga('send', 'pageview');

</script>
</body>
</html>