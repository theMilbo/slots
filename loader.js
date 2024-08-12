function loader() {
    this.config = {};
    this.pingInterval = 60000;
}

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
