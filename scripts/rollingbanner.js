var BannerCount, BannerCurrent, BannerTimer=-1, ControlTimer=-1, PauseMode, Pause2, ControlsVisible, CntrlTop, CntrlLeft;
var imgFolder="/lcr/content/images/Sponsors";
var TimerDelay=5000;
$(document).ready(function(){
	var t = Number(new Date()); // current time as number
	$.get("/lcr/content/Images_homeThumb.ashx?contentonly=true&t=" + t,
		function(data) { ReturnBanners(data); });

});

function ReturnBanners(sData) {
 var s,s2,p;
 BannerCount=0;
 s='<div id="bannercontrols" style="height:0px;width:0px;"></div>';
 s2='';
 $(sData).find('tr').each(function (i) {
   s=s+'<div id="rollingbanner' + i + '" class="rollingbanner" style="width:520px;height:216px;overflow:hidden;display:none;visibility:hidden;position:absolute;z-index:1;"><table border=0 cellspacing=0 cellpadding=0 ><tr>';
   $(this).find('td').each(function (j) {
	 if(j==0) {s=s + '<td align=center valign=top>' + $(this).html(); }
	 else {s=s + '<td align=left valign=top>' + $(this).html(); }
	 });
	s=s + '</tr></table></div>';
	s2=s2 + '<a href="#" onClick="GotoBanner(' + i + ');return false;"><img border=0 id="rbb' + i + '" src="' + imgFolder + '/header-4.jpg"></a>'
	BannerCount++;
	});
//s=s + '<div id="rbb_div" style="border:none;width:280px;height:20px;position:absolute;z-index:19;text-align:center;">' + s2 + '</div>'
$('#rollingbanners').html(s);
BannerCurrent=0;
$('#rbb' + BannerCurrent).attr("src", imgFolder + '/rbb2.png');
$('#bannercontrols').css("visibility","visible")
$('#bannercontrols').show();
p=$('#bannercontrols').offset(); CntrlTop=p.top+300; CntrlLeft=p.left+150;
$('#bannercontrols').hide();
$('#rbb_div').show();
$('#rbb_div').offset({top:CntrlTop,left:CntrlLeft+475});
$('.rollingbanner table tr td:nth-child(2)').addClass('bodd');
//$('#controltrigger').position({top:0,left:0});
$('#rollingbanner' + BannerCurrent).css("visibility","visible");
$('#rollingbanner' + BannerCurrent).fadeIn(600);
BannerTimer = setTimeout("NextBanner2();",TimerDelay);
PauseMode=0;
Pause2=0;
$('#autobutton0').show();
$('#autobutton1').hide();
ControlsVisible=false;
$('#rollingbanners').hover( function() { OverBanner(); }, function() { OffBanner(); });
}

function TogglePause() {
	var other;
	var evv;
	if (Pause2==1) { Pause2=0; other=1;}
	else { Pause2=1; other=0;}

	$('#autobutton' + Pause2).css("visibility","visible");
	$('#autobutton' + Pause2).show();
	$('#autobutton' + other).hide();
}

function AutoNext() {
	if (PauseMode==1) { return; }
	NextBanner2(1);
}

function PrevBanner() {
	NextBanner2(-1,100,true);
}

function NextBanner() {
	NextBanner2(1,100,true);
}

function NextBanner2(iinc,speed,foverride) {
	if (BannerTimer>=0) {clearTimeout(BannerTimer); BannerTimer=-1;}
	foverride = typeof(foverride) != 'undefined' ? foverride : false;
	speed = typeof(speed) != 'undefined' ? speed : 600;
	iinc = typeof(iinc) != 'undefined' ? iinc : 1;
	if ((PauseMode==1 || Pause2==1) && foverride==false) { return; }

	$('#rollingbanner' + BannerCurrent).css({'z-index':2}); // Move current image back one.
	BannerCurrent+=iinc;
	if (BannerCurrent>=BannerCount) { BannerCurrent=0; }
	if (BannerCurrent<0) { BannerCurrent=BannerCount-1; }
	NextBanner3(speed,foverride);
}

function NextBanner3(speed,foverride) {
	$('#rbb' + BannerCurrent).attr("src", imgFolder + '/rbb2.png');
	$('#rollingbanner' + BannerCurrent).css("visibility","visible").css({'z-index':3}).position({top:0,left:0});
	$('#rollingbanner' + BannerCurrent).fadeIn(speed, function() {
			var j;
			// To solve a FireFox glitch, we hide all other images again...
			for (j=0;j<BannerCount;j++) {
				if (j!=BannerCurrent) {
					$('#rbb' + j).attr("src", imgFolder + '/rbb1.png');
					$('#rollingbanner' + j).css({'z-index':2}).css("visibility","hidden").css("display","none");}}
			if(foverride==false) { BannerTimer = setTimeout("NextBanner2();",TimerDelay); }
		});
}



function OverBanner() {
	if (ControlTimer>=0) {clearTimeout(ControlTimer); ControlTimer=-1;}
	if (BannerTimer>=0) {clearTimeout(BannerTimer); BannerTimer=-1;}
	if(ControlsVisible==true) {return;}
	PauseMode=1;
	ControlsVisible=true;
	$('#bannercontrols').show();
	$('#bannercontrols').offset({top:CntrlTop,left:CntrlLeft});
	$('#bannercontrols').css({'z-index':7});
	$('#bannercontrols').hide();
	$('#bannercontrols').fadeTo(100,0.7);
}

function OffBanner() {
	ControlTimer=setTimeout("HideControls();",300);
}

function HideControls() {
	if(ControlsVisible==false) {return;}
	ControlsVisible=false;
	$('#bannercontrols').fadeOut(100);
	PauseMode=0;
	BannerTimer = setTimeout("NextBanner2();",TimerDelay);
}
