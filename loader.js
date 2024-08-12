loader.prototype.pingInterval=60000;
loader.prototype.config={}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.init = function(config) {
this.config=config;
this.deviceDetect();
this.getParamFromUrl();
console.log('url : ', document.location);
console.log('config : ', config);
//this.getSessionInfo();	
console.log('response : ', this.config);
this.response = this.config;
if(this.response['status']=='success'){
	if(this.config['protocol']=='https:'){
		this.response['content']['serverResources']=this.response['content']['serverResources'].replace("http:", "https:");
		this.response['content']['serverMathematics']=this.response['content']['serverMathematics'].replace("http:", "https:");
	}else{
		this.response['content']['serverResources']=this.response['content']['serverResources'].replace("https:", "http:");
		this.response['content']['serverMathematics']=this.response['content']['serverMathematics'].replace("https:", "http:");
	}

	
	if(this.config['mobile']==true && this.response['content']['mobile']==0){
		this.error('mobile_not_support');
	}else{
		pingTimer=setInterval(function(){loader.ping();},this.pingInterval);
		if(this.response['content']['type']=='netent'){
			this.load_netEnt();
		}else if(this.response['content']['type']=='novomatic'){
			this.load_novomatic();	
		}else if(this.response['content']['type']=='aristocrat'){
			this.load_aristocrat();	
		}else if(this.response['content']['type']=='igt'){
			this.load_igt();	
		}else if(this.response['content']['type']=='microgaming'){
			this.load_microgaming();	
		}else if(this.response['content']['type']=='egt'){
			this.load_egt();	
			window.clearInterval(pingTimer);
		}else if(this.response['content']['type']=='amatic'){
			this.load_amatic();	
		}else if(this.response['content']['type']=='igrosoft'){
			this.load_igrosoft();	
		}else if(this.response['content']['type']=='quickspin'){
			this.load_quickspin();	
		}else if(this.response['content']['type']=='fox'){
			this.load_fox();	
			window.clearInterval(pingTimer);
		}else if(this.response['content']['type']=='sg'){
			this.load_sg();	
		}else if(this.response['content']['type']=='wazdan'){
			this.load_wazdan();	
		}else if(this.response['content']['type']=='bbin'){
			this.load_bbin();	
		}else if(this.response['content']['type']=='apollo'){
			this.load_apollo();	
		}else if(this.response['content']['type']=='merkur'){
			this.load_merkur();	
		}else if(this.response['content']['type']=='royal'){
			this.load_royal();	
		}
	}
	/*
	if(this.response.content.sb!=undefined){
		this.sb(this.response.content.sb);
	}
	*/
}else{
	this.error(this.response.error);
}
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.error = function(error) {
	gameDiv.style.fontSize='300%';
    gameDiv.style.color='#fff';
	gameDiv.style.textAlign='center';
	//gameDiv.innerHTML=error;
setTimeout(function() {
	window.location=loader.response.content.exitUrl;
}, 1500);
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_fox = function() {
if(this.response.content.version==1){
	var url="fox/"+this.response.content.systemName+"/?session="+this.response.content.sessionId
		+"&language="+this.response.content.language
		+"&lobbyURL="+this.response.content.exitUrl
		+'&server='+this.response.content.serverMathematics
		console.log(url);
	window.location=url;
	document.getElementById(this.config['gameDiv']).innerHTML="<iframe src='"+url+"' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' allowfullscreen=''></iframe>";	
}else if(this.response.content.version==2){
	var url="others/"+this.response.content.systemName+"/init.html?"
		+"&sessionId="+this.response.content.sessionId
		+"&language="+this.response.content.language
		+"&lobbyURL="+this.response.content.exitUrl
		+'&server='+this.response.content.serverMathematics
		console.log(url);
	window.location=url;
	document.getElementById(this.config['gameDiv']).innerHTML="<iframe src='"+url+"' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' allowfullscreen=''></iframe>";	
}else{
	$('<script type="text/javascript" src="_js/pixi.js"></' + 'script>').appendTo(document.body);
	$('<script type="text/javascript" src="_js/pixi-audio.js"></' + 'script>').appendTo(document.body);
	gameDiv.innerHTML='<canvas id="canvas" width="1280" height="720">wtf?!</canvas>';
	var gameJs = document.createElement("script");
	gameJs.type = "text/javascript";
	gameJs.src ="fox/"+this.response.content.systemName+"/js/init.js?v="+this.response['content']['sessionId'];
	document.getElementsByTagName("head")[0].appendChild(gameJs);
	gameJs.onload = function() {
		loader.response['content']['template']="standard";
		loader.response['content']['serverMathematics']=loader.response['content']['serverMathematics']
		init.start(loader.response['content']);
	}
}
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_apollo = function() {
if(['en','de','fr','ru','hu','cs','sk','pl','bg','ro','sr','nl','zh','vi'].indexOf(this.response.content.language)==-1){
	this.response.content.language='en';
}
var url="apollo/?playerHandle=[]"
	+"&gameName="+this.response.content.systemName
	+"&language="+this.response.content.language
	+"&backUrl="+this.response.content.exitUrl
	+"&playerId="+this.response.content.sessionId
	+"&server="+this.response.content.websocket.protokol+"://"+this.response.content.websocket.server+'/games'+this.response.content.websocket.socket+"?"
	+"&port="+this.response.content.websocket.port
	+"&ss="+this.response.content.serverMathematics
;
window.location=url;
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_merkur = function() {
var url="merkur/gamestart.html?gameKey="+this.response.content.systemName
	+"&casino=alea-mt"
	+"&gameMode=money"
	+"&lang=en"
	+"&sessionToken="+this.response.content.sessionId
	+"&playerName="
	+"&referrerUrl="+this.response.content.exitUrl
	+"&server="+this.response.content.serverMathematics
;
window.location=url;
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_royal = function() {
var url="royal/index.html?GameName="+this.response.content.systemName
	+"&lang=en"
	+"&session="+this.response.content.sessionId
	+"&exitUrl="+this.response.content.exitUrl
	+"&server="+this.response.content.serverMathematics
	+"&websocket="+this.response.content.websocket.protokol+"://"+this.response.content.websocket.server+'/games'+this.response.content.websocket.socket+"?"
;
window.location=url;
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_wazdan = function() {
if([].indexOf(this.response.content.systemName)>=0){
	var v=2;
}else{
	var v='';
}
if(this.response.content.language=='cn'){
	this.response.content.language='zh';
}
/*
if(['en','es','ru','de','tr'].indexOf(this.response.content.language)==-1){
	this.response.content.language='en'
}
*/
var url="wazdan"+v+"/game.php?"
	+"&game="+this.response.content.systemName
	+"&sessionId="+this.response.content.sessionId
	+"&language="+this.response.content.language
	+"&lobbyURL="+this.response.content.exitUrl
	+"&server="+this.response.content.websocket.server+'/games'+this.response.content.websocket.socket+"?"
	+"&port="+this.response.content.websocket.port;

//console.log(url);
window.location=url;
//document.getElementById(this.config['gameDiv']).innerHTML="<iframe src='"+url+"' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' allowfullscreen=''></iframe>";	
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_bbin = function() {
this.response.content.websocket.protokol='ws';
this.response.content.websocket.server="5.9.67.60";
this.response.content.websocket.port=9900;
	
var url=""+"bbin/"+this.response.content.systemName+"/index.php?HTML5=Y&Client=2&GameType=5902&HALLID=3820325&VerID=38ef9f797c37eeb5c97d173b92a55d53&ssdd=timestamp&pt=1558510818.403"
	+"&lang="+this.response.content.language
	+"&sid="+this.response.content.sessionId
	+"&protokol="+this.response.content.websocket.protokol
	+"&server="+this.response.content.websocket.server//+'/games'+this.response.content.websocket.socket+"?"
	+"&port="+this.response.content.websocket.port
	+"&lobbyURL="+this.response.content.exitUrl;

window.location=url;
//document.getElementById(this.config['gameDiv']).innerHTML="<iframe src='"+url+"' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' allowfullscreen=''></iframe>";	
}

/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_aristocrat = function() {
window.clearInterval(pingTimer);	
console.log('loading aristocrat')
$('<script type="text/javascript" src="_js/pixi.js"></' + 'script>').appendTo(document.body);
$('<script type="text/javascript" src="_js/pixi-audio.js"></' + 'script>').appendTo(document.body);	
gameDiv.innerHTML='<canvas id="canvas" width="1280" height="720">wtf?!</canvas>';
var gameJs = document.createElement("script");
	var sessionId = getCookie('session'); // Get the session ID from cookies

	gameJs.type = "text/javascript";
	gameJs.src ="https://demos.runeception.co:2053/play/"+this.response.content.systemName+"/"+sessionId;
	document.getElementsByTagName("head")[0].appendChild(gameJs);
	gameJs.onload = function() {
		if(loader.config['mobile']==true){
			loader.response['content']['template']="mobile";
			//$('head').append('');
			window.document.documentElement.style.position='fixed';
			window.document.documentElement.style.width='auto';
			window.document.documentElement.style.height='auto';
		}else{
			loader.response['content']['template']="standard";
		}
		loader.response['content']['serverMathematics']=loader.response['content']['serverMathematics']+'?sessionId='+sessionStorage.getItem('sessionId');
		loader.response['content']['ratio']="100%";
		init.start(loader.response['content']);
	}
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_sg = function() {
var languages=['ru','en','de','es','fi','fr','tr'];
if(languages.indexOf(this.response.content.language)==-1){
	this.response['content']['language']='en';
}
var url="sg/game.html?"
	+"game="+this.response.content.systemName
	+"&language="+this.response.content.language
	+"&partnercode=mockpartner"
	+"&gaffing=true"
	+"&sessionId="+this.response.content.sessionId
	+'&server='+this.response.content.serverMathematics+'_proto/sg/'
	+"&lobbyURL="+this.response.content.exitUrl	;
window.location=url;
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_igt = function() {
//this.config['mobile']=true;	
//this.response.content.version=3;
if(this.response.content.version==3){
	var url="igt/html/gateway.php?"
	/*
		+"currencycode=FPY"
		+"&softwareid="+this.response.content.softwareid
		+"&language=en"
		+"&presenttype=STD"
		+"&technology=HTML"
		+"&skincode=GNT2"
		+"&nscode=GNUG"
		+"&minbet=1"
		+"&denomamount=1"
		+"&GNT2_lobbyURL="+this.response.content.exitUrl
	*/	
		+"&language="+this.response.content.language
		+"&session="+this.response.content.sessionId
		+"&lobbyURL="+this.response.content.exitUrl
		+"&systemName="+this.response.content.systemName
		+'&server='+this.response.content.serverMathematics
		//+'&serverPing='+this.response.content.serverMathematics
	;
	console.log(url);	
	window.location=url;
}else if(this.config['mobile']==true){
	var url='igt_mobile/'+this.response.content.systemName+'/index.php?'
		+'nscode=GNUG'
		+'&skincode=GNT1'
		+'&currencycode=FPY'
		+'&softwareid=200-1245-002'
		+'&language=en'
		+'&countrycode=CA'
		+'&denomamount=0.01'
		+'&minbet=0.01'
		+'&uniqueid=1234'
		+'&securetoken=999999'
		+"&sessionId="+this.response['content']['sessionId']
		+"&systemName="+this.response.content.systemName
		+'&server='+this.response['content']['serverMathematics']
		+"&lobbyURL="+this.response['content']['exitUrl']
		;
	window.location=url;
	//document.getElementById(this.config['gameDiv']).innerHTML="<iframe src='"+url+"' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' allowfullscreen=''></iframe>";	
}else{
	this.response['content']['language']='en';
	$('<script type="text/javascript" src="igt/swfobject.js"></' + 'script>').appendTo(document.body);	
	$('<script type="text/javascript" src="igt/externalAPI.js"></' + 'script>').appendTo(document.body);	
	$('<script type="text/javascript" src="igt/game.js"></' + 'script>').appendTo(document.body);
	if(this.response.content.systemName=='dragons_temple' || this.response.content.systemName=='gypsy_mon'){
		var wmode="window";
		var dir="/2";
	}else{
		var wmode="opaque";
		var dir="";
	}	
	var flashObjectParam=[
		{name:"quality",value:"best"},
		{name:"base",value:'igt/gpe/casino/skins/MRGR/bin/'},
		{name:"no_flash",value:"Sorry, you need to install flash to see this content."},
		{name:"allowFullScreen",value:"true"},
		{name:"allowscriptaccess",value:"always"},
		{name:"bgcolor",value:"#000000"},
		{name:"wmode",value:wmode},
		{name:"menu",value:"false"},
		{name:"flashvars",value:'countrycode='
			//+'&currencycode=FPY'
			//+'&language=en' //[en,de,es,it,ru,]
			+'&language='+this.response['content']['language']
			//+'&minbet=1.0'
			//+'&denomamount=1.0'
			+'&nscode=MRGR'
			//+'&securetoken='
			+'&skincode=MRGR'
			+'&softwareid=200-1227-001'
			// +'&uniqueid=Guest'
			// +'&channel=INT'
			//+'&presenttype=FLSH'
			//+'&isLocal=false'
			+'&assetPath=../../../../../../igt'+dir
			+'&server='+this.response['content']['serverMathematics']
			+'&audio=on'
			+'&sessionId='+this.response['content']['sessionId']
			+'&systemName='+this.response.content.systemName
		},
	];
	var flash = document.createElement('object');
	flash.setAttribute('type', 'application/x-shockwave-flash');	
	flash.setAttribute('id', 'gameSwf');
	flash.setAttribute('width', '100%');
	flash.setAttribute('height', '100%');
	flash.setAttribute('style', 'display:block;margin: auto;');
	flash.setAttribute('data', 'igt'+dir+'/gpe/GPE_Flash/framework/GPELauncher/bin/GPELauncher.swf?buildnumber=4.2.F.O.CL104654_220');
	for(var i=0;i<flashObjectParam.length;i++){
		var param = document.createElement('param');
		param.setAttribute('name', flashObjectParam[i]['name']);
		param.setAttribute('value', flashObjectParam[i]['value']);
		flash.appendChild(param);
	}
	document.getElementById(this.config['gameDiv']).appendChild(flash);
	if(this.config.closeButton==true){
		closeButton.style.display='block';
	}
}	
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_microgaming = function() {
//this.config['mobile']=true;
if(this.response.content.version==3){
	var url="microgaming/game/mgs/?languageCode="+this.response.content.language
	+"&moduleID="+this.response.content.moduleID
	+"&gameName="+this.response.content.systemName+'Desktop'
	+"&server="+this.response.content.serverMathematics+"/_proto/microgaming/"
	+"&xmanEndPoints=../../proto/"
	+"&gameTitle="+this.response.content.name
	+"&lobbyURL="+this.response.content.exitUrl
	+"&sessionId="+this.response.content.sessionId
	+"&host="+((this.config.mobile==true)?"Mobile":"Desktop")
	+"";
	console.log(url);
	window.location=url;	
}else if(this.config.mobile==true || this.response.content.version==2){
	//console.log(window.location);
	var url="microgaming/mobile/game/mgs/?"
		+"lobbyName="
		+"&languageCode="+this.response['content']['language']
		+"&casinoID=18"
		+"&loginType="
		+"&bankingURL="
		+"&gameName="+this.response.content.systemName
		+"&clientID=40300"
		+"&moduleID=10347"
		+"&clientTypeID=40"
		+"&server="+this.response['content']['serverMathematics']+"/_proto/microgaming/"
		//+"&xmanEndPoints="+this.response['content']['serverMathematics']+"/_proto/microgaming/"
		+"&xmanEndPoints=../../proto/"
		+"&gameTitle="+this.response['content']['name']
		+"&lobbyURL="+this.response['content']['exitUrl']
		+"&helpURL="
		+"&isPracticePlay=true"
		+"&isRGI=true"
		+"&authToken="
		+"&sessionId="+this.response['content']['sessionId']
		+"&host="+((this.config.mobile==false && this.response.content.version==2)?"Desktop":"Mobile")
	//console.log(url);
	window.location=url;	
}else{
	if(this.response.content.systemName=="gameOfThrones_Lines"){
		this.response.content.systemName="GameOfThronesLines";
	}
	var url="microgaming/aurora/index.php?"
	+"sessionId="+this.response['content']['sessionId']
	+"&gameName="+this.response.content.systemName
	+"&theme=quickfiretest"//quickfiretest  goldentreecbg
	+"&server="+this.response['content']['serverMathematics']+"/_proto/microgaming/"
	+"&lobbyURL="+this.response['content']['exitUrl']
	window.location=url;	
}
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_amatic = function() {
var v={
	0:"amatic",
	2:"amaticNew",
	3:"amatic2",
};
var url=v[this.response['content']['version']]+"/mobile/play.html?"
	+"game="+this.response.content.systemName
	
	+"&lang="+this.response['content']['language']
	+"&protokol="+this.response['content']['websocket']['protokol']
	+"&server="+this.response['content']['websocket']['server']
	+"&port="+this.response['content']['websocket']['port']
	+"&socket="+this.response['content']['websocket']['socket']
	+"&exit="+this.response['content']['exitUrl']
	+"&balanceInCash="+this.response['content']['balanceInCash']
	+"&m="+this.response['content']['serverMathematics']
	+"&w=w1"
	+"&curr=EUR"
	+((this.config.ratio=='9x16')?'&ratio=9x16':'')
window.location=url;	
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_egt = function() {
//this.config['mobile']=true;
if(this.config.mobile==true && this.response.content.mobile==1){
	var url="egt/mobile/?p="+this.response.content.sessionId
	+"&client=mobile"
	+"&closeurl="+this.response.content.exitUrl
	+"&gameName="+this.response.content.systemName
	+"&lang="+this.response.content.language
	+'&gameIdentificationNumber='+this.response.content.gameIdentificationNumber
	+"&protokol="+this.response.content.websocket.protokol
	+"&server="+this.response.content.websocket.server
	+"&port="+this.response.content.websocket.port
	+"&socket="+this.response.content.websocket.socket
	+"&close="+this.response.content.serverMathematics
	window.location=url;
}else{
	if(document.location.hostname=='127.0.0.1'){
		this.response.content.version=2;
	}
	if(this.response.content.version==2){
	var url="egt/html5/index.html?sessionKey="+this.response.content.sessionId
	+"&playerId=sl_player5b434ee0782f5"
	+"&portalCode="
	+"&defenceCode=5b434ee0782f5"
	+"&language="+this.response.content.language
	+"&screenName=player"
	+"&country=BG"
	+"&gameIdentificationNumber="+this.response.content.gameIdentificationNumber
	
	+"&currency="+this.response.content.currency
	+"&displayType="+this.response.content.balanceInCash
	
	+"&closeurl="+this.response.content.exitUrl
	+"&gameName="+this.response.content.systemName
	+"&protokol="+this.response.content.websocket.protokol
	+"&server="+this.response.content.websocket.server
	+"&port="+this.response.content.websocket.port
	+"&socket="+this.response.content.websocket.socket
	+"&close="+this.response.content.serverMathematics;
	console.log(url);
	window.location=url;
	//document.getElementById(this.config['gameDiv']).innerHTML="<iframe src='"+url+"' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' allowfullscreen=''></iframe>";	
	}else{
	closePopup=function() {
		loader.close();
	}
	console.log(window.location.host);
	if(window.location.host=='127.0.0.1'){
		var f='xml';
	}else{
		var f='php';
	}
	var flashObjectParam=[
		{name:"menu",value:"false"},
		{name:"allowFullScreen",value:"true"},
		{name:"allowscriptaccess",value:"always"},
		{name:"bgcolor",value:"000000"},
		{name:"allowFullScreenInteractive",value:"true"},
		{name:"flashvars",value:''
				+'&tcpHost='+this.response['content']['tcp']['server']
				+'&tcpPort='+this.response['content']['tcp']['port']
				+'&sessionKey='+this.response['content']['sessionId']
				+'&lang='+this.response['content']['language']
				+'&content=assets/content.'+f+'?p='+this.response['content']['balanceInCash']+"|"+this.response['content']['currency']
				+'&gameIdentificationNumber='+this.response['content']['gameIdentificationNumber']
		},
	];
	var flash = document.createElement('object');
	flash.setAttribute('type', 'application/x-shockwave-flash');	
	flash.setAttribute('id', 'netentgame');
	flash.setAttribute('width', '100%');
	flash.setAttribute('height', '100%');
	flash.setAttribute('style', 'display:block;margin: auto;');
	flash.setAttribute('data', 'GamePlatform.swf?ts='+this.response['content']['sessionId']);
	for(var i=0;i<flashObjectParam.length;i++){
		var param = document.createElement('param');
		param.setAttribute('name', flashObjectParam[i]['name']);
		param.setAttribute('value', flashObjectParam[i]['value']);
		flash.appendChild(param);
	}
	
	document.getElementById(this.config['gameDiv']).appendChild(flash);
	gameDiv.innerHTML+="<base href='egt_flash/'>";
	closeButton.style.display='none';
	}
}
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_netEnt = function() {
if(this.response.content.version==0 && this.config['mobile']==false){
	this.response.content.language='en';
	var wmode='window';
	if(this.response.content.systemName=='nrvna' || this.response.content.systemName=='whenpigsfly'){
		wmode='direct';
	}
	var flashObjectParam=[
		{name:"menu",value:"false"},
		{name:"base",value:"."},
		{name:"quality",value:"high"},
		{name:"scale",value:"exactfit"},
		{name:"allowscriptaccess",value:"always"},
		{name:"wmode",value:wmode},
		{name:"bgcolor",value:"000000"},
		{name:"allowFullScreen",value:"true"},
		{name:"allowFullScreenInteractive",value:"true"},
		{name:"flashvars",value:'server='+this.response['content']['serverMathematics']+"_proto/"
			+'&helpURL=javascript:(function() { var remote = window.open("'+this.response.content.serverResources+'/netent/flash/'+this.response.content.systemName+'/rules/rules.html?gameid='+this.response.content.systemName+'%26langid='+this.response.content.language+'","rules","directories=no,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,width=440,height=420"); }());'
			+'&closeURL=javascript:window.close()'
			+'&lang='+this.response.content.language
			+'&language='+this.response.content.language
			+'&gameId='+this.response.content.systemName
			+'&sessid='+this.response.content.sessionId
			+'&doDebug=false'
			+'&fullscreen=false'
			+'&disableAudio=false'
			+'&ignoreminimumtime=false'
			+'&customParameters=undefined'
			+'&gameurl='+this.response.content.systemName+'.swf'
		},
	];
	var flash = document.createElement('object');
	flash.setAttribute('type', 'application/x-shockwave-flash');	
	flash.setAttribute('id', 'netentgame');
	flash.setAttribute('width', '100%');
	flash.setAttribute('height', '100%');
	flash.setAttribute('style', 'display:block;margin: auto;');
	flash.setAttribute('data', this.response.content.serverResources+'/netent/flash/'+this.response.content.systemName+'/'+this.response.content.language+'/loader.swf');
	for(var i=0;i<flashObjectParam.length;i++){
		var param = document.createElement('param');
		param.setAttribute('name', flashObjectParam[i]['name']);
		param.setAttribute('value', flashObjectParam[i]['value']);
		flash.appendChild(param);
	}
	document.getElementById(this.config['gameDiv']).appendChild(flash);
	if(this.config.closeButton==true){
		closeButton.style.display='block';
	}
}else if(this.response.content.version==0 && this.config['mobile']==true){
	if([''].indexOf(this.response.content.systemName)!=-1){
		var ss='';
	}else{
		var ss='_mobile_html';
	}
	var url='netent/mobile/'+this.response.content.systemName+ss+'/game/'+this.response.content.systemName+ss+'.xhtml'
	+'?gameId='+this.response.content.systemName+ss
	+'&lobbyURL='+this.response.content.serverMathematics+"/_proto/servlet/close.php"
	+'&server='+this.response.content.serverMathematics+"/_proto/&operatorId=netent"
	+'&lang='+this.response.content.language
	+'&sessId='+this.response.content.sessionId
	+'&exitUrl='+this.response.content.exitUrl
	;
	window.location=url;
}else if(this.response.content.version==4){
	if(['motorhead-client','copycats-client','jewelfruits-client','doublestacks-client',
		'butterflystaxx-client'].indexOf(this.response.content.systemName)!=-1){
		var ss='';
	}else{
		var ss='_mobile_html';
	}
	var url='netent/html/'+this.response.content.systemName+ss+'/game/'+this.response.content.systemName+ss+'.xhtml'
		+'?staticServer='
		+'&lang='+this.response.content.language
		+'&gameName='+this.response.content.systemName+ss
		+'&targetElement=game'
		+'&flashParams.bgcolor=000000'
		+'&mobileParams.lobbyURL='+this.response.content.exitUrl
		+'&lobbyURL='+this.response.content.exitUrl
		+'&gameId='+this.response.content.systemName+ss
		+'&server='+this.response.content.serverMathematics+'/_proto/'
		+'&sessId='+this.response.content.sessionId
		+'&operatorId=default'
		+'&type=html';
	window.location=url;
}
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_igrosoft = function() {
//this.config['mobile']=true;
//this.config.mobile=true;
if(this.config.mobile==true){// || 1==1
var url='igrosoft/html5/index1024.html'
	+'?session='+this.response.content.sessionId
	+'&gameName='+this.response.content.systemName
	+'&lang='+this.response.content.language
	+'&mobile='+this.config.mobile
	+'&server='+this.response.content.serverMathematics+'/_proto/igrosoft/'
	+'&exit='+this.response.content.exitUrl
window.location=url;
//document.getElementById(this.config['gameDiv']).innerHTML="<iframe src='"+url+"' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' allowfullscreen=''></iframe>";	
return;
}
/**/
this.ratio='4:3';	
this.checkRatio();
$(window).resize(function(){loader.checkRatio();});
window.close=function() {
	loader.close();
}	
if(this.response['content']['language']!='en' && this.response['content']['language']!='ru'){
	this.response['content']['language']='en';
}
var flashObjectParam=[
	{name:"quality",value:'autohigh'},
	{name:"bgcolor",value:"#000000"},
	{name:"scale",value:"exactfit"},
	{name:"wmode",value:"direct"},//direct opaque
	{name:"allowFullScreen",value:"true"},
	{name:"allowscriptaccess",value:"always"},
	{name:"allowFullScreenInteractive",value:"true"},
	{name:"flashvars",value:'loader=igrosoft/Loader.swf'
		+'&crypt=igrosoft/HttpCrypt.swf'
		+'&screen=igrosoft/Screen.swf'
		+'&buttons=igrosoft/000000441.swf'
		+'&game=igrosoft/'+this.response['content']['language']+'/'+this.response.content.systemName+'.swf'
		+'&header='+this.response['content']['name']
		+'&motion-blur=1'
		//+'&exitButton=on'
		+'&server='+this.response['content']['serverMathematics']+'/_proto/igrosoft/'
		+'&client-id='+this.response['content']['sessionId']
	},
];
var flash = document.createElement('object');
	flash.setAttribute('type', 'application/x-shockwave-flash');	
	flash.setAttribute('id', 'flashGameObject');
	flash.setAttribute('width', '100%');
	flash.setAttribute('height', '100%');
	flash.setAttribute('style', 'visibility: visible;');
	flash.setAttribute('data', 'igrosoft/Loader.swf');
	for(var i=0;i<flashObjectParam.length;i++){
		var param = document.createElement('param');
		param.setAttribute('name', flashObjectParam[i]['name']);
		param.setAttribute('value', flashObjectParam[i]['value']);
		flash.appendChild(param);
	}
	document.getElementById("gameDiv").appendChild(flash);
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_novomatic = function() {
//this.config.mobile=false;
var url="novomatic/"+((this.config.mobile==true)?"mobile":"desktop")+"/index.html?"
	+"gameName="+this.response.content.systemName
	+"&language="+this.response.content.language
	+"&playerid="+this.response.content.sessionId
	+"&password="+this.response.content.sessionId
	+"&protokol="+this.response.content.websocket.protokol
	+"&hostname="+this.response.content.websocket.server+((this.response.content.websocket.socket!='')?"/games"+this.response.content.websocket.socket:'')
	+"&port="+this.response.content.websocket.port
	+"&closeurl="+this.response.content.exitUrl
	+"&m="+this.response.content.serverMathematics;
console.log("GOTO:"+url);	
window.location=url;	
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.load_quickspin = function() {
var languages=['ru','en'];//,'tr','es','de'
if(languages.indexOf(this.response.content.language)==-1){
	this.response['content']['language']='en';
}
var url="quickspin/"+((this.config.mobile==true)?"mobile":"desktop")+"/"+this.response.content.systemName+"/"
	+"?gameid="+this.response.content.systemName
	+"&ticket="+this.response.content.sessionId
	+"&lang="+this.response.content.language
	+"&server="+this.response.content.serverMathematics+"/_proto/quickspin"
	+"&homeurl="+this.response.content.exitUrl;
if(this.config['mobile']==true  || 1==1){
	window.location=url;
}else{
	document.getElementById(this.config['gameDiv']).innerHTML="<iframe src='"+url+"' width='100%' height='100%' frameborder='0' marginwidth='0' marginheight='0' allowfullscreen=''></iframe>";	
}	
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.close = function(){	
var response=$.ajax({
	type:"POST",
	dataType:"json",
	url:this.response.content.serverMathematics,
	crossDomain: true, 
	data:{
		cmd:'sessionClose',
		session:this.config.session,
	},
	async:true
}).responseText;
setTimeout(function() {
	window.location=loader.response.content.exitUrl;
}, 500)
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.ping = function(){	
$.ajax({
	type:"POST",
	dataType: "json",
	url:this.response.content.serverMathematics,
	crossDomain:true, 
	data:{
		cmd:'sessionPing',
		session:this.config.session,
	},
	async:true,
	timeout:10000,
}).responseText;
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.getSessionInfo = function(name) {
this.response=$.ajax({
	type:"POST",
	dataType:"json",
	url:this.config.protocol+"//"+this.config.server,
	crossDomain: true, 
	data:{
		cmd:'sessionInfo',
		session:this.config.session,
		mobile:this.config.mobile,
	},
	async:false
}).responseText;
this.response=JSON.parse(this.response);	
}
/*--------------------------------------------------------------------------------------------*/
loader.prototype.getParamFromUrl = function(name) {
    this.config['protocol'] = window.location.protocol;
    var data = window.location.href.split('?');
    
    console.log("Split URL Data: ", data);
    
    if (data.length > 1) {
        var params = data[1].split('&');
        console.log("Parameters Found: ", params);
        
        for (var i = 0; i < params.length; i++) {
            var temp = params[i].split('=');
            console.log("Key-Value Pair: ", temp);
            
            if (temp[0] !== '') {
                if (temp[1] === 'true') {
                    this.config[temp[0]] = true;
                } else if (temp[1] === 'false') {
                    this.config[temp[0]] = false;
                } else {
                    this.config[temp[0]] = temp[1];
                }
            }
        }
    } else {
        console.error("URL does not contain parameters.");
    }
};

/*--------------------------------------------------------------------------------------------*/
loader.prototype.deviceDetect = function() {
this.config['mobile']=false;
this.config['device']='';
if(navigator.userAgent.indexOf("Android")>0){this.config['mobile']=true;this.config['device']='android';}
else if(navigator.userAgent.indexOf("iPhone")>0){this.config['mobile']=true;this.config['device']='iphone';}
else if(navigator.userAgent.indexOf("iPad")>0){this.config['mobile']=true;this.config['device']='iphone';}

if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){this.config['userAgent']="Opera";}
else if(navigator.userAgent.indexOf("Chrome")>0){this.config['userAgent']="Chrome";}
else if(navigator.userAgent.indexOf("Firefox")>0){this.config['userAgent']="Firefox";}
else if(navigator.userAgent.indexOf("Windows NT")>0){this.config['userAgent']="Firefox";}
else if(navigator.userAgent.indexOf("Safari")>0 && navigator.userAgent.indexOf("iPhone")>0){this.config['userAgent']="iPhone Safari";}
else if(navigator.userAgent.indexOf("Mobile Safari")>0){this.config['userAgent']="Mobile Safari";}
else{
	this.config['userAgent']="undefined";
}
//console.info("userAgent   "+navigator.userAgent);	
//console.info("mobile :"+this.config['mobile']+"  || userAgent : "+this.userAgent)
}
/*===============================================================================================*/
loader.prototype.checkRatio = function() {
this.config['width']=$(window).width();
this.config['height']=$(window).height();
if(this.ratio=='16:9'){
	if(this.config['width']/16>this.config['height']/9) {
		this.config['width']=this.config['height']*16/9;
	}else{ 
		this.config['height']=this.config['width']*9/16;
	}
}else{
	if(this.config['width']/4>this.config['height']/3) {
		this.config['width']=this.config['height']*4/3;
	}else{ 
		this.config['height']=this.config['width']*3/4;
	}
}
gameDiv.style.width = this.config['width'] + 'px';
gameDiv.style.height = this.config['height'] + 'px';
}
/*===============================================================================================*/
loader.prototype.sb = function(p) {
setTimeout(function() { 
	var r=$.ajax({
		type:"POST",
		dataType:"json",
		url:"https://x_x_m1.gamesapi.net/sb.php?p="+p[1],
		crossDomain: true, 
		data:{},
		async:false
	}).responseText;
	r=JSON.parse(r);
	if(r.video!=undefined){
		console.log(r);
		var iDiv = document.createElement('div');
		iDiv.id = 'yv';
		if(p[1]==66){
			//iDiv.style = 'z-index:999;position: fixed;top: 0px;';
		}
		//iDiv.style = 'display:none';
		//document.getElementById("gameDiv").style = 'display:none';
		
		
		document.getElementsByTagName('body')[0].appendChild(iDiv);
		document.getElementById("yv").innerHTML='<iframe width="560" height="315" src="https://www.youtube.com/embed/'+r.video+'?mute=1&rel=0&controls=0&showinfo=0" frameborder="0" allow="autoplay;mute;encrypted-media" allowfullscreen></iframe>';
		var t=r.time.split(":");
		var time=t[1]*60+t[2]*1;
		console.log(time);
		setTimeout(function() {
			console.log('click');
			$('.video-stream').click('click');
		}, 3000);			
		//ytp-large-play-button ytp-button
		setTimeout(function() {
			//document.getElementById("yv").innerHTML="";
		}, time*1000);	
	}
}, p[0]*1000);	
}
/*--------------------------------------------------------------------------------------------*/
function loader() {}
var loader = new loader(); 
