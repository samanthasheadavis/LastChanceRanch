var BannerCount2, BannerCurrent2, BannerTimer2=-1, ControlTimer2=-1, PauseMode2, Pause22, ControlsVisible2, CntrlTop2, CntrlLeft2;
var imgFolder2="/lcr/content/images";
var TimerDelay2=4500;
$(document).ready(function(){
	var t = Number(new Date()); // current time as number
	$.get("/lcr/content/images_" + pageid + ".ashx?contentonly=true&t=" + t,
		function(data) { ReturnBanners2(data); });

});

function ReturnBanners2(sData) {
 var s,s2,p;
 BannerCount2=0;
 s='<div id="controlbanners" style="border:none;height:0px;width:0px;"></div>';
 s2='';
 $(sData).find('tr').each(function (i) {
   s=s+'<div id="secondbanner' + i + '" class="secondbanner" style="width:738px;height:270px;overflow:hidden;display:none;visibility:hidden;position:absolute;z-index:1;"><table border=0 cellspacing=0 cellpadding=0 ><tr>';
   $(this).find('td').each(function (j) {
	 if(j==0) {s=s + '<td align=center valign=top>' + $(this).html(); }
	 else {s=s + '<td align=left valign=top>' + $(this).html(); }
	 });
	s=s + '</tr></table></div>';
	s2=s2 + '<a href="#" onClick="GotoBanner2(' + i + ');return false;"><img border=0 id="rbb2' + i + '" src="' + imgFolder2 + '/rbb2.png"></a>'
	BannerCount2++;
	});
s=s + '<div id="rbb2_div" style="border:none;width:280px;height:20px;position:absolute;z-index:19;text-align:center;">' + s2 + '</div>'
$('#secondbanner').html(s);
BannerCurrent2=0;
$('#rbb2' + BannerCurrent2).attr("src", imgFolder2 + '/rbb1.png');
$('#controlbanners').css("visibility","visible");
$('#controlbanners').show();
p=$('#secondbanner').offset(); CntrlTop2=p.top+240; CntrlLeft2=p.left+55;
$('#controlbanners').hide();
$('#rbb2_div').show();
$('#rbb2_div').offset({top:CntrlTop2,left:CntrlLeft2+475});
$('.secondbanner table tr td:nth-child(2)').addClass('bodd');
//$('#controltrigger').position({top:0,left:0});
$('#secondbanner' + BannerCurrent2).css("visibility","visible").css('top',0).css('left',0);
$('#secondbanner' + BannerCurrent2).show();
BannerTimer2 = setTimeout("BannerNext2();",TimerDelay2);
PauseMode2=0;
Pause22=0;
$('#autobutton0').show();
$('#autobutton1').hide();
ControlsVisible2=false;
$('#secondbanner').hover( function() { OverBanner2(); }, function() { OffBanner2(); });
}

function TogglePause2() {
	var other;
	var evv;
	if (Pause22==1) { Pause22=0; other=1;}
	else { Pause22=1; other=0;}

	$('#autobutton' + Pause22).css("visibility","visible");
	$('#autobutton' + Pause22).show();
	$('#autobutton' + other).hide();
}

function AutoNext2() {
	if (PauseMode2==1) { return; }
	BannerNext2(1);
}

function PrevBanner2() {
	BannerNext2(-1,100,true);
}

function BannerNext() {
	BannerNext2(1,100,true);
}

function BannerNext2(iinc,speed,foverride) {
	if (BannerTimer2>=0) {clearTimeout(BannerTimer2); BannerTimer2=-1;}
	foverride = typeof(foverride) != 'undefined' ? foverride : false;
	speed = typeof(speed) != 'undefined' ? speed : 600;
	iinc = typeof(iinc) != 'undefined' ? iinc : 1;
	if ((PauseMode2==1 || Pause22==1) && foverride==false) { return; }

	$('#secondbanner' + BannerCurrent2).css('z-index',2); // Move current image back one.
	BannerCurrent2+=iinc;
	if (BannerCurrent2>=BannerCount2) { BannerCurrent2=0; }
	if (BannerCurrent2<0) { BannerCurrent2=BannerCount2-1; }
	BannerNext3(speed,foverride);
}

function BannerNext3(speed,foverride) {
	$('#rbb2' + BannerCurrent2).attr("src", imgFolder2 + '/rbb1.png');
	$('#secondbanner' + BannerCurrent2).css("visibility","visible").css('z-index',3).css('top',0).css('left',0);
	$('#secondbanner' + BannerCurrent2).fadeIn(speed, function() {
			var j;
			// To solve a FireFox glitch, we hide all other images again...
			for (j=0;j<BannerCount2;j++) {
				if (j!=BannerCurrent2) {
					$('#rbb2' + j).attr("src", imgFolder2 + '/rbb2.png');
					$('#secondbanner' + j).css('z-index',2).css("visibility","hidden").css("display","none");}}
			if(foverride==false) { BannerTimer2 = setTimeout("BannerNext2();",TimerDelay2); }
		});
}

function GotoBanner2(newidx) {
	var speed=100;
	if (BannerTimer2>=0) {clearTimeout(BannerTimer2); BannerTimer2=-1;}
	$('#secondbanner' + BannerCurrent2).css({'z-index':2}); // Move current image back one.
	BannerCurrent2=newidx;
	if (BannerCurrent2>=BannerCount2) { BannerCurrent2=0; }
	if (BannerCurrent2<0) { BannerCurrent2=BannerCount2-1; }
	BannerNext3(speed,true);
}

function OverBanner2() {
	if (ControlTimer2>=0) {clearTimeout(ControlTimer2); ControlTimer2=-1;}
	if (BannerTimer2>=0) {clearTimeout(BannerTimer2); BannerTimer2=-1;}
	if(ControlsVisible2==true) {return;}
	PauseMode2=1;
	ControlsVisible2=true;
	$('#controlbanners').show();
	$('#controlbanners').offset({top:CntrlTop2,left:CntrlLeft2});
	$('#controlbanners').css({'z-index':7});
	$('#controlbanners').hide();
	$('#controlbanners').fadeTo(100,0.7);
}

function OffBanner2() {
	ControlTimer2=setTimeout("HideControls2();",300);
}

function HideControls2() {
	if(ControlsVisible2==false) {return;}
	ControlsVisible2=false;
	$('#controlbanners').fadeOut(100);
	PauseMode2=0;
	BannerTimer2 = setTimeout("BannerNext2();",TimerDelay2);
}
