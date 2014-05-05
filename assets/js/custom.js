$(document).ready(function(){

	/*Menu Hover Color*/
	$("#mainmenu ul").mouseenter(function(){
		$(this).parent().find("a").addClass("hover");
	}).mouseleave(function(){
		$(this).parent().find("a").removeClass("hover");
	});
	
	// Side Navigation
	$(".side_navigation").treeview({
		collapsed: true,
		unique: true,
		animated: "normal"		
	});
	
	/*Form Elements Clear Value*/
	$('input[type="text"], textarea').focus(function() {
		if (this.value == this.defaultValue){ 
			this.value = '';
		}
	}).blur(function() {
		if ($.trim(this.value) == ''){
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});
	
	$('.search_button').click(function(){
		if($('.search_bar input[name="s"]').val()!="" && $('.search_bar input[name="s"]').val()!="Type & Search"){
			window.location = "index.html?s="+$('.search_bar input[name="s"]').val();
		}
	});

	//Contact Form
		function eMailControl(value)
		{
			var pattern = "^"+"([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0-9_\.\-]+)"+"@"+"([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0-9_\.\-]+)"+"[\.]"+"([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0-9_\.\-]+)"+"$";
			r = new RegExp(pattern, "g");
			return r.test(value);
		}
	function mailFormControl(f){
	    $(".alert-contact").hide();
	    var alertmessage = "Please fill in all fields";
	    if(f.namesurname.value == f.namesurname.defaultValue){
	    	$(".alert-contact").html("<div class='alert_box info'>Please write your name!<div class='close'></div></div>");
	    }else if(!eMailControl(f.email.value)){
	    	$(".alert-contact").html("<div class='alert_box info'>Please write your email!<div class='close'></div></div>");
	    }else if(f.subject.value == f.subject.defaultValue){
	    	$(".alert-contact").html("<div class='alert_box info'>Please write a subject!<div class='close'></div></div>");
	    }else if(f.message.value == f.message.defaultValue){
	    	$(".alert-contact").html("<div class='alert_box info'>Please write your message!<div class='close'></div></div>");
	    }else{
	    	$(".alert-contact").html("<div class='alert_box info'>Your message sending...<div class='close'></div></div>");
	    	$.post("mailpost.php", 	{ 	name:f.namesurname.value, 
	    								mail:f.email.value,
	    								subject:f.subject.value,
	    								message:f.message.value
	    							},
	       function(data) {
	       	if(data==1){
	       		$(".alert-contact").html("<div class='alert_box success'>Thank you for your message!<div class='close'></div></div>");
	       		f.namesurname.value = f.namesurname.defaultValue;
	       		f.email.value = f.email.defaultValue;
	       		f.subject.value = f.subject.defaultValue;
	       		f.message.value = f.message.defaultValue;
	       	}else{
	    	 	$(".alert-contact").html("<div class='alert_box error'>Please try again!<div class='close'></div></div>");
	    	}
	       });
	    }
	    $(".alert-contact").fadeIn();
	}
	$(".send-message").click(function() {
	    mailFormControl(document.messageform);
	});
		
	/*fitVideo*/
	$(".fitVideo").fitVids();
	
	/*Filter Options*/
	$(".filter_options ul li").click(function(){
		$(".filter_options ul li").removeClass("active");
		$(this).addClass("active");
	});
	
	/*Filter FAQ Items*/
	$(".faq_options ul li").click(function(){
		$('input[name="filter_key"]').val("").blur();
		if($(this).attr("data-cat")=="all"){
			$(".faq > div").fadeIn();
		}else{
			$(".faq > div").hide();
			$('.faq > div[data-cats~="'+$(this).attr('data-cat')+'"]').fadeIn();
		}
	});
	
	/*Filter Portfolio Items*/
	$(".portfolio_options ul li").click(function(){
		if($(this).attr("data-cat")=="all"){
			$(".portfolio_items > div").fadeIn();
		}else{
			$(".portfolio_items > div").hide();
			$('.portfolio_items > div[data-cats~="'+$(this).attr('data-cat')+'"]').fadeIn();
		}
	});
	jQuery.expr[':'].Contains = function(a, i, m) {
		return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};
	$('input[name="filter_key"]').change(function() {
		var filter = $(this).val();
		$(".faq_options ul li").removeClass("active");
		if (filter) {
			$('.faq > div').find("p:not(:Contains(" + filter + "))").parent().parent().css("display","none");
			$('.faq > div').find("p:Contains(" + filter + ")").parent().parent().css("display","block");
		} else {
			$('.faq > div').css("display","block");
			$(".faq_options ul li:first-child").addClass("active");
		}
		return false;
	}).keyup(function() {
		$(this).change();
	});
	
	/*Mobile Navigation*/
	var optionsList = '<option value="">Menu</option>';
		$("#mainmenu").find("li").each(function() {
			$anchor = $(this).children('a');
			depth   = $(this).parents('ul').length - 1;
			indent  = '';
			
			if( depth ) {
				while( depth > 0 ) {
					indent += ' - ';
					depth--;
				}
			}
			optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
		});
		$("#mainmenu > li:first-child").after('<li class="mobile_link"><select class="navi">' + optionsList + '</select></li>');

		$('.navi').on('change', function() {
			window.location = $(this).val();
		});
	
	/*Twitter*/
	$('.latest_tweets, .sidebar_tweets').tweetable({username: 'pavan_sry', time: true, limit: 2, replies: false});
	
	/*Flickr Feed*/
	$('#flickrfeed,#sidebarflickr').jflickrfeed({
	limit: 14,
	qstrings: {
		id: '124279795@N07'
	},
	itemTemplate: 
		'<li>' +
			'<a href="{{image_b}}" class="tooltip_s" rel="flickrPhoto" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
		'</li>'
	});
	
	/*Flickr prettyPhoto*/
	$("body").on("click","a[rel=flickrPhoto]",function() {
    	$.prettyPhoto.open($(this).attr("href"),$(this).attr("title"),"");
    	return false;
	});
	
	/*Back Page Top*/
	$('.back_top').tipsy({fallback: "Back Top", gravity: 's', fade: true, offset: -18 }).click(function(){$('html, body').animate({scrollTop : 0},500);});
	
	/*Call Tipsy Tooltip*/
	$('a.tooltip').tipsy({gravity: 'w', live: true, fade: true });
	$('a.tooltip_s').tipsy({gravity: 's', live: true, fade: true });
	$('.socialicons a, .iconset16 a').tipsy({gravity: 's', live: true, fade: true });
	
	/*Call PrettyPhoto*/
	$("a[data-rel^='prettyPhoto']").prettyPhoto();
	
  	/*Progress Bars*/
  	$(".progress_bar").each(function(index) {
    	$(this).find('span').animate({
    		width: $(this).attr("data-percentage")+"%",
  		}, 650 );
  		if($(this).attr("data-title")){
  			$(this).find('span').append($(this).attr("data-title")+"&nbsp;&nbsp;&nbsp;");
  		}
	});
	
	/*Alert Boxes*/
	$(".alert_box").each( function(){
   		$(this).append('<div class="close"></div>');
	});
	$("body").on('click', '.alert_box', function() {
			$(this).fadeOut();
	});
	
	/*Call Camera Slider*/
	if($('#cameraSlider').length){
		$('#cameraSlider').camera({
			autoAdvance		: true,
			barPosition			: 'top',
			height				: '56%',
			imagePath			: 'assets/images/cameraSlider/',
			hover					: true,	
			loader				: 'none',
			loaderColor		: '#c9577d', 
			loaderBgColor		: '#222',
			loaderOpacity		: 1,
			loaderPadding		: 1,
			loaderStroke		: 5,
			navigation			: true,
			navigationHover	: false,
			mobileNavHover	: true,
			pagination			: true,	
			playPause			: false,
			pauseOnClick		: true,
			pieDiameter		: 38,
			piePosition			: 'rightTop',
			slideOn				: 'random',
			thumbnails			: true,
			time					: 4000,
			transPeriod			: 1500
		});
	}
	if($('#cameraSlider2').length){
		$('#cameraSlider2').camera({
			autoAdvance		: true,
			barPosition			: 'top',
			height				: '56%',
			imagePath			: 'assets/images/cameraSlider/',
			hover					: true,	
			loader				: 'none',
			loaderColor		: '#c9577d', 
			loaderBgColor		: '#222',
			loaderOpacity		: 1,
			loaderPadding		: 1,
			loaderStroke		: 5,
			navigation			: true,
			navigationHover	: true,
			mobileNavHover	: true,
			pagination			: false,	
			playPause			: true,
			pauseOnClick		: true,
			pieDiameter		: 38,
			piePosition			: 'rightTop',
			slideOn				: 'random',
			thumbnails			: true,
			time					: 7000,
			transPeriod			: 1500
		});
	}
	/*Tabs*/
     $(".tabs").tabs();
     
	/*Accordion*/
	var icons_ = {
        header: "accordion-icon",
        activeHeader: "accordion-icon-active"
    };
	$(".accordion").accordion({heightStyle: "content", collapsible: true, icons: icons_});
	$(".faq").accordion({heightStyle: "content", collapsible: true, icons: icons_, header: "> div > h5"});
	$("#toggle").click(function() {
            if ($(".accordion").accordion("option", "icons")) {
                $(".accordion").accordion("option", "icons", null);
            } else {
                $(".accordion").accordion("option", "icons", icons_);
            }
     });
     
     /*Call Cycle Slider*/
     if($('#cycleSlider').length){
    	$('#cycleSlider').after('<div id="cycle_nav"></div>').cycle({
		    fx:     'fade', 
		    speed:  1000, 
		    timeout: 4000, 
		    slideResize: 1,
		    containerResize: false,
    		width: '100%',
    		fit: 1,
    		next:   '#cycle_next',
    		prev:   '#cycle_prev', 
		    pager:  '#cycle_nav',
		    after: onAfter
		});
	}
	if($('.testimonials').length){
		$('.testimonials').cycle({
		    fx:     'fade', 
		   	speed:  900, 
		    timeout: 4000, 
		    slideResize: 0,
		    containerResize: false,
    		width: '100%',
    		height: 'auto',
    		fit: 0,
    		pause: 1,
    		next:   '#testimonials_next',
    		prev:   '#testimonials_prev', 
    		after: onAfter
		});
	}
	function onAfter(curr, next, opts, fwd) {
		var $ht = $(this).height();
		$(this).parent().animate({height: $ht},100);
	}
	
	/*Call carouFredsel*/
	if($('#recentWorks').length){
		$("#recentWorks").carouFredSel({
			width: "100%",
			height: "auto",
			scroll: {
				fx: "crossfade",
    	    	duration: 1000,
    	    	pauseOnHover: true
			},
			prev	: {	
				button	: "#recentworks_prev"
			},
			next	: { 
				button	: "#recentworks_next"
			}
		});
	}
	if($('.our_clients').length){
		$(".our_clients").carouFredSel({
			width: "100%",
			height: "auto",
			scroll: {
				fx: "crossfade",
    	    	duration: 1000,
    	    	pauseOnHover: true
			},
			prev	: {	
				button	: "#ourclients_prev"
			},
			next	: { 
				button	: "#ourclients_next"
			}
		});
	}
	if($('.team_members').length){
		$(".team_members").carouFredSel({
			width: "100%",
			height: "auto",
			scroll: {
				fx: "crossfade",
    	    	duration: 1000,
    	    	pauseOnHover: true
			},
			prev	: {	
				button	: "#teammembers_prev"
			},
			next	: { 
				button	: "#teammembers_next"
			}
		});
	}
	/*Call Accordion Slider*/
	$('#lite-accordion').liteAccordion({
		onTriggerSlide : function() {
                            this.find('figcaption').fadeOut();
                        },
                        onSlideAnimComplete : function() {    
                            this.find('figcaption').fadeIn();
                        },
		containerWidth: 940,
		containerHeight : 336,
		theme : 'basic',
		responsive: false,
		autoScaleImages: true,
		minContainerWidth : 300,
        maxContainerWidth : 940,
        headerWidth : 45,
		autoPlay : true,
		pauseOnHover : true,
		rounded : false,
		activateOn: 'mouseover',
		enumerateSlides : false
	}).find('figcaption:first').show();
	$('#lite-accordion h2').each(function(index) {
		$(this).css("background","url('"+$(this).next().find("img").attr("src")+"') no-repeat center top");
	});
	
	/*Feature Box*/
	$(".feature_box").mouseenter(function() {
		$(this).addClass("active");
	}).mouseleave(function(){
		$(this).removeClass("active");
	});
	
	/*Recent Works Image Effect*/
	$(".a_work").mouseenter(function() {
		$(this).find(".hover").fadeIn().find(".work_links").animate({top:'50%'},400,'easeOutBack');
	}).mouseleave(function(){
		$(this).find(".hover").fadeOut().find(".work_links").animate({top:'100%'},400,'easeOutBack');
	});
	
	/*Blog Post Image Effect*/
	$(".a_blogpost img").mouseenter(function() {
		$(this).parent().parent().find(".hover").fadeIn().find(".post_links").animate({top:'50%'},400,'easeOutBack');
	});
	$(".a_blogpost .hover").mouseleave(function(){
		$(this).fadeOut().find(".post_links").animate({top:'100%'},400,'easeOutBack');;
	});
	
	/*Theme Config*/
	var config_tags = '<div class="theme_config"> \
									<div class="icon"><span class="config"></span></div> \
									<div class="config_content">\
										<h4>Change Style</h4> \
										<p>Wide Layout <input type="checkbox" name="lt" value="wide"></p> \
										<h6>Change Colors</h6> \
										<p> \
											<span class="change_color pink" data-color="pink"></span>\
											<span class="change_color green" data-color="green"></span>\
											<span class="change_color blue" data-color="blue"></span>\
											<span class="change_color orange" data-color="orange"></span>\
											<span class="change_color black" data-color="black"></span>\
										</p> \
										<h6>Pattern BG</h6> \
										<p> \
											<span class="change_pbg p1" data-bg="pattern"></span> \
											<span class="change_pbg p2" data-bg="az_subtle"></span> \
											<span class="change_pbg p6" data-bg="retina_wood"></span> \
											<span class="change_pbg p3" data-bg="grey"></span> \
											<span class="change_pbg p4" data-bg="skelatal_weave"></span> \
											<span class="change_pbg p5" data-bg="asfalt"></span> \
											<span class="change_pbg p11" data-bg="type"></span> \
											<span class="change_pbg p7" data-bg="extra_clean_paper"></span> \
											<span class="change_pbg p8" data-bg="diamond_upholstery"></span> \
											<span class="change_pbg p12" data-bg="dark_wood"></span> \
											<span class="change_pbg p9" data-bg="hexellence"></span> \
											<span class="change_pbg p10" data-bg="irongrip"></span> \
										</p> \
										<h6>Image BG</h6> \
										<p> \
											<span class="change_bg p1" data-bg="1"></span> \
											<span class="change_bg p2" data-bg="2"></span> \
											<span class="change_bg p3" data-bg="3"></span> \
											<span class="change_bg p4" data-bg="4"></span> \
											<span class="change_bg p5" data-bg="5"></span> \
										</p> \
									</div> \
								</div> \
								<link rel="stylesheet" type="text/css" href="" id="wide_css"/> <link rel="stylesheet" type="text/css" href="" id="color_css"/>';
	//$('body').append(config_tags);
	$(document).on('change', 'input[name="lt"]', function(){
		if($("#wide_css").attr("href")==""){
			$("#wide_css").attr("href", "assets/css/wide.css");
		}else{
			$("#wide_css").attr("href", "");
		}
		$(window).resize();
	}).on('click','.change_color',function(){
		$('#color_css').attr("href","assets/css/"+$(this).attr("data-color")+".css");
	}).on('click','.change_pbg',function(){
		if($("#wide_css").attr("href")!=""){
			$("#wide_css").attr("href", "");
			$("input[name='lt']").attr("checked",false);
			$(window).resize();
		}
		$('body').css("background","url('assets/images/pattern/"+$(this).attr("data-bg")+".png')");
	}).on('click','.change_bg',function(){
		if($("#wide_css").attr("href")!=""){
			$("#wide_css").attr("href", "");
			$("input[name='lt']").attr("checked",false);
			$(window).resize();
		}
		$('body').css("background","url('assets/images/mix/bg/"+$(this).attr("data-bg")+".jpg') no-repeat 50% 50%").css({'background-attachment': 'fixed', 'background-size': 'cover'});
	});
	/**/
});
$(window).load(function() {
	/*Call Flex Slider*/
 	$('.flexslider').flexslider({
 	  animation: "slide",
 	  slideshow: false,
 	  pauseOnHover: true
 	});
  	/*Call Nivo Slider*/
  	$('#nivoslider, .blogSlider > div, .projectSlider > div, .sliderinPage > div').nivoSlider({pauseTime:4000});
});