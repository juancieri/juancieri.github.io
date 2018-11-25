---
layout: post
title:  "Cómo agregar un chat de whatsapp web a mi sitio"
date:   2018-11-25 20:00:00 -0300
image: video-header.jpg
long_description: 'Utilizaremos el API de whatsapp para simular un chat online'
categories: blog
---

Hola! Esta vez les voy a enseñar a simular un chat online de whatsapp, utilizando el API de Whatsapp Web.

Básicamente lo que necesitamos completar son 3 grandes pasos:
1. Maquetar la estructura HTML de nuestro feed
2. Darle estilos con CSS
3. Un poco de JS para simular el chat


#### Maquetar la estructura HTML de nuestro chat:
Bueno, en este punto simplemente tenemos que utilizar un poco de HTML y de CSS para estructurar nuestro chat de acuerdo a la estética que queramos darle:

{% highlight ruby %}
<div id="float-cta">
    <span>Envianos un whatsapp!</span>
    <a href="javascript:void(0);">
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
        <i class="fa fa-times" aria-hidden="true"></i>
    </a>
    <div class="whatsapp-msg-container">
        <div class="whatsapp-msg-header">
            <h6>WhatsApp Chat</h6>
        </div>
        <div class="whatsapp-msg-body">
            <textarea name="whatsapp-msg" class="whatsapp-msg-textarea" placeholder="Hola, podés consultar vía whatsapp..."></textarea>
        </div>
        <div class="whatsapp-msg-footer">
            <button type="button" class="btn-whatsapp-send">Enviar</button>
        </div>
    </div>
</div>
{% endhighlight %}

#### Darle estilos con CSS:
Luego, le damos un poco de CSS para que no se vea tan feo:
{% highlight ruby %}
<style>
    #float-cta {
	position: fixed;
	bottom: 35px;
	right: 35px;
	z-index: 9999999999
}
#float-cta a {
	display: inline-block;
	background-color: #25d366;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	-ms-border-radius: 50%;
	border-radius: 50%;
	width: 55px;
	height: 55px;
	color: #fff;
	-webkit-box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.3);
	-moz-box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.3);
	box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30px;
	transition: 0.3s
}
#float-cta a:hover,
#float-cta a:focus {
	text-decoration: none;
	background-color: #128c7e
}
#float-cta a .fa-times,
#float-cta a .fa-whatsapp {
	transition: 0.3s
}
#float-cta a .fa-times {
	visibility: hidden;
	opacity: 0;
	display: none
}
#float-cta a.open .fa-times {
	visibility: visible;
	opacity: 1;
	display: block
}
#float-cta a.open .fa-whatsapp {
	visibility: hidden;
	opacity: 0;
	display: none
}
#float-cta span {
	position: absolute;
	left: -150px;
	width: 190px;
	top: 16px;
	background-color: #999;
	color: #fff;
	padding: 5px 3px;
	-webkit-border-radius: 15px;
	-moz-border-radius: 15px;
	-ms-border-radius: 15px;
	border-radius: 15px;
	text-align: center;
	letter-spacing: 0.5px;
	opacity: 0;
	transition: 0.3s;
	visibility: hidden
}
#float-cta .whatsapp-msg-container {
	visibility: hidden;
	position: absolute;
	right: 0;
	bottom: -20px;
	opacity: 0;
	transform: translateY(-70px);
	width: 300px;
	overflow: hidden;
	-webkit-box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.1);
	-moz-box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.1);
	box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.1);
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	-ms-border-radius: 10px;
	border-radius: 10px;
	background-color: #fff;
	transition: 0.3s
}
#float-cta .whatsapp-msg-container.open {
	visibility: visible;
	bottom: 0;
	opacity: 1
}
#float-cta .whatsapp-msg-header {
	text-align: center;
	background-color: #25d366;
	color: #fff;
	padding: 10px
}
#float-cta .whatsapp-msg-header h6 {
	font-weight: 700;
	font-size: 16px;
	font-size: 1rem;
	margin: 0
}
#float-cta .whatsapp-msg-body {
	padding: 5px
}
#float-cta .whatsapp-msg-body textarea {
	width: 100%;
	height: 200px;
	border: none;
	padding: 15px
}
#float-cta .whatsapp-msg-body textarea.placeholder,
#float-cta .whatsapp-msg-body textarea::placeholder {
	color: lightgray;
	font-size: 14px
}
#float-cta .whatsapp-msg-footer {
	text-align: center;
	background-color: #fff;
	border-top: 1px solid lightgray;
	padding: 5px
}
#float-cta .btn-whatsapp-send {
	display: block;
	width: 100%;
	border: 2px solid #25d366;
	font-weight: 700;
	color: #fff;
	background-color: #25d366;
	padding: 7px 15px;
	transition: 0.3s
}
#float-cta .btn-whatsapp-send:hover {
	background-color: #fff;
	color: #25d366
}
#float-cta:hover span {
	opacity: 1;
	left: -200px;
	visibility: visible
}
#float-cta.open span {
	display: none
}
</style>
{% endhighlight %}


#### Un poco de JS para simular el chat:
{% highlight ruby %}
<script>
function initWhatsappChat() {
    'use strict';
    var mobileDetect = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (mobileDetect) {
        $('#float-cta .whatsapp-msg-container').css('display','none');
        $('#float-cta > a').on('click', function(){
            window.location = 'https://api.whatsapp.com/send?phone=123456789';
        });
    } else {
        $('#float-cta > a').click(function(){
            $(this).toggleClass('open');
            $('#float-cta .whatsapp-msg-container').toggleClass('open');
            $('#float-cta').toggleClass('open');
        });
        $('.btn-whatsapp-send').on('click', function(event){
            event.stopPropagation();
        });
        $('.btn-whatsapp-send').click(function() {
            var baseUrl = 'https://web.whatsapp.com/send?phone=123456789&text=';
            var textEncode = encodeURIComponent($('#float-cta .whatsapp-msg-body textarea').val());
            window.open(baseUrl + textEncode, '_blank');
        });
    }
}
initWhatsappChat();
</script>
{% endhighlight %}

Y recuerden: "No te preocupes si no funciona bien a la primera. Si todo lo que se hizo lo hiciera, estarías sin trabajo.".

Hasta la próxima!
