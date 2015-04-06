var dt = getDriverType(),
	pz = getPageSize();
//
$(function(){
	initPageElements();
	gotoPageTop();
	//
	var _width = pz.windowWidth;
	//
	$('#gototop').click(gotoPageTop);
	//
	$('#toggleBtn').click(function(){
		var btn = $(this),
			opened = Number(btn.attr('data-open')),
			menu = $('.stl-navbar');
		//
		if(!opened){
			$(this).addClass('opened');
			btn.attr('data-open',1);
			menu.slideDown('fast');
		}else{
			$(this).removeClass('opened');
			btn.attr('data-open',0);
			menu.slideUp('fast');
		}
	})
	//
	$(".stl-header a").bind("click touchstart", function(i){
		var elem = $(this),
			selector = elem.attr("href"),
			offset = elem.attr("data-offset"),
			index = Number(elem.attr("data-index"));
		//
		if(index){
			$('body').addClass('reverse');
		}else{
			$('body').removeClass('reverse');
		}
		//
		$(".stl-navbar a").parent().removeClass("active");
		elem.parent().addClass("active");
		//
		scrollPage(offset);
		
		return false;
	});	
	
	//
	$('.work-item').click(function(){
		var src = $(this).attr('data-href');
		$('#page-dialog iframe').attr('src', src);
	})
	//
	if(dt=='pc' || _width>767){
		var map = new BMap.Map("mapwrap");
		var point = new BMap.Point(114.113302,22.561573);
		map.centerAndZoom(point,12);
		var myGeo = new BMap.Geocoder();
		myGeo.getPoint(window.address, function(point){
			if (point) {
				map.centerAndZoom(point, 16);
				var myIcon = new BMap.Icon("/images/mappoint.png", new BMap.Size(90,90));
				map.addOverlay(new BMap.Marker(point,{icon:myIcon}));
			}
		}, "广州市");	
	}
	//
	$('#loading').hide();
})
//
function initPageElements(){
	var _width = pz.windowWidth,
		_height = pz.windowHeight,
		_bodyPt = _height * 0.085,
		_pageH = _height * (1-0.085);
	//
	console.log(_height)
	//
	$('.stl-header a').each(function(i){
		var offset = _pageH*i;
		if(dt=='pc' || _width>767){
			offset = i<2 ? _pageH*i : (_pageH + (_pageH/2)*(i-1));	
		}
		$(this).attr( 'data-offset', offset )
			   .attr( 'data-index', (i%2?0:1) );
	})	
	//
	$('body').css('padding-top', _bodyPt);
	//
	if(dt=='pc' || _width>767){
		$('.stl-home').height(_pageH);
		$('.stl-page').not('.stl-home').height(_pageH/2);
	}else{
		setBodyPhoneType();
		$('.stl-page').height(_pageH);
	}
}

function setBodyPhoneType(){
	var _height = pz.windowHeight,
		type = '';
	
	if(_height<480){
		type = 'phonexs';	
	}else if(_height>=480 && _height<568){
		type = 'iphone4';	
	}else if(_height>=568 && _height<667){
		type = 'iphone5';
	}else if(_height>=667 && _height<736){
		type = 'iphone6';
	}else if(_height>=736){
		type = 'iphone6p';
	}
	//
	if(type){
		$('body').addClass(type);	
	}
}
//
function scrollPage(offset){
	$('.page')
		.css('opacity', 0)
		.stop(true, false).animate({opacity: 1}, 200);
	$("html, body")
		.stop(true, false).animate({scrollTop: offset}, 600);
}
//
function gotoPageTop(){
	$("html, body").animate({scrollTop: 0}, 600);
	return false;
}

//获取页面的高度、宽度
function getPageSize() {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = window.innerWidth + window.scrollMaxX;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else {
        if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac    
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari    
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer    
        if (document.documentElement.clientWidth) {
            windowWidth = document.documentElement.clientWidth;
        } else {
            windowWidth = self.innerWidth;
        }
        windowHeight = self.innerHeight;
    } else {
        if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode    
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;

        } else {
            if (document.body) { // other Explorers    
                windowWidth = document.body.clientWidth;
                windowHeight = document.body.clientHeight;
            }
        }
    }       
    // for small pages with total height less then height of the viewport    
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }    

    // for small pages with total width less then width of the viewport    
    if (xScroll < windowWidth) {
        pageWidth = xScroll;
    } else {
        pageWidth = windowWidth;
    }

    var objPageSize = {
		pageWidth:pageWidth, pageHeight:pageHeight, windowWidth:windowWidth, windowHeight:windowHeight
	};

    return objPageSize;

}

function getDriverType() {  
	var sUserAgent= navigator.userAgent.toLowerCase();
	var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";  
	var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";  
	var bIsMidp= sUserAgent.match(/midp/i) == "midp";  
	var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
	var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";  
	var bIsAndroid= sUserAgent.match(/android/i) == "android";   
	var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";    
	var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";  
		
	//return ( bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM ); 
	if(bIsIpad){
		return 'ipad';	
	}else if(bIsIphoneOs){
		return 'iphone';	
	}else if(bIsAndroid){
		return 'android';	
	}else if(bIsWM){
		return 'windowmobile'
	}else{
		return 'pc';	
	}
}