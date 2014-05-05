/*include: (jqueryslidemenu.js)*/
/*********************
 //* jQuery Multi Level CSS Menu #2- By Dynamic Drive: http://www.dynamicdrive.com/
 //* Last update: Nov 7th, 08': Limit # of queued animations to minmize animation stuttering
 //* Menu avaiable at DD CSS Library: http://www.dynamicdrive.com/style/
 *********************/

//Update: April 12th, 10: Fixed compat issue with jquery 1.4x
var jqueryslidemenu = {animateduration: {over: 200, out: 100}, buildmenu: function (menuid) {
    jQuery(document).ready(function ($) {
        var $mainmenu = $("#" + menuid)
        var $headers = $mainmenu.find("ul").parent()
        $headers.each(function (i) {
            var $curobj = $(this)
            var $subul = $(this).find('ul:eq(0)')
            this._dimensions = {w: this.offsetWidth, h: this.offsetHeight, subulw: $subul.outerWidth(), subulh: $subul.outerHeight()}
            this.istopheader = $curobj.parents("ul").length == 1 ? true : false
            $subul.css({top: this.istopheader ? this._dimensions.h + "px" : 0})
            $curobj.hover(function (e) {
                var $targetul = $(this).children("ul:eq(0)")
                this._offsets = {left: $(this).offset().left, top: $(this).offset().top}
                var menuleft = this.istopheader ? 0 : this._dimensions.w
                menuleft = (this._offsets.left + menuleft + this._dimensions.subulw > $(window).width()) ? (this.istopheader ? -this._dimensions.subulw + this._dimensions.w : -this._dimensions.w) : menuleft
                if ($targetul.queue().length <= 1)
                    $targetul.css({left: menuleft + "px", width: this._dimensions.subulw + 'px'}).slideDown(jqueryslidemenu.animateduration.over)
            }, function (e) {
                var $targetul = $(this).children("ul:eq(0)")
                $targetul.slideUp(jqueryslidemenu.animateduration.out)
            })
            $curobj.click(function () {
                $(this).children("ul:eq(0)").hide()
            })
        })
        $mainmenu.find("ul").css({display: 'none', visibility: 'visible'})
    })
}}
jqueryslidemenu.buildmenu("mainmenu");

/*
 * tweetable 1.6 - jQuery twitter feed generator plugin
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) and Patrick DW (stackoverflow)
 * for IE compatibility.
 *
 * Revision: $Id: jquery.tweetable.js 2011-01-06 $ 
 *
 */
(function (a) {
    a.fn.tweetable = function (b) {
        var c = {limit: 5, username: "philipbeel", time: false, replies: false, position: "append"};
        var b = a.extend(c, b);
        return this.each(function (e) {
            var d = a(this);
            var j;
            var i = "";
            var f = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var g = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";
            var h = "&count=";
            a.getJSON(g + c.username + h + c.limit + "&callback=?", d, function (k) {
                a.each(k, function (m, n) {
                    if (m == 0) {
                        j = a('<ul class="tweetList">')[c.position.toLowerCase() + "To"](d)
                    }
                    if (c.replies === false) {
                        if (n.in_reply_to_status_id === null) {
                            j.append('<li class="tweet_content_' + m + '"><p class="tweet_link_' + m + '">' + n.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') + "</p></li>")
                        }
                    } else {
                        j.append('<li class="tweet_content_' + m + '"><p class="tweet_link_' + m + '">' + n.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') + "</p></li>")
                    }
                    if (c.time == true) {
                        for (var l = 0; l <= 12; l++) {
                            if (f[l] == n.created_at.substr(4, 3)) {
                                i = l + 1;
                                if (i < 10) {
                                    i = "0" + i
                                }
                            }
                        }
                        d.find(".tweet_link_" + m).append("<small> " + n.created_at.substr(8, 2) + "/" + i + "/" + n.created_at.substr(26, 4) + " " + n.created_at.substr(11, 8) + "</small>")
                    }
                })
            })
        })
    }
})(jQuery);

/*included: (jquery.tipsy.js)*/
// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function ($) {
    function maybeCall(thing, ctx) {
        return(typeof thing == 'function') ? (thing.call(ctx)) : thing;
    };
    function isElementInDOM(ele) {
        while (ele = ele.parentNode) {
            if (ele == document)return true;
        }
        return false;
    };
    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    };
    Tipsy.prototype = {show: function () {
        var title = this.getTitle();
        if (title && this.enabled) {
            var $tip = this.tip();
            $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
            $tip[0].className = 'tipsy';
            $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);
            var pos = $.extend({}, this.$element.offset(), {width: this.$element[0].offsetWidth, height: this.$element[0].offsetHeight});
            var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight, gravity = maybeCall(this.options.gravity, this.$element[0]);
            var tp;
            switch (gravity.charAt(0)) {
                case'n':
                    tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                    break;
                case'e':
                    tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                    break;
                case'w':
                    tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                    break;
                case's':
                    tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                    break;
            }
            if (gravity.length == 2) {
                if (gravity.charAt(1) == 'w') {
                    tp.left = pos.left + pos.width / 2 - 15;
                } else {
                    tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                }
            }
            $tip.css(tp).addClass('tipsy-' + gravity);
            $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
            if (this.options.className) {
                $tip.addClass(maybeCall(this.options.className, this.$element[0]));
            }
            if (this.options.fade) {
                $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
            } else {
                $tip.css({visibility: 'visible', opacity: this.options.opacity});
            }
        }
    }, hide: function () {
        if (this.options.fade) {
            this.tip().stop().fadeOut(function () {
                $(this).remove();
            });
        } else {
            this.tip().remove();
        }
    }, fixTitle: function () {
        var $e = this.$element;
        if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
            $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
        }
    }, getTitle: function () {
        var title, $e = this.$element, o = this.options;
        this.fixTitle();
        var title, o = this.options;
        if (typeof o.title == 'string') {
            title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
        } else if (typeof o.title == 'function') {
            title = o.title.call($e[0]);
        }
        title = ('' + title).replace(/(^\s*|\s*$)/, "");
        return title || o.fallback;
    }, tip: function () {
        if (!this.$tip) {
            this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
            this.$tip.data('tipsy-pointee', this.$element[0]);
        }
        return this.$tip;
    }, validate: function () {
        if (!this.$element[0].parentNode) {
            this.hide();
            this.$element = null;
            this.options = null;
        }
    }, enable: function () {
        this.enabled = true;
    }, disable: function () {
        this.enabled = false;
    }, toggleEnabled: function () {
        this.enabled = !this.enabled;
    }};
    $.fn.tipsy = function (options) {
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy)tipsy[options]();
            return this;
        }
        options = $.extend({}, $.fn.tipsy.defaults, options);
        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }

        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function () {
                    if (tipsy.hoverState == 'in')tipsy.show();
                }, options.delayIn);
            }
        };
        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function () {
                    if (tipsy.hoverState == 'out')tipsy.hide();
                }, options.delayOut);
            }
        };
        if (!options.on)this.each(function () {
            get(this);
        });
        if (options.trigger != 'manual') {
            var binder = options.live ? 'on' : 'bind', eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus', eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            if (binder == 'on') {
                $(document).on(eventIn, '.tooltip_s,.tooltip,.socialicons a, .iconset16 a', enter).on(eventOut, '.tooltip_s,.tooltip,.socialicons a, .iconset16 a', leave);
            } else {
                this[binder](eventIn, enter)[binder](eventOut, leave);
            }
        }
        return this;
    };
    $.fn.tipsy.defaults = {className: null, delayIn: 0, delayOut: 0, fade: false, fallback: '', gravity: 's', html: false, live: false, offset: 0, opacity: 0.8, title: 'title', trigger: 'hover'};
    $.fn.tipsy.revalidate = function () {
        $('.tipsy').each(function () {
            var pointee = $.data(this, 'tipsy-pointee');
            if (!pointee || !isElementInDOM(pointee)) {
                $(this).remove();
            }
        });
    };
    $.fn.tipsy.elementOptions = function (ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    $.fn.tipsy.autoNS = function () {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    $.fn.tipsy.autoWE = function () {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    $.fn.tipsy.autoBounds = function (margin, prefer) {
        return function () {
            var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)}, boundTop = $(document).scrollTop() + margin, boundLeft = $(document).scrollLeft() + margin, $this = $(this);
            if ($this.offset().top < boundTop)dir.ns = 'n';
            if ($this.offset().left < boundLeft)dir.ew = 'w';
            if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin)dir.ew = 'e';
            if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin)dir.ns = 's';
            return dir.ns + (dir.ew ? dir.ew : '');
        }
    };
})(jQuery);

/*include: (jquery.prettyPhoto.js)*/
/* ------------------------------------------------------------------------
 Class: prettyPhoto
 Use: Lightbox clone for jQuery
 Author: Stephane Caron (http://www.no-margin-for-errors.com)
 Version: 3.1.5
 ------------------------------------------------------------------------- */
(function (e) {
    function t() {
        var e = location.href;
        hashtag = e.indexOf("#prettyPhoto") !== -1 ? decodeURI(e.substring(e.indexOf("#prettyPhoto") + 1, e.length)) : false;
        return hashtag
    }

    function n() {
        if (typeof theRel == "undefined")return;
        location.hash = theRel + "/" + rel_index + "/"
    }

    function r() {
        if (location.href.indexOf("#prettyPhoto") !== -1)location.hash = "prettyPhoto"
    }

    function i(e, t) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var n = "[\\?&]" + e + "=([^&#]*)";
        var r = new RegExp(n);
        var i = r.exec(t);
        return i == null ? "" : i[1]
    }

    e.prettyPhoto = {version: "3.1.5"};
    e.fn.prettyPhoto = function (s) {
        function g() {
            e(".pp_loaderIcon").hide();
            projectedTop = scroll_pos["scrollTop"] + (d / 2 - a["containerHeight"] / 2);
            if (projectedTop < 0)projectedTop = 0;
            $ppt.fadeTo(settings.animation_speed, 1);
            $pp_pic_holder.find(".pp_content").animate({height: a["contentHeight"], width: a["contentWidth"]}, settings.animation_speed);
            $pp_pic_holder.animate({top: projectedTop, left: v / 2 - a["containerWidth"] / 2 < 0 ? 0 : v / 2 - a["containerWidth"] / 2, width: a["containerWidth"]}, settings.animation_speed, function () {
                $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(a["height"]).width(a["width"]);
                $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);
                if (isSet && S(pp_images[set_position]) == "image") {
                    $pp_pic_holder.find(".pp_hoverContainer").show()
                } else {
                    $pp_pic_holder.find(".pp_hoverContainer").hide()
                }
                if (settings.allow_expand) {
                    if (a["resized"]) {
                        e("a.pp_expand,a.pp_contract").show()
                    } else {
                        e("a.pp_expand").hide()
                    }
                }
                if (settings.autoplay_slideshow && !m && !f)e.prettyPhoto.startSlideshow();
                settings.changepicturecallback();
                f = true
            });
            C();
            s.ajaxcallback()
        }

        function y(t) {
            $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden");
            $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function () {
                e(".pp_loaderIcon").show();
                t()
            })
        }

        function b(t) {
            t > 1 ? e(".pp_nav").show() : e(".pp_nav").hide()
        }

        function w(e, t) {
            resized = false;
            E(e, t);
            imageWidth = e, imageHeight = t;
            if ((p > v || h > d) && doresize && settings.allow_resize && !u) {
                resized = true, fitting = false;
                while (!fitting) {
                    if (p > v) {
                        imageWidth = v - 200;
                        imageHeight = t / e * imageWidth
                    } else if (h > d) {
                        imageHeight = d - 200;
                        imageWidth = e / t * imageHeight
                    } else {
                        fitting = true
                    }
                    h = imageHeight, p = imageWidth
                }
                if (p > v || h > d) {
                    w(p, h)
                }
                E(imageWidth, imageHeight)
            }
            return{width: Math.floor(imageWidth), height: Math.floor(imageHeight), containerHeight: Math.floor(h), containerWidth: Math.floor(p) + settings.horizontal_padding * 2, contentHeight: Math.floor(l), contentWidth: Math.floor(c), resized: resized}
        }

        function E(t, n) {
            t = parseFloat(t);
            n = parseFloat(n);
            $pp_details = $pp_pic_holder.find(".pp_details");
            $pp_details.width(t);
            detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom"));
            $pp_details = $pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({position: "absolute", top: -1e4});
            detailsHeight += $pp_details.height();
            detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight;
            $pp_details.remove();
            $pp_title = $pp_pic_holder.find(".ppt");
            $pp_title.width(t);
            titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom"));
            $pp_title = $pp_title.clone().appendTo(e("body")).css({position: "absolute", top: -1e4});
            titleHeight += $pp_title.height();
            $pp_title.remove();
            l = n + detailsHeight;
            c = t;
            h = l + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height();
            p = t
        }

        function S(e) {
            if (e.match(/youtube\.com\/watch/i) || e.match(/youtu\.be/i)) {
                return"youtube"
            } else if (e.match(/vimeo\.com/i)) {
                return"vimeo"
            } else if (e.match(/\b.mov\b/i)) {
                return"quicktime"
            } else if (e.match(/\b.swf\b/i)) {
                return"flash"
            } else if (e.match(/\biframe=true\b/i)) {
                return"iframe"
            } else if (e.match(/\bajax=true\b/i)) {
                return"ajax"
            } else if (e.match(/\bcustom=true\b/i)) {
                return"custom"
            } else if (e.substr(0, 1) == "#") {
                return"inline"
            } else {
                return"image"
            }
        }

        function x() {
            if (doresize && typeof $pp_pic_holder != "undefined") {
                scroll_pos = T();
                contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();
                projectedTop = d / 2 + scroll_pos["scrollTop"] - contentHeight / 2;
                if (projectedTop < 0)projectedTop = 0;
                if (contentHeight > d)return;
                $pp_pic_holder.css({top: projectedTop, left: v / 2 + scroll_pos["scrollLeft"] - contentwidth / 2})
            }
        }

        function T() {
            if (self.pageYOffset) {
                return{scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset}
            } else if (document.documentElement && document.documentElement.scrollTop) {
                return{scrollTop: document.documentElement.scrollTop, scrollLeft: document.documentElement.scrollLeft}
            } else if (document.body) {
                return{scrollTop: document.body.scrollTop, scrollLeft: document.body.scrollLeft}
            }
        }

        function N() {
            d = e(window).height(), v = e(window).width();
            if (typeof $pp_overlay != "undefined")$pp_overlay.height(e(document).height()).width(v)
        }

        function C() {
            if (isSet && settings.overlay_gallery && S(pp_images[set_position]) == "image") {
                itemWidth = 52 + 5;
                navWidth = settings.theme == "facebook" || settings.theme == "pp_default" ? 50 : 30;
                itemsPerPage = Math.floor((a["containerWidth"] - 100 - navWidth) / itemWidth);
                itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length;
                totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
                if (totalPage == 0) {
                    navWidth = 0;
                    $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()
                } else {
                    $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()
                }
                galleryWidth = itemsPerPage * itemWidth;
                fullGalleryWidth = pp_images.length * itemWidth;
                $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");
                goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage;
                e.prettyPhoto.changeGalleryPage(goToPage);
                $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")
            } else {
                $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")
            }
        }

        function k(t) {
            if (settings.social_tools)facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href));
            settings.markup = settings.markup.replace("{pp_social}", "");
            e("body").append(settings.markup);
            $pp_pic_holder = e(".pp_pic_holder"), $ppt = e(".ppt"), $pp_overlay = e("div.pp_overlay");
            if (isSet && settings.overlay_gallery) {
                currentGalleryPage = 0;
                toInject = "";
                for (var n = 0; n < pp_images.length; n++) {
                    if (!pp_images[n].match(/\b(jpg|jpeg|png|gif)\b/gi)) {
                        classname = "default";
                        img_src = ""
                    } else {
                        classname = "";
                        img_src = pp_images[n]
                    }
                    toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>"
                }
                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);
                $pp_pic_holder.find("#pp_full_res").after(toInject);
                $pp_gallery = e(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li");
                $pp_gallery.find(".pp_arrow_next").click(function () {
                    e.prettyPhoto.changeGalleryPage("next");
                    e.prettyPhoto.stopSlideshow();
                    return false
                });
                $pp_gallery.find(".pp_arrow_previous").click(function () {
                    e.prettyPhoto.changeGalleryPage("previous");
                    e.prettyPhoto.stopSlideshow();
                    return false
                });
                $pp_pic_holder.find(".pp_content").hover(function () {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()
                }, function () {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()
                });
                itemWidth = 52 + 5;
                $pp_gallery_li.each(function (t) {
                    e(this).find("a").click(function () {
                        e.prettyPhoto.changePage(t);
                        e.prettyPhoto.stopSlideshow();
                        return false
                    })
                })
            }
            if (settings.slideshow) {
                $pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');
                $pp_pic_holder.find(".pp_nav .pp_play").click(function () {
                    e.prettyPhoto.startSlideshow();
                    return false
                })
            }
            $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme);
            $pp_overlay.css({opacity: 0, height: e(document).height(), width: e(window).width()}).bind("click", function () {
                if (!settings.modal)e.prettyPhoto.close()
            });
            e("a.pp_close").bind("click", function () {
                e.prettyPhoto.close();
                return false
            });
            if (settings.allow_expand) {
                e("a.pp_expand").bind("click", function (t) {
                    if (e(this).hasClass("pp_expand")) {
                        e(this).removeClass("pp_expand").addClass("pp_contract");
                        doresize = false
                    } else {
                        e(this).removeClass("pp_contract").addClass("pp_expand");
                        doresize = true
                    }
                    y(function () {
                        e.prettyPhoto.open()
                    });
                    return false
                })
            }
            $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function () {
                e.prettyPhoto.changePage("previous");
                e.prettyPhoto.stopSlideshow();
                return false
            });
            $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function () {
                e.prettyPhoto.changePage("next");
                e.prettyPhoto.stopSlideshow();
                return false
            });
            x()
        }

        s = jQuery.extend({hook: "rel", animation_speed: "fast", ajaxcallback: function () {
        }, slideshow: 5e3, autoplay_slideshow: false, opacity: .8, show_title: true, allow_resize: true, allow_expand: true, default_width: 500, default_height: 344, counter_separator_label: "/", theme: "pp_default", horizontal_padding: 20, hideflash: false, wmode: "opaque", autoplay: true, modal: false, deeplinking: true, overlay_gallery: true, overlay_gallery_max: 30, keyboard_shortcuts: true, changepicturecallback: function () {
        }, callback: function () {
        }, ie6_fallback: true, markup: '<div class="pp_pic_holder"> 						<div class="ppt"> </div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>', gallery_markup: '<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>', image_markup: '<img id="fullResImage" src="{path}" />', flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>', quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>', iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>', inline_markup: '<div class="pp_inline">{content}</div>', custom_markup: "", social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'}, s);
        var o = this, u = false, a, f, l, c, h, p, d = e(window).height(), v = e(window).width(), m;
        doresize = true, scroll_pos = T();
        e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function () {
            x();
            N()
        });
        if (s.keyboard_shortcuts) {
            e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function (t) {
                if (typeof $pp_pic_holder != "undefined") {
                    if ($pp_pic_holder.is(":visible")) {
                        switch (t.keyCode) {
                            case 37:
                                e.prettyPhoto.changePage("previous");
                                t.preventDefault();
                                break;
                            case 39:
                                e.prettyPhoto.changePage("next");
                                t.preventDefault();
                                break;
                            case 27:
                                if (!settings.modal)e.prettyPhoto.close();
                                t.preventDefault();
                                break
                        }
                    }
                }
            })
        }
        e.prettyPhoto.initialize = function () {
            settings = s;
            if (settings.theme == "pp_default")settings.horizontal_padding = 16;
            theRel = e(this).attr(settings.hook);
            galleryRegExp = /\[(?:.*)\]/;
            isSet = galleryRegExp.exec(theRel) ? true : false;
            pp_images = isSet ? jQuery.map(o, function (t, n) {
                if (e(t).attr(settings.hook).indexOf(theRel) != -1)return e(t).attr("href")
            }) : e.makeArray(e(this).attr("href"));
            pp_titles = isSet ? jQuery.map(o, function (t, n) {
                if (e(t).attr(settings.hook).indexOf(theRel) != -1)return e(t).find("img").attr("alt") ? e(t).find("img").attr("alt") : ""
            }) : e.makeArray(e(this).find("img").attr("alt"));
            pp_descriptions = isSet ? jQuery.map(o, function (t, n) {
                if (e(t).attr(settings.hook).indexOf(theRel) != -1)return e(t).attr("title") ? e(t).attr("title") : ""
            }) : e.makeArray(e(this).attr("title"));
            if (pp_images.length > settings.overlay_gallery_max)settings.overlay_gallery = false;
            set_position = jQuery.inArray(e(this).attr("href"), pp_images);
            rel_index = isSet ? set_position : e("a[" + settings.hook + "^='" + theRel + "']").index(e(this));
            k(this);
            if (settings.allow_resize)e(window).bind("scroll.prettyphoto", function () {
                x()
            });
            e.prettyPhoto.open();
            return false
        };
        e.prettyPhoto.open = function (t) {
            if (typeof settings == "undefined") {
                settings = s;
                pp_images = e.makeArray(arguments[0]);
                pp_titles = arguments[1] ? e.makeArray(arguments[1]) : e.makeArray("");
                pp_descriptions = arguments[2] ? e.makeArray(arguments[2]) : e.makeArray("");
                isSet = pp_images.length > 1 ? true : false;
                set_position = arguments[3] ? arguments[3] : 0;
                k(t.target)
            }
            if (settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden");
            b(e(pp_images).size());
            e(".pp_loaderIcon").show();
            if (settings.deeplinking)n();
            if (settings.social_tools) {
                facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href));
                $pp_pic_holder.find(".pp_social").html(facebook_like_link)
            }
            if ($ppt.is(":hidden"))$ppt.css("opacity", 0).show();
            $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
            $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + e(pp_images).size());
            if (typeof pp_descriptions[set_position] != "undefined" && pp_descriptions[set_position] != "") {
                $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))
            } else {
                $pp_pic_holder.find(".pp_description").hide()
            }
            movie_width = parseFloat(i("width", pp_images[set_position])) ? i("width", pp_images[set_position]) : settings.default_width.toString();
            movie_height = parseFloat(i("height", pp_images[set_position])) ? i("height", pp_images[set_position]) : settings.default_height.toString();
            u = false;
            if (movie_height.indexOf("%") != -1) {
                movie_height = parseFloat(e(window).height() * parseFloat(movie_height) / 100 - 150);
                u = true
            }
            if (movie_width.indexOf("%") != -1) {
                movie_width = parseFloat(e(window).width() * parseFloat(movie_width) / 100 - 150);
                u = true
            }
            $pp_pic_holder.fadeIn(function () {
                settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined" ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html(" ");
                imgPreloader = "";
                skipInjection = false;
                switch (S(pp_images[set_position])) {
                    case"image":
                        imgPreloader = new Image;
                        nextImage = new Image;
                        if (isSet && set_position < e(pp_images).size() - 1)nextImage.src = pp_images[set_position + 1];
                        prevImage = new Image;
                        if (isSet && pp_images[set_position - 1])prevImage.src = pp_images[set_position - 1];
                        $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]);
                        imgPreloader.onload = function () {
                            a = w(imgPreloader.width, imgPreloader.height);
                            g()
                        };
                        imgPreloader.onerror = function () {
                            alert("Image cannot be loaded. Make sure the path is correct and image exist.");
                            e.prettyPhoto.close()
                        };
                        imgPreloader.src = pp_images[set_position];
                        break;
                    case"youtube":
                        a = w(movie_width, movie_height);
                        movie_id = i("v", pp_images[set_position]);
                        if (movie_id == "") {
                            movie_id = pp_images[set_position].split("youtu.be/");
                            movie_id = movie_id[1];
                            if (movie_id.indexOf("?") > 0)movie_id = movie_id.substr(0, movie_id.indexOf("?"));
                            if (movie_id.indexOf("&") > 0)movie_id = movie_id.substr(0, movie_id.indexOf("&"))
                        }
                        movie = "http://www.youtube.com/embed/" + movie_id;
                        i("rel", pp_images[set_position]) ? movie += "?rel=" + i("rel", pp_images[set_position]) : movie += "?rel=1";
                        if (settings.autoplay)movie += "&autoplay=1";
                        toInject = settings.iframe_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                        break;
                    case"vimeo":
                        a = w(movie_width, movie_height);
                        movie_id = pp_images[set_position];
                        var t = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
                        var n = movie_id.match(t);
                        movie = "http://player.vimeo.com/video/" + n[3] + "?title=0&byline=0&portrait=0";
                        if (settings.autoplay)movie += "&autoplay=1;";
                        vimeo_width = a["width"] + "/embed/?moog_width=" + a["width"];
                        toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, a["height"]).replace(/{path}/g, movie);
                        break;
                    case"quicktime":
                        a = w(movie_width, movie_height);
                        a["height"] += 15;
                        a["contentHeight"] += 15;
                        a["containerHeight"] += 15;
                        toInject = settings.quicktime_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                        break;
                    case"flash":
                        a = w(movie_width, movie_height);
                        flash_vars = pp_images[set_position];
                        flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length);
                        filename = pp_images[set_position];
                        filename = filename.substring(0, filename.indexOf("?"));
                        toInject = settings.flash_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
                        break;
                    case"iframe":
                        a = w(movie_width, movie_height);
                        frame_url = pp_images[set_position];
                        frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1);
                        toInject = settings.iframe_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{path}/g, frame_url);
                        break;
                    case"ajax":
                        doresize = false;
                        a = w(movie_width, movie_height);
                        doresize = true;
                        skipInjection = true;
                        e.get(pp_images[set_position], function (e) {
                            toInject = settings.inline_markup.replace(/{content}/g, e);
                            $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
                            g()
                        });
                        break;
                    case"custom":
                        a = w(movie_width, movie_height);
                        toInject = settings.custom_markup;
                        break;
                    case"inline":
                        myClone = e(pp_images[set_position]).clone().append('<br clear="all" />').css({width: settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show();
                        doresize = false;
                        a = w(e(myClone).width(), e(myClone).height());
                        doresize = true;
                        e(myClone).remove();
                        toInject = settings.inline_markup.replace(/{content}/g, e(pp_images[set_position]).html());
                        break
                }
                if (!imgPreloader && !skipInjection) {
                    $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
                    g()
                }
            });
            return false
        };
        e.prettyPhoto.changePage = function (t) {
            currentGalleryPage = 0;
            if (t == "previous") {
                set_position--;
                if (set_position < 0)set_position = e(pp_images).size() - 1
            } else if (t == "next") {
                set_position++;
                if (set_position > e(pp_images).size() - 1)set_position = 0
            } else {
                set_position = t
            }
            rel_index = set_position;
            if (!doresize)doresize = true;
            if (settings.allow_expand) {
                e(".pp_contract").removeClass("pp_contract").addClass("pp_expand")
            }
            y(function () {
                e.prettyPhoto.open()
            })
        };
        e.prettyPhoto.changeGalleryPage = function (e) {
            if (e == "next") {
                currentGalleryPage++;
                if (currentGalleryPage > totalPage)currentGalleryPage = 0
            } else if (e == "previous") {
                currentGalleryPage--;
                if (currentGalleryPage < 0)currentGalleryPage = totalPage
            } else {
                currentGalleryPage = e
            }
            slide_speed = e == "next" || e == "previous" ? settings.animation_speed : 0;
            slide_to = currentGalleryPage * itemsPerPage * itemWidth;
            $pp_gallery.find("ul").animate({left: -slide_to}, slide_speed)
        };
        e.prettyPhoto.startSlideshow = function () {
            if (typeof m == "undefined") {
                $pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function () {
                    e.prettyPhoto.stopSlideshow();
                    return false
                });
                m = setInterval(e.prettyPhoto.startSlideshow, settings.slideshow)
            } else {
                e.prettyPhoto.changePage("next")
            }
        };
        e.prettyPhoto.stopSlideshow = function () {
            $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function () {
                e.prettyPhoto.startSlideshow();
                return false
            });
            clearInterval(m);
            m = undefined
        };
        e.prettyPhoto.close = function () {
            if ($pp_overlay.is(":animated"))return;
            e.prettyPhoto.stopSlideshow();
            $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden");
            e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function () {
                e(this).remove()
            });
            $pp_overlay.fadeOut(settings.animation_speed, function () {
                if (settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible");
                e(this).remove();
                e(window).unbind("scroll.prettyphoto");
                r();
                settings.callback();
                doresize = true;
                f = false;
                delete settings
            })
        };
        if (!pp_alreadyInitialized && t()) {
            pp_alreadyInitialized = true;
            hashIndex = t();
            hashRel = hashIndex;
            hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1);
            hashRel = hashRel.substring(0, hashRel.indexOf("/"));
            setTimeout(function () {
                e("a[" + s.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click")
            }, 50)
        }
        return this.unbind("click.prettyphoto").bind("click.prettyphoto", e.prettyPhoto.initialize)
    };
})(jQuery);
var pp_alreadyInitialized = false;

/*included: (jflickrfeed.min.js)*/
/*
 * Copyright (C) 2009 Joel Sutherland
 * Licenced under the MIT license
 * http://www.newmediacampaigns.com/page/jquery-flickr-plugin
 *
 * Available tags for templates:
 * title, link, date_taken, description, published, author, author_id, tags, image*
 */
(function ($) {
    $.fn.jflickrfeed = function (settings, callback) {
        settings = $.extend(true, {flickrbase: 'http://api.flickr.com/services/feeds/', feedapi: 'photos_public.gne', limit: 20, qstrings: {lang: 'en-us', format: 'json', jsoncallback: '?'}, cleanDescription: true, useTemplate: true, itemTemplate: '', itemCallback: function () {
        }}, settings);
        var url = settings.flickrbase + settings.feedapi + '?';
        var first = true;
        for (var key in settings.qstrings) {
            if (!first)
                url += '&';
            url += key + '=' + settings.qstrings[key];
            first = false;
        }
        return $(this).each(function () {
            var $container = $(this);
            var container = this;
            $.getJSON(url, function (data) {
                $.each(data.items, function (i, item) {
                    if (i < settings.limit) {
                        if (settings.cleanDescription) {
                            var regex = /<p>(.*?)<\/p>/g;
                            var input = item.description;
                            if (regex.test(input)) {
                                item.description = input.match(regex)[2]
                                if (item.description != undefined)
                                    item.description = item.description.replace('<p>', '').replace('</p>', '');
                            }
                        }
                        item['image_s'] = item.media.m.replace('_m', '_s');
                        item['image_t'] = item.media.m.replace('_m', '_t');
                        item['image_m'] = item.media.m.replace('_m', '_m');
                        item['image'] = item.media.m.replace('_m', '');
                        item['image_b'] = item.media.m.replace('_m', '_b');
                        delete item.media;
                        if (settings.useTemplate) {
                            var template = settings.itemTemplate;
                            for (var key in item) {
                                var rgx = new RegExp('{{' + key + '}}', 'g');
                                template = template.replace(rgx, item[key]);
                            }
                            $container.append(template)
                        }
                        settings.itemCallback.call(container, item);
                    }
                });
                if ($.isFunction(callback)) {
                    callback.call(container, data);
                }
            });
        });
    }
})(jQuery);

/*included: (jquery.fitvids.js)*/
/*global jQuery */
/*jshint multistr:true browser:true */
/*!
 * FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */

(function ($) {
    "use strict";
    $.fn.fitVids = function (options) {
        var settings = {customSelector: null};
        var div = document.createElement('div'), ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
        div.className = 'fit-vids-style';
        div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';
        ref.parentNode.insertBefore(div, ref);
        if (options) {
            $.extend(settings, options);
        }
        return this.each(function () {
            var selectors = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.youtube-nocookie.com']", "iframe[src*='www.kickstarter.com']", "object", "embed"];
            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }
            var $allVideos = $(this).find(selectors.join(','));
            $allVideos.each(function () {
                var $this = $(this);
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(), width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(), aspectRatio = height / width;
                if (!$this.attr('id')) {
                    var videoID = 'fitvid' + Math.floor(Math.random() * 999999);
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%");
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
})(jQuery);

/*include: (cameraSlider.min.js)*/
// Camera slideshow v1.3.3 - a jQuery slideshow with many effects, transitions, easy to customize, using canvas and mobile ready, based on jQuery 1.4+
// Copyright (c) 2012 by Manuel Masia - www.pixedelic.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
;
(function ($) {
    $.fn.camera = function (opts, callback) {
        var defaults = {alignment: 'center', autoAdvance: true, mobileAutoAdvance: true, barDirection: 'leftToRight', barPosition: 'bottom', cols: 6, easing: 'easeInOutExpo', mobileEasing: '', fx: 'random', mobileFx: '', gridDifference: 250, height: '50%', imagePath: 'images/', hover: true, loader: 'pie', loaderColor: '#eeeeee', loaderBgColor: '#222222', loaderOpacity: .8, loaderPadding: 2, loaderStroke: 7, minHeight: '200px', navigation: true, navigationHover: true, mobileNavHover: true, opacityOnGrid: false, overlayer: true, pagination: true, playPause: true, pauseOnClick: true, pieDiameter: 38, piePosition: 'rightTop', portrait: false, rows: 4, slicedCols: 12, slicedRows: 8, slideOn: 'random', thumbnails: false, time: 7000, transPeriod: 1500, onEndTransition: function () {
        }, onLoaded: function () {
        }, onStartLoading: function () {
        }, onStartTransition: function () {
        }};

        function isMobile() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
                return true;
            }
        }

        var opts = $.extend({}, defaults, opts);
        var wrap = $(this).addClass('camera_wrap');
        wrap.wrapInner('<div class="camera_src" />').wrapInner('<div class="camera_fakehover" />');
        var fakeHover = $('.camera_fakehover', wrap);
        fakeHover.append('<div class="camera_target"></div>');
        if (opts.overlayer == true) {
            fakeHover.append('<div class="camera_overlayer"></div>')
        }
        fakeHover.append('<div class="camera_target_content"></div>');
        var loader;
        if (opts.loader == 'pie' && $.browser.msie && $.browser.version < 9) {
            loader = 'bar';
        } else {
            loader = opts.loader;
        }
        if (loader == 'pie') {
            fakeHover.append('<div class="camera_pie"></div>')
        } else if (loader == 'bar') {
            fakeHover.append('<div class="camera_bar"></div>')
        } else {
            fakeHover.append('<div class="camera_bar" style="display:none"></div>')
        }
        if (opts.playPause == true) {
            fakeHover.append('<div class="camera_commands"></div>')
        }
        if (opts.navigation == true) {
            fakeHover.append('<div class="camera_prev"><span></span></div>').append('<div class="camera_next"><span></span></div>');
        }
        if (opts.thumbnails == true) {
            wrap.append('<div class="camera_thumbs_cont" />');
        }
        if (opts.thumbnails == true && opts.pagination != true) {
            $('.camera_thumbs_cont', wrap).wrap('<div />').wrap('<div class="camera_thumbs" />').wrap('<div />').wrap('<div class="camera_command_wrap" />');
        }
        if (opts.pagination == true) {
            wrap.append('<div class="camera_pag"></div>');
        }
        wrap.append('<div class="camera_loader"></div>');
        $('.camera_caption', wrap).each(function () {
            $(this).wrapInner('<div />');
        });
        var pieID = 'pie_' + wrap.index(), elem = $('.camera_src', wrap), target = $('.camera_target', wrap), content = $('.camera_target_content', wrap), pieContainer = $('.camera_pie', wrap), barContainer = $('.camera_bar', wrap), prevNav = $('.camera_prev', wrap), nextNav = $('.camera_next', wrap), commands = $('.camera_commands', wrap), pagination = $('.camera_pag', wrap), thumbs = $('.camera_thumbs_cont', wrap);
        var w, h;
        var allImg = new Array();
        $('> div', elem).each(function () {
            allImg.push($(this).attr('data-src'));
        });
        var allLinks = new Array();
        $('> div', elem).each(function () {
            if ($(this).attr('data-link')) {
                allLinks.push($(this).attr('data-link'));
            } else {
                allLinks.push('');
            }
        });
        var allTargets = new Array();
        $('> div', elem).each(function () {
            if ($(this).attr('data-target')) {
                allTargets.push($(this).attr('data-target'));
            } else {
                allTargets.push('');
            }
        });
        var allPor = new Array();
        $('> div', elem).each(function () {
            if ($(this).attr('data-portrait')) {
                allPor.push($(this).attr('data-portrait'));
            } else {
                allPor.push('');
            }
        });
        var allAlign = new Array();
        $('> div', elem).each(function () {
            if ($(this).attr('data-alignment')) {
                allAlign.push($(this).attr('data-alignment'));
            } else {
                allAlign.push('');
            }
        });
        var allThumbs = new Array();
        $('> div', elem).each(function () {
            if ($(this).attr('data-thumb')) {
                allThumbs.push($(this).attr('data-thumb'));
            } else {
                allThumbs.push('');
            }
        });
        var amountSlide = allImg.length;
        $(content).append('<div class="cameraContents" />');
        var loopMove;
        for (loopMove = 0; loopMove < amountSlide; loopMove++) {
            $('.cameraContents', content).append('<div class="cameraContent" />');
            if (allLinks[loopMove] != '') {
                var dataBox = $('> div ', elem).eq(loopMove).attr('data-box');
                if (typeof dataBox !== 'undefined' && dataBox !== false && dataBox != '') {
                    dataBox = 'data-box="' + $('> div ', elem).eq(loopMove).attr('data-box') + '"';
                } else {
                    dataBox = '';
                }
                $('.camera_target_content .cameraContent:eq(' + loopMove + ')', wrap).append('<a class="camera_link" href="' + allLinks[loopMove] + '" ' + dataBox + ' target="' + allTargets[loopMove] + '"></a>');
            }
        }
        $('.camera_caption', wrap).each(function () {
            var ind = $(this).parent().index(), cont = wrap.find('.cameraContent').eq(ind);
            $(this).appendTo(cont);
        });
        target.append('<div class="cameraCont" />');
        var cameraCont = $('.cameraCont', wrap);
        var loop;
        for (loop = 0; loop < amountSlide; loop++) {
            cameraCont.append('<div class="cameraSlide cameraSlide_' + loop + '" />');
            var div = $('> div:eq(' + loop + ')', elem);
            target.find('.cameraSlide_' + loop).clone(div);
        }
        function thumbnailVisible() {
            var wTh = $(thumbs).width();
            $('li', thumbs).removeClass('camera_visThumb');
            $('li', thumbs).each(function () {
                var pos = $(this).position(), ulW = $('ul', thumbs).outerWidth(), offUl = $('ul', thumbs).offset().left, offDiv = $('> div', thumbs).offset().left, ulLeft = offDiv - offUl;
                if (ulLeft > 0) {
                    $('.camera_prevThumbs', camera_thumbs_wrap).removeClass('hideNav');
                } else {
                    $('.camera_prevThumbs', camera_thumbs_wrap).addClass('hideNav');
                }
                if ((ulW - ulLeft) > wTh) {
                    $('.camera_nextThumbs', camera_thumbs_wrap).removeClass('hideNav');
                } else {
                    $('.camera_nextThumbs', camera_thumbs_wrap).addClass('hideNav');
                }
                var left = pos.left, right = pos.left + ($(this).width());
                if (right - ulLeft <= wTh && left - ulLeft >= 0) {
                    $(this).addClass('camera_visThumb');
                }
            });
        }

        $(window).bind('load resize pageshow', function () {
            thumbnailPos();
            thumbnailVisible();
        });
        cameraCont.append('<div class="cameraSlide cameraSlide_' + loop + '" />');
        var started;
        wrap.show();
        var w = target.width();
        var h = target.height();
        var setPause;
        $(window).bind('resize pageshow', function () {
            if (started == true) {
                resizeImage();
            }
            $('ul', thumbs).animate({'margin-top': 0}, 0, thumbnailPos);
            if (!elem.hasClass('paused')) {
                elem.addClass('paused');
                if ($('.camera_stop', camera_thumbs_wrap).length) {
                    $('.camera_stop', camera_thumbs_wrap).hide()
                    $('.camera_play', camera_thumbs_wrap).show();
                    if (loader != 'none') {
                        $('#' + pieID).hide();
                    }
                } else {
                    if (loader != 'none') {
                        $('#' + pieID).hide();
                    }
                }
                clearTimeout(setPause);
                setPause = setTimeout(function () {
                    elem.removeClass('paused');
                    if ($('.camera_play', camera_thumbs_wrap).length) {
                        $('.camera_play', camera_thumbs_wrap).hide();
                        $('.camera_stop', camera_thumbs_wrap).show();
                        if (loader != 'none') {
                            $('#' + pieID).fadeIn();
                        }
                    } else {
                        if (loader != 'none') {
                            $('#' + pieID).fadeIn();
                        }
                    }
                }, 1500);
            }
        });
        function resizeImage() {
            var res;

            function resizeImageWork() {
                w = wrap.width();
                if (opts.height.indexOf('%') != -1) {
                    var startH = Math.round(w / (100 / parseFloat(opts.height)));
                    if (opts.minHeight != '' && startH < parseFloat(opts.minHeight)) {
                        h = parseFloat(opts.minHeight);
                    } else {
                        h = startH;
                    }
                    wrap.css({height: h});
                } else if (opts.height == 'auto') {
                    h = wrap.height();
                } else {
                    h = parseFloat(opts.height);
                    wrap.css({height: h});
                }
                $('.camerarelative', target).css({'width': w, 'height': h});
                $('.imgLoaded', target).each(function () {
                    var t = $(this), wT = t.attr('width'), hT = t.attr('height'), imgLoadIn = t.index(), mTop, mLeft, alignment = t.attr('data-alignment'), portrait = t.attr('data-portrait');
                    if (typeof alignment === 'undefined' || alignment === false || alignment === '') {
                        alignment = opts.alignment;
                    }
                    if (typeof portrait === 'undefined' || portrait === false || portrait === '') {
                        portrait = opts.portrait;
                    }
                    if (portrait == false || portrait == 'false') {
                        if ((wT / hT) < (w / h)) {
                            var r = w / wT;
                            var d = (Math.abs(h - (hT * r))) * 0.5;
                            switch (alignment) {
                                case'topLeft':
                                    mTop = 0;
                                    break;
                                case'topCenter':
                                    mTop = 0;
                                    break;
                                case'topRight':
                                    mTop = 0;
                                    break;
                                case'centerLeft':
                                    mTop = '-' + d + 'px';
                                    break;
                                case'center':
                                    mTop = '-' + d + 'px';
                                    break;
                                case'centerRight':
                                    mTop = '-' + d + 'px';
                                    break;
                                case'bottomLeft':
                                    mTop = '-' + d * 2 + 'px';
                                    break;
                                case'bottomCenter':
                                    mTop = '-' + d * 2 + 'px';
                                    break;
                                case'bottomRight':
                                    mTop = '-' + d * 2 + 'px';
                                    break;
                            }
                            t.css({'height': hT * r, 'margin-left': 0, 'margin-top': mTop, 'position': 'absolute', 'visibility': 'visible', 'width': w});
                        }
                        else {
                            var r = h / hT;
                            var d = (Math.abs(w - (wT * r))) * 0.5;
                            switch (alignment) {
                                case'topLeft':
                                    mLeft = 0;
                                    break;
                                case'topCenter':
                                    mLeft = '-' + d + 'px';
                                    break;
                                case'topRight':
                                    mLeft = '-' + d * 2 + 'px';
                                    break;
                                case'centerLeft':
                                    mLeft = 0;
                                    break;
                                case'center':
                                    mLeft = '-' + d + 'px';
                                    break;
                                case'centerRight':
                                    mLeft = '-' + d * 2 + 'px';
                                    break;
                                case'bottomLeft':
                                    mLeft = 0;
                                    break;
                                case'bottomCenter':
                                    mLeft = '-' + d + 'px';
                                    break;
                                case'bottomRight':
                                    mLeft = '-' + d * 2 + 'px';
                                    break;
                            }
                            t.css({'height': h, 'margin-left': mLeft, 'margin-top': 0, 'position': 'absolute', 'visibility': 'visible', 'width': wT * r});
                        }
                    } else {
                        if ((wT / hT) < (w / h)) {
                            var r = h / hT;
                            var d = (Math.abs(w - (wT * r))) * 0.5;
                            switch (alignment) {
                                case'topLeft':
                                    mLeft = 0;
                                    break;
                                case'topCenter':
                                    mLeft = d + 'px';
                                    break;
                                case'topRight':
                                    mLeft = d * 2 + 'px';
                                    break;
                                case'centerLeft':
                                    mLeft = 0;
                                    break;
                                case'center':
                                    mLeft = d + 'px';
                                    break;
                                case'centerRight':
                                    mLeft = d * 2 + 'px';
                                    break;
                                case'bottomLeft':
                                    mLeft = 0;
                                    break;
                                case'bottomCenter':
                                    mLeft = d + 'px';
                                    break;
                                case'bottomRight':
                                    mLeft = d * 2 + 'px';
                                    break;
                            }
                            t.css({'height': h, 'margin-left': mLeft, 'margin-top': 0, 'position': 'absolute', 'visibility': 'visible', 'width': wT * r});
                        }
                        else {
                            var r = w / wT;
                            var d = (Math.abs(h - (hT * r))) * 0.5;
                            switch (alignment) {
                                case'topLeft':
                                    mTop = 0;
                                    break;
                                case'topCenter':
                                    mTop = 0;
                                    break;
                                case'topRight':
                                    mTop = 0;
                                    break;
                                case'centerLeft':
                                    mTop = d + 'px';
                                    break;
                                case'center':
                                    mTop = d + 'px';
                                    break;
                                case'centerRight':
                                    mTop = d + 'px';
                                    break;
                                case'bottomLeft':
                                    mTop = d * 2 + 'px';
                                    break;
                                case'bottomCenter':
                                    mTop = d * 2 + 'px';
                                    break;
                                case'bottomRight':
                                    mTop = d * 2 + 'px';
                                    break;
                            }
                            t.css({'height': hT * r, 'margin-left': 0, 'margin-top': mTop, 'position': 'absolute', 'visibility': 'visible', 'width': w});
                        }
                    }
                });
            }

            if (started == true) {
                clearTimeout(res);
                res = setTimeout(resizeImageWork, 200);
            } else {
                resizeImageWork();
            }
            started = true;
        }

        var u, setT;
        var clickEv, autoAdv, navHover, commands, pagination;
        var videoHover, videoPresent;
        if (isMobile() && opts.mobileAutoAdvance != '') {
            autoAdv = opts.mobileAutoAdvance;
        } else {
            autoAdv = opts.autoAdvance;
        }
        if (autoAdv == false) {
            elem.addClass('paused');
        }
        if (isMobile() && opts.mobileNavHover != '') {
            navHover = opts.mobileNavHover;
        } else {
            navHover = opts.navigationHover;
        }
        if (elem.length != 0) {
            var selector = $('.cameraSlide', target);
            selector.wrapInner('<div class="camerarelative" />');
            var navSlide;
            var barDirection = opts.barDirection;
            var camera_thumbs_wrap = wrap;
            $('iframe', fakeHover).each(function () {
                var t = $(this);
                var src = t.attr('src');
                t.attr('data-src', src);
                var divInd = t.parent().index('.camera_src > div');
                $('.camera_target_content .cameraContent:eq(' + divInd + ')', wrap).append(t);
            });
            function imgFake() {
                $('iframe', fakeHover).each(function () {
                    $('.camera_caption', fakeHover).show();
                    var t = $(this);
                    var cloneSrc = t.attr('data-src');
                    t.attr('src', cloneSrc);
                    var imgFakeUrl = opts.imagePath + 'blank.gif';
                    var imgFake = new Image();
                    imgFake.src = imgFakeUrl;
                    if (opts.height.indexOf('%') != -1) {
                        var startH = Math.round(w / (100 / parseFloat(opts.height)));
                        if (opts.minHeight != '' && startH < parseFloat(opts.minHeight)) {
                            h = parseFloat(opts.minHeight);
                        } else {
                            h = startH;
                        }
                    } else if (opts.height == 'auto') {
                        h = wrap.height();
                    } else {
                        h = parseFloat(opts.height);
                    }
                    t.after($(imgFake).attr({'class': 'imgFake', 'width': w, 'height': h}));
                    var clone = t.clone();
                    t.remove();
                    $(imgFake).bind('click', function () {
                        if ($(this).css('position') == 'absolute') {
                            $(this).remove();
                            if (cloneSrc.indexOf('vimeo') != -1 || cloneSrc.indexOf('youtube') != -1) {
                                if (cloneSrc.indexOf('?') != -1) {
                                    autoplay = '&autoplay=1';
                                } else {
                                    autoplay = '?autoplay=1';
                                }
                            } else if (cloneSrc.indexOf('dailymotion') != -1) {
                                if (cloneSrc.indexOf('?') != -1) {
                                    autoplay = '&autoPlay=1';
                                } else {
                                    autoplay = '?autoPlay=1';
                                }
                            }
                            clone.attr('src', cloneSrc + autoplay);
                            videoPresent = true;
                        } else {
                            $(this).css({position: 'absolute', top: 0, left: 0, zIndex: 10}).after(clone);
                            clone.css({position: 'absolute', top: 0, left: 0, zIndex: 9});
                        }
                    });
                });
            }

            imgFake();
            if (opts.hover == true) {
                if (!isMobile()) {
                    fakeHover.hover(function () {
                        elem.addClass('hovered');
                    }, function () {
                        elem.removeClass('hovered');
                    });
                }
            }
            if (navHover == true) {
                $(prevNav, wrap).animate({opacity: 0}, 0);
                $(nextNav, wrap).animate({opacity: 0}, 0);
                $(commands, wrap).animate({opacity: 0}, 0);
                if (isMobile()) {
                    $(document).on('vmouseover', fakeHover, function () {
                        $(prevNav, wrap).animate({opacity: 1}, 200);
                        $(nextNav, wrap).animate({opacity: 1}, 200);
                        $(commands, wrap).animate({opacity: 1}, 200);
                    });
                    $(document).on('vmouseout', fakeHover, function () {
                        $(prevNav, wrap).delay(500).animate({opacity: 0}, 200);
                        $(nextNav, wrap).delay(500).animate({opacity: 0}, 200);
                        $(commands, wrap).delay(500).animate({opacity: 0}, 200);
                    });
                } else {
                    fakeHover.hover(function () {
                        $(prevNav, wrap).animate({opacity: 1}, 200);
                        $(nextNav, wrap).animate({opacity: 1}, 200);
                        $(commands, wrap).animate({opacity: 1}, 200);
                    }, function () {
                        $(prevNav, wrap).animate({opacity: 0}, 200);
                        $(nextNav, wrap).animate({opacity: 0}, 200);
                        $(commands, wrap).animate({opacity: 0}, 200);
                    });
                }
            }
            $(camera_thumbs_wrap).on('click', '.camera_stop', function () {
                autoAdv = false;
                elem.addClass('paused');
                if ($('.camera_stop', camera_thumbs_wrap).length) {
                    $('.camera_stop', camera_thumbs_wrap).hide()
                    $('.camera_play', camera_thumbs_wrap).show();
                    if (loader != 'none') {
                        $('#' + pieID).hide();
                    }
                } else {
                    if (loader != 'none') {
                        $('#' + pieID).hide();
                    }
                }
            });
            $(camera_thumbs_wrap).on('click', '.camera_play', function () {
                autoAdv = true;
                elem.removeClass('paused');
                if ($('.camera_play', camera_thumbs_wrap).length) {
                    $('.camera_play', camera_thumbs_wrap).hide();
                    $('.camera_stop', camera_thumbs_wrap).show();
                    if (loader != 'none') {
                        $('#' + pieID).show();
                    }
                } else {
                    if (loader != 'none') {
                        $('#' + pieID).show();
                    }
                }
            });
            if (opts.pauseOnClick == true) {
                $('.camera_target_content', fakeHover).mouseup(function () {
                    autoAdv = false;
                    elem.addClass('paused');
                    $('.camera_stop', camera_thumbs_wrap).hide()
                    $('.camera_play', camera_thumbs_wrap).show();
                    $('#' + pieID).hide();
                });
            }
            $('.cameraContent, .imgFake', fakeHover).hover(function () {
                videoHover = true;
            }, function () {
                videoHover = false;
            });
            $('.cameraContent, .imgFake', fakeHover).bind('click', function () {
                if (videoPresent == true && videoHover == true) {
                    autoAdv = false;
                    $('.camera_caption', fakeHover).hide();
                    elem.addClass('paused');
                    $('.camera_stop', camera_thumbs_wrap).hide()
                    $('.camera_play', camera_thumbs_wrap).show();
                    $('#' + pieID).hide();
                }
            });
        }
        function shuffle(arr) {
            for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            return arr;
        }

        function isInteger(s) {
            return Math.ceil(s) == Math.floor(s);
        }

        if (loader != 'pie') {
            barContainer.append('<span class="camera_bar_cont" />');
            $('.camera_bar_cont', barContainer).animate({opacity: opts.loaderOpacity}, 0).css({'position': 'absolute', 'left': 0, 'right': 0, 'top': 0, 'bottom': 0, 'background-color': opts.loaderBgColor}).append('<span id="' + pieID + '" />');
            $('#' + pieID).animate({opacity: 0}, 0);
            var canvas = $('#' + pieID);
            canvas.css({'position': 'absolute', 'background-color': opts.loaderColor});
            switch (opts.barPosition) {
                case'left':
                    barContainer.css({right: 'auto', width: opts.loaderStroke});
                    break;
                case'right':
                    barContainer.css({left: 'auto', width: opts.loaderStroke});
                    break;
                case'top':
                    barContainer.css({bottom: 'auto', height: opts.loaderStroke});
                    break;
                case'bottom':
                    barContainer.css({top: 'auto', height: opts.loaderStroke});
                    break;
            }
            switch (barDirection) {
                case'leftToRight':
                    canvas.css({'left': 0, 'right': 0, 'top': opts.loaderPadding, 'bottom': opts.loaderPadding});
                    break;
                case'rightToLeft':
                    canvas.css({'left': 0, 'right': 0, 'top': opts.loaderPadding, 'bottom': opts.loaderPadding});
                    break;
                case'topToBottom':
                    canvas.css({'left': opts.loaderPadding, 'right': opts.loaderPadding, 'top': 0, 'bottom': 0});
                    break;
                case'bottomToTop':
                    canvas.css({'left': opts.loaderPadding, 'right': opts.loaderPadding, 'top': 0, 'bottom': 0});
                    break;
            }
        } else {
            pieContainer.append('<canvas id="' + pieID + '"></canvas>');
            var G_vmlCanvasManager;
            var canvas = document.getElementById(pieID);
            canvas.setAttribute("width", opts.pieDiameter);
            canvas.setAttribute("height", opts.pieDiameter);
            var piePosition;
            switch (opts.piePosition) {
                case'leftTop':
                    piePosition = 'left:0; top:0;';
                    break;
                case'rightTop':
                    piePosition = 'right:0; top:0;';
                    break;
                case'leftBottom':
                    piePosition = 'left:0; bottom:0;';
                    break;
                case'rightBottom':
                    piePosition = 'right:0; bottom:0;';
                    break;
            }
            canvas.setAttribute("style", "position:absolute; z-index:1002; " + piePosition);
            var rad;
            var radNew;
            if (canvas && canvas.getContext) {
                var ctx = canvas.getContext("2d");
                ctx.rotate(Math.PI * (3 / 2));
                ctx.translate(-opts.pieDiameter, 0);
            }
        }
        if (loader == 'none' || autoAdv == false) {
            $('#' + pieID).hide();
            $('.camera_canvas_wrap', camera_thumbs_wrap).hide();
        }
        if ($(pagination).length) {
            $(pagination).append('<ul class="camera_pag_ul" />');
            var li;
            for (li = 0; li < amountSlide; li++) {
                $('.camera_pag_ul', wrap).append('<li class="pag_nav_' + li + '" style="position:relative; z-index:1002"><span><span>' + li + '</span></span></li>');
            }
            $('.camera_pag_ul li', wrap).hover(function () {
                $(this).addClass('camera_hover');
                if ($('.camera_thumb', this).length) {
                    var wTh = $('.camera_thumb', this).outerWidth(), hTh = $('.camera_thumb', this).outerHeight(), wTt = $(this).outerWidth();
                    $('.camera_thumb', this).show().css({'top': '-' + hTh + 'px', 'left': '-' + (wTh - wTt) / 2 + 'px'}).animate({'opacity': 1, 'margin-top': '-3px'}, 200);
                    $('.thumb_arrow', this).show().animate({'opacity': 1, 'margin-top': '-3px'}, 200);
                }
            }, function () {
                $(this).removeClass('camera_hover');
                $('.camera_thumb', this).animate({'margin-top': '-20px', 'opacity': 0}, 200, function () {
                    $(this).css({marginTop: '5px'}).hide();
                });
                $('.thumb_arrow', this).animate({'margin-top': '-20px', 'opacity': 0}, 200, function () {
                    $(this).css({marginTop: '5px'}).hide();
                });
            });
        }
        if ($(thumbs).length) {
            var thumbUrl;
            if (!$(pagination).length) {
                $(thumbs).append('<div />');
                $(thumbs).before('<div class="camera_prevThumbs hideNav"><div></div></div>').before('<div class="camera_nextThumbs hideNav"><div></div></div>');
                $('> div', thumbs).append('<ul />');
                $.each(allThumbs, function (i, val) {
                    if ($('> div', elem).eq(i).attr('data-thumb') != '') {
                        var thumbUrl = $('> div', elem).eq(i).attr('data-thumb'), newImg = new Image();
                        newImg.src = thumbUrl;
                        $('ul', thumbs).append('<li class="pix_thumb pix_thumb_' + i + '" />');
                        $('li.pix_thumb_' + i, thumbs).append($(newImg).attr('class', 'camera_thumb'));
                    }
                });
            } else {
                $.each(allThumbs, function (i, val) {
                    if ($('> div', elem).eq(i).attr('data-thumb') != '') {
                        var thumbUrl = $('> div', elem).eq(i).attr('data-thumb'), newImg = new Image();
                        newImg.src = thumbUrl;
                        $('li.pag_nav_' + i, pagination).append($(newImg).attr('class', 'camera_thumb').css({'position': 'absolute'}).animate({opacity: 0}, 0));
                        $('li.pag_nav_' + i + ' > img', pagination).after('<div class="thumb_arrow" />');
                        $('li.pag_nav_' + i + ' > .thumb_arrow', pagination).animate({opacity: 0}, 0);
                    }
                });
                wrap.css({marginBottom: $(pagination).outerHeight()});
            }
        } else if (!$(thumbs).length && $(pagination).length) {
            wrap.css({marginBottom: $(pagination).outerHeight()});
        }
        var firstPos = true;

        function thumbnailPos() {
            if ($(thumbs).length && !$(pagination).length) {
                var wTh = $(thumbs).outerWidth(), owTh = $('ul > li', thumbs).outerWidth(), pos = $('li.cameracurrent', thumbs).length ? $('li.cameracurrent', thumbs).position() : '', ulW = ($('ul > li', thumbs).length * $('ul > li', thumbs).outerWidth()), offUl = $('ul', thumbs).offset().left, offDiv = $('> div', thumbs).offset().left, ulLeft;
                if (offUl < 0) {
                    ulLeft = '-' + (offDiv - offUl);
                } else {
                    ulLeft = offDiv - offUl;
                }
                if (firstPos == true) {
                    $('ul', thumbs).width($('ul > li', thumbs).length * $('ul > li', thumbs).outerWidth());
                    if ($(thumbs).length && !$(pagination).lenght) {
                        wrap.css({marginBottom: $(thumbs).outerHeight()});
                    }
                    thumbnailVisible();
                    $('ul', thumbs).width($('ul > li', thumbs).length * $('ul > li', thumbs).outerWidth());
                    if ($(thumbs).length && !$(pagination).lenght) {
                        wrap.css({marginBottom: $(thumbs).outerHeight()});
                    }
                }
                firstPos = false;
                var left = $('li.cameracurrent', thumbs).length ? pos.left : '', right = $('li.cameracurrent', thumbs).length ? pos.left + ($('li.cameracurrent', thumbs).outerWidth()) : '';
                if (left < $('li.cameracurrent', thumbs).outerWidth()) {
                    left = 0;
                }
                if (right - ulLeft > wTh) {
                    if ((left + wTh) < ulW) {
                        $('ul', thumbs).animate({'margin-left': '-' + (left) + 'px'}, 500, thumbnailVisible);
                    } else {
                        $('ul', thumbs).animate({'margin-left': '-' + ($('ul', thumbs).outerWidth() - wTh) + 'px'}, 500, thumbnailVisible);
                    }
                } else if (left - ulLeft < 0) {
                    $('ul', thumbs).animate({'margin-left': '-' + (left) + 'px'}, 500, thumbnailVisible);
                } else {
                    $('ul', thumbs).css({'margin-left': 'auto', 'margin-right': 'auto'});
                    setTimeout(thumbnailVisible, 100);
                }
            }
        }

        if ($(commands).length) {
            $(commands).append('<div class="camera_play"></div>').append('<div class="camera_stop"></div>');
            if (autoAdv == true) {
                $('.camera_play', camera_thumbs_wrap).hide();
                $('.camera_stop', camera_thumbs_wrap).show();
            } else {
                $('.camera_stop', camera_thumbs_wrap).hide();
                $('.camera_play', camera_thumbs_wrap).show();
            }
        }
        function canvasLoader() {
            rad = 0;
            var barWidth = $('.camera_bar_cont', camera_thumbs_wrap).width(), barHeight = $('.camera_bar_cont', camera_thumbs_wrap).height();
            if (loader != 'pie') {
                switch (barDirection) {
                    case'leftToRight':
                        $('#' + pieID).css({'right': barWidth});
                        break;
                    case'rightToLeft':
                        $('#' + pieID).css({'left': barWidth});
                        break;
                    case'topToBottom':
                        $('#' + pieID).css({'bottom': barHeight});
                        break;
                    case'bottomToTop':
                        $('#' + pieID).css({'top': barHeight});
                        break;
                }
            } else {
                ctx.clearRect(0, 0, opts.pieDiameter, opts.pieDiameter);
            }
        }

        canvasLoader();
        $('.moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom', fakeHover).each(function () {
            $(this).css('visibility', 'hidden');
        });
        opts.onStartLoading.call(this);
        nextSlide();
        function nextSlide(navSlide) {
            elem.addClass('camerasliding');
            videoPresent = false;
            var vis = parseFloat($('div.cameraSlide.cameracurrent', target).index());
            if (navSlide > 0) {
                var slideI = navSlide - 1;
            } else if (vis == amountSlide - 1) {
                var slideI = 0;
            } else {
                var slideI = vis + 1;
            }
            var slide = $('.cameraSlide:eq(' + slideI + ')', target);
            var slideNext = $('.cameraSlide:eq(' + (slideI + 1) + ')', target).addClass('cameranext');
            if (vis != slideI + 1) {
                slideNext.hide();
            }
            $('.cameraContent', fakeHover).fadeOut(600);
            $('.camera_caption', fakeHover).show();
            $('.camerarelative', slide).append($('> div ', elem).eq(slideI).find('> div.camera_effected'));
            $('.camera_target_content .cameraContent:eq(' + slideI + ')', wrap).append($('> div ', elem).eq(slideI).find('> div'));
            if (!$('.imgLoaded', slide).length) {
                var imgUrl = allImg[slideI];
                var imgLoaded = new Image();
                imgLoaded.src = imgUrl + "?" + new Date().getTime();
                slide.css('visibility', 'hidden');
                slide.prepend($(imgLoaded).attr('class', 'imgLoaded').css('visibility', 'hidden'));
                var wT, hT;
                if (!$(imgLoaded).get(0).complete || wT == '0' || hT == '0' || typeof wT === 'undefined' || wT === false || typeof hT === 'undefined' || hT === false) {
                    $('.camera_loader', wrap).delay(500).fadeIn(400);
                    imgLoaded.onload = function () {
                        wT = imgLoaded.naturalWidth;
                        hT = imgLoaded.naturalHeight;
                        $(imgLoaded).attr('data-alignment', allAlign[slideI]).attr('data-portrait', allPor[slideI]);
                        $(imgLoaded).attr('width', wT);
                        $(imgLoaded).attr('height', hT);
                        target.find('.cameraSlide_' + slideI).hide().css('visibility', 'visible');
                        resizeImage();
                        nextSlide(slideI + 1);
                    };
                }
            } else {
                if (allImg.length > (slideI + 1) && !$('.imgLoaded', slideNext).length) {
                    var imgUrl2 = allImg[(slideI + 1)];
                    var imgLoaded2 = new Image();
                    imgLoaded2.src = imgUrl2 + "?" + new Date().getTime();
                    slideNext.prepend($(imgLoaded2).attr('class', 'imgLoaded').css('visibility', 'hidden'));
                    imgLoaded2.onload = function () {
                        wT = imgLoaded2.naturalWidth;
                        hT = imgLoaded2.naturalHeight;
                        $(imgLoaded2).attr('data-alignment', allAlign[slideI + 1]).attr('data-portrait', allPor[slideI + 1]);
                        $(imgLoaded2).attr('width', wT);
                        $(imgLoaded2).attr('height', hT);
                        resizeImage();
                    };
                }
                opts.onLoaded.call(this);
                if ($('.camera_loader', wrap).is(':visible')) {
                    $('.camera_loader', wrap).fadeOut(400);
                } else {
                    $('.camera_loader', wrap).css({'visibility': 'hidden'});
                    $('.camera_loader', wrap).fadeOut(400, function () {
                        $('.camera_loader', wrap).css({'visibility': 'visible'});
                    });
                }
                var rows = opts.rows, cols = opts.cols, couples = 1, difference = 0, dataSlideOn, time, transPeriod, fx, easing, randomFx = new Array('simpleFade', 'curtainTopLeft', 'curtainTopRight', 'curtainBottomLeft', 'curtainBottomRight', 'curtainSliceLeft', 'curtainSliceRight', 'blindCurtainTopLeft', 'blindCurtainTopRight', 'blindCurtainBottomLeft', 'blindCurtainBottomRight', 'blindCurtainSliceBottom', 'blindCurtainSliceTop', 'stampede', 'mosaic', 'mosaicReverse', 'mosaicRandom', 'mosaicSpiral', 'mosaicSpiralReverse', 'topLeftBottomRight', 'bottomRightTopLeft', 'bottomLeftTopRight', 'topRightBottomLeft', 'scrollLeft', 'scrollRight', 'scrollTop', 'scrollBottom', 'scrollHorz');
                marginLeft = 0, marginTop = 0, opacityOnGrid = 0;
                if (opts.opacityOnGrid == true) {
                    opacityOnGrid = 0;
                } else {
                    opacityOnGrid = 1;
                }
                var dataFx = $(' > div', elem).eq(slideI).attr('data-fx');
                if (isMobile() && opts.mobileFx != '' && opts.mobileFx != 'default') {
                    fx = opts.mobileFx;
                } else {
                    if (typeof dataFx !== 'undefined' && dataFx !== false && dataFx !== 'default') {
                        fx = dataFx;
                    } else {
                        fx = opts.fx;
                    }
                }
                if (fx == 'random') {
                    fx = shuffle(randomFx);
                    fx = fx[0];
                } else {
                    fx = fx;
                    if (fx.indexOf(',') > 0) {
                        fx = fx.replace(/ /g, '');
                        fx = fx.split(',');
                        fx = shuffle(fx);
                        fx = fx[0];
                    }
                }
                dataEasing = $(' > div', elem).eq(slideI).attr('data-easing');
                mobileEasing = $(' > div', elem).eq(slideI).attr('data-mobileEasing');
                if (isMobile() && opts.mobileEasing != '' && opts.mobileEasing != 'default') {
                    if (typeof mobileEasing !== 'undefined' && mobileEasing !== false && mobileEasing !== 'default') {
                        easing = mobileEasing;
                    } else {
                        easing = opts.mobileEasing;
                    }
                } else {
                    if (typeof dataEasing !== 'undefined' && dataEasing !== false && dataEasing !== 'default') {
                        easing = dataEasing;
                    } else {
                        easing = opts.easing;
                    }
                }
                dataSlideOn = $(' > div', elem).eq(slideI).attr('data-slideOn');
                if (typeof dataSlideOn !== 'undefined' && dataSlideOn !== false) {
                    slideOn = dataSlideOn;
                } else {
                    if (opts.slideOn == 'random') {
                        var slideOn = new Array('next', 'prev');
                        slideOn = shuffle(slideOn);
                        slideOn = slideOn[0];
                    } else {
                        slideOn = opts.slideOn;
                    }
                }
                var dataTime = $(' > div', elem).eq(slideI).attr('data-time');
                if (typeof dataTime !== 'undefined' && dataTime !== false && dataTime !== '') {
                    time = parseFloat(dataTime);
                } else {
                    time = opts.time;
                }
                var dataTransPeriod = $(' > div', elem).eq(slideI).attr('data-transPeriod');
                if (typeof dataTransPeriod !== 'undefined' && dataTransPeriod !== false && dataTransPeriod !== '') {
                    transPeriod = parseFloat(dataTransPeriod);
                } else {
                    transPeriod = opts.transPeriod;
                }
                if (!$(elem).hasClass('camerastarted')) {
                    fx = 'simpleFade';
                    slideOn = 'next';
                    easing = '';
                    transPeriod = 400;
                    $(elem).addClass('camerastarted')
                }
                switch (fx) {
                    case'simpleFade':
                        cols = 1;
                        rows = 1;
                        break;
                    case'curtainTopLeft':
                        if (opts.slicedCols == 0) {
                            cols = opts.cols;
                        } else {
                            cols = opts.slicedCols;
                        }
                        rows = 1;
                        break;
                    case'curtainTopRight':
                        if (opts.slicedCols == 0) {
                            cols = opts.cols;
                        } else {
                            cols = opts.slicedCols;
                        }
                        rows = 1;
                        break;
                    case'curtainBottomLeft':
                        if (opts.slicedCols == 0) {
                            cols = opts.cols;
                        } else {
                            cols = opts.slicedCols;
                        }
                        rows = 1;
                        break;
                    case'curtainBottomRight':
                        if (opts.slicedCols == 0) {
                            cols = opts.cols;
                        } else {
                            cols = opts.slicedCols;
                        }
                        rows = 1;
                        break;
                    case'curtainSliceLeft':
                        if (opts.slicedCols == 0) {
                            cols = opts.cols;
                        } else {
                            cols = opts.slicedCols;
                        }
                        rows = 1;
                        break;
                    case'curtainSliceRight':
                        if (opts.slicedCols == 0) {
                            cols = opts.cols;
                        } else {
                            cols = opts.slicedCols;
                        }
                        rows = 1;
                        break;
                    case'blindCurtainTopLeft':
                        if (opts.slicedRows == 0) {
                            rows = opts.rows;
                        } else {
                            rows = opts.slicedRows;
                        }
                        cols = 1;
                        break;
                    case'blindCurtainTopRight':
                        if (opts.slicedRows == 0) {
                            rows = opts.rows;
                        } else {
                            rows = opts.slicedRows;
                        }
                        cols = 1;
                        break;
                    case'blindCurtainBottomLeft':
                        if (opts.slicedRows == 0) {
                            rows = opts.rows;
                        } else {
                            rows = opts.slicedRows;
                        }
                        cols = 1;
                        break;
                    case'blindCurtainBottomRight':
                        if (opts.slicedRows == 0) {
                            rows = opts.rows;
                        } else {
                            rows = opts.slicedRows;
                        }
                        cols = 1;
                        break;
                    case'blindCurtainSliceTop':
                        if (opts.slicedRows == 0) {
                            rows = opts.rows;
                        } else {
                            rows = opts.slicedRows;
                        }
                        cols = 1;
                        break;
                    case'blindCurtainSliceBottom':
                        if (opts.slicedRows == 0) {
                            rows = opts.rows;
                        } else {
                            rows = opts.slicedRows;
                        }
                        cols = 1;
                        break;
                    case'stampede':
                        difference = '-' + transPeriod;
                        break;
                    case'mosaic':
                        difference = opts.gridDifference;
                        break;
                    case'mosaicReverse':
                        difference = opts.gridDifference;
                        break;
                    case'mosaicRandom':
                        break;
                    case'mosaicSpiral':
                        difference = opts.gridDifference;
                        couples = 1.7;
                        break;
                    case'mosaicSpiralReverse':
                        difference = opts.gridDifference;
                        couples = 1.7;
                        break;
                    case'topLeftBottomRight':
                        difference = opts.gridDifference;
                        couples = 6;
                        break;
                    case'bottomRightTopLeft':
                        difference = opts.gridDifference;
                        couples = 6;
                        break;
                    case'bottomLeftTopRight':
                        difference = opts.gridDifference;
                        couples = 6;
                        break;
                    case'topRightBottomLeft':
                        difference = opts.gridDifference;
                        couples = 6;
                        break;
                    case'scrollLeft':
                        cols = 1;
                        rows = 1;
                        break;
                    case'scrollRight':
                        cols = 1;
                        rows = 1;
                        break;
                    case'scrollTop':
                        cols = 1;
                        rows = 1;
                        break;
                    case'scrollBottom':
                        cols = 1;
                        rows = 1;
                        break;
                    case'scrollHorz':
                        cols = 1;
                        rows = 1;
                        break;
                }
                var cycle = 0;
                var blocks = rows * cols;
                var leftScrap = w - (Math.floor(w / cols) * cols);
                var topScrap = h - (Math.floor(h / rows) * rows);
                var addLeft;
                var addTop;
                var tAppW = 0;
                var tAppH = 0;
                var arr = new Array();
                var delay = new Array();
                var order = new Array();
                while (cycle < blocks) {
                    arr.push(cycle);
                    delay.push(cycle);
                    cameraCont.append('<div class="cameraappended" style="display:none; overflow:hidden; position:absolute; z-index:1000" />');
                    var tApp = $('.cameraappended:eq(' + cycle + ')', target);
                    if (fx == 'scrollLeft' || fx == 'scrollRight' || fx == 'scrollTop' || fx == 'scrollBottom' || fx == 'scrollHorz') {
                        selector.eq(slideI).clone().show().appendTo(tApp);
                    } else {
                        if (slideOn == 'next') {
                            selector.eq(slideI).clone().show().appendTo(tApp);
                        } else {
                            selector.eq(vis).clone().show().appendTo(tApp);
                        }
                    }
                    if (cycle % cols < leftScrap) {
                        addLeft = 1;
                    } else {
                        addLeft = 0;
                    }
                    if (cycle % cols == 0) {
                        tAppW = 0;
                    }
                    if (Math.floor(cycle / cols) < topScrap) {
                        addTop = 1;
                    } else {
                        addTop = 0;
                    }
                    tApp.css({'height': Math.floor((h / rows) + addTop + 1), 'left': tAppW, 'top': tAppH, 'width': Math.floor((w / cols) + addLeft + 1)});
                    $('> .cameraSlide', tApp).css({'height': h, 'margin-left': '-' + tAppW + 'px', 'margin-top': '-' + tAppH + 'px', 'width': w});
                    tAppW = tAppW + tApp.width() - 1;
                    if (cycle % cols == cols - 1) {
                        tAppH = tAppH + tApp.height() - 1;
                    }
                    cycle++;
                }
                switch (fx) {
                    case'curtainTopLeft':
                        break;
                    case'curtainBottomLeft':
                        break;
                    case'curtainSliceLeft':
                        break;
                    case'curtainTopRight':
                        arr = arr.reverse();
                        break;
                    case'curtainBottomRight':
                        arr = arr.reverse();
                        break;
                    case'curtainSliceRight':
                        arr = arr.reverse();
                        break;
                    case'blindCurtainTopLeft':
                        break;
                    case'blindCurtainBottomLeft':
                        arr = arr.reverse();
                        break;
                    case'blindCurtainSliceTop':
                        break;
                    case'blindCurtainTopRight':
                        break;
                    case'blindCurtainBottomRight':
                        arr = arr.reverse();
                        break;
                    case'blindCurtainSliceBottom':
                        arr = arr.reverse();
                        break;
                    case'stampede':
                        arr = shuffle(arr);
                        break;
                    case'mosaic':
                        break;
                    case'mosaicReverse':
                        arr = arr.reverse();
                        break;
                    case'mosaicRandom':
                        arr = shuffle(arr);
                        break;
                    case'mosaicSpiral':
                        var rows2 = rows / 2, x, y, z, n = 0;
                        for (z = 0; z < rows2; z++) {
                            y = z;
                            for (x = z; x < cols - z - 1; x++) {
                                order[n++] = y * cols + x;
                            }
                            x = cols - z - 1;
                            for (y = z; y < rows - z - 1; y++) {
                                order[n++] = y * cols + x;
                            }
                            y = rows - z - 1;
                            for (x = cols - z - 1; x > z; x--) {
                                order[n++] = y * cols + x;
                            }
                            x = z;
                            for (y = rows - z - 1; y > z; y--) {
                                order[n++] = y * cols + x;
                            }
                        }
                        arr = order;
                        break;
                    case'mosaicSpiralReverse':
                        var rows2 = rows / 2, x, y, z, n = blocks - 1;
                        for (z = 0; z < rows2; z++) {
                            y = z;
                            for (x = z; x < cols - z - 1; x++) {
                                order[n--] = y * cols + x;
                            }
                            x = cols - z - 1;
                            for (y = z; y < rows - z - 1; y++) {
                                order[n--] = y * cols + x;
                            }
                            y = rows - z - 1;
                            for (x = cols - z - 1; x > z; x--) {
                                order[n--] = y * cols + x;
                            }
                            x = z;
                            for (y = rows - z - 1; y > z; y--) {
                                order[n--] = y * cols + x;
                            }
                        }
                        arr = order;
                        break;
                    case'topLeftBottomRight':
                        for (var y = 0; y < rows; y++)
                            for (var x = 0; x < cols; x++) {
                                order.push(x + y);
                            }
                        delay = order;
                        break;
                    case'bottomRightTopLeft':
                        for (var y = 0; y < rows; y++)
                            for (var x = 0; x < cols; x++) {
                                order.push(x + y);
                            }
                        delay = order.reverse();
                        break;
                    case'bottomLeftTopRight':
                        for (var y = rows; y > 0; y--)
                            for (var x = 0; x < cols; x++) {
                                order.push(x + y);
                            }
                        delay = order;
                        break;
                    case'topRightBottomLeft':
                        for (var y = 0; y < rows; y++)
                            for (var x = cols; x > 0; x--) {
                                order.push(x + y);
                            }
                        delay = order;
                        break;
                }
                $.each(arr, function (index, value) {
                    if (value % cols < leftScrap) {
                        addLeft = 1;
                    } else {
                        addLeft = 0;
                    }
                    if (value % cols == 0) {
                        tAppW = 0;
                    }
                    if (Math.floor(value / cols) < topScrap) {
                        addTop = 1;
                    } else {
                        addTop = 0;
                    }
                    switch (fx) {
                        case'simpleFade':
                            height = h;
                            width = w;
                            opacityOnGrid = 0;
                            break;
                        case'curtainTopLeft':
                            height = 0, width = Math.floor((w / cols) + addLeft + 1), marginTop = '-' + Math.floor((h / rows) + addTop + 1) + 'px';
                            break;
                        case'curtainTopRight':
                            height = 0, width = Math.floor((w / cols) + addLeft + 1), marginTop = '-' + Math.floor((h / rows) + addTop + 1) + 'px';
                            break;
                        case'curtainBottomLeft':
                            height = 0, width = Math.floor((w / cols) + addLeft + 1), marginTop = Math.floor((h / rows) + addTop + 1) + 'px';
                            break;
                        case'curtainBottomRight':
                            height = 0, width = Math.floor((w / cols) + addLeft + 1), marginTop = Math.floor((h / rows) + addTop + 1) + 'px';
                            break;
                        case'curtainSliceLeft':
                            height = 0, width = Math.floor((w / cols) + addLeft + 1);
                            if (value % 2 == 0) {
                                marginTop = Math.floor((h / rows) + addTop + 1) + 'px';
                            } else {
                                marginTop = '-' + Math.floor((h / rows) + addTop + 1) + 'px';
                            }
                            break;
                        case'curtainSliceRight':
                            height = 0, width = Math.floor((w / cols) + addLeft + 1);
                            if (value % 2 == 0) {
                                marginTop = Math.floor((h / rows) + addTop + 1) + 'px';
                            } else {
                                marginTop = '-' + Math.floor((h / rows) + addTop + 1) + 'px';
                            }
                            break;
                        case'blindCurtainTopLeft':
                            height = Math.floor((h / rows) + addTop + 1), width = 0, marginLeft = '-' + Math.floor((w / cols) + addLeft + 1) + 'px';
                            break;
                        case'blindCurtainTopRight':
                            height = Math.floor((h / rows) + addTop + 1), width = 0, marginLeft = Math.floor((w / cols) + addLeft + 1) + 'px';
                            break;
                        case'blindCurtainBottomLeft':
                            height = Math.floor((h / rows) + addTop + 1), width = 0, marginLeft = '-' + Math.floor((w / cols) + addLeft + 1) + 'px';
                            break;
                        case'blindCurtainBottomRight':
                            height = Math.floor((h / rows) + addTop + 1), width = 0, marginLeft = Math.floor((w / cols) + addLeft + 1) + 'px';
                            break;
                        case'blindCurtainSliceBottom':
                            height = Math.floor((h / rows) + addTop + 1), width = 0;
                            if (value % 2 == 0) {
                                marginLeft = '-' + Math.floor((w / cols) + addLeft + 1) + 'px';
                            } else {
                                marginLeft = Math.floor((w / cols) + addLeft + 1) + 'px';
                            }
                            break;
                        case'blindCurtainSliceTop':
                            height = Math.floor((h / rows) + addTop + 1), width = 0;
                            if (value % 2 == 0) {
                                marginLeft = '-' + Math.floor((w / cols) + addLeft + 1) + 'px';
                            } else {
                                marginLeft = Math.floor((w / cols) + addLeft + 1) + 'px';
                            }
                            break;
                        case'stampede':
                            height = 0;
                            width = 0;
                            marginLeft = (w * 0.2) * (((index) % cols) - (cols - (Math.floor(cols / 2)))) + 'px';
                            marginTop = (h * 0.2) * ((Math.floor(index / cols) + 1) - (rows - (Math.floor(rows / 2)))) + 'px';
                            break;
                        case'mosaic':
                            height = 0;
                            width = 0;
                            break;
                        case'mosaicReverse':
                            height = 0;
                            width = 0;
                            marginLeft = Math.floor((w / cols) + addLeft + 1) + 'px';
                            marginTop = Math.floor((h / rows) + addTop + 1) + 'px';
                            break;
                        case'mosaicRandom':
                            height = 0;
                            width = 0;
                            marginLeft = Math.floor((w / cols) + addLeft + 1) * 0.5 + 'px';
                            marginTop = Math.floor((h / rows) + addTop + 1) * 0.5 + 'px';
                            break;
                        case'mosaicSpiral':
                            height = 0;
                            width = 0;
                            marginLeft = Math.floor((w / cols) + addLeft + 1) * 0.5 + 'px';
                            marginTop = Math.floor((h / rows) + addTop + 1) * 0.5 + 'px';
                            break;
                        case'mosaicSpiralReverse':
                            height = 0;
                            width = 0;
                            marginLeft = Math.floor((w / cols) + addLeft + 1) * 0.5 + 'px';
                            marginTop = Math.floor((h / rows) + addTop + 1) * 0.5 + 'px';
                            break;
                        case'topLeftBottomRight':
                            height = 0;
                            width = 0;
                            break;
                        case'bottomRightTopLeft':
                            height = 0;
                            width = 0;
                            marginLeft = Math.floor((w / cols) + addLeft + 1) + 'px';
                            marginTop = Math.floor((h / rows) + addTop + 1) + 'px';
                            break;
                        case'bottomLeftTopRight':
                            height = 0;
                            width = 0;
                            marginLeft = 0;
                            marginTop = Math.floor((h / rows) + addTop + 1) + 'px';
                            break;
                        case'topRightBottomLeft':
                            height = 0;
                            width = 0;
                            marginLeft = Math.floor((w / cols) + addLeft + 1) + 'px';
                            marginTop = 0;
                            break;
                        case'scrollRight':
                            height = h;
                            width = w;
                            marginLeft = -w;
                            break;
                        case'scrollLeft':
                            height = h;
                            width = w;
                            marginLeft = w;
                            break;
                        case'scrollTop':
                            height = h;
                            width = w;
                            marginTop = h;
                            break;
                        case'scrollBottom':
                            height = h;
                            width = w;
                            marginTop = -h;
                            break;
                        case'scrollHorz':
                            height = h;
                            width = w;
                            if (vis == 0 && slideI == amountSlide - 1) {
                                marginLeft = -w;
                            } else if (vis < slideI || (vis == amountSlide - 1 && slideI == 0)) {
                                marginLeft = w;
                            } else {
                                marginLeft = -w;
                            }
                            break;
                    }
                    var tApp = $('.cameraappended:eq(' + value + ')', target);
                    if (typeof u !== 'undefined') {
                        clearInterval(u);
                        clearTimeout(setT);
                        setT = setTimeout(canvasLoader, transPeriod + difference);
                    }
                    if ($(pagination).length) {
                        $('.camera_pag li', wrap).removeClass('cameracurrent');
                        $('.camera_pag li', wrap).eq(slideI).addClass('cameracurrent');
                    }
                    if ($(thumbs).length) {
                        $('li', thumbs).removeClass('cameracurrent');
                        $('li', thumbs).eq(slideI).addClass('cameracurrent');
                        $('li', thumbs).not('.cameracurrent').find('img').animate({opacity: .5}, 0);
                        $('li.cameracurrent img', thumbs).animate({opacity: 1}, 0);
                        $('li', thumbs).hover(function () {
                            $('img', this).stop(true, false).animate({opacity: 1}, 150);
                        }, function () {
                            if (!$(this).hasClass('cameracurrent')) {
                                $('img', this).stop(true, false).animate({opacity: .5}, 150);
                            }
                        });
                    }
                    var easedTime = parseFloat(transPeriod) + parseFloat(difference);

                    function cameraeased() {
                        $(this).addClass('cameraeased');
                        if ($('.cameraeased', target).length >= 0) {
                            $(thumbs).css({visibility: 'visible'});
                        }
                        if ($('.cameraeased', target).length == blocks) {
                            thumbnailPos();
                            $('.moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom', fakeHover).each(function () {
                                $(this).css('visibility', 'hidden');
                            });
                            selector.eq(slideI).show().css('z-index', '999').removeClass('cameranext').addClass('cameracurrent');
                            selector.eq(vis).css('z-index', '1').removeClass('cameracurrent');
                            $('.cameraContent', fakeHover).eq(slideI).addClass('cameracurrent');
                            if (vis >= 0) {
                                $('.cameraContent', fakeHover).eq(vis).removeClass('cameracurrent');
                            }
                            opts.onEndTransition.call(this);
                            if ($('> div', elem).eq(slideI).attr('data-video') != 'hide' && $('.cameraContent.cameracurrent .imgFake', fakeHover).length) {
                                $('.cameraContent.cameracurrent .imgFake', fakeHover).click();
                            }
                            var lMoveIn = selector.eq(slideI).find('.fadeIn').length;
                            var lMoveInContent = $('.cameraContent', fakeHover).eq(slideI).find('.moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom').length;
                            if (lMoveIn != 0) {
                                $('.cameraSlide.cameracurrent .fadeIn', fakeHover).each(function () {
                                    if ($(this).attr('data-easing') != '') {
                                        var easeMove = $(this).attr('data-easing');
                                    } else {
                                        var easeMove = easing;
                                    }
                                    var t = $(this);
                                    if (typeof t.attr('data-outerWidth') === 'undefined' || t.attr('data-outerWidth') === false || t.attr('data-outerWidth') === '') {
                                        var wMoveIn = t.outerWidth();
                                        t.attr('data-outerWidth', wMoveIn);
                                    } else {
                                        var wMoveIn = t.attr('data-outerWidth');
                                    }
                                    if (typeof t.attr('data-outerHeight') === 'undefined' || t.attr('data-outerHeight') === false || t.attr('data-outerHeight') === '') {
                                        var hMoveIn = t.outerHeight();
                                        t.attr('data-outerHeight', hMoveIn);
                                    } else {
                                        var hMoveIn = t.attr('data-outerHeight');
                                    }
                                    var pos = t.position();
                                    var left = pos.left;
                                    var top = pos.top;
                                    var tClass = t.attr('class');
                                    var ind = t.index();
                                    var hRel = t.parents('.camerarelative').outerHeight();
                                    var wRel = t.parents('.camerarelative').outerWidth();
                                    if (tClass.indexOf("fadeIn") != -1) {
                                        t.animate({opacity: 0}, 0).css('visibility', 'visible').delay((time / lMoveIn) * (0.1 * (ind - 1))).animate({opacity: 1}, (time / lMoveIn) * 0.15, easeMove);
                                    } else {
                                        t.css('visibility', 'visible');
                                    }
                                });
                            }
                            $('.cameraContent.cameracurrent', fakeHover).show();
                            if (lMoveInContent != 0) {
                                $('.cameraContent.cameracurrent .moveFromLeft, .cameraContent.cameracurrent .moveFromRight, .cameraContent.cameracurrent .moveFromTop, .cameraContent.cameracurrent .moveFromBottom, .cameraContent.cameracurrent .fadeIn, .cameraContent.cameracurrent .fadeFromLeft, .cameraContent.cameracurrent .fadeFromRight, .cameraContent.cameracurrent .fadeFromTop, .cameraContent.cameracurrent .fadeFromBottom', fakeHover).each(function () {
                                    if ($(this).attr('data-easing') != '') {
                                        var easeMove = $(this).attr('data-easing');
                                    } else {
                                        var easeMove = easing;
                                    }
                                    var t = $(this);
                                    var pos = t.position();
                                    var left = pos.left;
                                    var top = pos.top;
                                    var tClass = t.attr('class');
                                    var ind = t.index();
                                    var thisH = t.outerHeight();
                                    if (tClass.indexOf("moveFromLeft") != -1) {
                                        t.css({'left': '-' + (w) + 'px', 'right': 'auto'});
                                        t.css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({'left': pos.left}, (time / lMoveInContent) * 0.15, easeMove);
                                    } else if (tClass.indexOf("moveFromRight") != -1) {
                                        t.css({'left': w + 'px', 'right': 'auto'});
                                        t.css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({'left': pos.left}, (time / lMoveInContent) * 0.15, easeMove);
                                    } else if (tClass.indexOf("moveFromTop") != -1) {
                                        t.css({'top': '-' + h + 'px', 'bottom': 'auto'});
                                        t.css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({'top': pos.top}, (time / lMoveInContent) * 0.15, easeMove, function () {
                                            t.css({top: 'auto', bottom: 0});
                                        });
                                    } else if (tClass.indexOf("moveFromBottom") != -1) {
                                        t.css({'top': h + 'px', 'bottom': 'auto'});
                                        t.css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({'top': pos.top}, (time / lMoveInContent) * 0.15, easeMove);
                                    } else if (tClass.indexOf("fadeFromLeft") != -1) {
                                        t.animate({opacity: 0}, 0).css({'left': '-' + (w) + 'px', 'right': 'auto'});
                                        t.css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({'left': pos.left, opacity: 1}, (time / lMoveInContent) * 0.15, easeMove);
                                    } else if (tClass.indexOf("fadeFromRight") != -1) {
                                        t.animate({opacity: 0}, 0).css({'left': (w) + 'px', 'right': 'auto'});
                                        t.css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({'left': pos.left, opacity: 1}, (time / lMoveInContent) * 0.15, easeMove);
                                    } else if (tClass.indexOf("fadeFromTop") != -1) {
                                        t.animate({opacity: 0}, 0).css({'top': '-' + (h) + 'px', 'bottom': 'auto'});
                                        t.css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({'top': pos.top, opacity: 1}, (time / lMoveInContent) * 0.15, easeMove, function () {
                                            t.css({top: 'auto', bottom: 0});
                                        });
                                    } else if (tClass.indexOf("fadeFromBottom") != -1) {
                                        t.animate({opacity: 0}, 0).css({'bottom': '-' + thisH + 'px'});
                                        t.css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({'bottom': '0', opacity: 1}, (time / lMoveInContent) * 0.15, easeMove);
                                    } else if (tClass.indexOf("fadeIn") != -1) {
                                        t.animate({opacity: 0}, 0).css('visibility', 'visible').delay((time / lMoveInContent) * (0.1 * (ind - 1))).animate({opacity: 1}, (time / lMoveInContent) * 0.15, easeMove);
                                    } else {
                                        t.css('visibility', 'visible');
                                    }
                                });
                            }
                            $('.cameraappended', target).remove();
                            elem.removeClass('camerasliding');
                            selector.eq(vis).hide();
                            var barWidth = $('.camera_bar_cont', camera_thumbs_wrap).width(), barHeight = $('.camera_bar_cont', camera_thumbs_wrap).height(), radSum;
                            if (loader != 'pie') {
                                radSum = 0.05;
                            } else {
                                radSum = 0.005;
                            }
                            $('#' + pieID).animate({opacity: opts.loaderOpacity}, 200);
                            u = setInterval(function () {
                                if (elem.hasClass('stopped')) {
                                    clearInterval(u);
                                }
                                if (loader != 'pie') {
                                    if (rad <= 1.002 && !elem.hasClass('stopped') && !elem.hasClass('paused') && !elem.hasClass('hovered')) {
                                        rad = (rad + radSum);
                                    } else if (rad <= 1 && (elem.hasClass('stopped') || elem.hasClass('paused') || elem.hasClass('stopped') || elem.hasClass('hovered'))) {
                                        rad = rad;
                                    } else {
                                        if (!elem.hasClass('stopped') && !elem.hasClass('paused') && !elem.hasClass('hovered')) {
                                            clearInterval(u);
                                            imgFake();
                                            $('#' + pieID).animate({opacity: 0}, 200, function () {
                                                clearTimeout(setT);
                                                setT = setTimeout(canvasLoader, easedTime);
                                                nextSlide();
                                                opts.onStartLoading.call(this);
                                            });
                                        }
                                    }
                                    switch (barDirection) {
                                        case'leftToRight':
                                            $('#' + pieID).animate({'right': barWidth - (barWidth * rad)}, (time * radSum), 'linear');
                                            break;
                                        case'rightToLeft':
                                            $('#' + pieID).animate({'left': barWidth - (barWidth * rad)}, (time * radSum), 'linear');
                                            break;
                                        case'topToBottom':
                                            $('#' + pieID).animate({'bottom': barHeight - (barHeight * rad)}, (time * radSum), 'linear');
                                            break;
                                        case'bottomToTop':
                                            $('#' + pieID).animate({'bottom': barHeight - (barHeight * rad)}, (time * radSum), 'linear');
                                            break;
                                    }
                                } else {
                                    radNew = rad;
                                    ctx.clearRect(0, 0, opts.pieDiameter, opts.pieDiameter);
                                    ctx.globalCompositeOperation = 'destination-over';
                                    ctx.beginPath();
                                    ctx.arc((opts.pieDiameter) / 2, (opts.pieDiameter) / 2, (opts.pieDiameter) / 2 - opts.loaderStroke, 0, Math.PI * 2, false);
                                    ctx.lineWidth = opts.loaderStroke;
                                    ctx.strokeStyle = opts.loaderBgColor;
                                    ctx.stroke();
                                    ctx.closePath();
                                    ctx.globalCompositeOperation = 'source-over';
                                    ctx.beginPath();
                                    ctx.arc((opts.pieDiameter) / 2, (opts.pieDiameter) / 2, (opts.pieDiameter) / 2 - opts.loaderStroke, 0, Math.PI * 2 * radNew, false);
                                    ctx.lineWidth = opts.loaderStroke - (opts.loaderPadding * 2);
                                    ctx.strokeStyle = opts.loaderColor;
                                    ctx.stroke();
                                    ctx.closePath();
                                    if (rad <= 1.002 && !elem.hasClass('stopped') && !elem.hasClass('paused') && !elem.hasClass('hovered')) {
                                        rad = (rad + radSum);
                                    } else if (rad <= 1 && (elem.hasClass('stopped') || elem.hasClass('paused') || elem.hasClass('hovered'))) {
                                        rad = rad;
                                    } else {
                                        if (!elem.hasClass('stopped') && !elem.hasClass('paused') && !elem.hasClass('hovered')) {
                                            clearInterval(u);
                                            imgFake();
                                            $('#' + pieID + ', .camera_canvas_wrap', camera_thumbs_wrap).animate({opacity: 0}, 200, function () {
                                                clearTimeout(setT);
                                                setT = setTimeout(canvasLoader, easedTime);
                                                nextSlide();
                                                opts.onStartLoading.call(this);
                                            });
                                        }
                                    }
                                }
                            }, time * radSum);
                        }
                    }

                    if (fx == 'scrollLeft' || fx == 'scrollRight' || fx == 'scrollTop' || fx == 'scrollBottom' || fx == 'scrollHorz') {
                        opts.onStartTransition.call(this);
                        easedTime = 0;
                        tApp.delay((((transPeriod + difference) / blocks) * delay[index] * couples) * 0.5).css({'display': 'block', 'height': height, 'margin-left': marginLeft, 'margin-top': marginTop, 'width': width}).animate({'height': Math.floor((h / rows) + addTop + 1), 'margin-top': 0, 'margin-left': 0, 'width': Math.floor((w / cols) + addLeft + 1)}, (transPeriod - difference), easing, cameraeased);
                        selector.eq(vis).delay((((transPeriod + difference) / blocks) * delay[index] * couples) * 0.5).animate({'margin-left': marginLeft * (-1), 'margin-top': marginTop * (-1)}, (transPeriod - difference), easing, function () {
                            $(this).css({'margin-top': 0, 'margin-left': 0});
                        });
                    } else {
                        opts.onStartTransition.call(this);
                        easedTime = parseFloat(transPeriod) + parseFloat(difference);
                        if (slideOn == 'next') {
                            tApp.delay((((transPeriod + difference) / blocks) * delay[index] * couples) * 0.5).css({'display': 'block', 'height': height, 'margin-left': marginLeft, 'margin-top': marginTop, 'width': width, 'opacity': opacityOnGrid}).animate({'height': Math.floor((h / rows) + addTop + 1), 'margin-top': 0, 'margin-left': 0, 'opacity': 1, 'width': Math.floor((w / cols) + addLeft + 1)}, (transPeriod - difference), easing, cameraeased);
                        } else {
                            selector.eq(slideI).show().css('z-index', '999').addClass('cameracurrent');
                            selector.eq(vis).css('z-index', '1').removeClass('cameracurrent');
                            $('.cameraContent', fakeHover).eq(slideI).addClass('cameracurrent');
                            $('.cameraContent', fakeHover).eq(vis).removeClass('cameracurrent');
                            tApp.delay((((transPeriod + difference) / blocks) * delay[index] * couples) * 0.5).css({'display': 'block', 'height': Math.floor((h / rows) + addTop + 1), 'margin-top': 0, 'margin-left': 0, 'opacity': 1, 'width': Math.floor((w / cols) + addLeft + 1)}).animate({'height': height, 'margin-left': marginLeft, 'margin-top': marginTop, 'width': width, 'opacity': opacityOnGrid}, (transPeriod - difference), easing, cameraeased);
                        }
                    }
                });
            }
        }

        if ($(prevNav).length) {
            $(prevNav).click(function () {
                if (!elem.hasClass('camerasliding')) {
                    var idNum = parseFloat($('.cameraSlide.cameracurrent', target).index());
                    clearInterval(u);
                    imgFake();
                    $('#' + pieID + ', .camera_canvas_wrap', wrap).animate({opacity: 0}, 0);
                    canvasLoader();
                    if (idNum != 0) {
                        nextSlide(idNum);
                    } else {
                        nextSlide(amountSlide);
                    }
                    opts.onStartLoading.call(this);
                }
            });
        }
        if ($(nextNav).length) {
            $(nextNav).click(function () {
                if (!elem.hasClass('camerasliding')) {
                    var idNum = parseFloat($('.cameraSlide.cameracurrent', target).index());
                    clearInterval(u);
                    imgFake();
                    $('#' + pieID + ', .camera_canvas_wrap', camera_thumbs_wrap).animate({opacity: 0}, 0);
                    canvasLoader();
                    if (idNum == amountSlide - 1) {
                        nextSlide(1);
                    } else {
                        nextSlide(idNum + 2);
                    }
                    opts.onStartLoading.call(this);
                }
            });
        }
        if (isMobile()) {
            fakeHover.bind('swipeleft', function (event) {
                if (!elem.hasClass('camerasliding')) {
                    var idNum = parseFloat($('.cameraSlide.cameracurrent', target).index());
                    clearInterval(u);
                    imgFake();
                    $('#' + pieID + ', .camera_canvas_wrap', camera_thumbs_wrap).animate({opacity: 0}, 0);
                    canvasLoader();
                    if (idNum == amountSlide - 1) {
                        nextSlide(1);
                    } else {
                        nextSlide(idNum + 2);
                    }
                    opts.onStartLoading.call(this);
                }
            });
            fakeHover.bind('swiperight', function (event) {
                if (!elem.hasClass('camerasliding')) {
                    var idNum = parseFloat($('.cameraSlide.cameracurrent', target).index());
                    clearInterval(u);
                    imgFake();
                    $('#' + pieID + ', .camera_canvas_wrap', camera_thumbs_wrap).animate({opacity: 0}, 0);
                    canvasLoader();
                    if (idNum != 0) {
                        nextSlide(idNum);
                    } else {
                        nextSlide(amountSlide);
                    }
                    opts.onStartLoading.call(this);
                }
            });
        }
        if ($(pagination).length) {
            $('.camera_pag li', wrap).click(function () {
                if (!elem.hasClass('camerasliding')) {
                    var idNum = parseFloat($(this).index());
                    var curNum = parseFloat($('.cameraSlide.cameracurrent', target).index());
                    if (idNum != curNum) {
                        clearInterval(u);
                        imgFake();
                        $('#' + pieID + ', .camera_canvas_wrap', camera_thumbs_wrap).animate({opacity: 0}, 0);
                        canvasLoader();
                        nextSlide(idNum + 1);
                        opts.onStartLoading.call(this);
                    }
                }
            });
        }
        if ($(thumbs).length) {
            $('.pix_thumb img', thumbs).click(function () {
                if (!elem.hasClass('camerasliding')) {
                    var idNum = parseFloat($(this).parents('li').index());
                    var curNum = parseFloat($('.cameracurrent', target).index());
                    if (idNum != curNum) {
                        clearInterval(u);
                        imgFake();
                        $('#' + pieID + ', .camera_canvas_wrap', camera_thumbs_wrap).animate({opacity: 0}, 0);
                        $('.pix_thumb', thumbs).removeClass('cameracurrent');
                        $(this).parents('li').addClass('cameracurrent');
                        canvasLoader();
                        nextSlide(idNum + 1);
                        thumbnailPos();
                        opts.onStartLoading.call(this);
                    }
                }
            });
            $('.camera_thumbs_cont .camera_prevThumbs', camera_thumbs_wrap).hover(function () {
                $(this).stop(true, false).animate({opacity: 1}, 250);
            }, function () {
                $(this).stop(true, false).animate({opacity: .7}, 250);
            });
            $('.camera_prevThumbs', camera_thumbs_wrap).click(function () {
                var sum = 0, wTh = $(thumbs).outerWidth(), offUl = $('ul', thumbs).offset().left, offDiv = $('> div', thumbs).offset().left, ulLeft = offDiv - offUl;
                $('.camera_visThumb', thumbs).each(function () {
                    var tW = $(this).outerWidth();
                    sum = sum + tW;
                });
                if (ulLeft - sum > 0) {
                    $('ul', thumbs).animate({'margin-left': '-' + (ulLeft - sum) + 'px'}, 500, thumbnailVisible);
                } else {
                    $('ul', thumbs).animate({'margin-left': 0}, 500, thumbnailVisible);
                }
            });
            $('.camera_thumbs_cont .camera_nextThumbs', camera_thumbs_wrap).hover(function () {
                $(this).stop(true, false).animate({opacity: 1}, 250);
            }, function () {
                $(this).stop(true, false).animate({opacity: .7}, 250);
            });
            $('.camera_nextThumbs', camera_thumbs_wrap).click(function () {
                var sum = 0, wTh = $(thumbs).outerWidth(), ulW = $('ul', thumbs).outerWidth(), offUl = $('ul', thumbs).offset().left, offDiv = $('> div', thumbs).offset().left, ulLeft = offDiv - offUl;
                $('.camera_visThumb', thumbs).each(function () {
                    var tW = $(this).outerWidth();
                    sum = sum + tW;
                });
                if (ulLeft + sum + sum < ulW) {
                    $('ul', thumbs).animate({'margin-left': '-' + (ulLeft + sum) + 'px'}, 500, thumbnailVisible);
                } else {
                    $('ul', thumbs).animate({'margin-left': '-' + (ulW - wTh) + 'px'}, 500, thumbnailVisible);
                }
            });
        }
    }
})(jQuery);
;
(function ($) {
    $.fn.cameraStop = function () {
        var wrap = $(this), elem = $('.camera_src', wrap), pieID = 'pie_' + wrap.index();
        elem.addClass('stopped');
        if ($('.camera_showcommands').length) {
            var camera_thumbs_wrap = $('.camera_thumbs_wrap', wrap);
        } else {
            var camera_thumbs_wrap = wrap;
        }
    }
})(jQuery);
;
(function ($) {
    $.fn.cameraPause = function () {
        var wrap = $(this);
        var elem = $('.camera_src', wrap);
        elem.addClass('paused');
    }
})(jQuery);
;
(function ($) {
    $.fn.cameraResume = function () {
        var wrap = $(this);
        var elem = $('.camera_src', wrap);
        if (typeof autoAdv === 'undefined' || autoAdv !== true) {
            elem.removeClass('paused');
        }
    }
})(jQuery);

/*include: (jquery.easing.1.3.js)*/
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 */

jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {def: 'easeOutQuad', swing: function (x, t, b, c, d) {
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
}, easeInQuad: function (x, t, b, c, d) {
    return c * (t /= d) * t + b;
}, easeOutQuad: function (x, t, b, c, d) {
    return-c * (t /= d) * (t - 2) + b;
}, easeInOutQuad: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return c / 2 * t * t + b;
    return-c / 2 * ((--t) * (t - 2) - 1) + b;
}, easeInCubic: function (x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
}, easeOutCubic: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}, easeInOutCubic: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}, easeInQuart: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}, easeOutQuart: function (x, t, b, c, d) {
    return-c * ((t = t / d - 1) * t * t * t - 1) + b;
}, easeInOutQuart: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return c / 2 * t * t * t * t + b;
    return-c / 2 * ((t -= 2) * t * t * t - 2) + b;
}, easeInQuint: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}, easeOutQuint: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}, easeInOutQuint: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}, easeInSine: function (x, t, b, c, d) {
    return-c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}, easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
}, easeInOutSine: function (x, t, b, c, d) {
    return-c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}, easeInExpo: function (x, t, b, c, d) {
    return(t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}, easeOutExpo: function (x, t, b, c, d) {
    return(t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}, easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0)return b;
    if (t == d)return b + c;
    if ((t /= d / 2) < 1)return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}, easeInCirc: function (x, t, b, c, d) {
    return-c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}, easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}, easeInOutCirc: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return-c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}, easeInElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)return b;
    if ((t /= d) == 1)return b + c;
    if (!p)p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}, easeOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)return b;
    if ((t /= d) == 1)return b + c;
    if (!p)p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}, easeInOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)return b;
    if ((t /= d / 2) == 2)return b + c;
    if (!p)p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1)return-.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}, easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined)s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}, easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined)s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}, easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined)s = 1.70158;
    if ((t /= d / 2) < 1)return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}, easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
}, easeOutBounce: function (x, t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
}, easeInOutBounce: function (x, t, b, c, d) {
    if (t < d / 2)return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
}});

/*include: (jquery-ui-1.9.2.custom.min.js)*/
/*! jQuery UI - v1.9.2 - 2012-12-21
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.accordion.js, jquery.ui.tabs.js
 * Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT */

(function (e, t) {
    function i(t, n) {
        var r, i, o, u = t.nodeName.toLowerCase();
        return"area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !!o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
    }

    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function () {
            return e.css(this, "visibility") === "hidden"
        }).length
    }

    var n = 0, r = /^ui-id-\d+$/;
    e.ui = e.ui || {};
    if (e.ui.version)return;
    e.extend(e.ui, {version: "1.9.2", keyCode: {BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38}}), e.fn.extend({_focus: e.fn.focus, focus: function (t, n) {
        return typeof t == "number" ? this.each(function () {
            var r = this;
            setTimeout(function () {
                e(r).focus(), n && n.call(r)
            }, t)
        }) : this._focus.apply(this, arguments)
    }, scrollParent: function () {
        var t;
        return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function () {
            return/(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
        }).eq(0) : t = this.parents().filter(function () {
            return/(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
        }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
    }, zIndex: function (n) {
        if (n !== t)return this.css("zIndex", n);
        if (this.length) {
            var r = e(this[0]), i, s;
            while (r.length && r[0] !== document) {
                i = r.css("position");
                if (i === "absolute" || i === "relative" || i === "fixed") {
                    s = parseInt(r.css("zIndex"), 10);
                    if (!isNaN(s) && s !== 0)return s
                }
                r = r.parent()
            }
        }
        return 0
    }, uniqueId: function () {
        return this.each(function () {
            this.id || (this.id = "ui-id-" + ++n)
        })
    }, removeUniqueId: function () {
        return this.each(function () {
            r.test(this.id) && e(this).removeAttr("id")
        })
    }}), e.extend(e.expr[":"], {data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
        return function (n) {
            return!!e.data(n, t)
        }
    }) : function (t, n, r) {
        return!!e.data(t, r[3])
    }, focusable: function (t) {
        return i(t, !isNaN(e.attr(t, "tabindex")))
    }, tabbable: function (t) {
        var n = e.attr(t, "tabindex"), r = isNaN(n);
        return(r || n >= 0) && i(t, !r)
    }}), e(function () {
        var t = document.body, n = t.appendChild(n = document.createElement("div"));
        n.offsetHeight, e.extend(n.style, {minHeight: "100px", height: "auto", padding: 0, borderWidth: 0}), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart"in n, t.removeChild(n).style.display = "none"
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (n, r) {
        function u(t, n, r, s) {
            return e.each(i, function () {
                n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), n
        }

        var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], s = r.toLowerCase(), o = {innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight};
        e.fn["inner" + r] = function (n) {
            return n === t ? o["inner" + r].call(this) : this.each(function () {
                e(this).css(s, u(this, n) + "px")
            })
        }, e.fn["outer" + r] = function (t, n) {
            return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function () {
                e(this).css(s, u(this, t, !0, n) + "px")
            })
        }
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
        return function (n) {
            return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
        }
    }(e.fn.removeData)), function () {
        var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = parseFloat(t[1], 10) === 6
    }(), e.fn.extend({disableSelection: function () {
        return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
            e.preventDefault()
        })
    }, enableSelection: function () {
        return this.unbind(".ui-disableSelection")
    }}), e.extend(e.ui, {plugin: {add: function (t, n, r) {
        var i, s = e.ui[t].prototype;
        for (i in r)s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
    }, call: function (e, t, n) {
        var r, i = e.plugins[t];
        if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11)return;
        for (r = 0; r < i.length; r++)e.options[i[r][0]] && i[r][1].apply(e.element, n)
    }}, contains: e.contains, hasScroll: function (t, n) {
        if (e(t).css("overflow") === "hidden")return!1;
        var r = n && n === "left" ? "scrollLeft" : "scrollTop", i = !1;
        return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
    }, isOverAxis: function (e, t, n) {
        return e > t && e < t + n
    }, isOver: function (t, n, r, i, s, o) {
        return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
    }})
})(jQuery);
(function (e, t) {
    var n = 0, r = Array.prototype.slice, i = e.cleanData;
    e.cleanData = function (t) {
        for (var n = 0, r; (r = t[n]) != null; n++)try {
            e(r).triggerHandler("remove")
        } catch (s) {
        }
        i(t)
    }, e.widget = function (t, n, r) {
        var i, s, o, u, a = t.split(".")[0];
        t = t.split(".")[1], i = a + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function (t) {
            return!!e.data(t, i)
        }, e[a] = e[a] || {}, s = e[a][t], o = e[a][t] = function (e, t) {
            if (!this._createWidget)return new o(e, t);
            arguments.length && this._createWidget(e, t)
        }, e.extend(o, s, {version: r.version, _proto: e.extend({}, r), _childConstructors: []}), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function (t, i) {
            e.isFunction(i) && (r[t] = function () {
                var e = function () {
                    return n.prototype[t].apply(this, arguments)
                }, r = function (e) {
                    return n.prototype[t].apply(this, e)
                };
                return function () {
                    var t = this._super, n = this._superApply, s;
                    return this._super = e, this._superApply = r, s = i.apply(this, arguments), this._super = t, this._superApply = n, s
                }
            }())
        }), o.prototype = e.widget.extend(u, {widgetEventPrefix: s ? u.widgetEventPrefix : t}, r, {constructor: o, namespace: a, widgetName: t, widgetBaseClass: i, widgetFullName: i}), s ? (e.each(s._childConstructors, function (t, n) {
            var r = n.prototype;
            e.widget(r.namespace + "." + r.widgetName, o, n._proto)
        }), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
    }, e.widget.extend = function (n) {
        var i = r.call(arguments, 1), s = 0, o = i.length, u, a;
        for (; s < o; s++)for (u in i[s])a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a);
        return n
    }, e.widget.bridge = function (n, i) {
        var s = i.prototype.widgetFullName || n;
        e.fn[n] = function (o) {
            var u = typeof o == "string", a = r.call(arguments, 1), f = this;
            return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function () {
                var r, i = e.data(this, s);
                if (!i)return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
                if (!e.isFunction(i[o]) || o.charAt(0) === "_")return e.error("no such method '" + o + "' for " + n + " widget instance");
                r = i[o].apply(i, a);
                if (r !== i && r !== t)return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
            }) : this.each(function () {
                var t = e.data(this, s);
                t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
            }), f
        }
    }, e.Widget = function () {
    }, e.Widget._childConstructors = [], e.Widget.prototype = {widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: {disabled: !1, create: null}, _createWidget: function (t, r) {
        r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(!0, this.element, {remove: function (e) {
            e.target === r && this.destroy()
        }}), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    }, _getCreateOptions: e.noop, _getCreateEventData: e.noop, _create: e.noop, _init: e.noop, destroy: function () {
        this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    }, _destroy: e.noop, widget: function () {
        return this.element
    }, option: function (n, r) {
        var i = n, s, o, u;
        if (arguments.length === 0)return e.widget.extend({}, this.options);
        if (typeof n == "string") {
            i = {}, s = n.split("."), n = s.shift();
            if (s.length) {
                o = i[n] = e.widget.extend({}, this.options[n]);
                for (u = 0; u < s.length - 1; u++)o[s[u]] = o[s[u]] || {}, o = o[s[u]];
                n = s.pop();
                if (r === t)return o[n] === t ? null : o[n];
                o[n] = r
            } else {
                if (r === t)return this.options[n] === t ? null : this.options[n];
                i[n] = r
            }
        }
        return this._setOptions(i), this
    }, _setOptions: function (e) {
        var t;
        for (t in e)this._setOption(t, e[t]);
        return this
    }, _setOption: function (e, t) {
        return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
    }, enable: function () {
        return this._setOption("disabled", !1)
    }, disable: function () {
        return this._setOption("disabled", !0)
    }, _on: function (t, n, r) {
        var i, s = this;
        typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function (r, o) {
            function u() {
                if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled")))return;
                return(typeof o == "string" ? s[o] : o).apply(s, arguments)
            }

            typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
            var a = r.match(/^(\w+)\s*(.*)$/), f = a[1] + s.eventNamespace, l = a[2];
            l ? i.delegate(l, f, u) : n.bind(f, u)
        })
    }, _off: function (e, t) {
        t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
    }, _delay: function (e, t) {
        function n() {
            return(typeof e == "string" ? r[e] : e).apply(r, arguments)
        }

        var r = this;
        return setTimeout(n, t || 0)
    }, _hoverable: function (t) {
        this.hoverable = this.hoverable.add(t), this._on(t, {mouseenter: function (t) {
            e(t.currentTarget).addClass("ui-state-hover")
        }, mouseleave: function (t) {
            e(t.currentTarget).removeClass("ui-state-hover")
        }})
    }, _focusable: function (t) {
        this.focusable = this.focusable.add(t), this._on(t, {focusin: function (t) {
            e(t.currentTarget).addClass("ui-state-focus")
        }, focusout: function (t) {
            e(t.currentTarget).removeClass("ui-state-focus")
        }})
    }, _trigger: function (t, n, r) {
        var i, s, o = this.options[t];
        r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
        if (s)for (i in s)i in n || (n[i] = s[i]);
        return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
    }}, e.each({show: "fadeIn", hide: "fadeOut"}, function (t, n) {
        e.Widget.prototype["_" + t] = function (r, i, s) {
            typeof i == "string" && (i = {effect: i});
            var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
            i = i || {}, typeof i == "number" && (i = {duration: i}), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function (n) {
                e(this)[t](), s && s.call(r[0]), n()
            })
        }
    }), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function () {
        return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
    })
})(jQuery);
(function (e, t) {
    var n = 0, r = {}, i = {};
    r.height = r.paddingTop = r.paddingBottom = r.borderTopWidth = r.borderBottomWidth = "hide", i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "show", e.widget("ui.accordion", {version: "1.9.2", options: {active: 0, animate: {}, collapsible: !1, event: "click", header: "> li > :first-child,> :not(li):even", heightStyle: "auto", icons: {activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e"}, activate: null, beforeActivate: null}, _create: function () {
        var t = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++n), r = this.options;
        this.prevShow = this.prevHide = e(), this.element.addClass("ui-accordion ui-widget ui-helper-reset"), this.headers = this.element.find(r.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this._hoverable(this.headers), this._focusable(this.headers), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(), !r.collapsible && (r.active === !1 || r.active == null) && (r.active = 0), r.active < 0 && (r.active += this.headers.length), this.active = this._findActive(r.active).addClass("ui-accordion-header-active ui-state-active").toggleClass("ui-corner-all ui-corner-top"), this.active.next().addClass("ui-accordion-content-active").show(), this._createIcons(), this.refresh(), this.element.attr("role", "tablist"), this.headers.attr("role", "tab").each(function (n) {
            var r = e(this), i = r.attr("id"), s = r.next(), o = s.attr("id");
            i || (i = t + "-header-" + n, r.attr("id", i)), o || (o = t + "-panel-" + n, s.attr("id", o)), r.attr("aria-controls", o), s.attr("aria-labelledby", i)
        }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({"aria-selected": "false", tabIndex: -1}).next().attr({"aria-expanded": "false", "aria-hidden": "true"}).hide(), this.active.length ? this.active.attr({"aria-selected": "true", tabIndex: 0}).next().attr({"aria-expanded": "true", "aria-hidden": "false"}) : this.headers.eq(0).attr("tabIndex", 0), this._on(this.headers, {keydown: "_keydown"}), this._on(this.headers.next(), {keydown: "_panelKeyDown"}), this._setupEvents(r.event)
    }, _getCreateEventData: function () {
        return{header: this.active, content: this.active.length ? this.active.next() : e()}
    }, _createIcons: function () {
        var t = this.options.icons;
        t && (e("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"))
    }, _destroyIcons: function () {
        this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
    }, _destroy: function () {
        var e;
        this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function () {
            /^ui-accordion/.test(this.id) && this.removeAttribute("id")
        }), this._destroyIcons(), e = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function () {
            /^ui-accordion/.test(this.id) && this.removeAttribute("id")
        }), this.options.heightStyle !== "content" && e.css("height", "")
    }, _setOption: function (e, t) {
        if (e === "active") {
            this._activate(t);
            return
        }
        e === "event" && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(e, t), e === "collapsible" && !t && this.options.active === !1 && this._activate(0), e === "icons" && (this._destroyIcons(), t && this._createIcons()), e === "disabled" && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t)
    }, _keydown: function (t) {
        if (t.altKey || t.ctrlKey)return;
        var n = e.ui.keyCode, r = this.headers.length, i = this.headers.index(t.target), s = !1;
        switch (t.keyCode) {
            case n.RIGHT:
            case n.DOWN:
                s = this.headers[(i + 1) % r];
                break;
            case n.LEFT:
            case n.UP:
                s = this.headers[(i - 1 + r) % r];
                break;
            case n.SPACE:
            case n.ENTER:
                this._eventHandler(t);
                break;
            case n.HOME:
                s = this.headers[0];
                break;
            case n.END:
                s = this.headers[r - 1]
        }
        s && (e(t.target).attr("tabIndex", -1), e(s).attr("tabIndex", 0), s.focus(), t.preventDefault())
    }, _panelKeyDown: function (t) {
        t.keyCode === e.ui.keyCode.UP && t.ctrlKey && e(t.currentTarget).prev().focus()
    }, refresh: function () {
        var t, n, r = this.options.heightStyle, i = this.element.parent();
        r === "fill" ? (e.support.minHeight || (n = i.css("overflow"), i.css("overflow", "hidden")), t = i.height(), this.element.siblings(":visible").each(function () {
            var n = e(this), r = n.css("position");
            if (r === "absolute" || r === "fixed")return;
            t -= n.outerHeight(!0)
        }), n && i.css("overflow", n), this.headers.each(function () {
            t -= e(this).outerHeight(!0)
        }), this.headers.next().each(function () {
            e(this).height(Math.max(0, t - e(this).innerHeight() + e(this).height()))
        }).css("overflow", "auto")) : r === "auto" && (t = 0, this.headers.next().each(function () {
            t = Math.max(t, e(this).css("height", "").height())
        }).height(t))
    }, _activate: function (t) {
        var n = this._findActive(t)[0];
        if (n === this.active[0])return;
        n = n || this.active[0], this._eventHandler({target: n, currentTarget: n, preventDefault: e.noop})
    }, _findActive: function (t) {
        return typeof t == "number" ? this.headers.eq(t) : e()
    }, _setupEvents: function (t) {
        var n = {};
        if (!t)return;
        e.each(t.split(" "), function (e, t) {
            n[t] = "_eventHandler"
        }), this._on(this.headers, n)
    }, _eventHandler: function (t) {
        var n = this.options, r = this.active, i = e(t.currentTarget), s = i[0] === r[0], o = s && n.collapsible, u = o ? e() : i.next(), a = r.next(), f = {oldHeader: r, oldPanel: a, newHeader: o ? e() : i, newPanel: u};
        t.preventDefault();
        if (s && !n.collapsible || this._trigger("beforeActivate", t, f) === !1)return;
        n.active = o ? !1 : this.headers.index(i), this.active = s ? e() : i, this._toggle(f), r.removeClass("ui-accordion-header-active ui-state-active"), n.icons && r.children(".ui-accordion-header-icon").removeClass(n.icons.activeHeader).addClass(n.icons.header), s || (i.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), n.icons && i.children(".ui-accordion-header-icon").removeClass(n.icons.header).addClass(n.icons.activeHeader), i.next().addClass("ui-accordion-content-active"))
    }, _toggle: function (t) {
        var n = t.newPanel, r = this.prevShow.length ? this.prevShow : t.oldPanel;
        this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = n, this.prevHide = r, this.options.animate ? this._animate(n, r, t) : (r.hide(), n.show(), this._toggleComplete(t)), r.attr({"aria-expanded": "false", "aria-hidden": "true"}), r.prev().attr("aria-selected", "false"), n.length && r.length ? r.prev().attr("tabIndex", -1) : n.length && this.headers.filter(function () {
            return e(this).attr("tabIndex") === 0
        }).attr("tabIndex", -1), n.attr({"aria-expanded": "true", "aria-hidden": "false"}).prev().attr({"aria-selected": "true", tabIndex: 0})
    }, _animate: function (e, t, n) {
        var s, o, u, a = this, f = 0, l = e.length && (!t.length || e.index() < t.index()), c = this.options.animate || {}, h = l && c.down || c, p = function () {
            a._toggleComplete(n)
        };
        typeof h == "number" && (u = h), typeof h == "string" && (o = h), o = o || h.easing || c.easing, u = u || h.duration || c.duration;
        if (!t.length)return e.animate(i, u, o, p);
        if (!e.length)return t.animate(r, u, o, p);
        s = e.show().outerHeight(), t.animate(r, {duration: u, easing: o, step: function (e, t) {
            t.now = Math.round(e)
        }}), e.hide().animate(i, {duration: u, easing: o, complete: p, step: function (e, n) {
            n.now = Math.round(e), n.prop !== "height" ? f += n.now : a.options.heightStyle !== "content" && (n.now = Math.round(s - t.outerHeight() - f), f = 0)
        }})
    }, _toggleComplete: function (e) {
        var t = e.oldPanel;
        t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), t.length && (t.parent()[0].className = t.parent()[0].className), this._trigger("activate", null, e)
    }}), e.uiBackCompat !== !1 && (function (e, t) {
        e.extend(t.options, {navigation: !1, navigationFilter: function () {
            return this.href.toLowerCase() === location.href.toLowerCase()
        }});
        var n = t._create;
        t._create = function () {
            if (this.options.navigation) {
                var t = this, r = this.element.find(this.options.header), i = r.next(), s = r.add(i).find("a").filter(this.options.navigationFilter)[0];
                s && r.add(i).each(function (n) {
                    if (e.contains(this, s))return t.options.active = Math.floor(n / 2), !1
                })
            }
            n.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype), function (e, t) {
        e.extend(t.options, {heightStyle: null, autoHeight: !0, clearStyle: !1, fillSpace: !1});
        var n = t._create, r = t._setOption;
        e.extend(t, {_create: function () {
            this.options.heightStyle = this.options.heightStyle || this._mergeHeightStyle(), n.call(this)
        }, _setOption: function (e) {
            if (e === "autoHeight" || e === "clearStyle" || e === "fillSpace")this.options.heightStyle = this._mergeHeightStyle();
            r.apply(this, arguments)
        }, _mergeHeightStyle: function () {
            var e = this.options;
            if (e.fillSpace)return"fill";
            if (e.clearStyle)return"content";
            if (e.autoHeight)return"auto"
        }})
    }(jQuery, jQuery.ui.accordion.prototype), function (e, t) {
        e.extend(t.options.icons, {activeHeader: null, headerSelected: "ui-icon-triangle-1-s"});
        var n = t._createIcons;
        t._createIcons = function () {
            this.options.icons && (this.options.icons.activeHeader = this.options.icons.activeHeader || this.options.icons.headerSelected), n.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype), function (e, t) {
        t.activate = t._activate;
        var n = t._findActive;
        t._findActive = function (e) {
            return e === -1 && (e = !1), e && typeof e != "number" && (e = this.headers.index(this.headers.filter(e)), e === -1 && (e = !1)), n.call(this, e)
        }
    }(jQuery, jQuery.ui.accordion.prototype), jQuery.ui.accordion.prototype.resize = jQuery.ui.accordion.prototype.refresh, function (e, t) {
        e.extend(t.options, {change: null, changestart: null});
        var n = t._trigger;
        t._trigger = function (e, t, r) {
            var i = n.apply(this, arguments);
            return i ? (e === "beforeActivate" ? i = n.call(this, "changestart", t, {oldHeader: r.oldHeader, oldContent: r.oldPanel, newHeader: r.newHeader, newContent: r.newPanel}) : e === "activate" && (i = n.call(this, "change", t, {oldHeader: r.oldHeader, oldContent: r.oldPanel, newHeader: r.newHeader, newContent: r.newPanel})), i) : !1
        }
    }(jQuery, jQuery.ui.accordion.prototype), function (e, t) {
        e.extend(t.options, {animate: null, animated: "slide"});
        var n = t._create;
        t._create = function () {
            var e = this.options;
            e.animate === null && (e.animated ? e.animated === "slide" ? e.animate = 300 : e.animated === "bounceslide" ? e.animate = {duration: 200, down: {easing: "easeOutBounce", duration: 1e3}} : e.animate = e.animated : e.animate = !1), n.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype))
})(jQuery);
(function (e, t) {
    function i() {
        return++n
    }

    function s(e) {
        return e.hash.length > 1 && e.href.replace(r, "") === location.href.replace(r, "").replace(/\s/g, "%20")
    }

    var n = 0, r = /#.*$/;
    e.widget("ui.tabs", {version: "1.9.2", delay: 300, options: {active: null, collapsible: !1, event: "click", heightStyle: "content", hide: null, show: null, activate: null, beforeActivate: null, beforeLoad: null, load: null}, _create: function () {
        var t = this, n = this.options, r = n.active, i = location.hash.substring(1);
        this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", n.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function (t) {
            e(this).is(".ui-state-disabled") && t.preventDefault()
        }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
            e(this).closest("li").is(".ui-state-disabled") && this.blur()
        }), this._processTabs();
        if (r === null) {
            i && this.tabs.each(function (t, n) {
                if (e(n).attr("aria-controls") === i)return r = t, !1
            }), r === null && (r = this.tabs.index(this.tabs.filter(".ui-tabs-active")));
            if (r === null || r === -1)r = this.tabs.length ? 0 : !1
        }
        r !== !1 && (r = this.tabs.index(this.tabs.eq(r)), r === -1 && (r = n.collapsible ? !1 : 0)), n.active = r, !n.collapsible && n.active === !1 && this.anchors.length && (n.active = 0), e.isArray(n.disabled) && (n.disabled = e.unique(n.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function (e) {
            return t.tabs.index(e)
        }))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(this.options.active) : this.active = e(), this._refresh(), this.active.length && this.load(n.active)
    }, _getCreateEventData: function () {
        return{tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : e()}
    }, _tabKeydown: function (t) {
        var n = e(this.document[0].activeElement).closest("li"), r = this.tabs.index(n), i = !0;
        if (this._handlePageNav(t))return;
        switch (t.keyCode) {
            case e.ui.keyCode.RIGHT:
            case e.ui.keyCode.DOWN:
                r++;
                break;
            case e.ui.keyCode.UP:
            case e.ui.keyCode.LEFT:
                i = !1, r--;
                break;
            case e.ui.keyCode.END:
                r = this.anchors.length - 1;
                break;
            case e.ui.keyCode.HOME:
                r = 0;
                break;
            case e.ui.keyCode.SPACE:
                t.preventDefault(), clearTimeout(this.activating), this._activate(r);
                return;
            case e.ui.keyCode.ENTER:
                t.preventDefault(), clearTimeout(this.activating), this._activate(r === this.options.active ? !1 : r);
                return;
            default:
                return
        }
        t.preventDefault(), clearTimeout(this.activating), r = this._focusNextTab(r, i), t.ctrlKey || (n.attr("aria-selected", "false"), this.tabs.eq(r).attr("aria-selected", "true"), this.activating = this._delay(function () {
            this.option("active", r)
        }, this.delay))
    }, _panelKeydown: function (t) {
        if (this._handlePageNav(t))return;
        t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
    }, _handlePageNav: function (t) {
        if (t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP)return this._activate(this._focusNextTab(this.options.active - 1, !1)), !0;
        if (t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN)return this._activate(this._focusNextTab(this.options.active + 1, !0)), !0
    }, _findNextTab: function (t, n) {
        function i() {
            return t > r && (t = 0), t < 0 && (t = r), t
        }

        var r = this.tabs.length - 1;
        while (e.inArray(i(), this.options.disabled) !== -1)t = n ? t + 1 : t - 1;
        return t
    }, _focusNextTab: function (e, t) {
        return e = this._findNextTab(e, t), this.tabs.eq(e).focus(), e
    }, _setOption: function (e, t) {
        if (e === "active") {
            this._activate(t);
            return
        }
        if (e === "disabled") {
            this._setupDisabled(t);
            return
        }
        this._super(e, t), e === "collapsible" && (this.element.toggleClass("ui-tabs-collapsible", t), !t && this.options.active === !1 && this._activate(0)), e === "event" && this._setupEvents(t), e === "heightStyle" && this._setupHeightStyle(t)
    }, _tabId: function (e) {
        return e.attr("aria-controls") || "ui-tabs-" + i()
    }, _sanitizeSelector: function (e) {
        return e ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
    }, refresh: function () {
        var t = this.options, n = this.tablist.children(":has(a[href])");
        t.disabled = e.map(n.filter(".ui-state-disabled"), function (e) {
            return n.index(e)
        }), this._processTabs(), t.active === !1 || !this.anchors.length ? (t.active = !1, this.active = e()) : this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active), this._refresh()
    }, _refresh: function () {
        this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({"aria-selected": "false", tabIndex: -1}), this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded": "false", "aria-hidden": "true"}), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected": "true", tabIndex: 0}), this._getPanelForTab(this.active).show().attr({"aria-expanded": "true", "aria-hidden": "false"})) : this.tabs.eq(0).attr("tabIndex", 0)
    }, _processTabs: function () {
        var t = this;
        this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role: "tab", tabIndex: -1}), this.anchors = this.tabs.map(function () {
            return e("a", this)[0]
        }).addClass("ui-tabs-anchor").attr({role: "presentation", tabIndex: -1}), this.panels = e(), this.anchors.each(function (n, r) {
            var i, o, u, a = e(r).uniqueId().attr("id"), f = e(r).closest("li"), l = f.attr("aria-controls");
            s(r) ? (i = r.hash, o = t.element.find(t._sanitizeSelector(i))) : (u = t._tabId(f), i = "#" + u, o = t.element.find(i), o.length || (o = t._createPanel(u), o.insertAfter(t.panels[n - 1] || t.tablist)), o.attr("aria-live", "polite")), o.length && (t.panels = t.panels.add(o)), l && f.data("ui-tabs-aria-controls", l), f.attr({"aria-controls": i.substring(1), "aria-labelledby": a}), o.attr("aria-labelledby", a)
        }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
    }, _getList: function () {
        return this.element.find("ol,ul").eq(0)
    }, _createPanel: function (t) {
        return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
    }, _setupDisabled: function (t) {
        e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
        for (var n = 0, r; r = this.tabs[n]; n++)t === !0 || e.inArray(n, t) !== -1 ? e(r).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(r).removeClass("ui-state-disabled").removeAttr("aria-disabled");
        this.options.disabled = t
    }, _setupEvents: function (t) {
        var n = {click: function (e) {
            e.preventDefault()
        }};
        t && e.each(t.split(" "), function (e, t) {
            n[t] = "_eventHandler"
        }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, n), this._on(this.tabs, {keydown: "_tabKeydown"}), this._on(this.panels, {keydown: "_panelKeydown"}), this._focusable(this.tabs), this._hoverable(this.tabs)
    }, _setupHeightStyle: function (t) {
        var n, r, i = this.element.parent();
        t === "fill" ? (e.support.minHeight || (r = i.css("overflow"), i.css("overflow", "hidden")), n = i.height(), this.element.siblings(":visible").each(function () {
            var t = e(this), r = t.css("position");
            if (r === "absolute" || r === "fixed")return;
            n -= t.outerHeight(!0)
        }), r && i.css("overflow", r), this.element.children().not(this.panels).each(function () {
            n -= e(this).outerHeight(!0)
        }), this.panels.each(function () {
            e(this).height(Math.max(0, n - e(this).innerHeight() + e(this).height()))
        }).css("overflow", "auto")) : t === "auto" && (n = 0, this.panels.each(function () {
            n = Math.max(n, e(this).height("").height())
        }).height(n))
    }, _eventHandler: function (t) {
        var n = this.options, r = this.active, i = e(t.currentTarget), s = i.closest("li"), o = s[0] === r[0], u = o && n.collapsible, a = u ? e() : this._getPanelForTab(s), f = r.length ? this._getPanelForTab(r) : e(), l = {oldTab: r, oldPanel: f, newTab: u ? e() : s, newPanel: a};
        t.preventDefault();
        if (s.hasClass("ui-state-disabled") || s.hasClass("ui-tabs-loading") || this.running || o && !n.collapsible || this._trigger("beforeActivate", t, l) === !1)return;
        n.active = u ? !1 : this.tabs.index(s), this.active = o ? e() : s, this.xhr && this.xhr.abort(), !f.length && !a.length && e.error("jQuery UI Tabs: Mismatching fragment identifier."), a.length && this.load(this.tabs.index(s), t), this._toggle(t, l)
    }, _toggle: function (t, n) {
        function o() {
            r.running = !1, r._trigger("activate", t, n)
        }

        function u() {
            n.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), i.length && r.options.show ? r._show(i, r.options.show, o) : (i.show(), o())
        }

        var r = this, i = n.newPanel, s = n.oldPanel;
        this.running = !0, s.length && this.options.hide ? this._hide(s, this.options.hide, function () {
            n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), u()
        }) : (n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s.hide(), u()), s.attr({"aria-expanded": "false", "aria-hidden": "true"}), n.oldTab.attr("aria-selected", "false"), i.length && s.length ? n.oldTab.attr("tabIndex", -1) : i.length && this.tabs.filter(function () {
            return e(this).attr("tabIndex") === 0
        }).attr("tabIndex", -1), i.attr({"aria-expanded": "true", "aria-hidden": "false"}), n.newTab.attr({"aria-selected": "true", tabIndex: 0})
    }, _activate: function (t) {
        var n, r = this._findActive(t);
        if (r[0] === this.active[0])return;
        r.length || (r = this.active), n = r.find(".ui-tabs-anchor")[0], this._eventHandler({target: n, currentTarget: n, preventDefault: e.noop})
    }, _findActive: function (t) {
        return t === !1 ? e() : this.tabs.eq(t)
    }, _getIndex: function (e) {
        return typeof e == "string" && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e
    }, _destroy: function () {
        this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId(), this.tabs.add(this.panels).each(function () {
            e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
        }), this.tabs.each(function () {
            var t = e(this), n = t.data("ui-tabs-aria-controls");
            n ? t.attr("aria-controls", n) : t.removeAttr("aria-controls")
        }), this.panels.show(), this.options.heightStyle !== "content" && this.panels.css("height", "")
    }, enable: function (n) {
        var r = this.options.disabled;
        if (r === !1)return;
        n === t ? r = !1 : (n = this._getIndex(n), e.isArray(r) ? r = e.map(r, function (e) {
            return e !== n ? e : null
        }) : r = e.map(this.tabs, function (e, t) {
            return t !== n ? t : null
        })), this._setupDisabled(r)
    }, disable: function (n) {
        var r = this.options.disabled;
        if (r === !0)return;
        if (n === t)r = !0; else {
            n = this._getIndex(n);
            if (e.inArray(n, r) !== -1)return;
            e.isArray(r) ? r = e.merge([n], r).sort() : r = [n]
        }
        this._setupDisabled(r)
    }, load: function (t, n) {
        t = this._getIndex(t);
        var r = this, i = this.tabs.eq(t), o = i.find(".ui-tabs-anchor"), u = this._getPanelForTab(i), a = {tab: i, panel: u};
        if (s(o[0]))return;
        this.xhr = e.ajax(this._ajaxSettings(o, n, a)), this.xhr && this.xhr.statusText !== "canceled" && (i.addClass("ui-tabs-loading"), u.attr("aria-busy", "true"), this.xhr.success(function (e) {
            setTimeout(function () {
                u.html(e), r._trigger("load", n, a)
            }, 1)
        }).complete(function (e, t) {
            setTimeout(function () {
                t === "abort" && r.panels.stop(!1, !0), i.removeClass("ui-tabs-loading"), u.removeAttr("aria-busy"), e === r.xhr && delete r.xhr
            }, 1)
        }))
    }, _ajaxSettings: function (t, n, r) {
        var i = this;
        return{url: t.attr("href"), beforeSend: function (t, s) {
            return i._trigger("beforeLoad", n, e.extend({jqXHR: t, ajaxSettings: s}, r))
        }}
    }, _getPanelForTab: function (t) {
        var n = e(t).attr("aria-controls");
        return this.element.find(this._sanitizeSelector("#" + n))
    }}), e.uiBackCompat !== !1 && (e.ui.tabs.prototype._ui = function (e, t) {
        return{tab: e, panel: t, index: this.anchors.index(e)}
    }, e.widget("ui.tabs", e.ui.tabs, {url: function (e, t) {
        this.anchors.eq(e).attr("href", t)
    }}), e.widget("ui.tabs", e.ui.tabs, {options: {ajaxOptions: null, cache: !1}, _create: function () {
        this._super();
        var t = this;
        this._on({tabsbeforeload: function (n, r) {
            if (e.data(r.tab[0], "cache.tabs")) {
                n.preventDefault();
                return
            }
            r.jqXHR.success(function () {
                t.options.cache && e.data(r.tab[0], "cache.tabs", !0)
            })
        }})
    }, _ajaxSettings: function (t, n, r) {
        var i = this.options.ajaxOptions;
        return e.extend({}, i, {error: function (e, t) {
            try {
                i.error(e, t, r.tab.closest("li").index(), r.tab[0])
            } catch (n) {
            }
        }}, this._superApply(arguments))
    }, _setOption: function (e, t) {
        e === "cache" && t === !1 && this.anchors.removeData("cache.tabs"), this._super(e, t)
    }, _destroy: function () {
        this.anchors.removeData("cache.tabs"), this._super()
    }, url: function (e) {
        this.anchors.eq(e).removeData("cache.tabs"), this._superApply(arguments)
    }}), e.widget("ui.tabs", e.ui.tabs, {abort: function () {
        this.xhr && this.xhr.abort()
    }}), e.widget("ui.tabs", e.ui.tabs, {options: {spinner: "<em>Loading&#8230;</em>"}, _create: function () {
        this._super(), this._on({tabsbeforeload: function (e, t) {
            if (e.target !== this.element[0] || !this.options.spinner)return;
            var n = t.tab.find("span"), r = n.html();
            n.html(this.options.spinner), t.jqXHR.complete(function () {
                n.html(r)
            })
        }})
    }}), e.widget("ui.tabs", e.ui.tabs, {options: {enable: null, disable: null}, enable: function (t) {
        var n = this.options, r;
        if (t && n.disabled === !0 || e.isArray(n.disabled) && e.inArray(t, n.disabled) !== -1)r = !0;
        this._superApply(arguments), r && this._trigger("enable", null, this._ui(this.anchors[t], this.panels[t]))
    }, disable: function (t) {
        var n = this.options, r;
        if (t && n.disabled === !1 || e.isArray(n.disabled) && e.inArray(t, n.disabled) === -1)r = !0;
        this._superApply(arguments), r && this._trigger("disable", null, this._ui(this.anchors[t], this.panels[t]))
    }}), e.widget("ui.tabs", e.ui.tabs, {options: {add: null, remove: null, tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"}, add: function (n, r, i) {
        i === t && (i = this.anchors.length);
        var s, o, u = this.options, a = e(u.tabTemplate.replace(/#\{href\}/g, n).replace(/#\{label\}/g, r)), f = n.indexOf("#") ? this._tabId(a) : n.replace("#", "");
        return a.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy", !0), a.attr("aria-controls", f), s = i >= this.tabs.length, o = this.element.find("#" + f), o.length || (o = this._createPanel(f), s ? i > 0 ? o.insertAfter(this.panels.eq(-1)) : o.appendTo(this.element) : o.insertBefore(this.panels[i])), o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(), s ? a.appendTo(this.tablist) : a.insertBefore(this.tabs[i]), u.disabled = e.map(u.disabled, function (e) {
            return e >= i ? ++e : e
        }), this.refresh(), this.tabs.length === 1 && u.active === !1 && this.option("active", 0), this._trigger("add", null, this._ui(this.anchors[i], this.panels[i])), this
    }, remove: function (t) {
        t = this._getIndex(t);
        var n = this.options, r = this.tabs.eq(t).remove(), i = this._getPanelForTab(r).remove();
        return r.hasClass("ui-tabs-active") && this.anchors.length > 2 && this._activate(t + (t + 1 < this.anchors.length ? 1 : -1)), n.disabled = e.map(e.grep(n.disabled, function (e) {
            return e !== t
        }), function (e) {
            return e >= t ? --e : e
        }), this.refresh(), this._trigger("remove", null, this._ui(r.find("a")[0], i[0])), this
    }}), e.widget("ui.tabs", e.ui.tabs, {length: function () {
        return this.anchors.length
    }}), e.widget("ui.tabs", e.ui.tabs, {options: {idPrefix: "ui-tabs-"}, _tabId: function (t) {
        var n = t.is("li") ? t.find("a[href]") : t;
        return n = n[0], e(n).closest("li").attr("aria-controls") || n.title && n.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF\-]/g, "") || this.options.idPrefix + i()
    }}), e.widget("ui.tabs", e.ui.tabs, {options: {panelTemplate: "<div></div>"}, _createPanel: function (t) {
        return e(this.options.panelTemplate).attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
    }}), e.widget("ui.tabs", e.ui.tabs, {_create: function () {
        var e = this.options;
        e.active === null && e.selected !== t && (e.active = e.selected === -1 ? !1 : e.selected), this._super(), e.selected = e.active, e.selected === !1 && (e.selected = -1)
    }, _setOption: function (e, t) {
        if (e !== "selected")return this._super(e, t);
        var n = this.options;
        this._super("active", t === -1 ? !1 : t), n.selected = n.active, n.selected === !1 && (n.selected = -1)
    }, _eventHandler: function () {
        this._superApply(arguments), this.options.selected = this.options.active, this.options.selected === !1 && (this.options.selected = -1)
    }}), e.widget("ui.tabs", e.ui.tabs, {options: {show: null, select: null}, _create: function () {
        this._super(), this.options.active !== !1 && this._trigger("show", null, this._ui(this.active.find(".ui-tabs-anchor")[0], this._getPanelForTab(this.active)[0]))
    }, _trigger: function (e, t, n) {
        var r, i, s = this._superApply(arguments);
        return s ? (e === "beforeActivate" ? (r = n.newTab.length ? n.newTab : n.oldTab, i = n.newPanel.length ? n.newPanel : n.oldPanel, s = this._super("select", t, {tab: r.find(".ui-tabs-anchor")[0], panel: i[0], index: r.closest("li").index()})) : e === "activate" && n.newTab.length && (s = this._super("show", t, {tab: n.newTab.find(".ui-tabs-anchor")[0], panel: n.newPanel[0], index: n.newTab.closest("li").index()})), s) : !1
    }}), e.widget("ui.tabs", e.ui.tabs, {select: function (e) {
        e = this._getIndex(e);
        if (e === -1) {
            if (!this.options.collapsible || this.options.selected === -1)return;
            e = this.options.selected
        }
        this.anchors.eq(e).trigger(this.options.event + this.eventNamespace)
    }}), function () {
        var t = 0;
        e.widget("ui.tabs", e.ui.tabs, {options: {cookie: null}, _create: function () {
            var e = this.options, t;
            e.active == null && e.cookie && (t = parseInt(this._cookie(), 10), t === -1 && (t = !1), e.active = t), this._super()
        }, _cookie: function (n) {
            var r = [this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++t)];
            return arguments.length && (r.push(n === !1 ? -1 : n), r.push(this.options.cookie)), e.cookie.apply(null, r)
        }, _refresh: function () {
            this._super(), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
        }, _eventHandler: function () {
            this._superApply(arguments), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
        }, _destroy: function () {
            this._super(), this.options.cookie && this._cookie(null, this.options.cookie)
        }})
    }(), e.widget("ui.tabs", e.ui.tabs, {_trigger: function (t, n, r) {
        var i = e.extend({}, r);
        return t === "load" && (i.panel = i.panel[0], i.tab = i.tab.find(".ui-tabs-anchor")[0]), this._super(t, n, i)
    }}), e.widget("ui.tabs", e.ui.tabs, {options: {fx: null}, _getFx: function () {
        var t, n, r = this.options.fx;
        return r && (e.isArray(r) ? (t = r[0], n = r[1]) : t = n = r), r ? {show: n, hide: t} : null
    }, _toggle: function (e, t) {
        function o() {
            n.running = !1, n._trigger("activate", e, t)
        }

        function u() {
            t.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), r.length && s.show ? r.animate(s.show, s.show.duration, function () {
                o()
            }) : (r.show(), o())
        }

        var n = this, r = t.newPanel, i = t.oldPanel, s = this._getFx();
        if (!s)return this._super(e, t);
        n.running = !0, i.length && s.hide ? i.animate(s.hide, s.hide.duration, function () {
            t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), u()
        }) : (t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), i.hide(), u())
    }}))
})(jQuery);

/*include: (jquery.flexslider-min.js)*/
/*
 * jQuery FlexSlider v2.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function (d) {
    d.flexslider = function (i, k) {
        var a = d(i), c = d.extend({}, d.flexslider.defaults, k), e = c.namespace, p = "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch, t = p ? "touchend" : "click", l = "vertical" === c.direction, m = c.reverse, h = 0 < c.itemWidth, r = "fade" === c.animation, s = "" !== c.asNavFor, f = {};
        d.data(i, "flexslider", a);
        f = {init: function () {
            a.animating = !1;
            a.currentSlide = c.startAt;
            a.animatingTo = a.currentSlide;
            a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last;
            a.containerSelector = c.selector.substr(0, c.selector.search(" "));
            a.slides = d(c.selector, a);
            a.container = d(a.containerSelector, a);
            a.count = a.slides.length;
            a.syncExists = 0 < d(c.sync).length;
            "slide" === c.animation && (c.animation = "swing");
            a.prop = l ? "top" : "marginLeft";
            a.args = {};
            a.manualPause = !1;
            var b = a, g;
            if (g = !c.video)if (g = !r)if (g = c.useCSS)a:{
                g = document.createElement("div");
                var n = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], e;
                for (e in n)if (void 0 !== g.style[n[e]]) {
                    a.pfx = n[e].replace("Perspective", "").toLowerCase();
                    a.prop = "-" + a.pfx + "-transform";
                    g = !0;
                    break a
                }
                g = !1
            }
            b.transitions = g;
            "" !== c.controlsContainer && (a.controlsContainer = 0 < d(c.controlsContainer).length && d(c.controlsContainer));
            "" !== c.manualControls && (a.manualControls = 0 < d(c.manualControls).length && d(c.manualControls));
            c.randomize && (a.slides.sort(function () {
                return Math.round(Math.random()) - 0.5
            }), a.container.empty().append(a.slides));
            a.doMath();
            s && f.asNav.setup();
            a.setup("init");
            c.controlNav && f.controlNav.setup();
            c.directionNav && f.directionNav.setup();
            c.keyboard && (1 === d(a.containerSelector).length || c.multipleKeyboard) && d(document).bind("keyup", function (b) {
                b = b.keyCode;
                if (!a.animating && (39 === b || 37 === b))b = 39 === b ? a.getTarget("next") : 37 === b ? a.getTarget("prev") : !1, a.flexAnimate(b, c.pauseOnAction)
            });
            c.mousewheel && a.bind("mousewheel", function (b, g) {
                b.preventDefault();
                var d = 0 > g ? a.getTarget("next") : a.getTarget("prev");
                a.flexAnimate(d, c.pauseOnAction)
            });
            c.pausePlay && f.pausePlay.setup();
            c.slideshow && (c.pauseOnHover && a.hover(function () {
                !a.manualPlay && !a.manualPause && a.pause()
            }, function () {
                !a.manualPause && !a.manualPlay && a.play()
            }), 0 < c.initDelay ? setTimeout(a.play, c.initDelay) : a.play());
            p && c.touch && f.touch();
            (!r || r && c.smoothHeight) && d(window).bind("resize focus", f.resize);
            setTimeout(function () {
                c.start(a)
            }, 200)
        }, asNav: {setup: function () {
            a.asNav = !0;
            a.animatingTo = Math.floor(a.currentSlide / a.move);
            a.currentItem = a.currentSlide;
            a.slides.removeClass(e + "active-slide").eq(a.currentItem).addClass(e + "active-slide");
            a.slides.click(function (b) {
                b.preventDefault();
                var b = d(this), g = b.index();
                !d(c.asNavFor).data("flexslider").animating && !b.hasClass("active") && (a.direction = a.currentItem < g ? "next" : "prev", a.flexAnimate(g, c.pauseOnAction, !1, !0, !0))
            })
        }}, controlNav: {setup: function () {
            a.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging()
        }, setupPaging: function () {
            var b = 1, g;
            a.controlNavScaffold = d('<ol class="' + e + "control-nav " + e + ("thumbnails" === c.controlNav ? "control-thumbs" : "control-paging") + '"></ol>');
            if (1 < a.pagingCount)for (var n = 0; n < a.pagingCount; n++)g = "thumbnails" === c.controlNav ? '<img src="' + a.slides.eq(n).attr("data-thumb") + '"/>' : "<a>" + b + "</a>", a.controlNavScaffold.append("<li>" + g + "</li>"), b++;
            a.controlsContainer ? d(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold);
            f.controlNav.set();
            f.controlNav.active();
            a.controlNavScaffold.delegate("a, img", t, function (b) {
                b.preventDefault();
                var b = d(this), g = a.controlNav.index(b);
                b.hasClass(e + "active") || (a.direction = g > a.currentSlide ? "next" : "prev", a.flexAnimate(g, c.pauseOnAction))
            });
            p && a.controlNavScaffold.delegate("a", "click touchstart", function (a) {
                a.preventDefault()
            })
        }, setupManual: function () {
            a.controlNav = a.manualControls;
            f.controlNav.active();
            a.controlNav.live(t, function (b) {
                b.preventDefault();
                var b = d(this), g = a.controlNav.index(b);
                b.hasClass(e + "active") || (g > a.currentSlide ? a.direction = "next" : a.direction = "prev", a.flexAnimate(g, c.pauseOnAction))
            });
            p && a.controlNav.live("click touchstart", function (a) {
                a.preventDefault()
            })
        }, set: function () {
            a.controlNav = d("." + e + "control-nav li " + ("thumbnails" === c.controlNav ? "img" : "a"), a.controlsContainer ? a.controlsContainer : a)
        }, active: function () {
            a.controlNav.removeClass(e + "active").eq(a.animatingTo).addClass(e + "active")
        }, update: function (b, c) {
            1 < a.pagingCount && "add" === b ? a.controlNavScaffold.append(d("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(c).closest("li").remove();
            f.controlNav.set();
            1 < a.pagingCount && a.pagingCount !== a.controlNav.length ? a.update(c, b) : f.controlNav.active()
        }}, directionNav: {setup: function () {
            var b = d('<ul class="' +
                e + 'direction-nav"><li><a class="' + e + 'prev" href="#">' + c.prevText + '</a></li><li><a class="' + e + 'next" href="#">' + c.nextText + "</a></li></ul>");
            a.controlsContainer ? (d(a.controlsContainer).append(b), a.directionNav = d("." + e + "direction-nav li a", a.controlsContainer)) : (a.append(b), a.directionNav = d("." + e + "direction-nav li a", a));
            f.directionNav.update();
            a.directionNav.bind(t, function (b) {
                b.preventDefault();
                b = d(this).hasClass(e + "next") ? a.getTarget("next") : a.getTarget("prev");
                a.flexAnimate(b, c.pauseOnAction)
            });
            p && a.directionNav.bind("click touchstart", function (a) {
                a.preventDefault()
            })
        }, update: function () {
            var b = e + "disabled";
            1 === a.pagingCount ? a.directionNav.addClass(b) : c.animationLoop ? a.directionNav.removeClass(b) : 0 === a.animatingTo ? a.directionNav.removeClass(b).filter("." + e + "prev").addClass(b) : a.animatingTo === a.last ? a.directionNav.removeClass(b).filter("." + e + "next").addClass(b) : a.directionNav.removeClass(b)
        }}, pausePlay: {setup: function () {
            var b = d('<div class="' + e + 'pauseplay"><a></a></div>');
            a.controlsContainer ? (a.controlsContainer.append(b), a.pausePlay = d("." + e + "pauseplay a", a.controlsContainer)) : (a.append(b), a.pausePlay = d("." + e + "pauseplay a", a));
            f.pausePlay.update(c.slideshow ? e + "pause" : e + "play");
            a.pausePlay.bind(t, function (b) {
                b.preventDefault();
                d(this).hasClass(e + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play())
            });
            p && a.pausePlay.bind("click touchstart", function (a) {
                a.preventDefault()
            })
        }, update: function (b) {
            "play" === b ? a.pausePlay.removeClass(e + "pause").addClass(e + "play").text(c.playText) : a.pausePlay.removeClass(e + "play").addClass(e + "pause").text(c.pauseText)
        }}, touch: function () {
            function b(b) {
                j = l ? d - b.touches[0].pageY : d - b.touches[0].pageX;
                p = l ? Math.abs(j) < Math.abs(b.touches[0].pageX - e) : Math.abs(j) < Math.abs(b.touches[0].pageY - e);
                if (!p || 500 < Number(new Date) - k)b.preventDefault(), !r && a.transitions && (c.animationLoop || (j /= 0 === a.currentSlide && 0 > j || a.currentSlide === a.last && 0 < j ? Math.abs(j) / q + 2 : 1), a.setProps(f + j, "setTouch"))
            }

            function g() {
                i.removeEventListener("touchmove", b, !1);
                if (a.animatingTo === a.currentSlide && !p && null !== j) {
                    var h = m ? -j : j, l = 0 < h ? a.getTarget("next") : a.getTarget("prev");
                    a.canAdvance(l) && (550 > Number(new Date) - k && 50 < Math.abs(h) || Math.abs(h) > q / 2) ? a.flexAnimate(l, c.pauseOnAction) : r || a.flexAnimate(a.currentSlide, c.pauseOnAction, !0)
                }
                i.removeEventListener("touchend", g, !1);
                f = j = e = d = null
            }

            var d, e, f, q, j, k, p = !1;
            i.addEventListener("touchstart", function (j) {
                a.animating ? j.preventDefault() : 1 === j.touches.length && (a.pause(), q = l ? a.h : a.w, k = Number(new Date), f = h && m && a.animatingTo === a.last ? 0 : h && m ? a.limit - (a.itemW + c.itemMargin) * a.move * a.animatingTo : h && a.currentSlide === a.last ? a.limit : h ? (a.itemW + c.itemMargin) * a.move * a.currentSlide : m ? (a.last - a.currentSlide + a.cloneOffset) * q : (a.currentSlide + a.cloneOffset) * q, d = l ? j.touches[0].pageY : j.touches[0].pageX, e = l ? j.touches[0].pageX : j.touches[0].pageY, i.addEventListener("touchmove", b, !1), i.addEventListener("touchend", g, !1))
            }, !1)
        }, resize: function () {
            !a.animating && a.is(":visible") && (h || a.doMath(), r ? f.smoothHeight() : h ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : l ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (c.smoothHeight && f.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
        }, smoothHeight: function (b) {
            if (!l || r) {
                var c = r ? a : a.viewport;
                b ? c.animate({height: a.slides.eq(a.animatingTo).height()}, b) : c.height(a.slides.eq(a.animatingTo).height())
            }
        }, sync: function (b) {
            var g = d(c.sync).data("flexslider"), e = a.animatingTo;
            switch (b) {
                case"animate":
                    g.flexAnimate(e, c.pauseOnAction, !1, !0);
                    break;
                case"play":
                    !g.playing && !g.asNav && g.play();
                    break;
                case"pause":
                    g.pause()
            }
        }};
        a.flexAnimate = function (b, g, n, i, k) {
            s && 1 === a.pagingCount && (a.direction = a.currentItem < b ? "next" : "prev");
            if (!a.animating && (a.canAdvance(b, k) || n) && a.is(":visible")) {
                if (s && i)if (n = d(c.asNavFor).data("flexslider"), a.atEnd = 0 === b || b === a.count - 1, n.flexAnimate(b, !0, !1, !0, k), a.direction = a.currentItem < b ? "next" : "prev", n.direction = a.direction, Math.ceil((b + 1) / a.visible) - 1 !== a.currentSlide && 0 !== b)a.currentItem = b, a.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), b = Math.floor(b / a.visible); else return a.currentItem = b, a.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), !1;
                a.animating = !0;
                a.animatingTo = b;
                c.before(a);
                g && a.pause();
                a.syncExists && !k && f.sync("animate");
                c.controlNav && f.controlNav.active();
                h || a.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide");
                a.atEnd = 0 === b || b === a.last;
                c.directionNav && f.directionNav.update();
                b === a.last && (c.end(a), c.animationLoop || a.pause());
                if (r)p ? (a.slides.eq(a.currentSlide).css({opacity: 0, zIndex: 1}), a.slides.eq(b).css({opacity: 1, zIndex: 2}), a.slides.unbind("webkitTransitionEnd transitionend"), a.slides.eq(a.currentSlide).bind("webkitTransitionEnd transitionend", function () {
                    c.after(a)
                }), a.animating = !1, a.currentSlide = a.animatingTo) : (a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed, c.easing), a.slides.eq(b).fadeIn(c.animationSpeed, c.easing, a.wrapup)); else {
                    var q = l ? a.slides.filter(":first").height() : a.computedW;
                    h ? (b = c.itemWidth > a.w ? 2 * c.itemMargin : c.itemMargin, b = (a.itemW + b) * a.move * a.animatingTo, b = b > a.limit && 1 !== a.visible ? a.limit : b) : b = 0 === a.currentSlide && b === a.count - 1 && c.animationLoop && "next" !== a.direction ? m ? (a.count + a.cloneOffset) * q : 0 : a.currentSlide === a.last && 0 === b && c.animationLoop && "prev" !== a.direction ? m ? 0 : (a.count + 1) * q : m ? (a.count - 1 - b + a.cloneOffset) * q : (b + a.cloneOffset) * q;
                    a.setProps(b, "", c.animationSpeed);
                    if (a.transitions) {
                        if (!c.animationLoop || !a.atEnd)a.animating = !1, a.currentSlide = a.animatingTo;
                        a.container.unbind("webkitTransitionEnd transitionend");
                        a.container.bind("webkitTransitionEnd transitionend", function () {
                            a.wrapup(q)
                        })
                    } else a.container.animate(a.args, c.animationSpeed, c.easing, function () {
                        a.wrapup(q)
                    })
                }
                c.smoothHeight && f.smoothHeight(c.animationSpeed)
            }
        };
        a.wrapup = function (b) {
            !r && !h && (0 === a.currentSlide && a.animatingTo === a.last && c.animationLoop ? a.setProps(b, "jumpEnd") : a.currentSlide === a.last && (0 === a.animatingTo && c.animationLoop) && a.setProps(b, "jumpStart"));
            a.animating = !1;
            a.currentSlide = a.animatingTo;
            c.after(a)
        };
        a.animateSlides = function () {
            a.animating || a.flexAnimate(a.getTarget("next"))
        };
        a.pause = function () {
            clearInterval(a.animatedSlides);
            a.playing = !1;
            c.pausePlay && f.pausePlay.update("play");
            a.syncExists && f.sync("pause")
        };
        a.play = function () {
            a.animatedSlides = setInterval(a.animateSlides, c.slideshowSpeed);
            a.playing = !0;
            c.pausePlay && f.pausePlay.update("pause");
            a.syncExists && f.sync("play")
        };
        a.canAdvance = function (b, g) {
            var d = s ? a.pagingCount - 1 : a.last;
            return g ? !0 : s && a.currentItem === a.count - 1 && 0 === b && "prev" === a.direction ? !0 : s && 0 === a.currentItem && b === a.pagingCount - 1 && "next" !== a.direction ? !1 : b === a.currentSlide && !s ? !1 : c.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && b === d && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === d && 0 === b && "next" === a.direction ? !1 : !0
        };
        a.getTarget = function (b) {
            a.direction = b;
            return"next" === b ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
        };
        a.setProps = function (b, g, d) {
            var e, f = b ? b : (a.itemW + c.itemMargin) * a.move * a.animatingTo;
            e = -1 * function () {
                if (h)return"setTouch" === g ? b : m && a.animatingTo === a.last ? 0 : m ? a.limit - (a.itemW + c.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : f;
                switch (g) {
                    case"setTotal":
                        return m ? (a.count - 1 - a.currentSlide + a.cloneOffset) * b : (a.currentSlide + a.cloneOffset) * b;
                    case"setTouch":
                        return b;
                    case"jumpEnd":
                        return m ? b : a.count * b;
                    case"jumpStart":
                        return m ? a.count * b : b;
                    default:
                        return b
                }
            }() + "px";
            a.transitions && (e = l ? "translate3d(0," + e + ",0)" : "translate3d(" + e + ",0,0)", d = void 0 !== d ? d / 1E3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", d));
            a.args[a.prop] = e;
            (a.transitions || void 0 === d) && a.container.css(a.args)
        };
        a.setup = function (b) {
            if (r)a.slides.css({width: "100%", "float": "left", marginRight: "-100%", position: "relative"}), "init" === b && (p ? a.slides.css({opacity: 0, display: "block", webkitTransition: "opacity " + c.animationSpeed / 1E3 + "s ease", zIndex: 1}).eq(a.currentSlide).css({opacity: 1, zIndex: 2}) : a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed, c.easing)), c.smoothHeight && f.smoothHeight(); else {
                var g, n;
                "init" === b && (a.viewport = d('<div class="' + e + 'viewport"></div>').css({overflow: "hidden", position: "relative"}).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, m && (n = d.makeArray(a.slides).reverse(), a.slides = d(n), a.container.empty().append(a.slides)));
                c.animationLoop && !h && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== b && a.container.find(".clone").remove(), a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));
                a.newSlides = d(c.selector, a);
                g = m ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset;
                l && !h ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                    a.newSlides.css({display: "block"});
                    a.doMath();
                    a.viewport.height(a.h);
                    a.setProps(g * a.h, "init")
                }, "init" === b ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(g * a.computedW, "init"), setTimeout(function () {
                    a.doMath();
                    a.newSlides.css({width: a.computedW, "float": "left", display: "block"});
                    c.smoothHeight && f.smoothHeight()
                }, "init" === b ? 100 : 0))
            }
            h || a.slides.removeClass(e + "active-slide").eq(a.currentSlide).addClass(e + "active-slide")
        };
        a.doMath = function () {
            var b = a.slides.first(), d = c.itemMargin, e = c.minItems, f = c.maxItems;
            a.w = a.width();
            a.h = b.height();
            a.boxPadding = b.outerWidth() - b.width();
            h ? (a.itemT = c.itemWidth + d, a.minW = e ? e * a.itemT : a.w, a.maxW = f ? f * a.itemT : a.w, a.itemW = a.minW > a.w ? (a.w - d * e) / e : a.maxW < a.w ? (a.w - d * f) / f : c.itemWidth > a.w ? a.w : c.itemWidth, a.visible = Math.floor(a.w / (a.itemW + d)), a.move = 0 < c.move && c.move < a.visible ? c.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : c.itemWidth > a.w ? (a.itemW + 2 * d) * a.count - a.w -
                d : (a.itemW + d) * a.count - a.w - d) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1);
            a.computedW = a.itemW - a.boxPadding
        };
        a.update = function (b, d) {
            a.doMath();
            h || (b < a.currentSlide ? a.currentSlide += 1 : b <= a.currentSlide && 0 !== b && (a.currentSlide -= 1), a.animatingTo = a.currentSlide);
            if (c.controlNav && !a.manualControls)if ("add" === d && !h || a.pagingCount > a.controlNav.length)f.controlNav.update("add"); else if ("remove" === d && !h || a.pagingCount < a.controlNav.length)h && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), f.controlNav.update("remove", a.last);
            c.directionNav && f.directionNav.update()
        };
        a.addSlide = function (b, e) {
            var f = d(b);
            a.count += 1;
            a.last = a.count - 1;
            l && m ? void 0 !== e ? a.slides.eq(a.count - e).after(f) : a.container.prepend(f) : void 0 !== e ? a.slides.eq(e).before(f) : a.container.append(f);
            a.update(e, "add");
            a.slides = d(c.selector + ":not(.clone)", a);
            a.setup();
            c.added(a)
        };
        a.removeSlide = function (b) {
            var e = isNaN(b) ? a.slides.index(d(b)) : b;
            a.count -= 1;
            a.last = a.count - 1;
            isNaN(b) ? d(b, a.slides).remove() : l && m ? a.slides.eq(a.last).remove() : a.slides.eq(b).remove();
            a.doMath();
            a.update(e, "remove");
            a.slides = d(c.selector + ":not(.clone)", a);
            a.setup();
            c.removed(a)
        };
        f.init()
    };
    d.flexslider.defaults = {namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7E3, animationSpeed: 600, initDelay: 0, randomize: !1, pauseOnAction: !0, pauseOnHover: !1, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "Previous", nextText: "Next", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 0, maxItems: 0, move: 0, start: function () {
    }, before: function () {
    }, after: function () {
    }, end: function () {
    }, added: function () {
    }, removed: function () {
    }};
    d.fn.flexslider = function (i) {
        void 0 === i && (i = {});
        if ("object" === typeof i)return this.each(function () {
            var a = d(this), c = a.find(i.selector ? i.selector : ".slides > li");
            1 === c.length ? (c.fadeIn(400), i.start && i.start(a)) : void 0 == a.data("flexslider") && new d.flexslider(this, i)
        });
        var k = d(this).data("flexslider");
        switch (i) {
            case"play":
                k.play();
                break;
            case"pause":
                k.pause();
                break;
            case"next":
                k.flexAnimate(k.getTarget("next"), !0);
                break;
            case"prev":
            case"previous":
                k.flexAnimate(k.getTarget("prev"), !0);
                break;
            default:
                "number" === typeof i && k.flexAnimate(i, !0)
        }
    }
})(jQuery);

/*include: (jquery.nivo.slider.pack.js)*/
/*
 * jQuery Nivo Slider v3.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */


(function (e) {
    var t = function (t, n) {
        var r = e.extend({}, e.fn.nivoSlider.defaults, n);
        var i = {currentSlide: 0, currentImage: "", totalSlides: 0, running: false, paused: false, stop: false, controlNavEl: false};
        var s = e(t);
        s.data("nivo:vars", i).addClass("nivoSlider");
        var o = s.children();
        o.each(function () {
            var t = e(this);
            var n = "";
            if (!t.is("img")) {
                if (t.is("a")) {
                    t.addClass("nivo-imageLink");
                    n = t
                }
                t = t.find("img:first")
            }
            var r = r === 0 ? t.attr("width") : t.width(), s = s === 0 ? t.attr("height") : t.height();
            if (n !== "") {
                n.css("display", "none")
            }
            t.css("display", "none");
            i.totalSlides++
        });
        if (r.randomStart) {
            r.startSlide = Math.floor(Math.random() * i.totalSlides)
        }
        if (r.startSlide > 0) {
            if (r.startSlide >= i.totalSlides) {
                r.startSlide = i.totalSlides - 1
            }
            i.currentSlide = r.startSlide
        }
        if (e(o[i.currentSlide]).is("img")) {
            i.currentImage = e(o[i.currentSlide])
        } else {
            i.currentImage = e(o[i.currentSlide]).find("img:first")
        }
        if (e(o[i.currentSlide]).is("a")) {
            e(o[i.currentSlide]).css("display", "block")
        }
        var u = e("<img/>").addClass("nivo-main-image");
        u.attr("src", i.currentImage.attr("src")).show();
        s.append(u);
        e(window).resize(function () {
            s.children("img").width(s.width());
            u.attr("src", i.currentImage.attr("src"));
            u.stop().height("auto");
            e(".nivo-slice").remove();
            e(".nivo-box").remove()
        });
        s.append(e('<div class="nivo-caption"></div>'));
        var a = function (t) {
            var n = e(".nivo-caption", s);
            if (i.currentImage.attr("title") != "" && i.currentImage.attr("title") != undefined) {
                var r = i.currentImage.attr("title");
                if (r.substr(0, 1) == "#")r = e(r).html();
                if (n.css("display") == "block") {
                    setTimeout(function () {
                        n.html(r)
                    }, t.animSpeed)
                } else {
                    n.html(r);
                    n.stop().fadeIn(t.animSpeed)
                }
            } else {
                n.stop().fadeOut(t.animSpeed)
            }
        };
        a(r);
        var f = 0;
        if (!r.manualAdvance && o.length > 1) {
            f = setInterval(function () {
                d(s, o, r, false)
            }, r.pauseTime)
        }
        if (r.directionNav) {
            s.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + r.prevText + '</a><a class="nivo-nextNav">' + r.nextText + "</a></div>");
            e(s).on("click", "a.nivo-prevNav", function () {
                if (i.running) {
                    return false
                }
                clearInterval(f);
                f = "";
                i.currentSlide -= 2;
                d(s, o, r, "prev")
            });
            e(s).on("click", "a.nivo-nextNav", function () {
                if (i.running) {
                    return false
                }
                clearInterval(f);
                f = "";
                d(s, o, r, "next")
            })
        }
        if (r.controlNav) {
            i.controlNavEl = e('<div class="nivo-controlNav"></div>');
            s.after(i.controlNavEl);
            for (var l = 0; l < o.length; l++) {
                if (r.controlNavThumbs) {
                    i.controlNavEl.addClass("nivo-thumbs-enabled");
                    var c = o.eq(l);
                    if (!c.is("img")) {
                        c = c.find("img:first")
                    }
                    if (c.attr("data-thumb"))i.controlNavEl.append('<a class="nivo-control" rel="' + l + '"><img src="' + c.attr("data-thumb") + '" alt="" /></a>')
                } else {
                    i.controlNavEl.append('<a class="nivo-control" rel="' + l + '">' + (l + 1) + "</a>")
                }
            }
            e("a:eq(" + i.currentSlide + ")", i.controlNavEl).addClass("active");
            e("a", i.controlNavEl).bind("click", function () {
                if (i.running)return false;
                if (e(this).hasClass("active"))return false;
                clearInterval(f);
                f = "";
                u.attr("src", i.currentImage.attr("src"));
                i.currentSlide = e(this).attr("rel") - 1;
                d(s, o, r, "control")
            })
        }
        if (r.pauseOnHover) {
            s.hover(function () {
                i.paused = true;
                clearInterval(f);
                f = ""
            }, function () {
                i.paused = false;
                if (f === "" && !r.manualAdvance) {
                    f = setInterval(function () {
                        d(s, o, r, false)
                    }, r.pauseTime)
                }
            })
        }
        s.bind("nivo:animFinished", function () {
            u.attr("src", i.currentImage.attr("src"));
            i.running = false;
            e(o).each(function () {
                if (e(this).is("a")) {
                    e(this).css("display", "none")
                }
            });
            if (e(o[i.currentSlide]).is("a")) {
                e(o[i.currentSlide]).css("display", "block")
            }
            if (f === "" && !i.paused && !r.manualAdvance) {
                f = setInterval(function () {
                    d(s, o, r, false)
                }, r.pauseTime)
            }
            r.afterChange.call(this)
        });
        var h = function (t, n, r) {
            if (e(r.currentImage).parent().is("a"))e(r.currentImage).parent().css("display", "block");
            e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
            var i = e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().is("a") ? e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().height() : e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height();
            for (var s = 0; s < n.slices; s++) {
                var o = Math.round(t.width() / n.slices);
                if (s === n.slices - 1) {
                    t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({left: o * s + "px", width: t.width() - o * s + "px", height: i + "px", opacity: "0", overflow: "hidden"}))
                } else {
                    t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({left: o * s + "px", width: o + "px", height: i + "px", opacity: "0", overflow: "hidden"}))
                }
            }
            e(".nivo-slice", t).height(i);
            u.stop().animate({height: e(r.currentImage).height()}, n.animSpeed)
        };
        var p = function (t, n, r) {
            if (e(r.currentImage).parent().is("a"))e(r.currentImage).parent().css("display", "block");
            e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
            var i = Math.round(t.width() / n.boxCols), s = Math.round(e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height() / n.boxRows);
            for (var o = 0; o < n.boxRows; o++) {
                for (var a = 0; a < n.boxCols; a++) {
                    if (a === n.boxCols - 1) {
                        t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({opacity: 0, left: i * a + "px", top: s * o + "px", width: t.width() - i * a + "px"}));
                        e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
                    } else {
                        t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({opacity: 0, left: i * a + "px", top: s * o + "px", width: i + "px"}));
                        e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
                    }
                }
            }
            u.stop().animate({height: e(r.currentImage).height()}, n.animSpeed)
        };
        var d = function (t, n, r, i) {
            var s = t.data("nivo:vars");
            if (s && s.currentSlide === s.totalSlides - 1) {
                r.lastSlide.call(this)
            }
            if ((!s || s.stop) && !i) {
                return false
            }
            r.beforeChange.call(this);
            if (!i) {
                u.attr("src", s.currentImage.attr("src"))
            } else {
                if (i === "prev") {
                    u.attr("src", s.currentImage.attr("src"))
                }
                if (i === "next") {
                    u.attr("src", s.currentImage.attr("src"))
                }
            }
            s.currentSlide++;
            if (s.currentSlide === s.totalSlides) {
                s.currentSlide = 0;
                r.slideshowEnd.call(this)
            }
            if (s.currentSlide < 0) {
                s.currentSlide = s.totalSlides - 1
            }
            if (e(n[s.currentSlide]).is("img")) {
                s.currentImage = e(n[s.currentSlide])
            } else {
                s.currentImage = e(n[s.currentSlide]).find("img:first")
            }
            if (r.controlNav) {
                e("a", s.controlNavEl).removeClass("active");
                e("a:eq(" + s.currentSlide + ")", s.controlNavEl).addClass("active")
            }
            a(r);
            e(".nivo-slice", t).remove();
            e(".nivo-box", t).remove();
            var o = r.effect, f = "";
            if (r.effect === "random") {
                f = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade", "boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse");
                o = f[Math.floor(Math.random() * (f.length + 1))];
                if (o === undefined) {
                    o = "fade"
                }
            }
            if (r.effect.indexOf(",") !== -1) {
                f = r.effect.split(",");
                o = f[Math.floor(Math.random() * f.length)];
                if (o === undefined) {
                    o = "fade"
                }
            }
            if (s.currentImage.attr("data-transition")) {
                o = s.currentImage.attr("data-transition")
            }
            s.running = true;
            var l = 0, c = 0, d = "", m = "", g = "", y = "";
            if (o === "sliceDown" || o === "sliceDownRight" || o === "sliceDownLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceDownLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function () {
                    var n = e(this);
                    n.css({top: "0px"});
                    if (c === r.slices - 1) {
                        setTimeout(function () {
                            n.animate({opacity: "1.0"}, r.animSpeed, "", function () {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function () {
                            n.animate({opacity: "1.0"}, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "sliceUp" || o === "sliceUpRight" || o === "sliceUpLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceUpLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function () {
                    var n = e(this);
                    n.css({bottom: "0px"});
                    if (c === r.slices - 1) {
                        setTimeout(function () {
                            n.animate({opacity: "1.0"}, r.animSpeed, "", function () {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function () {
                            n.animate({opacity: "1.0"}, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "sliceUpDown" || o === "sliceUpDownRight" || o === "sliceUpDownLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                var b = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceUpDownLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function () {
                    var n = e(this);
                    if (c === 0) {
                        n.css("top", "0px");
                        c++
                    } else {
                        n.css("bottom", "0px");
                        c = 0
                    }
                    if (b === r.slices - 1) {
                        setTimeout(function () {
                            n.animate({opacity: "1.0"}, r.animSpeed, "", function () {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function () {
                            n.animate({opacity: "1.0"}, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    b++
                })
            } else if (o === "fold") {
                h(t, r, s);
                l = 0;
                c = 0;
                e(".nivo-slice", t).each(function () {
                    var n = e(this);
                    var i = n.width();
                    n.css({top: "0px", width: "0px"});
                    if (c === r.slices - 1) {
                        setTimeout(function () {
                            n.animate({width: i, opacity: "1.0"}, r.animSpeed, "", function () {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function () {
                            n.animate({width: i, opacity: "1.0"}, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "fade") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({width: t.width() + "px"});
                m.animate({opacity: "1.0"}, r.animSpeed * 2, "", function () {
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "slideInRight") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({width: "0px", opacity: "1"});
                m.animate({width: t.width() + "px"}, r.animSpeed * 2, "", function () {
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "slideInLeft") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({width: "0px", opacity: "1", left: "", right: "0px"});
                m.animate({width: t.width() + "px"}, r.animSpeed * 2, "", function () {
                    m.css({left: "0px", right: ""});
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "boxRandom") {
                p(t, r, s);
                g = r.boxCols * r.boxRows;
                c = 0;
                l = 0;
                y = v(e(".nivo-box", t));
                y.each(function () {
                    var n = e(this);
                    if (c === g - 1) {
                        setTimeout(function () {
                            n.animate({opacity: "1"}, r.animSpeed, "", function () {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function () {
                            n.animate({opacity: "1"}, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 20;
                    c++
                })
            } else if (o === "boxRain" || o === "boxRainReverse" || o === "boxRainGrow" || o === "boxRainGrowReverse") {
                p(t, r, s);
                g = r.boxCols * r.boxRows;
                c = 0;
                l = 0;
                var w = 0;
                var E = 0;
                var S = [];
                S[w] = [];
                y = e(".nivo-box", t);
                if (o === "boxRainReverse" || o === "boxRainGrowReverse") {
                    y = e(".nivo-box", t)._reverse()
                }
                y.each(function () {
                    S[w][E] = e(this);
                    E++;
                    if (E === r.boxCols) {
                        w++;
                        E = 0;
                        S[w] = []
                    }
                });
                for (var x = 0; x < r.boxCols * 2; x++) {
                    var T = x;
                    for (var N = 0; N < r.boxRows; N++) {
                        if (T >= 0 && T < r.boxCols) {
                            (function (n, i, s, u, a) {
                                var f = e(S[n][i]);
                                var l = f.width();
                                var c = f.height();
                                if (o === "boxRainGrow" || o === "boxRainGrowReverse") {
                                    f.width(0).height(0)
                                }
                                if (u === a - 1) {
                                    setTimeout(function () {
                                        f.animate({opacity: "1", width: l, height: c}, r.animSpeed / 1.3, "", function () {
                                            t.trigger("nivo:animFinished")
                                        })
                                    }, 100 + s)
                                } else {
                                    setTimeout(function () {
                                        f.animate({opacity: "1", width: l, height: c}, r.animSpeed / 1.3)
                                    }, 100 + s)
                                }
                            })(N, T, l, c, g);
                            c++
                        }
                        T--
                    }
                    l += 100
                }
            }
        };
        var v = function (e) {
            for (var t, n, r = e.length; r; t = parseInt(Math.random() * r, 10), n = e[--r], e[r] = e[t], e[t] = n);
            return e
        };
        var m = function (e) {
            if (this.console && typeof console.log !== "undefined") {
                console.log(e)
            }
        };
        this.stop = function () {
            if (!e(t).data("nivo:vars").stop) {
                e(t).data("nivo:vars").stop = true;
                m("Stop Slider")
            }
        };
        this.start = function () {
            if (e(t).data("nivo:vars").stop) {
                e(t).data("nivo:vars").stop = false;
                m("Start Slider")
            }
        };
        r.afterLoad.call(this);
        return this
    };
    e.fn.nivoSlider = function (n) {
        return this.each(function (r, i) {
            var s = e(this);
            if (s.data("nivoslider")) {
                return s.data("nivoslider")
            }
            var o = new t(this, n);
            s.data("nivoslider", o)
        })
    };
    e.fn.nivoSlider.defaults = {effect: "random", slices: 15, boxCols: 8, boxRows: 4, animSpeed: 500, pauseTime: 3e3, startSlide: 0, directionNav: true, controlNav: true, controlNavThumbs: false, pauseOnHover: true, manualAdvance: false, prevText: "Prev", nextText: "Next", randomStart: false, beforeChange: function () {
    }, afterChange: function () {
    }, slideshowEnd: function () {
    }, lastSlide: function () {
    }, afterLoad: function () {
    }};
    e.fn._reverse = [].reverse
})(jQuery)

    /*include: (jquery.cycle.all.js)*/
    /*!
     * jQuery Cycle Plugin (with Transition Definitions)
     * Examples and documentation at: http://jquery.malsup.com/cycle/
     * Copyright (c) 2007-2010 M. Alsup
     * Version: 2.9999.8 (26-OCT-2012)
     * Dual licensed under the MIT and GPL licenses.
     * http://jquery.malsup.com/license.html
     * Requires: jQuery v1.3.2 or later
     */
;
(function ($, undefined) {
    "use strict";
    var ver = '2.9999.8';
    if ($.support === undefined) {
        $.support = {opacity: !($.browser.msie)};
    }
    function debug(s) {
        if ($.fn.cycle.debug)
            log(s);
    }

    function log() {
        if (window.console && console.log)
            console.log('[cycle] ' + Array.prototype.join.call(arguments, ' '));
    }

    $.expr[':'].paused = function (el) {
        return el.cyclePause;
    };
    $.fn.cycle = function (options, arg2) {
        var o = {s: this.selector, c: this.context};
        if (this.length === 0 && options != 'stop') {
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing slideshow');
                $(function () {
                    $(o.s, o.c).cycle(options, arg2);
                });
                return this;
            }
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }
        return this.each(function () {
            var opts = handleArguments(this, options, arg2);
            if (opts === false)
                return;
            opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
            if (this.cycleTimeout)
                clearTimeout(this.cycleTimeout);
            this.cycleTimeout = this.cyclePause = 0;
            this.cycleStop = 0;
            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();
            if (els.length < 2) {
                log('terminating; too few slides: ' + els.length);
                return;
            }
            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false)
                return;
            var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10)
                    startTime = 10;
                debug('first timeout: ' + startTime);
                this.cycleTimeout = setTimeout(function () {
                    go(els, opts2, 0, !opts.backwards);
                }, startTime);
            }
        });
    };
    function triggerPause(cont, byHover, onPager) {
        var opts = $(cont).data('cycle.opts');
        if (!opts)
            return;
        var paused = !!cont.cyclePause;
        if (paused && opts.paused)
            opts.paused(cont, opts, byHover, onPager); else if (!paused && opts.resumed)
            opts.resumed(cont, opts, byHover, onPager);
    }

    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop === undefined)
            cont.cycleStop = 0;
        if (options === undefined || options === null)
            options = {};
        if (options.constructor == String) {
            switch (options) {
                case'destroy':
                case'stop':
                    var opts = $(cont).data('cycle.opts');
                    if (!opts)
                        return false;
                    cont.cycleStop++;
                    if (cont.cycleTimeout)
                        clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                    if (opts.elements)
                        $(opts.elements).stop();
                    $(cont).removeData('cycle.opts');
                    if (options == 'destroy')
                        destroy(cont, opts);
                    return false;
                case'toggle':
                    cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
                    checkInstantResume(cont.cyclePause, arg2, cont);
                    triggerPause(cont);
                    return false;
                case'pause':
                    cont.cyclePause = 1;
                    triggerPause(cont);
                    return false;
                case'resume':
                    cont.cyclePause = 0;
                    checkInstantResume(false, arg2, cont);
                    triggerPause(cont);
                    return false;
                case'prev':
                case'next':
                    opts = $(cont).data('cycle.opts');
                    if (!opts) {
                        log('options not found, "prev/next" ignored');
                        return false;
                    }
                    $.fn.cycle[options](opts);
                    return false;
                default:
                    options = {fx: options};
            }
            return options;
        }
        else if (options.constructor == Number) {
            var num = options;
            options = $(cont).data('cycle.opts');
            if (!options) {
                log('options not found, can not advance slide');
                return false;
            }
            if (num < 0 || num >= options.elements.length) {
                log('invalid slide index: ' + num);
                return false;
            }
            options.nextSlide = num;
            if (cont.cycleTimeout) {
                clearTimeout(cont.cycleTimeout);
                cont.cycleTimeout = 0;
            }
            if (typeof arg2 == 'string')
                options.oneTimeFx = arg2;
            go(options.elements, options, 1, num >= options.currSlide);
            return false;
        }
        return options;
        function checkInstantResume(isPaused, arg2, cont) {
            if (!isPaused && arg2 === true) {
                var options = $(cont).data('cycle.opts');
                if (!options) {
                    log('options not found, can not resume');
                    return false;
                }
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                go(options.elements, options, 1, !options.backwards);
            }
        }
    }

    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try {
                el.style.removeAttribute('filter');
            }
            catch (smother) {
            }
        }
    }

    function destroy(cont, opts) {
        if (opts.next)
            $(opts.next).unbind(opts.prevNextEvent);
        if (opts.prev)
            $(opts.prev).unbind(opts.prevNextEvent);
        if (opts.pager || opts.pagerAnchorBuilder)
            $.each(opts.pagerAnchors || [], function () {
                this.unbind().remove();
            });
        opts.pagerAnchors = null;
        $(cont).unbind('mouseenter.cycle mouseleave.cycle');
        if (opts.destroy)
            opts.destroy(opts);
    }

    function buildOptions($cont, $slides, els, options, o) {
        var startingSlideSpecified;
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
        if (meta)
            opts = $.extend(opts, meta);
        if (opts.autostop)
            opts.countdown = opts.autostopCount || els.length;
        var cont = $cont[0];
        $cont.data('cycle.opts', opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];
        if (!$.support.opacity && opts.cleartype)
            opts.after.push(function () {
                removeFilter(this, opts);
            });
        if (opts.continuous)
            opts.after.push(function () {
                go(els, opts, 0, !opts.backwards);
            });
        saveOriginalOpts(opts);
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
            clearTypeFix($slides);
        if ($cont.css('position') == 'static')
            $cont.css('position', 'relative');
        if (opts.width)
            $cont.width(opts.width);
        if (opts.height && opts.height != 'auto')
            $cont.height(opts.height);
        if (opts.startingSlide !== undefined) {
            opts.startingSlide = parseInt(opts.startingSlide, 10);
            if (opts.startingSlide >= els.length || opts.startSlide < 0)
                opts.startingSlide = 0; else
                startingSlideSpecified = true;
        }
        else if (opts.backwards)
            opts.startingSlide = els.length - 1; else
            opts.startingSlide = 0;
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++)
                opts.randomMap.push(i);
            opts.randomMap.sort(function (a, b) {
                return Math.random() - 0.5;
            });
            if (startingSlideSpecified) {
                for (var cnt = 0; cnt < els.length; cnt++) {
                    if (opts.startingSlide == opts.randomMap[cnt]) {
                        opts.randomIndex = cnt;
                    }
                }
            }
            else {
                opts.randomIndex = 1;
                opts.startingSlide = opts.randomMap[1];
            }
        }
        else if (opts.startingSlide >= els.length)
            opts.startingSlide = 0;
        opts.currSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;
        $slides.css({position: 'absolute', top: 0, left: 0}).hide().each(function (i) {
            var z;
            if (opts.backwards)
                z = first ? i <= first ? els.length + (i - first) : first - i : els.length - i; else
                z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
            $(this).css('z-index', z);
        });
        $(els[first]).css('opacity', 1).show();
        removeFilter(els[first], opts);
        if (opts.fit) {
            if (!opts.aspect) {
                if (opts.width)
                    $slides.width(opts.width);
                if (opts.height && opts.height != 'auto')
                    $slides.height(opts.height);
            } else {
                $slides.each(function () {
                    var $slide = $(this);
                    var ratio = (opts.aspect === true) ? $slide.width() / $slide.height() : opts.aspect;
                    if (opts.width && $slide.width() != opts.width) {
                        $slide.width(opts.width);
                        $slide.height(opts.width / ratio);
                    }
                    if (opts.height && $slide.height() < opts.height) {
                        $slide.height(opts.height);
                        $slide.width(opts.height * ratio);
                    }
                });
            }
        }
        if (opts.center && ((!opts.fit) || opts.aspect)) {
            $slides.each(function () {
                var $slide = $(this);
                $slide.css({"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0, "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0});
            });
        }
        if (opts.center && !opts.fit && !opts.slideResize) {
            $slides.each(function () {
                var $slide = $(this);
                $slide.css({"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0, "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0});
            });
        }
        var reshape = (opts.containerResize || opts.containerResizeHeight) && !$cont.innerHeight();
        if (reshape) {
            var maxw = 0, maxh = 0;
            for (var j = 0; j < els.length; j++) {
                var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
                if (!w)w = e.offsetWidth || e.width || $e.attr('width');
                if (!h)h = e.offsetHeight || e.height || $e.attr('height');
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh;
            }
            if (opts.containerResize && maxw > 0 && maxh > 0)
                $cont.css({width: maxw + 'px', height: maxh + 'px'});
            if (opts.containerResizeHeight && maxh > 0)
                $cont.css({height: maxh + 'px'});
        }
        var pauseFlag = false;
        if (opts.pause)
            $cont.bind('mouseenter.cycle', function () {
                pauseFlag = true;
                this.cyclePause++;
                triggerPause(cont, true);
            }).bind('mouseleave.cycle', function () {
                if (pauseFlag)
                    this.cyclePause--;
                triggerPause(cont, true);
            });
        if (supportMultiTransitions(opts) === false)
            return false;
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function () {
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
            this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);
            if ($el.is('img')) {
                var loadingIE = ($.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
                var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
                var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
                var loadingOther = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
                if (loadingIE || loadingFF || loadingOp || loadingOther) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) {
                        log(options.requeueAttempts, ' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
                        setTimeout(function () {
                            $(o.s, o.c).cycle(options);
                        }, opts.requeueTimeout);
                        requeue = true;
                        return false;
                    }
                    else {
                        log('could not determine size of image: ' + this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });
        if (requeue)
            return false;
        opts.cssBefore = opts.cssBefore || {};
        opts.cssAfter = opts.cssAfter || {};
        opts.cssFirst = opts.cssFirst || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};
        $slides.not(':eq(' + first + ')').css(opts.cssBefore);
        $($slides[first]).css(opts.cssFirst);
        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout, 10);
            if (opts.speed.constructor == String)
                opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed, 10);
            if (!opts.sync)
                opts.speed = opts.speed / 2;
            var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
            while ((opts.timeout - opts.speed) < buffer)
                opts.timeout += opts.speed;
        }
        if (opts.easing)
            opts.easeIn = opts.easeOut = opts.easing;
        if (!opts.speedIn)
            opts.speedIn = opts.speed;
        if (!opts.speedOut)
            opts.speedOut = opts.speed;
        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            if (++opts.randomIndex == els.length)
                opts.randomIndex = 0;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else if (opts.backwards)
            opts.nextSlide = opts.startingSlide === 0 ? (els.length - 1) : opts.startingSlide - 1; else
            opts.nextSlide = opts.startingSlide >= (els.length - 1) ? 0 : opts.startingSlide + 1;
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init))
                init($cont, $slides, opts); else if (opts.fx != 'custom' && !opts.multiFx) {
                log('unknown transition: ' + opts.fx, '; slideshow terminating');
                return false;
            }
        }
        var e0 = $slides[first];
        if (!opts.skipInitializationCallbacks) {
            if (opts.before.length)
                opts.before[0].apply(e0, [e0, e0, opts, true]);
            if (opts.after.length)
                opts.after[0].apply(e0, [e0, e0, opts, true]);
        }
        if (opts.next)
            $(opts.next).bind(opts.prevNextEvent, function () {
                return advance(opts, 1);
            });
        if (opts.prev)
            $(opts.prev).bind(opts.prevNextEvent, function () {
                return advance(opts, 0);
            });
        if (opts.pager || opts.pagerAnchorBuilder)
            buildPager(els, opts);
        exposeAddSlide(opts, els);
        return opts;
    }

    function saveOriginalOpts(opts) {
        opts.original = {before: [], after: []};
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter = $.extend({}, opts.cssAfter);
        opts.original.animIn = $.extend({}, opts.animIn);
        opts.original.animOut = $.extend({}, opts.animOut);
        $.each(opts.before, function () {
            opts.original.before.push(this);
        });
        $.each(opts.after, function () {
            opts.original.after.push(this);
        });
    }

    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        if (opts.fx.indexOf(',') > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g, '').split(',');
            for (i = 0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log('discarding unknown transition: ', fx);
                    opts.fxs.splice(i, 1);
                    i--;
                }
            }
            if (!opts.fxs.length) {
                log('No valid transitions named; slideshow terminating.');
                return false;
            }
        }
        else if (opts.fx == 'all') {
            opts.multiFx = true;
            opts.fxs = [];
            for (var p in txs) {
                if (txs.hasOwnProperty(p)) {
                    tx = txs[p];
                    if (txs.hasOwnProperty(p) && $.isFunction(tx))
                        opts.fxs.push(p);
                }
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2, 1)[0]);
            }
            debug('randomized fx sequence: ', opts.fxs);
        }
        return true;
    }

    function exposeAddSlide(opts, els) {
        opts.addSlide = function (newSlide, prepend) {
            var $s = $(newSlide), s = $s[0];
            if (!opts.autostopCount)
                opts.countdown++;
            els[prepend ? 'unshift' : 'push'](s);
            if (opts.els)
                opts.els[prepend ? 'unshift' : 'push'](s);
            opts.slideCount = els.length;
            if (opts.random) {
                opts.randomMap.push(opts.slideCount - 1);
                opts.randomMap.sort(function (a, b) {
                    return Math.random() - 0.5;
                });
            }
            $s.css('position', 'absolute');
            $s[prepend ? 'prependTo' : 'appendTo'](opts.$cont);
            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++;
            }
            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
                clearTypeFix($s);
            if (opts.fit && opts.width)
                $s.width(opts.width);
            if (opts.fit && opts.height && opts.height != 'auto')
                $s.height(opts.height);
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();
            $s.css(opts.cssBefore);
            if (opts.pager || opts.pagerAnchorBuilder)
                $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts);
            if ($.isFunction(opts.onAddSlide))
                opts.onAddSlide($s); else
                $s.hide();
        };
    }

    $.fn.cycle.resetState = function (opts, fx) {
        fx = fx || opts.fx;
        opts.before = [];
        opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter = $.extend({}, opts.original.cssAfter);
        opts.animIn = $.extend({}, opts.original.animIn);
        opts.animOut = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function () {
            opts.before.push(this);
        });
        $.each(opts.original.after, function () {
            opts.after.push(this);
        });
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init))
            init(opts.$cont, $(opts.elements), opts);
    };
    function go(els, opts, manual, fwd) {
        var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];
        if (manual && opts.busy && opts.manualTrump) {
            debug('manualTrump in go(), stopping active transition');
            $(els).stop(true, true);
            opts.busy = 0;
            clearTimeout(p.cycleTimeout);
        }
        if (opts.busy) {
            debug('transition active, ignoring new tx request');
            return;
        }
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
            return;
        if (!manual && !p.cyclePause && !opts.bounce && ((opts.autostop && (--opts.countdown <= 0)) || (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end)
                opts.end(opts);
            return;
        }
        var changed = false;
        if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
            changed = true;
            var fx = opts.fx;
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();
            if (opts.multiFx) {
                if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length))
                    opts.lastFx = 0; else if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0))
                    opts.lastFx = opts.fxs.length - 1;
                fx = opts.fxs[opts.lastFx];
            }
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null;
            }
            $.fn.cycle.resetState(opts, fx);
            if (opts.before.length)
                $.each(opts.before, function (i, o) {
                    if (p.cycleStop != opts.stopCount)return;
                    o.apply(next, [curr, next, opts, fwd]);
                });
            var after = function () {
                opts.busy = 0;
                $.each(opts.after, function (i, o) {
                    if (p.cycleStop != opts.stopCount)return;
                    o.apply(next, [curr, next, opts, fwd]);
                });
                if (!p.cycleStop) {
                    queueNext();
                }
            };
            debug('tx firing(' + fx + '); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
            opts.busy = 1;
            if (opts.fxFn)
                opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent); else if ($.isFunction($.fn.cycle[opts.fx]))
                $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent); else
                $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
        }
        else {
            queueNext();
        }
        if (changed || opts.nextSlide == opts.currSlide) {
            var roll;
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length) {
                    opts.randomIndex = 0;
                    opts.randomMap.sort(function (a, b) {
                        return Math.random() - 0.5;
                    });
                }
                opts.nextSlide = opts.randomMap[opts.randomIndex];
                if (opts.nextSlide == opts.currSlide)
                    opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
            }
            else if (opts.backwards) {
                roll = (opts.nextSlide - 1) < 0;
                if (roll && opts.bounce) {
                    opts.backwards = !opts.backwards;
                    opts.nextSlide = 1;
                    opts.currSlide = 0;
                }
                else {
                    opts.nextSlide = roll ? (els.length - 1) : opts.nextSlide - 1;
                    opts.currSlide = roll ? 0 : opts.nextSlide + 1;
                }
            }
            else {
                roll = (opts.nextSlide + 1) == els.length;
                if (roll && opts.bounce) {
                    opts.backwards = !opts.backwards;
                    opts.nextSlide = els.length - 2;
                    opts.currSlide = els.length - 1;
                }
                else {
                    opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
                    opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1;
                }
            }
        }
        if (changed && opts.pager)
            opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
        function queueNext() {
            var ms = 0, timeout = opts.timeout;
            if (opts.timeout && !opts.continuous) {
                ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
                if (opts.fx == 'shuffle')
                    ms -= opts.speedOut;
            }
            else if (opts.continuous && p.cyclePause)
                ms = 10;
            if (ms > 0)
                p.cycleTimeout = setTimeout(function () {
                    go(els, opts, 0, !opts.backwards);
                }, ms);
        }
    }

    $.fn.cycle.updateActivePagerLink = function (pager, currSlide, clsName) {
        $(pager).each(function () {
            $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
        });
    };
    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            var t = opts.timeoutFn.call(curr, curr, next, opts, fwd);
            while (opts.fx != 'none' && (t - opts.speed) < 250)
                t += opts.speed;
            debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
            if (t !== false)
                return t;
        }
        return opts.timeout;
    }

    $.fn.cycle.next = function (opts) {
        advance(opts, 1);
    };
    $.fn.cycle.prev = function (opts) {
        advance(opts, 0);
    };
    function advance(opts, moveForward) {
        var val = moveForward ? 1 : -1;
        var els = opts.elements;
        var p = opts.$cont[0], timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }
        if (opts.random && val < 0) {
            opts.randomIndex--;
            if (--opts.randomIndex == -2)
                opts.randomIndex = els.length - 2; else if (opts.randomIndex == -1)
                opts.randomIndex = els.length - 1;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else if (opts.random) {
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else {
            opts.nextSlide = opts.currSlide + val;
            if (opts.nextSlide < 0) {
                if (opts.nowrap)return false;
                opts.nextSlide = els.length - 1;
            }
            else if (opts.nextSlide >= els.length) {
                if (opts.nowrap)return false;
                opts.nextSlide = 0;
            }
        }
        var cb = opts.onPrevNextEvent || opts.prevNextClick;
        if ($.isFunction(cb))
            cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
        go(els, opts, 1, moveForward);
        return false;
    }

    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function (i, o) {
            $.fn.cycle.createPagerAnchor(i, o, $p, els, opts);
        });
        opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
    }

    $.fn.cycle.createPagerAnchor = function (i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder)) {
            a = opts.pagerAnchorBuilder(i, el);
            debug('pagerAnchorBuilder(' + i + ', el) returned: ' + a);
        }
        else
            a = '<a href="#">' + (i + 1) + '</a>';
        if (!a)
            return;
        var $a = $(a);
        if ($a.parents('body').length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function () {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone[0]);
                });
                $a = $(arr);
            }
            else {
                $a.appendTo($p);
            }
        }
        opts.pagerAnchors = opts.pagerAnchors || [];
        opts.pagerAnchors.push($a);
        var pagerFn = function (e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0], timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            var cb = opts.onPagerEvent || opts.pagerClick;
            if ($.isFunction(cb))
                cb(opts.nextSlide, els[opts.nextSlide]);
            go(els, opts, 1, opts.currSlide < i);
        };
        if (/mouseenter|mouseover/i.test(opts.pagerEvent)) {
            $a.hover(pagerFn, function () {
            });
        }
        else {
            $a.bind(opts.pagerEvent, pagerFn);
        }
        if (!/^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
            $a.bind('click.cycle', function () {
                return false;
            });
        var cont = opts.$cont[0];
        var pauseFlag = false;
        if (opts.pauseOnPagerHover) {
            $a.hover(function () {
                pauseFlag = true;
                cont.cyclePause++;
                triggerPause(cont, true, true);
            }, function () {
                if (pauseFlag)
                    cont.cyclePause--;
                triggerPause(cont, true, true);
            });
        }
    };
    $.fn.cycle.hopsFromLast = function (opts, fwd) {
        var hops, l = opts.lastSlide, c = opts.currSlide;
        if (fwd)
            hops = c > l ? c - l : opts.slideCount - l; else
            hops = c < l ? l - c : l + opts.slideCount - c;
        return hops;
    };
    function clearTypeFix($slides) {
        debug('applying clearType background-color hack');
        function hex(s) {
            s = parseInt(s, 10).toString(16);
            return s.length < 2 ? '0' + s : s;
        }

        function getBg(e) {
            for (; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
                var v = $.css(e, 'background-color');
                if (v && v.indexOf('rgb') >= 0) {
                    var rgb = v.match(/\d+/g);
                    return'#' + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                }
                if (v && v != 'transparent')
                    return v;
            }
            return'#ffffff';
        }

        $slides.each(function () {
            $(this).css('background-color', getBg(this));
        });
    }

    $.fn.cycle.commonReset = function (curr, next, opts, w, h, rev) {
        $(opts.elements).not(curr).hide();
        if (typeof opts.cssBefore.opacity == 'undefined')
            opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        if (opts.slideResize && w !== false && next.cycleW > 0)
            opts.cssBefore.width = next.cycleW;
        if (opts.slideResize && h !== false && next.cycleH > 0)
            opts.cssBefore.height = next.cycleH;
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = 'none';
        $(curr).css('zIndex', opts.slideCount + (rev === true ? 1 : 0));
        $(next).css('zIndex', opts.slideCount + (rev === true ? 0 : 1));
    };
    $.fn.cycle.custom = function (curr, next, opts, cb, fwd, speedOverride) {
        var $l = $(curr), $n = $(next);
        var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == 'number')
                speedIn = speedOut = speedOverride; else
                speedIn = speedOut = 1;
            easeIn = easeOut = null;
        }
        var fn = function () {
            $n.animate(opts.animIn, speedIn, easeIn, function () {
                cb();
            });
        };
        $l.animate(opts.animOut, speedOut, easeOut, function () {
            $l.css(opts.cssAfter);
            if (!opts.sync)
                fn();
        });
        if (opts.sync)fn();
    };
    $.fn.cycle.transitions = {fade: function ($cont, $slides, opts) {
        $slides.not(':eq(' + opts.currSlide + ')').css('opacity', 0);
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.opacity = 0;
        });
        opts.animIn = {opacity: 1};
        opts.animOut = {opacity: 0};
        opts.cssBefore = {top: 0, left: 0};
    }};
    $.fn.cycle.ver = function () {
        return ver;
    };
    $.fn.cycle.defaults = {activePagerClass: 'activeSlide', after: null, allowPagerClickBubble: false, animIn: null, animOut: null, aspect: false, autostop: 0, autostopCount: 0, backwards: false, before: null, center: null, cleartype: !$.support.opacity, cleartypeNoBg: false, containerResize: 1, containerResizeHeight: 0, continuous: 0, cssAfter: null, cssBefore: null, delay: 0, easeIn: null, easeOut: null, easing: null, end: null, fastOnEvent: 0, fit: 0, fx: 'fade', fxFn: null, height: 'auto', manualTrump: true, metaAttr: 'cycle', next: null, nowrap: 0, onPagerEvent: null, onPrevNextEvent: null, pager: null, pagerAnchorBuilder: null, pagerEvent: 'click.cycle', pause: 0, pauseOnPagerHover: 0, prev: null, prevNextEvent: 'click.cycle', random: 0, randomizeEffects: 1, requeueOnImageNotLoaded: true, requeueTimeout: 250, rev: 0, shuffle: null, skipInitializationCallbacks: false, slideExpr: null, slideResize: 1, speed: 1000, speedIn: null, speedOut: null, startingSlide: undefined, sync: 1, timeout: 4000, timeoutFn: null, updateActivePagerLink: null, width: null};
})(jQuery);
(function ($) {
    "use strict";
    $.fn.cycle.transitions.none = function ($cont, $slides, opts) {
        opts.fxFn = function (curr, next, opts, after) {
            $(next).show();
            $(curr).hide();
            after();
        };
    };
    $.fn.cycle.transitions.fadeout = function ($cont, $slides, opts) {
        $slides.not(':eq(' + opts.currSlide + ')').css({display: 'block', 'opacity': 1});
        opts.before.push(function (curr, next, opts, w, h, rev) {
            $(curr).css('zIndex', opts.slideCount + (rev !== true ? 1 : 0));
            $(next).css('zIndex', opts.slideCount + (rev !== true ? 0 : 1));
        });
        opts.animIn.opacity = 1;
        opts.animOut.opacity = 0;
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        opts.cssAfter.zIndex = 0;
    };
    $.fn.cycle.transitions.scrollUp = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.cssFirst.top = 0;
        opts.animIn.top = 0;
        opts.animOut.top = -h;
    };
    $.fn.cycle.transitions.scrollDown = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssFirst.top = 0;
        opts.cssBefore.top = -h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
    $.fn.cycle.transitions.scrollLeft = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = 0 - w;
    };
    $.fn.cycle.transitions.scrollRight = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = -w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.scrollHorz = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden').width();
        opts.before.push(function (curr, next, opts, fwd) {
            if (opts.rev)
                fwd = !fwd;
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.left = fwd ? (next.cycleW - 1) : (1 - next.cycleW);
            opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
        });
        opts.cssFirst.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = 0;
    };
    $.fn.cycle.transitions.scrollVert = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push(function (curr, next, opts, fwd) {
            if (opts.rev)
                fwd = !fwd;
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.top = fwd ? (1 - next.cycleH) : (next.cycleH - 1);
            opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.left = 0;
    };
    $.fn.cycle.transitions.slideX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.width = 'show';
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.slideY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animIn.height = 'show';
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.shuffle = function ($cont, $slides, opts) {
        var i, w = $cont.css('overflow', 'visible').width();
        $slides.css({left: 0, top: 0});
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
        });
        if (!opts.speedAdjusted) {
            opts.speed = opts.speed / 2;
            opts.speedAdjusted = true;
        }
        opts.random = 0;
        opts.shuffle = opts.shuffle || {left: -w, top: 15};
        opts.els = [];
        for (i = 0; i < $slides.length; i++)
            opts.els.push($slides[i]);
        for (i = 0; i < opts.currSlide; i++)
            opts.els.push(opts.els.shift());
        opts.fxFn = function (curr, next, opts, cb, fwd) {
            if (opts.rev)
                fwd = !fwd;
            var $el = fwd ? $(curr) : $(next);
            $(next).css(opts.cssBefore);
            var count = opts.slideCount;
            $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function () {
                var hops = $.fn.cycle.hopsFromLast(opts, fwd);
                for (var k = 0; k < hops; k++) {
                    if (fwd)
                        opts.els.push(opts.els.shift()); else
                        opts.els.unshift(opts.els.pop());
                }
                if (fwd) {
                    for (var i = 0, len = opts.els.length; i < len; i++)
                        $(opts.els[i]).css('z-index', len - i + count);
                }
                else {
                    var z = $(curr).css('z-index');
                    $el.css('z-index', parseInt(z, 10) + 1 + count);
                }
                $el.animate({left: 0, top: 0}, opts.speedOut, opts.easeOut, function () {
                    $(fwd ? this : curr).hide();
                    if (cb)cb();
                });
            });
        };
        $.extend(opts.cssBefore, {display: 'block', opacity: 1, top: 0, left: 0});
    };
    $.fn.cycle.transitions.turnUp = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = next.cycleH;
            opts.animIn.height = next.cycleH;
            opts.animOut.width = next.cycleW;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.height = 0;
        opts.animIn.top = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnDown = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnLeft = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = next.cycleW;
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.turnRight = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        $.extend(opts.cssBefore, {top: 0, left: 0, width: 0});
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.zoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.cssBefore.left = next.cycleW / 2;
            $.extend(opts.animIn, {top: 0, left: 0, width: next.cycleW, height: next.cycleH});
            $.extend(opts.animOut, {width: 0, height: 0, top: curr.cycleH / 2, left: curr.cycleW / 2});
        });
        opts.cssFirst.top = 0;
        opts.cssFirst.left = 0;
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
    };
    $.fn.cycle.transitions.fadeZoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false);
            opts.cssBefore.left = next.cycleW / 2;
            opts.cssBefore.top = next.cycleH / 2;
            $.extend(opts.animIn, {top: 0, left: 0, width: next.cycleW, height: next.cycleH});
        });
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
        opts.animOut.opacity = 0;
    };
    $.fn.cycle.transitions.blindX = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'hidden').width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.blindY = function ($cont, $slides, opts) {
        var h = $cont.css('overflow', 'hidden').height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
    $.fn.cycle.transitions.blindZ = function ($cont, $slides, opts) {
        var h = $cont.css('overflow', 'hidden').height();
        var w = $cont.width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = w;
        opts.animIn.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = h;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.growX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = this.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
    $.fn.cycle.transitions.growY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = this.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = this.cycleH;
            opts.animOut.top = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.curtainX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true, true);
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = curr.cycleW / 2;
            opts.animOut.width = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
    $.fn.cycle.transitions.curtainY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH / 2;
            opts.animOut.height = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.cover = function ($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssAfter.display = '';
            if (d == 'right')
                opts.cssBefore.left = -w; else if (d == 'up')
                opts.cssBefore.top = h; else if (d == 'down')
                opts.cssBefore.top = -h; else
                opts.cssBefore.left = w;
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.uncover = function ($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (d == 'right')
                opts.animOut.left = w; else if (d == 'up')
                opts.animOut.top = -h; else if (d == 'down')
                opts.animOut.top = h; else
                opts.animOut.left = -w;
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.toss = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'visible').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (!opts.animOut.left && !opts.animOut.top)
                $.extend(opts.animOut, {left: w * 2, top: -h / 2, opacity: 0}); else
                opts.animOut.opacity = 0;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
    };
    $.fn.cycle.transitions.wipe = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.cssBefore = opts.cssBefore || {};
        var clip;
        if (opts.clip) {
            if (/l2r/.test(opts.clip))
                clip = 'rect(0px 0px ' + h + 'px 0px)'; else if (/r2l/.test(opts.clip))
                clip = 'rect(0px ' + w + 'px ' + h + 'px ' + w + 'px)'; else if (/t2b/.test(opts.clip))
                clip = 'rect(0px ' + w + 'px 0px 0px)'; else if (/b2t/.test(opts.clip))
                clip = 'rect(' + h + 'px ' + w + 'px ' + h + 'px 0px)'; else if (/zoom/.test(opts.clip)) {
                var top = parseInt(h / 2, 10);
                var left = parseInt(w / 2, 10);
                clip = 'rect(' + top + 'px ' + left + 'px ' + top + 'px ' + left + 'px)';
            }
        }
        opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';
        var d = opts.cssBefore.clip.match(/(\d+)/g);
        var t = parseInt(d[0], 10), r = parseInt(d[1], 10), b = parseInt(d[2], 10), l = parseInt(d[3], 10);
        opts.before.push(function (curr, next, opts) {
            if (curr == next)return;
            var $curr = $(curr), $next = $(next);
            $.fn.cycle.commonReset(curr, next, opts, true, true, false);
            opts.cssAfter.display = 'block';
            var step = 1, count = parseInt((opts.speedIn / 13), 10) - 1;
            (function f() {
                var tt = t ? t - parseInt(step * (t / count), 10) : 0;
                var ll = l ? l - parseInt(step * (l / count), 10) : 0;
                var bb = b < h ? b + parseInt(step * ((h - b) / count || 1), 10) : h;
                var rr = r < w ? r + parseInt(step * ((w - r) / count || 1), 10) : w;
                $next.css({clip: 'rect(' + tt + 'px ' + rr + 'px ' + bb + 'px ' + ll + 'px)'});
                (step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
            })();
        });
        $.extend(opts.cssBefore, {display: 'block', opacity: 1, top: 0, left: 0});
        opts.animIn = {left: 0};
        opts.animOut = {left: 0};
    };
})(jQuery);

/*include: (liteaccordion.jquery.js)*/
/*************************************************!
 *
 *   project:    liteAccordion - a horizontal accordion plugin for jQuery
 *   author:     Nicola Hibbert
 *   url:        http://nicolahibbert.com/liteaccordion-v2/
 *   demo:       http://www.nicolahibbert.com/demo/liteAccordion/
 *
 *   Version:    2.1.1
 *   Copyright:  (c) 2010-2012 Nicola Hibbert
 *   Licence:    MIT
 *
 **************************************************/
;
(function ($) {
    var LiteAccordion = function (elem, options) {
        var defaults = {containerWidth: 960, containerHeight: 336, headerWidth: 48, responsive: false, autoScaleImages: false, minContainerWidth: 300, maxContainerWidth: 960, activateOn: 'click', firstSlide: 1, slideSpeed: 800, onTriggerSlide: function (e) {
        }, onSlideAnimComplete: function () {
        }, autoPlay: false, pauseOnHover: false, cycleSpeed: 6000, easing: 'swing', theme: 'basic', rounded: false, enumerateSlides: false, linkable: false}, settings = $.extend({}, defaults, options), slides = elem.children('ol').children('li'), header = slides.children(':first-child'), slideLen = slides.length, slideWidth = settings.containerWidth - slideLen * settings.headerWidth, methods = {play: function (index) {
            var next = core.nextSlide(index && index);
            if (core.playing)return;
            core.playing = setInterval(function () {
                header.eq(next()).trigger('click.liteAccordion');
            }, settings.cycleSpeed);
        }, stop: function () {
            clearInterval(core.playing);
            core.playing = 0;
        }, next: function () {
            methods.stop();
            header.eq(core.currentSlide === slideLen - 1 ? 0 : core.currentSlide + 1).trigger('click.liteAccordion');
        }, prev: function () {
            methods.stop();
            header.eq(core.currentSlide - 1).trigger('click.liteAccordion');
        }, destroy: function () {
            methods.stop();
            $(window).off('.liteAccordion');
            elem.attr('style', '').removeClass('liteAccordion basic dark light stitch').removeData('liteAccordion').off('.liteAccordion').find('li > :first-child').off('.liteAccordion').filter('.selected').removeClass('selected').end().find('b').remove();
            slides.removeClass('slide').children().attr('style', '');
        }, debug: function () {
            return{elem: elem, defaults: defaults, settings: settings, methods: methods, core: core};
        }}, core = {setStyles: function () {
            elem.width(settings.containerWidth).height(settings.containerHeight).addClass('liteAccordion').addClass(settings.rounded && 'rounded').addClass(settings.theme);
            slides.addClass('slide').children(':first-child').height(settings.headerWidth);
            core.setSlidePositions();
            if (settings.responsive) {
                core.responsive();
            } else {
                if (settings.autoScaleImages)core.autoScaleImages();
            }
        }, setSlidePositions: function () {
            var selected = header.filter('.selected');
            if (!selected.length)header.eq(settings.firstSlide - 1).addClass('selected');
            header.each(function (index) {
                var $this = $(this), left = index * settings.headerWidth, margin = header.first().next(), offset = parseInt(margin.css('marginLeft'), 10) || parseInt(margin.css('marginRight'), 10) || 0;
                if (selected.length) {
                    if (index > header.index(selected))left += slideWidth;
                } else {
                    if (index >= settings.firstSlide)left += slideWidth;
                }
                $this.css('left', left).width(settings.containerHeight).next().width(slideWidth - offset).css({left: left, paddingLeft: settings.headerWidth});
                settings.enumerateSlides && $this.append('<b>' + (index + 1) + '</b>');
            });
        }, responsive: function () {
            var parentWidth = elem.parent().width();
            if (parentWidth > settings.minContainerWidth) {
                settings.containerWidth = parentWidth < settings.maxContainerWidth ? parentWidth : settings.maxContainerWidth;
            } else if (parentWidth < settings.maxContainerWidth) {
                settings.containerWidth = parentWidth > settings.minContainerWidth ? parentWidth : settings.minContainerWidth;
            }
            settings.containerHeight = settings.containerWidth / 3 | 0;
            slideWidth = settings.containerWidth - slideLen * settings.headerWidth;
            elem.width(settings.containerWidth).height(settings.containerHeight);
            slides.children(':first-child').width(settings.containerHeight);
            core.setSlidePositions();
        }, autoScaleImages: function () {
            slides.children('div').each(function () {
                var $this = $(this), $imgs = $this.find('img');
                if ($imgs.length) {
                    $imgs.each(function (index, item) {
                        $(item).width($this.width() + 1);
                        $(item).height($this.height());
                    });
                }
            });
        }, bindEvents: function () {
            var resizeTimer = 0;
            if (settings.activateOn === 'click') {
                header.on('click.liteAccordion', core.triggerSlide);
            } else if (settings.activateOn === 'mouseover') {
                header.on('click.liteAccordion mouseover.liteAccordion', core.triggerSlide);
            }
            if (settings.pauseOnHover && settings.autoPlay) {
                elem.on('mouseover.liteAccordion', function () {
                    core.playing && methods.stop();
                }).on('mouseout.liteAccordion', function () {
                    !core.playing && methods.play(core.currentSlide);
                });
            }
            if (settings.responsive) {
                $(window).on('load.liteAccordion', function () {
                    if (settings.autoScaleImages)core.autoScaleImages();
                }).on('resize.liteAccordion orientationchange.liteAccordion', function () {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function () {
                        core.responsive();
                        if (settings.autoScaleImages)core.autoScaleImages();
                    }, 100);
                });
            }
        }, linkable: function () {
            var cacheSlideNames = (function () {
                var slideNames = [];
                slides.each(function () {
                    if ($(this).attr('data-slide-name'))slideNames.push(($(this).attr('data-slide-name')).toLowerCase());
                });
                return cacheSlideNames = slideNames;
            })();
            var triggerHash = function (e) {
                var index;
                if (e.type === 'load' && !window.location.hash)return;
                if (e.type === 'hashchange' && core.playing)return;
                index = $.inArray((window.location.hash.slice(1)).toLowerCase(), cacheSlideNames);
                if (index > -1 && index < cacheSlideNames.length)header.eq(index).trigger('click.liteAccordion');
            };
            $(window).on('hashchange.liteAccordion load.liteAccordion', triggerHash);
        }, currentSlide: settings.firstSlide - 1, nextSlide: function (index) {
            var next = index + 1 || core.currentSlide + 1;
            return function () {
                return next++ % slideLen;
            };
        }, playing: 0, slideAnimCompleteFlag: false, triggerSlide: function (e) {
            var $this = $(this), tab = {elem: $this, index: header.index($this), next: $this.next(), prev: $this.parent().prev().children('h2')};
            core.currentSlide = tab.index;
            core.slideAnimCompleteFlag = false;
            if (settings.linkable && !core.playing)window.location.hash = $this.parent().attr('data-slide-name');
            settings.onTriggerSlide.call(tab.next, $this);
            if ($this.hasClass('selected') && $this.position().left < slideWidth / 2) {
                core.animSlide(tab);
            } else {
                core.animSlideGroup(tab);
            }
            if (e.originalEvent && settings.autoPlay) {
                methods.stop();
                methods.play(header.index(header.filter('.selected')));
            }
        }, animSlide: function (triggerTab) {
            var _this = this;
            if (typeof this.pos === 'undefined')this.pos = slideWidth;
            header.removeClass('selected').filter(this.elem).addClass('selected');
            if (!!this.index) {
                this.elem.add(this.next).stop(true).animate({left: this.pos + this.index * settings.headerWidth}, settings.slideSpeed, settings.easing, function () {
                    if (!core.slideAnimCompleteFlag) {
                        settings.onSlideAnimComplete.call(triggerTab ? triggerTab.next : _this.prev.next());
                        core.slideAnimCompleteFlag = true;
                    }
                });
                header.removeClass('selected').filter(this.prev).addClass('selected');
            }
        }, animSlideGroup: function (triggerTab) {
            var group = ['left', 'right'];
            $.each(group, function (index, side) {
                var filterExpr, left;
                if (side === 'left') {
                    filterExpr = ':lt(' + (triggerTab.index + 1) + ')';
                    left = 0;
                } else {
                    filterExpr = ':gt(' + triggerTab.index + ')';
                    left = slideWidth;
                }
                slides.filter(filterExpr).children('h2').each(function () {
                    var $this = $(this), tab = {elem: $this, index: header.index($this), next: $this.next(), prev: $this.parent().prev().children('h2'), pos: left};
                    core.animSlide.call(tab, triggerTab);
                });
            });
            header.removeClass('selected').filter(triggerTab.elem).addClass('selected');
        }, ieClass: function (version) {
            if (version < 7)methods.destroy();
            if (version === 7 || version === 8) {
                slides.each(function (index) {
                    $(this).addClass('slide-' + index);
                });
            }
            elem.addClass('ie ie' + version);
        }, init: function () {
            var ua = navigator.userAgent, index = ua.indexOf('MSIE');
            if (index !== -1) {
                ua = ua.slice(index + 5, index + 6);
                core.ieClass(+ua);
            }
            core.setStyles();
            core.bindEvents();
            if (settings.cycleSpeed < settings.slideSpeed)settings.cycleSpeed = settings.slideSpeed;
            if (settings.linkable && 'onhashchange'in window)core.linkable();
            settings.autoPlay && methods.play();
        }};
        core.init();
        return methods;
    };
    $.fn.liteAccordion = function (method) {
        var elem = this, instance = elem.data('liteAccordion');
        if (typeof method === 'object' || !method) {
            return elem.each(function () {
                var liteAccordion;
                if (instance)return;
                liteAccordion = new LiteAccordion(elem, method);
                elem.data('liteAccordion', liteAccordion);
            });
        } else if (typeof method === 'string' && instance[method]) {
            if (method === 'debug') {
                return instance[method].call(elem);
            } else {
                instance[method].call(elem);
                return elem;
            }
        }
    };
})(jQuery);

/*include: (jquery.treeview.min.js)*/
/*
 * Treeview 1.4 - jQuery plugin to hide and show branches of a tree
 * 
 * http://bassistance.de/jquery-plugins/jquery-plugin-treeview/
 * http://docs.jquery.com/Plugins/Treeview
 *
 * Copyright (c) 2007 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.treeview.js 4684 2008-02-07 19:08:06Z joern.zaefferer $
 *
 */
;
(function ($) {
    $.extend($.fn, {swapClass: function (c1, c2) {
        var c1Elements = this.filter('.' + c1);
        this.filter('.' + c2).removeClass(c2).addClass(c1);
        c1Elements.removeClass(c1).addClass(c2);
        return this;
    }, replaceClass: function (c1, c2) {
        return this.filter('.' + c1).removeClass(c1).addClass(c2).end();
    }, hoverClass: function (className) {
        className = className || "hover";
        return this.hover(function () {
            $(this).addClass(className);
        }, function () {
            $(this).removeClass(className);
        });
    }, heightToggle: function (animated, callback) {
        animated ? this.animate({height: "toggle"}, animated, callback) : this.each(function () {
            jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"]();
            if (callback)callback.apply(this, arguments);
        });
    }, heightHide: function (animated, callback) {
        if (animated) {
            this.animate({height: "hide"}, animated, callback);
        } else {
            this.hide();
            if (callback)this.each(callback);
        }
    }, prepareBranches: function (settings) {
        if (!settings.prerendered) {
            this.filter(":last-child:not(ul)").addClass(CLASSES.last);
            this.filter((settings.collapsed ? "" : "." + CLASSES.closed) + ":not(." + CLASSES.open + ")").find(">ul").hide();
        }
        return this.filter(":has(>ul)");
    }, applyClasses: function (settings, toggler) {
        this.filter(":has(>ul):not(:has(>a))").find(">span").click(function (event) {
            toggler.apply($(this).next());
        }).add($("a", this)).hoverClass();
        if (!settings.prerendered) {
            this.filter(":has(>ul:hidden)").addClass(CLASSES.expandable).replaceClass(CLASSES.last, CLASSES.lastExpandable);
            this.not(":has(>ul:hidden)").addClass(CLASSES.collapsable).replaceClass(CLASSES.last, CLASSES.lastCollapsable);
            this.prepend("<div class=\"" + CLASSES.hitarea + "\"/>").find("div." + CLASSES.hitarea).each(function () {
                var classes = "";
                $.each($(this).parent().attr("class").split(" "), function () {
                    classes += this + "-hitarea ";
                });
                $(this).addClass(classes);
            });
        }
        this.find("div." + CLASSES.hitarea).click(toggler);
    }, treeview: function (settings) {
        settings = $.extend({cookieId: "treeview"}, settings);
        if (settings.add) {
            return this.trigger("add", [settings.add]);
        }
        if (settings.toggle) {
            var callback = settings.toggle;
            settings.toggle = function () {
                return callback.apply($(this).parent()[0], arguments);
            };
        }
        function treeController(tree, control) {
            function handler(filter) {
                return function () {
                    toggler.apply($("div." + CLASSES.hitarea, tree).filter(function () {
                        return filter ? $(this).parent("." + filter).length : true;
                    }));
                    return false;
                };
            }

            $("a:eq(0)", control).click(handler(CLASSES.collapsable));
            $("a:eq(1)", control).click(handler(CLASSES.expandable));
            $("a:eq(2)", control).click(handler());
        }

        function toggler() {
            $(this).parent().find(">.hitarea").swapClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea).end().swapClass(CLASSES.collapsable, CLASSES.expandable).swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">ul").heightToggle(settings.animated, settings.toggle);
            if (settings.unique) {
                $(this).parent().siblings().find(">.hitarea").replaceClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).replaceClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea).end().replaceClass(CLASSES.collapsable, CLASSES.expandable).replaceClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">ul").heightHide(settings.animated, settings.toggle);
            }
        }

        function serialize() {
            function binary(arg) {
                return arg ? 1 : 0;
            }

            var data = [];
            branches.each(function (i, e) {
                data[i] = $(e).is(":has(>ul:visible)") ? 1 : 0;
            });
            $.cookie(settings.cookieId, data.join(""));
        }

        function deserialize() {
            var stored = $.cookie(settings.cookieId);
            if (stored) {
                var data = stored.split("");
                branches.each(function (i, e) {
                    $(e).find(">ul")[parseInt(data[i]) ? "show" : "hide"]();
                });
            }
        }

        this.addClass("treeview");
        var branches = this.find("li").prepareBranches(settings);
        switch (settings.persist) {
            case"cookie":
                var toggleCallback = settings.toggle;
                settings.toggle = function () {
                    serialize();
                    if (toggleCallback) {
                        toggleCallback.apply(this, arguments);
                    }
                };
                deserialize();
                break;
            case"location":
                var current = this.find("a").filter(function () {
                    return this.href.toLowerCase() == location.href.toLowerCase();
                });
                if (current.length) {
                    current.addClass("selected").parents("ul, li").add(current.next()).show();
                }
                break;
        }
        branches.applyClasses(settings, toggler);
        if (settings.control) {
            treeController(this, settings.control);
            $(settings.control).show();
        }
        return this.bind("add", function (event, branches) {
            $(branches).prev().removeClass(CLASSES.last).removeClass(CLASSES.lastCollapsable).removeClass(CLASSES.lastExpandable).find(">.hitarea").removeClass(CLASSES.lastCollapsableHitarea).removeClass(CLASSES.lastExpandableHitarea);
            $(branches).find("li").andSelf().prepareBranches(settings).applyClasses(settings, toggler);
        });
    }});
    var CLASSES = $.fn.treeview.classes = {open: "open", closed: "closed", expandable: "expandable", expandableHitarea: "expandable-hitarea", lastExpandableHitarea: "lastExpandable-hitarea", collapsable: "collapsable", collapsableHitarea: "collapsable-hitarea", lastCollapsableHitarea: "lastCollapsable-hitarea", lastCollapsable: "lastCollapsable", lastExpandable: "lastExpandable", last: "last", hitarea: "hitarea"};
    $.fn.Treeview = $.fn.treeview;
})(jQuery);

/*include: (jquery.carouFredSel-6.1.0-packed.js)*/
/*
 *	jQuery carouFredSel 6.1.0
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return(c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--)r[e(c)] = k[c] || e(c);
        k = [function (e) {
            return r[e]
        }];
        e = function () {
            return'\\w+'
        };
        c = 1
    }
    ;
    while (c--)if (k[c])p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(C($){8($.1r.1v){G}$.1r.6s=$.1r.1v=C(u,w){8(1k.R==0){17(I,\'6t 57 6u 1j "\'+1k.4p+\'".\');G 1k}8(1k.R>1){G 1k.1W(C(){$(1k).1v(u,w)})}E y=1k,$13=1k[0],59=K;8(y.1m(\'5a\')){59=y.1Q(\'3p\',\'4q\');y.S(\'3p\',[\'4r\',I])}y.5b=C(o,a,b){o=3T($13,o);o.D=6v($13,o.D);o.1M=6w($13,o.1M);o.M=6x($13,o.M);o.V=5c($13,o.V);o.Z=5c($13,o.Z);o.1a=6y($13,o.1a);o.1q=6z($13,o.1q);o.1h=6A($13,o.1h);8(a){34=$.1N(I,{},$.1r.1v.5d,o)}7=$.1N(I,{},$.1r.1v.5d,o);7.d=6B(7);z.2b=(7.2b==\'4s\'||7.2b==\'1n\')?\'Z\':\'V\';E c=y.14(),2n=5e($1s,7,\'N\');8(3q(7.23)){7.23=\'7T\'+F.3U}7.3V=5f(7,2n);7.D=6C(7.D,7,c,b);7[7.d[\'N\']]=6D(7[7.d[\'N\']],7,c);7[7.d[\'1d\']]=6E(7[7.d[\'1d\']],7,c);8(7.2o){8(!3W(7[7.d[\'N\']])){7[7.d[\'N\']]=\'2J%\'}}8(3W(7[7.d[\'N\']])){z.6F=I;z.4t=7[7.d[\'N\']];7[7.d[\'N\']]=4u(2n,z.4t);8(!7.D.L){7.D.T.1c=I}}8(7.2o){7.1R=K;7.1i=[0,0,0,0];7.1A=K;7.D.T.1c=K}O{8(!7.D.L){7=6G(7,2n)}8(!7[7.d[\'N\']]){8(!7.D.T.1c&&11(7.D[7.d[\'N\']])&&7.D.1t==\'*\'){7[7.d[\'N\']]=7.D.L*7.D[7.d[\'N\']];7.1A=K}O{7[7.d[\'N\']]=\'1c\'}}8(1E(7.1A)){7.1A=(11(7[7.d[\'N\']]))?\'5g\':K}8(7.D.T.1c){7.D.L=35(c,7,0)}}8(7.D.1t!=\'*\'&&!7.D.T.1c){7.D.T.4v=7.D.L;7.D.L=3X(c,7,0)}7.D.L=2z(7.D.L,7,7.D.T.2c,$13);7.D.T.1Z=7.D.L;8(7.2o){8(!7.D.T.36){7.D.T.36=7.D.L}8(!7.D.T.1X){7.D.T.1X=7.D.L}7=5h(7,c,2n)}O{7.1i=6H(7.1i);8(7.1A==\'3r\'){7.1A=\'1n\'}O 8(7.1A==\'5i\'){7.1A=\'3a\'}1B(7.1A){Q\'5g\':Q\'1n\':Q\'3a\':8(7[7.d[\'N\']]!=\'1c\'){7=5j(7,c);7.1R=I}16;2A:7.1A=K;7.1R=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?K:I;16}}8(!11(7.1M.1F)){7.1M.1F=6I}8(1E(7.1M.D)){7.1M.D=(7.2o||7.D.T.1c||7.D.1t!=\'*\')?\'L\':7.D.L}7.M=$.1N(I,{},7.1M,7.M);7.V=$.1N(I,{},7.1M,7.V);7.Z=$.1N(I,{},7.1M,7.Z);7.1a=$.1N(I,{},7.1M,7.1a);7.M=6J($13,7.M);7.V=5k($13,7.V);7.Z=5k($13,7.Z);7.1a=6K($13,7.1a);7.1q=6L($13,7.1q);7.1h=6M($13,7.1h);8(7.2p){7.2p=5l(7.2p)}8(7.M.5m){7.M.4w=7.M.5m;2K(\'M.5m\',\'M.4w\')}8(7.M.5n){7.M.4x=7.M.5n;2K(\'M.5n\',\'M.4x\')}8(7.M.5o){7.M.4y=7.M.5o;2K(\'M.5o\',\'M.4y\')}8(7.M.5p){7.M.2L=7.M.5p;2K(\'M.5p\',\'M.2L\')}};y.6N=C(){y.1m(\'5a\',I);E a=y.14(),3Y=5q(y,[\'6O\',\'6P\',\'3s\',\'3r\',\'3a\',\'5i\',\'1n\',\'3Z\',\'N\',\'1d\',\'6Q\',\'1S\',\'5r\',\'6R\']),5s=\'7U\';1B(3Y.3s){Q\'6S\':Q\'7V\':5s=3Y.3s;16}$1s.X(3Y).X({\'7W\':\'3t\',\'3s\':5s});y.1m(\'5t\',3Y).X({\'6O\':\'1n\',\'6P\':\'41\',\'3s\':\'6S\',\'3r\':0,\'3a\':\'M\',\'5i\':\'M\',\'1n\':0,\'6Q\':0,\'1S\':0,\'5r\':0,\'6R\':0});4z(a,7);5u(a,7);8(7.2o){5v(7,a)}};y.6T=C(){y.5w();y.12(H(\'5x\',F),C(e,a){e.1f();8(!z.2d){8(7.M.W){7.M.W.3b(2B(\'4A\',F))}}z.2d=I;8(7.M.1G){7.M.1G=K;y.S(H(\'3c\',F),a)}G I});y.12(H(\'5y\',F),C(e){e.1f();8(z.25){42(U)}G I});y.12(H(\'3c\',F),C(e,a,b){e.1f();1u=3u(1u);8(a&&z.25){U.2d=I;E c=2q()-U.2M;U.1F-=c;8(U.3v){U.3v.1F-=c}8(U.3w){U.3w.1F-=c}42(U,K)}8(!z.26&&!z.25){8(b){1u.3x+=2q()-1u.2M}}8(!z.26){8(7.M.W){7.M.W.3b(2B(\'6U\',F))}}z.26=I;8(7.M.4x){E d=7.M.2L-1u.3x,3d=2J-1H.2C(d*2J/7.M.2L);7.M.4x.1g($13,3d,d)}G I});y.12(H(\'1G\',F),C(e,b,c,d){e.1f();1u=3u(1u);E v=[b,c,d],t=[\'2N\',\'27\',\'3e\'],a=3f(v,t);b=a[0];c=a[1];d=a[2];8(b!=\'V\'&&b!=\'Z\'){b=z.2b}8(!11(c)){c=0}8(!1l(d)){d=K}8(d){z.2d=K;7.M.1G=I}8(!7.M.1G){e.2e();G 17(F,\'3y 4A: 2r 3g.\')}8(z.26){8(7.M.W){7.M.W.2O(2B(\'4A\',F));7.M.W.2O(2B(\'6U\',F))}}z.26=K;1u.2M=2q();E f=7.M.2L+c;43=f-1u.3x;3d=2J-1H.2C(43*2J/f);8(7.M.1e){1u.1e=7X(C(){E a=2q()-1u.2M+1u.3x,3d=1H.2C(a*2J/f);7.M.1e.4B.1g(7.M.1e.2s[0],3d)},7.M.1e.5z)}1u.M=7Y(C(){8(7.M.1e){7.M.1e.4B.1g(7.M.1e.2s[0],2J)}8(7.M.4y){7.M.4y.1g($13,3d,43)}8(z.25){y.S(H(\'1G\',F),b)}O{y.S(H(b,F),7.M)}},43);8(7.M.4w){7.M.4w.1g($13,3d,43)}G I});y.12(H(\'3h\',F),C(e){e.1f();8(U.2d){U.2d=K;z.26=K;z.25=I;U.2M=2q();2P(U)}O{y.S(H(\'1G\',F))}G I});y.12(H(\'V\',F)+\' \'+H(\'Z\',F),C(e,b,f,g,h){e.1f();8(z.2d||y.2f(\':3t\')){e.2e();G 17(F,\'3y 4A 7Z 3t: 2r 3g.\')}E i=(11(7.D.4C))?7.D.4C:7.D.L+1;8(i>J.P){e.2e();G 17(F,\'2r 6V D (\'+J.P+\' P, \'+i+\' 6W): 2r 3g.\')}E v=[b,f,g,h],t=[\'2g\',\'27/2N\',\'C\',\'3e\'],a=3f(v,t);b=a[0];f=a[1];g=a[2];h=a[3];E k=e.5A.18(F.3z.44.R);8(!1I(b)){b={}}8(1o(g)){b.3i=g}8(1l(h)){b.2Q=h}b=$.1N(I,{},7[k],b);8(b.5B&&!b.5B.1g($13,k)){e.2e();G 17(F,\'80 "5B" 81 K.\')}8(!11(f)){8(7.D.1t!=\'*\'){f=\'L\'}O{E m=[f,b.D,7[k].D];1j(E a=0,l=m.R;a<l;a++){8(11(m[a])||m[a]==\'6X\'||m[a]==\'L\'){f=m[a];16}}}1B(f){Q\'6X\':e.2e();G y.1Q(H(k+\'82\',F),[b,g]);16;Q\'L\':8(!7.D.T.1c&&7.D.1t==\'*\'){f=7.D.L}16}}8(U.2d){y.S(H(\'3h\',F));y.S(H(\'2Q\',F),[k,[b,f,g]]);e.2e();G 17(F,\'3y 83 3g.\')}8(b.1F>0){8(z.25){8(b.2Q){8(b.2Q==\'2R\'){2h=[]}8(b.2Q!=\'Y\'||2h.R==0){y.S(H(\'2Q\',F),[k,[b,f,g]])}}e.2e();G 17(F,\'3y 84 3g.\')}}1u.3x=0;y.S(H(\'6Y\'+k,F),[b,f]);8(7.2p){E s=7.2p,c=[b,f];1j(E j=0,l=s.R;j<l;j++){E d=k;8(!s[j][2]){d=(d==\'V\')?\'Z\':\'V\'}8(!s[j][1]){c[0]=s[j][0].1Q(\'3p\',[\'4D\',d])}c[1]=f+s[j][3];s[j][0].S(\'3p\',[\'6Y\'+d,c])}}G I});y.12(H(\'85\',F),C(e,b,c){e.1f();E d=y.14();8(!7.1T){8(J.Y==0){8(7.3A){y.S(H(\'Z\',F),J.P-1)}G e.2e()}}1U(d,7);8(!11(c)){8(7.D.T.1c){c=4E(d,7,J.P-1)}O 8(7.D.1t!=\'*\'){E f=(11(b.D))?b.D:5C(y,7);c=6Z(d,7,J.P-1,f)}O{c=7.D.L}c=4F(c,7,b.D,$13)}8(!7.1T){8(J.P-c<J.Y){c=J.P-J.Y}}7.D.T.1Z=7.D.L;8(7.D.T.1c){E g=2z(35(d,7,J.P-c),7,7.D.T.2c,$13);8(7.D.L+c<=g&&c<J.P){c++;g=2z(35(d,7,J.P-c),7,7.D.T.2c,$13)}7.D.L=g}O 8(7.D.1t!=\'*\'){E g=3X(d,7,J.P-c);7.D.L=2z(g,7,7.D.T.2c,$13)}1U(d,7,I);8(c==0){e.2e();G 17(F,\'0 D 45 1M: 2r 3g.\')}17(F,\'70 \'+c+\' D 5D.\');J.Y+=c;2i(J.Y>=J.P){J.Y-=J.P}8(!7.1T){8(J.Y==0&&b.4G){b.4G.1g($13,\'V\')}8(!7.3A){3B(7,J.Y,F)}}y.14().18(J.P-c,J.P).86(y);8(J.P<7.D.L+c){y.14().18(0,(7.D.L+c)-J.P).4H(I).46(y)}E d=y.14(),3j=71(d,7,c),2j=72(d,7),1Y=d.1O(c-1),20=3j.2R(),2t=2j.2R();1U(d,7);E h=0,2D=0;8(7.1A){E p=4I(2j,7);h=p[0];2D=p[1]}E i=(h<0)?7.1i[7.d[3]]:0;E j=K,2S=$();8(7.D.L<c){2S=d.18(7.D.T.1Z,c);8(b.1V==\'73\'){E k=7.D[7.d[\'N\']];j=2S;1Y=2t;5E(j);7.D[7.d[\'N\']]=\'1c\'}}E l=K,3C=2T(d.18(0,c),7,\'N\'),2k=4J(4K(2j,7,I),7,!7.1R),3D=0,28={},4L={},2u={},2U={},4M={},2V={},5F={},2W=5G(b,7,c,3C);1B(b.1V){Q\'1J\':Q\'1J-1w\':3D=2T(d.18(0,7.D.L),7,\'N\');16}8(j){7.D[7.d[\'N\']]=k}1U(d,7,I);8(2D>=0){1U(20,7,7.1i[7.d[1]])}8(h>=0){1U(1Y,7,7.1i[7.d[3]])}8(7.1A){7.1i[7.d[1]]=2D;7.1i[7.d[3]]=h}2V[7.d[\'1n\']]=-(3C-i);5F[7.d[\'1n\']]=-(3D-i);4L[7.d[\'1n\']]=2k[7.d[\'N\']];E m=C(){},1P=C(){},1C=C(){},3E=C(){},2E=C(){},5H=C(){},1D=C(){},3F=C(){},1x=C(){},1y=C(){},1K=C(){};1B(b.1V){Q\'3k\':Q\'1J\':Q\'1J-1w\':Q\'21\':Q\'21-1w\':l=y.4H(I).46($1s);16}1B(b.1V){Q\'3k\':Q\'21\':Q\'21-1w\':l.14().18(0,c).2v();l.14().18(7.D.T.1Z).2v();16;Q\'1J\':Q\'1J-1w\':l.14().18(7.D.L).2v();l.X(5F);16}y.X(2V);U=47(2W,b.2l);28[7.d[\'1n\']]=(7.1R)?7.1i[7.d[3]]:0;8(7[7.d[\'N\']]==\'1c\'||7[7.d[\'1d\']]==\'1c\'){m=C(){$1s.X(2k)};1P=C(){U.19.1b([$1s,2k])}}8(7.1R){8(2t.4N(1Y).R){2u[7.d[\'1S\']]=1Y.1m(\'29\');8(h<0){1Y.X(2u)}O{1D=C(){1Y.X(2u)};3F=C(){U.19.1b([1Y,2u])}}}1B(b.1V){Q\'1J\':Q\'1J-1w\':l.14().1O(c-1).X(2u);16}8(2t.4N(20).R){2U[7.d[\'1S\']]=20.1m(\'29\');1C=C(){20.X(2U)};3E=C(){U.19.1b([20,2U])}}8(2D>=0){4M[7.d[\'1S\']]=2t.1m(\'29\')+7.1i[7.d[1]];2E=C(){2t.X(4M)};5H=C(){U.19.1b([2t,4M])}}}1K=C(){y.X(28)};E n=7.D.L+c-J.P;1y=C(){8(n>0){y.14().18(J.P).2v();3j=$(y.14().18(J.P-(7.D.L-n)).3G().74(y.14().18(0,n).3G()))}5I(j);8(7.1R){E a=y.14().1O(7.D.L+c-1);a.X(7.d[\'1S\'],a.1m(\'29\'))}};E o=5J(3j,2S,2j,c,\'V\',2W,2k);1x=C(){5K(y,l,b);z.25=K;2a.3i=48($13,b,\'3i\',o,2a);2h=5L(y,2h,F);8(!z.26){y.S(H(\'1G\',F))}};z.25=I;1u=3u(1u);2a.3H=48($13,b,\'3H\',o,2a);1B(b.1V){Q\'41\':y.X(28);m();1C();2E();1D();1K();1y();1x();16;Q\'1w\':U.19.1b([y,{\'1L\':0},C(){m();1C();2E();1D();1K();1y();U=47(2W,b.2l);U.19.1b([y,{\'1L\':1},1x]);2P(U)}]);16;Q\'3k\':y.X({\'1L\':0});U.19.1b([l,{\'1L\':0}]);U.19.1b([y,{\'1L\':1},1x]);1P();1C();2E();1D();1K();1y();16;Q\'1J\':U.19.1b([l,28,C(){1C();2E();1D();1K();1y();1x()}]);1P();16;Q\'1J-1w\':U.19.1b([y,{\'1L\':0}]);U.19.1b([l,28,C(){y.X({\'1L\':1});1C();2E();1D();1K();1y();1x()}]);1P();16;Q\'21\':U.19.1b([l,4L,1x]);1P();1C();2E();1D();1K();1y();16;Q\'21-1w\':y.X({\'1L\':0});U.19.1b([y,{\'1L\':1}]);U.19.1b([l,4L,1x]);1P();1C();2E();1D();1K();1y();16;2A:U.19.1b([y,28,C(){1y();1x()}]);1P();3E();5H();3F();16}2P(U);5M(7.23,y,F);y.S(H(\'3I\',F),[K,2k]);G I});y.12(H(\'87\',F),C(e,c,d){e.1f();E f=y.14();8(!7.1T){8(J.Y==7.D.L){8(7.3A){y.S(H(\'V\',F),J.P-1)}G e.2e()}}1U(f,7);8(!11(d)){8(7.D.1t!=\'*\'){E g=(11(c.D))?c.D:5C(y,7);d=75(f,7,0,g)}O{d=7.D.L}d=4F(d,7,c.D,$13)}E h=(J.Y==0)?J.P:J.Y;8(!7.1T){8(7.D.T.1c){E i=35(f,7,d),g=4E(f,7,h-1)}O{E i=7.D.L,g=7.D.L}8(d+i>h){d=h-g}}7.D.T.1Z=7.D.L;8(7.D.T.1c){E i=2z(5N(f,7,d,h),7,7.D.T.2c,$13);2i(7.D.L-d>=i&&d<J.P){d++;i=2z(5N(f,7,d,h),7,7.D.T.2c,$13)}7.D.L=i}O 8(7.D.1t!=\'*\'){E i=3X(f,7,d);7.D.L=2z(i,7,7.D.T.2c,$13)}1U(f,7,I);8(d==0){e.2e();G 17(F,\'0 D 45 1M: 2r 3g.\')}17(F,\'70 \'+d+\' D 76.\');J.Y-=d;2i(J.Y<0){J.Y+=J.P}8(!7.1T){8(J.Y==7.D.L&&c.4G){c.4G.1g($13,\'Z\')}8(!7.3A){3B(7,J.Y,F)}}8(J.P<7.D.L+d){y.14().18(0,(7.D.L+d)-J.P).4H(I).46(y)}E f=y.14(),3j=77(f,7),2j=78(f,7,d),1Y=f.1O(d-1),20=3j.2R(),2t=2j.2R();1U(f,7);E j=0,2D=0;8(7.1A){E p=4I(2j,7);j=p[0];2D=p[1]}E k=K,2S=$();8(7.D.T.1Z<d){2S=f.18(7.D.T.1Z,d);8(c.1V==\'73\'){E l=7.D[7.d[\'N\']];k=2S;1Y=20;5E(k);7.D[7.d[\'N\']]=\'1c\'}}E m=K,3C=2T(f.18(0,d),7,\'N\'),2k=4J(4K(2j,7,I),7,!7.1R),3D=0,28={},4O={},2u={},2U={},2V={},2W=5G(c,7,d,3C);1B(c.1V){Q\'21\':Q\'21-1w\':3D=2T(f.18(0,7.D.T.1Z),7,\'N\');16}8(k){7.D[7.d[\'N\']]=l}8(7.1A){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}1U(f,7,I);1U(20,7,7.1i[7.d[1]]);8(7.1A){7.1i[7.d[1]]=2D;7.1i[7.d[3]]=j}2V[7.d[\'1n\']]=(7.1R)?7.1i[7.d[3]]:0;E n=C(){},1P=C(){},1C=C(){},3E=C(){},1D=C(){},3F=C(){},1x=C(){},1y=C(){},1K=C(){};1B(c.1V){Q\'3k\':Q\'1J\':Q\'1J-1w\':Q\'21\':Q\'21-1w\':m=y.4H(I).46($1s);m.14().18(7.D.T.1Z).2v();16}1B(c.1V){Q\'3k\':Q\'1J\':Q\'1J-1w\':y.X(\'3Z\',1);m.X(\'3Z\',0);16}U=47(2W,c.2l);28[7.d[\'1n\']]=-3C;4O[7.d[\'1n\']]=-3D;8(j<0){28[7.d[\'1n\']]+=j}8(7[7.d[\'N\']]==\'1c\'||7[7.d[\'1d\']]==\'1c\'){n=C(){$1s.X(2k)};1P=C(){U.19.1b([$1s,2k])}}8(7.1R){E o=2t.1m(\'29\');8(2D>=0){o+=7.1i[7.d[1]]}2t.X(7.d[\'1S\'],o);8(1Y.4N(20).R){2U[7.d[\'1S\']]=20.1m(\'29\')}1C=C(){20.X(2U)};3E=C(){U.19.1b([20,2U])};E q=1Y.1m(\'29\');8(j>0){q+=7.1i[7.d[3]]}2u[7.d[\'1S\']]=q;1D=C(){1Y.X(2u)};3F=C(){U.19.1b([1Y,2u])}}1K=C(){y.X(2V)};E r=7.D.L+d-J.P;1y=C(){8(r>0){y.14().18(J.P).2v()}E a=y.14().18(0,d).46(y).2R();8(r>0){2j=3J(f,7)}5I(k);8(7.1R){8(J.P<7.D.L+d){E b=y.14().1O(7.D.L-1);b.X(7.d[\'1S\'],b.1m(\'29\')+7.1i[7.d[3]])}a.X(7.d[\'1S\'],a.1m(\'29\'))}};E s=5J(3j,2S,2j,d,\'Z\',2W,2k);1x=C(){y.X(\'3Z\',y.1m(\'5t\').3Z);5K(y,m,c);z.25=K;2a.3i=48($13,c,\'3i\',s,2a);2h=5L(y,2h,F);8(!z.26){y.S(H(\'1G\',F))}};z.25=I;1u=3u(1u);2a.3H=48($13,c,\'3H\',s,2a);1B(c.1V){Q\'41\':y.X(28);n();1C();1D();1K();1y();1x();16;Q\'1w\':U.19.1b([y,{\'1L\':0},C(){n();1C();1D();1K();1y();U=47(2W,c.2l);U.19.1b([y,{\'1L\':1},1x]);2P(U)}]);16;Q\'3k\':y.X({\'1L\':0});U.19.1b([m,{\'1L\':0}]);U.19.1b([y,{\'1L\':1},1x]);1P();1C();1D();1K();1y();16;Q\'1J\':y.X(7.d[\'1n\'],$1s[7.d[\'N\']]());U.19.1b([y,2V,1x]);1P();1C();1D();1y();16;Q\'1J-1w\':y.X(7.d[\'1n\'],$1s[7.d[\'N\']]());U.19.1b([m,{\'1L\':0}]);U.19.1b([y,2V,1x]);1P();1C();1D();1y();16;Q\'21\':U.19.1b([m,4O,1x]);1P();1C();1D();1K();1y();16;Q\'21-1w\':y.X({\'1L\':0});U.19.1b([y,{\'1L\':1}]);U.19.1b([m,4O,1x]);1P();1C();1D();1K();1y();16;2A:U.19.1b([y,28,C(){1K();1y();1x()}]);1P();3E();3F();16}2P(U);5M(7.23,y,F);y.S(H(\'3I\',F),[K,2k]);G I});y.12(H(\'3l\',F),C(e,b,c,d,f,g,h){e.1f();E v=[b,c,d,f,g,h],t=[\'2N/27/2g\',\'27\',\'3e\',\'2g\',\'2N\',\'C\'],a=3f(v,t);f=a[3];g=a[4];h=a[5];b=3K(a[0],a[1],a[2],J,y);8(b==0){G K}8(!1I(f)){f=K}8(g!=\'V\'&&g!=\'Z\'){8(7.1T){g=(b<=J.P/2)?\'Z\':\'V\'}O{g=(J.Y==0||J.Y>b)?\'Z\':\'V\'}}8(g==\'V\'){b=J.P-b}y.S(H(g,F),[f,b,h]);G I});y.12(H(\'88\',F),C(e,a,b){e.1f();E c=y.1Q(H(\'4a\',F));G y.1Q(H(\'5O\',F),[c-1,a,\'V\',b])});y.12(H(\'89\',F),C(e,a,b){e.1f();E c=y.1Q(H(\'4a\',F));G y.1Q(H(\'5O\',F),[c+1,a,\'Z\',b])});y.12(H(\'5O\',F),C(e,a,b,c,d){e.1f();8(!11(a)){a=y.1Q(H(\'4a\',F))}E f=7.1a.D||7.D.L,1X=1H.2C(J.P/f)-1;8(a<0){a=1X}8(a>1X){a=0}G y.1Q(H(\'3l\',F),[a*f,0,I,b,c,d])});y.12(H(\'79\',F),C(e,s){e.1f();8(s){s=3K(s,0,I,J,y)}O{s=0}s+=J.Y;8(s!=0){8(J.P>0){2i(s>J.P){s-=J.P}}y.8a(y.14().18(s,J.P))}G I});y.12(H(\'2p\',F),C(e,s){e.1f();8(s){s=5l(s)}O 8(7.2p){s=7.2p}O{G 17(F,\'6t 8b 45 2p.\')}E n=y.1Q(H(\'4q\',F)),x=I;1j(E j=0,l=s.R;j<l;j++){8(!s[j][0].1Q(H(\'3l\',F),[n,s[j][3],I])){x=K}}G x});y.12(H(\'2Q\',F),C(e,a,b){e.1f();8(1o(a)){a.1g($13,2h)}O 8(2X(a)){2h=a}O 8(!1E(a)){2h.1b([a,b])}G 2h});y.12(H(\'8c\',F),C(e,b,c,d,f){e.1f();E v=[b,c,d,f],t=[\'2N/2g\',\'2N/27/2g\',\'3e\',\'27\'],a=3f(v,t);b=a[0];c=a[1];d=a[2];f=a[3];8(1I(b)&&!2w(b)){b=$(b)}O 8(1p(b)){b=$(b)}8(!2w(b)||b.R==0){G 17(F,\'2r a 5P 2g.\')}8(1E(c)){c=\'4b\'}4z(b,7);5u(b,7);E g=c,4c=\'4c\';8(c==\'4b\'){8(d){8(J.Y==0){c=J.P-1;4c=\'7a\'}O{c=J.Y;J.Y+=b.R}8(c<0){c=0}}O{c=J.P-1;4c=\'7a\'}}O{c=3K(c,f,d,J,y)}E h=y.14().1O(c);8(h.R){h[4c](b)}O{17(F,\'8d 8e-3s 4N 6u! 8f 8g 45 3L 4b.\');y.7b(b)}8(g!=\'4b\'&&!d){8(c<J.Y){J.Y+=b.R}}J.P=y.14().R;8(J.Y>=J.P){J.Y-=J.P}y.S(H(\'4P\',F));y.S(H(\'5Q\',F));G I});y.12(H(\'7c\',F),C(e,c,d,f){e.1f();E v=[c,d,f],t=[\'2N/27/2g\',\'3e\',\'27\'],a=3f(v,t);c=a[0];d=a[1];f=a[2];E g=K;8(c 2Y $&&c.R>1){h=$();c.1W(C(i,a){E b=y.S(H(\'7c\',F),[$(1k),d,f]);8(b)h=h.8h(b)});G h}8(1E(c)||c==\'4b\'){h=y.14().2R()}O{c=3K(c,f,d,J,y);E h=y.14().1O(c);8(h.R){8(c<J.Y)J.Y-=h.R}}8(h&&h.R){h.8i();J.P=y.14().R;y.S(H(\'4P\',F))}G h});y.12(H(\'3H\',F)+\' \'+H(\'3i\',F),C(e,a){e.1f();E b=e.5A.18(F.3z.44.R);8(2X(a)){2a[b]=a}8(1o(a)){2a[b].1b(a)}G 2a[b]});y.12(H(\'4q\',F),C(e,a){e.1f();8(J.Y==0){E b=0}O{E b=J.P-J.Y}8(1o(a)){a.1g($13,b)}G b});y.12(H(\'4a\',F),C(e,a){e.1f();E b=7.1a.D||7.D.L,1X=1H.2C(J.P/b-1),2m;8(J.Y==0){2m=0}O 8(J.Y<J.P%b){2m=0}O 8(J.Y==b&&!7.1T){2m=1X}O{2m=1H.7d((J.P-J.Y)/b)}8(2m<0){2m=0}8(2m>1X){2m=1X}8(1o(a)){a.1g($13,2m)}G 2m});y.12(H(\'8j\',F),C(e,a){e.1f();E b=3J(y.14(),7);8(1o(a)){a.1g($13,b)}G b});y.12(H(\'18\',F),C(e,f,l,b){e.1f();8(J.P==0){G K}E v=[f,l,b],t=[\'27\',\'27\',\'C\'],a=3f(v,t);f=(11(a[0]))?a[0]:0;l=(11(a[1]))?a[1]:J.P;b=a[2];f+=J.Y;l+=J.Y;8(D.P>0){2i(f>J.P){f-=J.P}2i(l>J.P){l-=J.P}2i(f<0){f+=J.P}2i(l<0){l+=J.P}}E c=y.14(),$i;8(l>f){$i=c.18(f,l)}O{$i=$(c.18(f,J.P).3G().74(c.18(0,l).3G()))}8(1o(b)){b.1g($13,$i)}G $i});y.12(H(\'26\',F)+\' \'+H(\'2d\',F)+\' \'+H(\'25\',F),C(e,a){e.1f();E b=e.5A.18(F.3z.44.R),5R=z[b];8(1o(a)){a.1g($13,5R)}G 5R});y.12(H(\'4D\',F),C(e,a,b,c){e.1f();E d=K;8(1o(a)){a.1g($13,7)}O 8(1I(a)){34=$.1N(I,{},34,a);8(b!==K)d=I;O 7=$.1N(I,{},7,a)}O 8(!1E(a)){8(1o(b)){E f=4Q(\'7.\'+a);8(1E(f)){f=\'\'}b.1g($13,f)}O 8(!1E(b)){8(2Z c!==\'3e\')c=I;4Q(\'34.\'+a+\' = b\');8(c!==K)d=I;O 4Q(\'7.\'+a+\' = b\')}O{G 4Q(\'7.\'+a)}}8(d){1U(y.14(),7);y.5b(34);y.5S();E g=4R(y,7);y.S(H(\'3I\',F),[I,g])}G 7});y.12(H(\'5Q\',F),C(e,a,b){e.1f();8(1E(a)){a=$(\'8k\')}O 8(1p(a)){a=$(a)}8(!2w(a)||a.R==0){G 17(F,\'2r a 5P 2g.\')}8(!1p(b)){b=\'a.6s\'}a.8l(b).1W(C(){E h=1k.7e||\'\';8(h.R>0&&y.14().7f($(h))!=-1){$(1k).22(\'5T\').5T(C(e){e.2F();y.S(H(\'3l\',F),h)})}});G I});y.12(H(\'3I\',F),C(e,b,c){e.1f();8(!7.1a.1z){G}E d=7.1a.D||7.D.L,4S=1H.2C(J.P/d);8(b){8(7.1a.3M){7.1a.1z.14().2v();7.1a.1z.1W(C(){1j(E a=0;a<4S;a++){E i=y.14().1O(3K(a*d,0,I,J,y));$(1k).7b(7.1a.3M.1g(i[0],a+1))}})}7.1a.1z.1W(C(){$(1k).14().22(7.1a.3N).1W(C(a){$(1k).12(7.1a.3N,C(e){e.2F();y.S(H(\'3l\',F),[a*d,-7.1a.4T,I,7.1a])})})})}E f=y.1Q(H(\'4a\',F))+7.1a.4T;8(f>=4S){f=0}8(f<0){f=4S-1}7.1a.1z.1W(C(){$(1k).14().2O(2B(\'7g\',F)).1O(f).3b(2B(\'7g\',F))});G I});y.12(H(\'4P\',F),C(e){E a=7.D.L,2G=y.14(),2n=5e($1s,7,\'N\');J.P=2G.R;8(z.4t){7.3V=2n;7[7.d[\'N\']]=4u(2n,z.4t)}O{7.3V=5f(7,2n)}8(7.2o){7.D.N=7.D.3O.N;7.D.1d=7.D.3O.1d;7=5h(7,2G,2n);a=7.D.L;5v(7,2G)}O 8(7.D.T.1c){a=35(2G,7,0)}O 8(7.D.1t!=\'*\'){a=3X(2G,7,0)}8(!7.1T&&J.Y!=0&&a>J.Y){8(7.D.T.1c){E b=4E(2G,7,J.Y)-J.Y}O 8(7.D.1t!=\'*\'){E b=7h(2G,7,J.Y)-J.Y}O{E b=7.D.L-J.Y}17(F,\'8m 8n-1T: 8o \'+b+\' D 5D.\');y.S(H(\'V\',F),b)}7.D.L=2z(a,7,7.D.T.2c,$13);7.D.T.1Z=7.D.L;7=5j(7,2G);E c=4R(y,7);y.S(H(\'3I\',F),[I,c]);4U(7,J.P,F);3B(7,J.Y,F);G c});y.12(H(\'4r\',F),C(e,a){e.1f();1u=3u(1u);y.1m(\'5a\',K);y.S(H(\'5y\',F));8(a){y.S(H(\'79\',F))}1U(y.14(),7);8(7.2o){y.14().1W(C(){$(1k).X($(1k).1m(\'7i\'))})}y.X(y.1m(\'5t\'));y.5w();y.5U();$1s.8p(y);G I});y.12(H(\'17\',F),C(e){17(F,\'3y N: \'+7.N);17(F,\'3y 1d: \'+7.1d);17(F,\'7j 8q: \'+7.D.N);17(F,\'7j 8r: \'+7.D.1d);17(F,\'4d 4e D L: \'+7.D.L);8(7.M.1G){17(F,\'4d 4e D 5V 8s: \'+7.M.D)}8(7.V.W){17(F,\'4d 4e D 5V 5D: \'+7.V.D)}8(7.Z.W){17(F,\'4d 4e D 5V 76: \'+7.Z.D)}G F.17});y.12(\'3p\',C(e,n,o){e.1f();G y.1Q(H(n,F),o)})};y.5w=C(){y.22(H(\'\',F));y.22(H(\'\',F,K));y.22(\'3p\')};y.5S=C(){y.5U();4U(7,J.P,F);3B(7,J.Y,F);8(7.M.2H){E b=3P(7.M.2H);$1s.12(H(\'4V\',F,K),C(){y.S(H(\'3c\',F),b)}).12(H(\'4W\',F,K),C(){y.S(H(\'3h\',F))})}8(7.M.W){7.M.W.12(H(7.M.3N,F,K),C(e){e.2F();E a=K,b=2x;8(z.26){a=\'1G\'}O 8(7.M.4X){a=\'3c\';b=3P(7.M.4X)}8(a){y.S(H(a,F),b)}})}8(7.V.W){7.V.W.12(H(7.V.3N,F,K),C(e){e.2F();y.S(H(\'V\',F))});8(7.V.2H){E b=3P(7.V.2H);7.V.W.12(H(\'4V\',F,K),C(){y.S(H(\'3c\',F),b)}).12(H(\'4W\',F,K),C(){y.S(H(\'3h\',F))})}}8(7.Z.W){7.Z.W.12(H(7.Z.3N,F,K),C(e){e.2F();y.S(H(\'Z\',F))});8(7.Z.2H){E b=3P(7.Z.2H);7.Z.W.12(H(\'4V\',F,K),C(){y.S(H(\'3c\',F),b)}).12(H(\'4W\',F,K),C(){y.S(H(\'3h\',F))})}}8(7.1a.1z){8(7.1a.2H){E b=3P(7.1a.2H);7.1a.1z.12(H(\'4V\',F,K),C(){y.S(H(\'3c\',F),b)}).12(H(\'4W\',F,K),C(){y.S(H(\'3h\',F))})}}8(7.V.31||7.Z.31){$(4f).12(H(\'7k\',F,K,I,I),C(e){E k=e.7l;8(k==7.Z.31){e.2F();y.S(H(\'Z\',F))}8(k==7.V.31){e.2F();y.S(H(\'V\',F))}})}8(7.1a.4Y){$(4f).12(H(\'7k\',F,K,I,I),C(e){E k=e.7l;8(k>=49&&k<58){k=(k-49)*7.D.L;8(k<=J.P){e.2F();y.S(H(\'3l\',F),[k,0,I,7.1a])}}})}8(7.V.4Z||7.Z.4Z){2K(\'3L 4g-7m\',\'3L 8t-7m\');8($.1r.4g){E c=(7.V.4Z)?C(){y.S(H(\'V\',F))}:2x,4h=(7.Z.4Z)?C(){y.S(H(\'Z\',F))}:2x;8(4h||4h){8(!z.4g){z.4g=I;E d={\'8u\':30,\'8v\':30,\'8w\':I};1B(7.2b){Q\'4s\':Q\'5W\':d.8x=c;d.8y=4h;16;2A:d.8z=4h;d.8A=c}$1s.4g(d)}}}}8($.1r.1q){E f=\'8B\'8C 3m;8((f&&7.1q.4i)||(!f&&7.1q.5X)){E g=$.1N(I,{},7.V,7.1q),7n=$.1N(I,{},7.Z,7.1q),5Y=C(){y.S(H(\'V\',F),[g])},5Z=C(){y.S(H(\'Z\',F),[7n])};1B(7.2b){Q\'4s\':Q\'5W\':7.1q.2I.8D=5Z;7.1q.2I.8E=5Y;16;2A:7.1q.2I.8F=5Z;7.1q.2I.8G=5Y}8(z.1q){y.1q(\'4r\')}$1s.1q(7.1q.2I);$1s.X(\'7o\',\'8H\');z.1q=I}}8($.1r.1h){8(7.V.1h){2K(\'7p V.1h 7q\',\'3L 1h 4D 2g\');7.V.1h=2x;7.1h={D:61(7.V.1h)}}8(7.Z.1h){2K(\'7p Z.1h 7q\',\'3L 1h 4D 2g\');7.Z.1h=2x;7.1h={D:61(7.Z.1h)}}8(7.1h){E h=$.1N(I,{},7.V,7.1h),7r=$.1N(I,{},7.Z,7.1h);8(z.1h){$1s.22(H(\'1h\',F,K))}$1s.12(H(\'1h\',F,K),C(e,a){e.2F();8(a>0){y.S(H(\'V\',F),[h])}O{y.S(H(\'Z\',F),[7r])}});z.1h=I}}8(7.M.1G){y.S(H(\'1G\',F),7.M.62)}8(z.6F){E i=C(e){y.S(H(\'5y\',F));8(7.M.63&&!z.26){y.S(H(\'1G\',F))}1U(y.14(),7);y.S(H(\'4P\',F))};E j=$(3m),4j=2x;8($.64&&F.65==\'64\'){4j=$.64(8I,i)}O 8($.51&&F.65==\'51\'){4j=$.51(8J,i)}O{E l=0,66=0;4j=C(){E a=j.N(),68=j.1d();8(a!=l||68!=66){i();l=a;66=68}}}j.12(H(\'8K\',F,K,I,I),4j)}};y.5U=C(){E a=H(\'\',F),3Q=H(\'\',F,K);69=H(\'\',F,K,I,I);$(4f).22(69);$(3m).22(69);$1s.22(3Q);8(7.M.W){7.M.W.22(3Q)}8(7.V.W){7.V.W.22(3Q)}8(7.Z.W){7.Z.W.22(3Q)}8(7.1a.1z){7.1a.1z.22(3Q);8(7.1a.3M){7.1a.1z.14().2v()}}8(z.1q){y.1q(\'4r\');$1s.X(\'7o\',\'2A\');z.1q=K}8(z.1h){z.1h=K}4U(7,\'4k\',F);3B(7,\'2O\',F)};8(1l(w)){w={\'17\':w}}E z={\'2b\':\'Z\',\'26\':I,\'25\':K,\'2d\':K,\'1h\':K,\'1q\':K},J={\'P\':y.14().R,\'Y\':0},1u={\'M\':2x,\'1e\':2x,\'2M\':2q(),\'3x\':0},U={\'2d\':K,\'1F\':0,\'2M\':0,\'2l\':\'\',\'19\':[]},2a={\'3H\':[],\'3i\':[]},2h=[],F=$.1N(I,{},$.1r.1v.7s,w),7={},34=$.1N(I,{},u),$1s=y.8L(\'<\'+F.6a.57+\' 8M="\'+F.6a.7t+\'" />\').6b();F.4p=y.4p;F.3U=$.1r.1v.3U++;y.5b(34,I,59);y.6N();y.6T();y.5S();8(2X(7.D.3n)){E A=7.D.3n}O{E A=[];8(7.D.3n!=0){A.1b(7.D.3n)}}8(7.23){A.8N(4l(7u(7.23),10))}8(A.R>0){1j(E a=0,l=A.R;a<l;a++){E s=A[a];8(s==0){6c}8(s===I){s=3m.8O.7e;8(s.R<1){6c}}O 8(s===\'7v\'){s=1H.4m(1H.7v()*J.P)}8(y.1Q(H(\'3l\',F),[s,0,I,{1V:\'41\'}])){16}}}E B=4R(y,7),7w=3J(y.14(),7);8(7.7x){7.7x.1g($13,{\'N\':B.N,\'1d\':B.1d,\'D\':7w})}y.S(H(\'3I\',F),[I,B]);y.S(H(\'5Q\',F));8(F.17){y.S(H(\'17\',F))}G y};$.1r.1v.3U=1;$.1r.1v.5d={\'2p\':K,\'3A\':I,\'1T\':I,\'2o\':K,\'2b\':\'1n\',\'D\':{\'3n\':0},\'1M\':{\'2l\':\'8P\',\'1F\':6I,\'2H\':K,\'3N\':\'5T\',\'2Q\':K}};$.1r.1v.7s={\'17\':K,\'65\':\'51\',\'3z\':{\'44\':\'\',\'7y\':\'8Q\'},\'6a\':{\'57\':\'8R\',\'7t\':\'8S\'},\'6d\':{}};$.1r.1v.7z=C(a){G\'<a 8T="#"><7A>\'+a+\'</7A></a>\'};$.1r.1v.7B=C(a){$(1k).X(\'N\',a+\'%\')};$.1r.1v.23={3G:C(n){n+=\'=\';E b=4f.23.3R(\';\');1j(E a=0,l=b.R;a<l;a++){E c=b[a];2i(c.8U(0)==\' \'){c=c.18(1)}8(c.3S(n)==0){G c.18(n.R)}}G 0},6e:C(n,v,d){E e="";8(d){E a=6f 7C();a.8V(a.2q()+(d*24*60*60*8W));e="; 8X="+a.8Y()}4f.23=n+\'=\'+v+e+\'; 8Z=/\'},2v:C(n){$.1r.1v.23.6e(n,"",-1)}};C 47(d,e){G{19:[],1F:d,90:d,2l:e,2M:2q()}}C 2P(s){8(1I(s.3v)){2P(s.3v)}1j(E a=0,l=s.19.R;a<l;a++){E b=s.19[a];8(!b){6c}8(b[3]){b[0].5x()}b[0].91(b[1],{92:b[2],1F:s.1F,2l:s.2l})}8(1I(s.3w)){2P(s.3w)}}C 42(s,c){8(!1l(c)){c=I}8(1I(s.3v)){42(s.3v,c)}1j(E a=0,l=s.19.R;a<l;a++){E b=s.19[a];b[0].5x(I);8(c){b[0].X(b[1]);8(1o(b[2])){b[2]()}}}8(1I(s.3w)){42(s.3w,c)}}C 5K(a,b,o){8(b){b.2v()}1B(o.1V){Q\'1w\':Q\'3k\':Q\'1J-1w\':Q\'21-1w\':a.X(\'1t\',\'\');16}}C 48(d,o,b,a,c){8(o[b]){o[b].1g(d,a)}8(c[b].R){1j(E i=0,l=c[b].R;i<l;i++){c[b][i].1g(d,a)}}G[]}C 5L(a,q,c){8(q.R){a.S(H(q[0][0],c),q[0][1]);q.93()}G q}C 5E(b){b.1W(C(){E a=$(1k);a.1m(\'7D\',a.2f(\':3t\')).4k()})}C 5I(b){8(b){b.1W(C(){E a=$(1k);8(!a.1m(\'7D\')){a.4n()}})}}C 3u(t){8(t.M){94(t.M)}8(t.1e){95(t.1e)}G t}C 5J(a,b,c,d,e,f,g){G{\'N\':g.N,\'1d\':g.1d,\'D\':{\'1Z\':a,\'96\':b,\'L\':c,\'6f\':c},\'1M\':{\'D\':d,\'2b\':e,\'1F\':f}}}C 5G(a,o,b,c){E d=a.1F;8(a.1V==\'41\'){G 0}8(d==\'M\'){d=o.1M.1F/o.1M.D*b}O 8(d<10){d=c/d}8(d<1){G 0}8(a.1V==\'1w\'){d=d/2}G 1H.7d(d)}C 4U(o,t,c){E a=(11(o.D.4C))?o.D.4C:o.D.L+1;8(t==\'4n\'||t==\'4k\'){E f=t}O 8(a>t){17(c,\'2r 6V D (\'+t+\' P, \'+a+\' 6W): 97 98.\');E f=\'4k\'}O{E f=\'4n\'}E s=(f==\'4n\')?\'2O\':\'3b\',h=2B(\'3t\',c);8(o.M.W){o.M.W[f]()[s](h)}8(o.V.W){o.V.W[f]()[s](h)}8(o.Z.W){o.Z.W[f]()[s](h)}8(o.1a.1z){o.1a.1z[f]()[s](h)}}C 3B(o,f,c){8(o.1T||o.3A)G;E a=(f==\'2O\'||f==\'3b\')?f:K,52=2B(\'99\',c);8(o.M.W&&a){o.M.W[a](52)}8(o.V.W){E b=a||(f==0)?\'3b\':\'2O\';o.V.W[b](52)}8(o.Z.W){E b=a||(f==o.D.L)?\'3b\':\'2O\';o.Z.W[b](52)}}C 3T(a,b){8(1o(b)){b=b.1g(a)}O 8(1E(b)){b={}}G b}C 6v(a,b){b=3T(a,b);8(11(b)){b={\'L\':b}}O 8(b==\'1c\'){b={\'L\':b,\'N\':b,\'1d\':b}}O 8(!1I(b)){b={}}G b}C 6w(a,b){b=3T(a,b);8(11(b)){8(b<=50){b={\'D\':b}}O{b={\'1F\':b}}}O 8(1p(b)){b={\'2l\':b}}O 8(!1I(b)){b={}}G b}C 53(a,b){b=3T(a,b);8(1p(b)){E c=6g(b);8(c==-1){b=$(b)}O{b=c}}G b}C 6x(a,b){b=53(a,b);8(2w(b)){b={\'W\':b}}O 8(1l(b)){b={\'1G\':b}}O 8(11(b)){b={\'2L\':b}}8(b.1e){8(1p(b.1e)||2w(b.1e)){b.1e={\'2s\':b.1e}}}G b}C 6J(a,b){8(1o(b.W)){b.W=b.W.1g(a)}8(1p(b.W)){b.W=$(b.W)}8(!1l(b.1G)){b.1G=I}8(!11(b.62)){b.62=0}8(1E(b.4X)){b.4X=I}8(!1l(b.63)){b.63=I}8(!11(b.2L)){b.2L=(b.1F<10)?9a:b.1F*5}8(b.1e){8(1o(b.1e.2s)){b.1e.2s=b.1e.2s.1g(a)}8(1p(b.1e.2s)){b.1e.2s=$(b.1e.2s)}8(b.1e.2s){8(!1o(b.1e.4B)){b.1e.4B=$.1r.1v.7B}8(!11(b.1e.5z)){b.1e.5z=50}}O{b.1e=K}}G b}C 5c(a,b){b=53(a,b);8(2w(b)){b={\'W\':b}}O 8(11(b)){b={\'31\':b}}G b}C 5k(a,b){8(1o(b.W)){b.W=b.W.1g(a)}8(1p(b.W)){b.W=$(b.W)}8(1p(b.31)){b.31=6g(b.31)}G b}C 6y(a,b){b=53(a,b);8(2w(b)){b={\'1z\':b}}O 8(1l(b)){b={\'4Y\':b}}G b}C 6K(a,b){8(1o(b.1z)){b.1z=b.1z.1g(a)}8(1p(b.1z)){b.1z=$(b.1z)}8(!11(b.D)){b.D=K}8(!1l(b.4Y)){b.4Y=K}8(!1o(b.3M)&&!54(b.3M)){b.3M=$.1r.1v.7z}8(!11(b.4T)){b.4T=0}G b}C 6z(a,b){8(1o(b)){b=b.1g(a)}8(1E(b)){b={\'4i\':K}}8(3q(b)){b={\'4i\':b}}O 8(11(b)){b={\'D\':b}}G b}C 6L(a,b){8(!1l(b.4i)){b.4i=I}8(!1l(b.5X)){b.5X=K}8(!1I(b.2I)){b.2I={}}8(!1l(b.2I.7E)){b.2I.7E=K}G b}C 6A(a,b){8(1o(b)){b=b.1g(a)}8(3q(b)){b={}}O 8(11(b)){b={\'D\':b}}O 8(1E(b)){b=K}G b}C 6M(a,b){G b}C 3K(a,b,c,d,e){8(1p(a)){a=$(a,e)}8(1I(a)){a=$(a,e)}8(2w(a)){a=e.14().7f(a);8(!1l(c)){c=K}}O{8(!1l(c)){c=I}}8(!11(a)){a=0}8(!11(b)){b=0}8(c){a+=d.Y}a+=b;8(d.P>0){2i(a>=d.P){a-=d.P}2i(a<0){a+=d.P}}G a}C 4E(i,o,s){E t=0,x=0;1j(E a=s;a>=0;a--){E j=i.1O(a);t+=(j.2f(\':L\'))?j[o.d[\'2y\']](I):0;8(t>o.3V){G x}8(a==0){a=i.R}x++}}C 7h(i,o,s){G 6h(i,o.D.1t,o.D.T.4v,s)}C 6Z(i,o,s,m){G 6h(i,o.D.1t,m,s)}C 6h(i,f,m,s){E t=0,x=0;1j(E a=s,l=i.R;a>=0;a--){x++;8(x==l){G x}E j=i.1O(a);8(j.2f(f)){t++;8(t==m){G x}}8(a==0){a=l}}}C 5C(a,o){G o.D.T.4v||a.14().18(0,o.D.L).1t(o.D.1t).R}C 35(i,o,s){E t=0,x=0;1j(E a=s,l=i.R-1;a<=l;a++){E j=i.1O(a);t+=(j.2f(\':L\'))?j[o.d[\'2y\']](I):0;8(t>o.3V){G x}x++;8(x==l+1){G x}8(a==l){a=-1}}}C 5N(i,o,s,l){E v=35(i,o,s);8(!o.1T){8(s+v>l){v=l-s}}G v}C 3X(i,o,s){G 6i(i,o.D.1t,o.D.T.4v,s,o.1T)}C 75(i,o,s,m){G 6i(i,o.D.1t,m+1,s,o.1T)-1}C 6i(i,f,m,s,c){E t=0,x=0;1j(E a=s,l=i.R-1;a<=l;a++){x++;8(x>=l){G x}E j=i.1O(a);8(j.2f(f)){t++;8(t==m){G x}}8(a==l){a=-1}}}C 3J(i,o){G i.18(0,o.D.L)}C 71(i,o,n){G i.18(n,o.D.T.1Z+n)}C 72(i,o){G i.18(0,o.D.L)}C 77(i,o){G i.18(0,o.D.T.1Z)}C 78(i,o,n){G i.18(n,o.D.L+n)}C 4z(i,o,d){8(o.1R){8(!1p(d)){d=\'29\'}i.1W(C(){E j=$(1k),m=4l(j.X(o.d[\'1S\']),10);8(!11(m)){m=0}j.1m(d,m)})}}C 1U(i,o,m){8(o.1R){E x=(1l(m))?m:K;8(!11(m)){m=0}4z(i,o,\'7F\');i.1W(C(){E j=$(1k);j.X(o.d[\'1S\'],((x)?j.1m(\'7F\'):m+j.1m(\'29\')))})}}C 5u(i,o){8(o.2o){i.1W(C(){E j=$(1k),s=5q(j,[\'N\',\'1d\']);j.1m(\'7i\',s)})}}C 5v(o,b){E c=o.D.L,7G=o.D[o.d[\'N\']],6j=o[o.d[\'1d\']],7H=3W(6j);b.1W(C(){E a=$(1k),6k=7G-7I(a,o,\'9b\');a[o.d[\'N\']](6k);8(7H){a[o.d[\'1d\']](4u(6k,6j))}})}C 4R(a,o){E b=a.6b(),$i=a.14(),$v=3J($i,o),55=4J(4K($v,o,I),o,K);b.X(55);8(o.1R){E p=o.1i,r=p[o.d[1]];8(o.1A&&r<0){r=0}E c=$v.2R();c.X(o.d[\'1S\'],c.1m(\'29\')+r);a.X(o.d[\'3r\'],p[o.d[0]]);a.X(o.d[\'1n\'],p[o.d[3]])}a.X(o.d[\'N\'],55[o.d[\'N\']]+(2T($i,o,\'N\')*2));a.X(o.d[\'1d\'],6l($i,o,\'1d\'));G 55}C 4K(i,o,a){G[2T(i,o,\'N\',a),6l(i,o,\'1d\',a)]}C 6l(i,o,a,b){8(!1l(b)){b=K}8(11(o[o.d[a]])&&b){G o[o.d[a]]}8(11(o.D[o.d[a]])){G o.D[o.d[a]]}a=(a.6m().3S(\'N\')>-1)?\'2y\':\'3o\';G 4o(i,o,a)}C 4o(i,o,b){E s=0;1j(E a=0,l=i.R;a<l;a++){E j=i.1O(a);E m=(j.2f(\':L\'))?j[o.d[b]](I):0;8(s<m){s=m}}G s}C 2T(i,o,b,c){8(!1l(c)){c=K}8(11(o[o.d[b]])&&c){G o[o.d[b]]}8(11(o.D[o.d[b]])){G o.D[o.d[b]]*i.R}E d=(b.6m().3S(\'N\')>-1)?\'2y\':\'3o\',s=0;1j(E a=0,l=i.R;a<l;a++){E j=i.1O(a);s+=(j.2f(\':L\'))?j[o.d[d]](I):0}G s}C 5e(a,o,d){E b=a.2f(\':L\');8(b){a.4k()}E s=a.6b()[o.d[d]]();8(b){a.4n()}G s}C 5f(o,a){G(11(o[o.d[\'N\']]))?o[o.d[\'N\']]:a}C 6n(i,o,b){E s=K,v=K;1j(E a=0,l=i.R;a<l;a++){E j=i.1O(a);E c=(j.2f(\':L\'))?j[o.d[b]](I):0;8(s===K){s=c}O 8(s!=c){v=I}8(s==0){v=I}}G v}C 7I(i,o,d){G i[o.d[\'9c\'+d]](I)-i[o.d[d.6m()]]()}C 4u(s,o){8(3W(o)){o=4l(o.18(0,-1),10);8(!11(o)){G s}s*=o/2J}G s}C H(n,c,a,b,d){8(!1l(a)){a=I}8(!1l(b)){b=I}8(!1l(d)){d=K}8(a){n=c.3z.44+n}8(b){n=n+\'.\'+c.3z.7y}8(b&&d){n+=c.3U}G n}C 2B(n,c){G(1p(c.6d[n]))?c.6d[n]:n}C 4J(a,o,p){8(!1l(p)){p=I}E b=(o.1R&&p)?o.1i:[0,0,0,0];E c={};c[o.d[\'N\']]=a[0]+b[1]+b[3];c[o.d[\'1d\']]=a[1]+b[0]+b[2];G c}C 3f(c,d){E e=[];1j(E a=0,7J=c.R;a<7J;a++){1j(E b=0,7K=d.R;b<7K;b++){8(d[b].3S(2Z c[a])>-1&&1E(e[b])){e[b]=c[a];16}}}G e}C 6H(p){8(1E(p)){G[0,0,0,0]}8(11(p)){G[p,p,p,p]}8(1p(p)){p=p.3R(\'9d\').7L(\'\').3R(\'9e\').7L(\'\').3R(\' \')}8(!2X(p)){G[0,0,0,0]}1j(E i=0;i<4;i++){p[i]=4l(p[i],10)}1B(p.R){Q 0:G[0,0,0,0];Q 1:G[p[0],p[0],p[0],p[0]];Q 2:G[p[0],p[1],p[0],p[1]];Q 3:G[p[0],p[1],p[2],p[1]];2A:G[p[0],p[1],p[2],p[3]]}}C 4I(a,o){E x=(11(o[o.d[\'N\']]))?1H.2C(o[o.d[\'N\']]-2T(a,o,\'N\')):0;1B(o.1A){Q\'1n\':G[0,x];Q\'3a\':G[x,0];Q\'5g\':2A:G[1H.2C(x/2),1H.4m(x/2)]}}C 6B(o){E a=[[\'N\',\'7M\',\'2y\',\'1d\',\'7N\',\'3o\',\'1n\',\'3r\',\'1S\',0,1,2,3],[\'1d\',\'7N\',\'3o\',\'N\',\'7M\',\'2y\',\'3r\',\'1n\',\'5r\',3,2,1,0]];E b=a[0].R,7O=(o.2b==\'3a\'||o.2b==\'1n\')?0:1;E c={};1j(E d=0;d<b;d++){c[a[0][d]]=a[7O][d]}G c}C 4F(x,o,a,b){E v=x;8(1o(a)){v=a.1g(b,v)}O 8(1p(a)){E p=a.3R(\'+\'),m=a.3R(\'-\');8(m.R>p.R){E c=I,6o=m[0],32=m[1]}O{E c=K,6o=p[0],32=p[1]}1B(6o){Q\'9f\':v=(x%2==1)?x-1:x;16;Q\'9g\':v=(x%2==0)?x-1:x;16;2A:v=x;16}32=4l(32,10);8(11(32)){8(c){32=-32}v+=32}}8(!11(v)||v<1){v=1}G v}C 2z(x,o,a,b){G 6p(4F(x,o,a,b),o.D.T)}C 6p(v,i){8(11(i.36)&&v<i.36){v=i.36}8(11(i.1X)&&v>i.1X){v=i.1X}8(v<1){v=1}G v}C 5l(s){8(!2X(s)){s=[[s]]}8(!2X(s[0])){s=[s]}1j(E j=0,l=s.R;j<l;j++){8(1p(s[j][0])){s[j][0]=$(s[j][0])}8(!1l(s[j][1])){s[j][1]=I}8(!1l(s[j][2])){s[j][2]=I}8(!11(s[j][3])){s[j][3]=0}}G s}C 6g(k){8(k==\'3a\'){G 39}8(k==\'1n\'){G 37}8(k==\'4s\'){G 38}8(k==\'5W\'){G 40}G-1}C 5M(n,a,c){8(n){E v=a.1Q(H(\'4q\',c));$.1r.1v.23.6e(n,v)}}C 7u(n){E c=$.1r.1v.23.3G(n);G(c==\'\')?0:c}C 5q(a,b){E c={},56;1j(E p=0,l=b.R;p<l;p++){56=b[p];c[56]=a.X(56)}G c}C 6C(a,b,c,d){8(!1I(a.T)){a.T={}}8(!1I(a.3O)){a.3O={}}8(a.3n==0&&11(d)){a.3n=d}8(1I(a.L)){a.T.36=a.L.36;a.T.1X=a.L.1X;a.L=K}O 8(1p(a.L)){8(a.L==\'1c\'){a.T.1c=I}O{a.T.2c=a.L}a.L=K}O 8(1o(a.L)){a.T.2c=a.L;a.L=K}8(!1p(a.1t)){a.1t=(c.1t(\':3t\').R>0)?\':L\':\'*\'}8(!a[b.d[\'N\']]){8(b.2o){17(I,\'7P a \'+b.d[\'N\']+\' 1j 3L D!\');a[b.d[\'N\']]=4o(c,b,\'2y\')}O{a[b.d[\'N\']]=(6n(c,b,\'2y\'))?\'1c\':c[b.d[\'2y\']](I)}}8(!a[b.d[\'1d\']]){a[b.d[\'1d\']]=(6n(c,b,\'3o\'))?\'1c\':c[b.d[\'3o\']](I)}a.3O.N=a.N;a.3O.1d=a.1d;G a}C 6G(a,b){8(a.D[a.d[\'N\']]==\'1c\'){a.D.T.1c=I}8(!a.D.T.1c){8(11(a[a.d[\'N\']])){a.D.L=1H.4m(a[a.d[\'N\']]/a.D[a.d[\'N\']])}O{a.D.L=1H.4m(b/a.D[a.d[\'N\']]);a[a.d[\'N\']]=a.D.L*a.D[a.d[\'N\']];8(!a.D.T.2c){a.1A=K}}8(a.D.L==\'9h\'||a.D.L<1){17(I,\'2r a 5P 27 4e L D: 7P 45 "1c".\');a.D.T.1c=I}}G a}C 6D(a,b,c){8(a==\'M\'){a=4o(c,b,\'2y\')}G a}C 6E(a,b,c){8(a==\'M\'){a=4o(c,b,\'3o\')}8(!a){a=b.D[b.d[\'1d\']]}G a}C 5j(o,a){E p=4I(3J(a,o),o);o.1i[o.d[1]]=p[1];o.1i[o.d[3]]=p[0];G o}C 5h(o,a,b){E c=6p(1H.2C(o[o.d[\'N\']]/o.D[o.d[\'N\']]),o.D.T);8(c>a.R){c=a.R}E d=1H.4m(o[o.d[\'N\']]/c);o.D.L=c;o.D[o.d[\'N\']]=d;o[o.d[\'N\']]=c*d;G o}C 3P(p){8(1p(p)){E i=(p.3S(\'9i\')>-1)?I:K,r=(p.3S(\'3h\')>-1)?I:K}O{E i=r=K}G[i,r]}C 61(a){G(11(a))?a:2x}C 6q(a){G(a===2x)}C 1E(a){G(6q(a)||2Z a==\'7Q\'||a===\'\'||a===\'7Q\')}C 2X(a){G(a 2Y 9j)}C 2w(a){G(a 2Y 7R)}C 1I(a){G((a 2Y 9k||2Z a==\'2g\')&&!6q(a)&&!2w(a)&&!2X(a))}C 11(a){G((a 2Y 4d||2Z a==\'27\')&&!9l(a))}C 1p(a){G((a 2Y 9m||2Z a==\'2N\')&&!1E(a)&&!3q(a)&&!54(a))}C 1o(a){G(a 2Y 9n||2Z a==\'C\')}C 1l(a){G(a 2Y 9o||2Z a==\'3e\'||3q(a)||54(a))}C 3q(a){G(a===I||a===\'I\')}C 54(a){G(a===K||a===\'K\')}C 3W(x){G(1p(x)&&x.18(-1)==\'%\')}C 2q(){G 6f 7C().2q()}C 2K(o,n){17(I,o+\' 2f 9p, 9q 1j 9r 9s 9t 9u. 9v \'+n+\' 9w.\')}C 17(d,m){8(1I(d)){E s=\' (\'+d.4p+\')\';d=d.17}O{E s=\'\'}8(!d){G K}8(1p(m)){m=\'1v\'+s+\': \'+m}O{m=[\'1v\'+s+\':\',m]}8(3m.6r&&3m.6r.7S){3m.6r.7S(m)}G K}$.1N($.2l,{\'9x\':C(t){E a=t*t;G t*(-a*t+4*a-6*t+4)},\'9y\':C(t){G t*(4*t*t-9*t+6)},\'9z\':C(t){E a=t*t;G t*(33*a*a-9A*a*t+9B*a-67*t+15)}})})(7R);', 62, 596, '|||||||opts|if||||||||||||||||||||||||||||||function|items|var|conf|return|cf_e|true|itms|false|visible|auto|width|else|total|case|length|trigger|visibleConf|scrl|prev|button|css|first|next||is_number|bind|tt0|children||break|debug|slice|anims|pagination|push|variable|height|progress|stopPropagation|call|mousewheel|padding|for|this|is_boolean|data|left|is_function|is_string|swipe|fn|wrp|filter|tmrs|carouFredSel|fade|_onafter|_moveitems|container|align|switch|_s_paddingold|_s_paddingcur|is_undefined|duration|play|Math|is_object|cover|_position|opacity|scroll|extend|eq|_a_wrapper|triggerHandler|usePadding|marginRight|circular|sz_resetMargin|fx|each|max|i_cur_l|old|i_old_l|uncover|unbind|cookie||isScrolling|isPaused|number|a_cfs|_cfs_origCssMargin|clbk|direction|adjust|isStopped|stopImmediatePropagation|is|object|queu|while|i_new|w_siz|easing|nr|avail_primary|responsive|synchronise|getTime|Not|bar|i_new_l|a_cur|remove|is_jquery|null|outerWidth|cf_getItemsAdjust|default|cf_c|ceil|pR|_s_paddingnew|preventDefault|a_itm|pauseOnHover|options|100|deprecated|timeoutDuration|startTime|string|removeClass|sc_startScroll|queue|last|i_skp|ms_getTotalSize|a_old|a_lef|a_dur|is_array|instanceof|typeof||key|adj||opts_orig|gn_getVisibleItemsNext|min||||right|addClass|pause|perc|boolean|cf_sortParams|scrolling|resume|onAfter|i_old|crossfade|slideTo|window|start|outerHeight|_cfs_triggerEvent|is_true|top|position|hidden|sc_clearTimers|pre|post|timePassed|Carousel|events|infinite|nv_enableNavi|i_siz|i_siz_vis|_a_paddingold|_a_paddingcur|get|onBefore|updatePageStatus|gi_getCurrentItems|gn_getItemIndex|the|anchorBuilder|event|sizesConf|bt_pauseOnHoverConfig|ns2|split|indexOf|go_getObject|serialNumber|maxDimension|is_percentage|gn_getVisibleItemsNextFilter|orgCSS|zIndex||none|sc_stopScroll|dur2|prefix|to|appendTo|sc_setScroll|sc_fireCallbacks||currentPage|end|before|Number|of|document|touchwipe|wN|onTouch|onResize|hide|parseInt|floor|show|ms_getTrueLargestSize|selector|currentPosition|destroy|up|primarySizePercentage|ms_getPercentage|org|onTimeoutStart|onTimeoutPause|onTimeoutEnd|sz_storeMargin|stopped|updater|minimum|configuration|gn_getVisibleItemsPrev|cf_getAdjust|onEnd|clone|cf_getAlignPadding|cf_mapWrapperSizes|ms_getSizes|a_wsz|a_new|not|a_cfs_vis|updateSizes|eval|sz_setSizes|pgs|deviation|nv_showNavi|mouseenter|mouseleave|pauseOnEvent|keys|wipe||throttle|di|go_getNaviObject|is_false|sz|prop|element||starting_position|_cfs_isCarousel|_cfs_init|go_getPrevNextObject|defaults|ms_getParentSize|ms_getMaxDimension|center|in_getResponsiveValues|bottom|in_getAlignPadding|go_complementPrevNextObject|cf_getSynchArr|onPauseStart|onPausePause|onPauseEnd|pauseDuration|in_mapCss|marginBottom|newPosition|_cfs_origCss|sz_storeSizes|sz_setResponsiveSizes|_cfs_unbind_events|stop|finish|interval|type|conditions|gn_getVisibleOrg|backward|sc_hideHiddenItems|a_lef_vis|sc_getDuration|_a_paddingnew|sc_showHiddenItems|sc_mapCallbackArguments|sc_afterScroll|sc_fireQueue|cf_setCookie|gn_getVisibleItemsNextTestCircular|slideToPage|valid|linkAnchors|value|_cfs_bind_buttons|click|_cfs_unbind_buttons|scrolled|down|onMouse|swP|swN||bt_mousesheelNumber|delay|pauseOnResize|debounce|onWindowResize|_windowHeight||nh|ns3|wrapper|parent|continue|classnames|set|new|cf_getKeyCode|gn_getItemsPrevFilter|gn_getItemsNextFilter|seco|nw|ms_getLargestSize|toLowerCase|ms_hasVariableSizes|sta|cf_getItemAdjustMinMax|is_null|console|caroufredsel|No|found|go_getItemsObject|go_getScrollObject|go_getAutoObject|go_getPaginationObject|go_getSwipeObject|go_getMousewheelObject|cf_getDimensions|in_complementItems|in_complementPrimarySize|in_complementSecondarySize|upDateOnWindowResize|in_complementVisibleItems|cf_getPadding|500|go_complementAutoObject|go_complementPaginationObject|go_complementSwipeObject|go_complementMousewheelObject|_cfs_build|textAlign|float|marginTop|marginLeft|absolute|_cfs_bind_events|paused|enough|needed|page|slide_|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|gn_getScrollItemsNextFilter|forward|gi_getOldItemsNext|gi_getNewItemsNext|jumpToStart|after|append|removeItem|round|hash|index|selected|gn_getVisibleItemsPrevFilter|_cfs_origCssSizes|Item|keyup|keyCode|plugin|scN|cursor|The|option|mcN|configs|classname|cf_getCookie|random|itm|onCreate|namespace|pageAnchorBuilder|span|progressbarUpdater|Date|_cfs_isHidden|triggerOnTouchEnd|_cfs_tempCssMargin|newS|secp|ms_getPaddingBorderMargin|l1|l2|join|innerWidth|innerHeight|dx|Set|undefined|jQuery|log|caroufredsel_cookie_|relative|fixed|overflow|setInterval|setTimeout|or|Callback|returned|Page|resumed|currently|slide_prev|prependTo|slide_next|prevPage|nextPage|prepend|carousel|insertItem|Correct|insert|Appending|item|add|detach|currentVisible|body|find|Preventing|non|sliding|replaceWith|widths|heights|automatically|touchSwipe|min_move_x|min_move_y|preventDefaultEvents|wipeUp|wipeDown|wipeLeft|wipeRight|ontouchstart|in|swipeUp|swipeDown|swipeLeft|swipeRight|move|200|300|resize|wrap|class|unshift|location|swing|cfs|div|caroufredsel_wrapper|href|charAt|setTime|1000|expires|toGMTString|path|orgDuration|animate|complete|shift|clearTimeout|clearInterval|skipped|Hiding|navigation|disabled|2500|Width|outer|px|em|even|odd|Infinity|immediate|Array|Object|isNaN|String|Function|Boolean|DEPRECATED|support|it|will|be|removed|Use|instead|quadratic|cubic|elastic|106|126'.split('|'), 0, {}))