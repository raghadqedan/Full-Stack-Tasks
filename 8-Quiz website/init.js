//  <!-- Add the Facebook SDK for Javascript -->
  
        (function(d, s, id){
                              var js, fjs = d.getElementsByTagName(s)[0];
                              if (d.getElementById(id)) {return;}
                              js = d.createElement(s); js.id = id;
                              js.src = "https://connect.facebook.net/en_US/sdk.js";
                              fjs.parentNode.insertBefore(js, fjs);
                            }(document, 'script', 'facebook-jssdk')
        );


      
     window.fbAsyncInit = function() {
  FB.init({
    appId      : '4215704342086784', 
    cookie     : true,
    xfbml      : false,
    version    : 'v23.0'
  });

     }
