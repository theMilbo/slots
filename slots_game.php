
<script type="text/javascript">

  "use strict";
var Sg;
! function(e) {
    var t = window;

    function r(e, t, r, n) {
      let a = t + "?" + r;
        fetch(a).then(function(e) {
            if (e.ok) return e.text();
            throw Error("Failed to fetch iframe: " + e.status)
        }).then(function(t) {
            var r = new URL(a),
                c = document.createElement("iframe");
            c.src = r.toString(), c.setAttribute("allowfullscreen", "true"), e.appendChild(c), n.success()
        }).catch(function(e) {
            n.error(e)
        })
    }

    function n(e, n, a) {
        var c = {
                success: function() {
                    n && n()
                },
                error: function(e) {
                    a && a(e)
                }
            },
            o = document.getElementById(e.target_element);
        if (!o) {
            c.error("No element with id '".concat(e.target_element, "' found"));
            return
        }
        var i = e.launch_options;
        switch (i.strategy) {
            case "redirect":
                t.location = i.game_url;
                break;
            case "iframe":
                r(o, i.game_url, i.token, c);
                break;
            default:
                throw Error("Unexpected launch strategy")
        }
    }
    e.startGame = n, e.createIframe = r, t.sg = {
        launch: n
    }
}(Sg || (Sg = {}));


</script>
<script>
function launchGame() {
    $('#game_wrapper .error').hide();
    
    var sessionId = getCookie('session');
    
    // Ensure the loader script is loaded and that loader is a constructor
    $.getScript("https://demos.runeception.co/template/js/loader.js")
    .done(function(script, textStatus) {
        console.log("Loader script loaded and executed.");
        if (typeof loader === 'function') {
            var gameLoader = new loader(); // Make sure this is inside the callback
            gameLoader.init({
                protocol: window.location.protocol,
                server: 'demos.runeception.co:2053',
                session: sessionId,
                mobile: false,
                language: 'en',
                gameDiv: 'game_wrapper',
                type: 'aristocrat',
                status: 'success',
                gameId: SLOTS_GAME_ID
            });
        } else {
            console.error("Loader is not defined as a constructor.");
        }
    })
    .fail(function(jqxhr, settings, exception) {
        console.error("Failed to load the loader.js script.");
    });
}


  </script>
<link rel="stylesheet" type="text/css" href="/template/css/slots.css?v=4" />
<style type="text/css">
  .balance-box .balance {display: none !important;}
  .balance-box .balance-hidden {display: block !important;}
</style>


<div id="game_wrapper_c">
  <div id="game_wrapper">
    <div class="btns hide_if_battle" id="game_wrapper_btns">
      <div>
        <button class="theme" onclick="launchGame();">
          <i class="fa fa-play"></i>
          <span>Play</span>
        </button>
      </div>
    </div>

    <div class="error" style="display:none">
      <h2>Error</h2>
      <p id="slots_error">This game is currently not supported. Please try again later.</p>
    </div>
  </div>
</div>

<div class="controls">
  <div class="btns">
    <div><svg onclick="enableFullscreen()" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-expand fa-w-14 fa-7x"><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z" class=""></path></svg></div>
  </div>
</div>


<h3 class="sss hide_if_not_battle" style="margin:20px 0 10px"><i class="fa fa-question-circle"></i>How to play?</h3>
<p class="hide_if_not_battle" style="color:#eee;float:left;width:80%;margin:0;text-align:left">
  After the game loads, buy a bonus for the same amount that the battle was for.
  When your bonus spins are over, you will be redirected back to the page with
  battle results. The player with the biggest bonus win takes everything.
</p>

<!--<h3 class="sss hide_if_battle"><i class="fa fa-star"></i>Suggested</h3>
<div class="slotsgames hide_if_battle" id="games"></div>
 <div onclick="loadGame()">click here to load</div> -->
<!-- <div onclick="loadDemo()">click here to load demo</div> -->

<script type="text/javascript">
  //  $(document).ready(function(){
  //       $('<script type="text/javascript" src="https://demos.runeception.co/template/js/loader.js"></' + 'script>').appendTo(document.body);
  //   });
  let BACKEND_URL = '<?php echo $GLOBALS['siteurl']; ?>:<?php echo $GLOBALS['port']; ?>';
  let isFs = false;
  let gm = '';
  let provider = window.location.href.split('/')[4].split("?")[0];
  let game = new URLSearchParams(window.location.search).get('id');


  
  let slotsHandler = data => {

    if(data.command == 'launch game') {
      launchGame();
    }
  }

  let startPlaying = type => {
    if(!type) type = gm == 'real' ? 'fun' : 'real';

    if(type == gm) {
      return document.getElementById('game_wrapper_btns').style.display = 'none';
    }

    if(type == 'real') {
      launchGame();
    } else {
      loadDemo();
    }

    document.getElementById('rf_switch').setAttribute('data-side', type == 'real' ? 0 : 1);
    document.getElementById('game_wrapper_btns').style.display = 'none';
  }



  let toggleFsElements = (enabled = true) => {
    let classes = ['header-max', 'header-min-', 'pullout'];

    for(let i in classes) {
      let x = document.getElementsByClassName(classes[i]);

      for(let j in x) {
        if(x[j].style) x[j].style.display = enabled ? 'flex' : 'none';
      }
    }
  }

  let enableFullscreen = () => {
    toggleFsElements(false);

    document.getElementById('game_wrapper').setAttribute('data-fs', true);

    var elem = document.documentElement;
    if(elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  }

  let disableFullscreen = () => {
    toggleFsElements(true);

    document.getElementById('game_wrapper').setAttribute('data-fs', false);

    if(document.exitFullscreen) document.exitFullscreen();
    else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if(document.msExitFullscreen) document.msExitFullscreen();
  }

  let exitHandler = () => {
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

    if(fullscreenElement == null) {
      disableFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', exitHandler, false);
  document.addEventListener('mozfullscreenchange', exitHandler, false);
  document.addEventListener('MSFullscreenChange', exitHandler, false);
  document.addEventListener('webkitfullscreenchange', exitHandler, false);

</script>
