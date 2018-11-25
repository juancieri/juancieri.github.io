---
layout: post
title:  "Cómo crear un feed de linkedin en mi web"
date:   2018-10-10 21:19:00 -0300
image: video-header.jpg
long_description: 'En este post te explico cómo integrar el api de linkedin para crear un feed en tu website'
categories: blog
---

Muchas veces sentimos la necesidad de crear una sección de blog para nuestro sitio web, ya sea para volcar contenido períodicamente, o incluso para fomentar el posicionamiento orgánico. Lo cierto es que hoy en día con la cantidad de canales disponibles para volcar contenido (Facebook, Instagram, Linkedin, etc) es muy dificil mantener un flujo de contenido nuevo de manera completa y constante, por lo que en algunos casos terminamos repitiéndonos, y algunas noticias que publicamos en redes sociales las repetimos en nuestro blog personal o el de nuestra empresa.

Incluso se hace pesado tener que publicar un contenido en linkedin y luego volver a prepararlo para postearlo en el blog. En algunos de estos casos podría ser útil crear un feed que tome la información de forma automática de nuestra "company page" en Linkedin y la postee en nuestro sitio web, y si el formato y la estructura de este feed es custom (si nosotros pudiésemos definir su estructura HTML), sería mucho mejor.

Por eso, en este post te voy a explicar cómo crear un feed custom de linkedin en tu sitio web integrando el API de linkedin.

Básicamente lo que necesitamos completar son 3 grandes pasos:
1. Maquetar la estructura HTML de nuestro feed
2. Crear una aplicación en Linkedin
3. Integrar el API de Linkedin


#### Maquetar la estructura HTML de nuestro feed:
Bueno, en este punto simplemente tenemos que utilizar un poco de HTML y de CSS para estructurar nuestro feed de acuerdo a la estética que queramos darle. En mi caso haré algo sencillo, que se verá así:

Para eso, primero voy a escribir la estructura HTML. Cada uno de mis post tendrá esta estructura:
{% highlight ruby %}
<div class="linkedin-feed-post">
    <h4 class="linkedin-feed-post-title"><a target="_blank" href="http://link-al-post.html">Este será el título de cada post</a></h4>
    <figure>
        <a target="_blank" href="http://link-al-post.html">
            <img src="http://imagen-del-post.jpg" alt="" class="img-responsive">
        </a>
    </figure>
    <figcaption>
        <p>Descripción o contenido del post</p>
    </figcaption>
</div>
{% endhighlight %}

La idea será crear un contenedor principal llamado "linkedin feed content" y luego imprimir todos los post ahí dentro:
{% highlight ruby %}
<div class="linkedin-feed-content">
    <!-- post 1 -->
    <div class="linkedin-feed-post">
        <h4 class="linkedin-feed-post-title"><a target="_blank" href="http://link-al-post.html">Este será el título de cada post</a></h4>
        <figure>
            <a target="_blank" href="http://link-al-post.html">
                <img src="http://imagen-del-post.jpg" alt="" class="img-responsive">
            </a>
        </figure>
        <figcaption>
            <p>Descripción o contenido del post</p>
        </figcaption>
    </div>
    <!-- post 2-->
    <div class="linkedin-feed-post">
        <h4 class="linkedin-feed-post-title"><a target="_blank" href="http://link-al-post.html">Este será el título de cada post</a></h4>
        <figure>
            <a target="_blank" href="http://link-al-post.html">
                <img src="http://imagen-del-post.jpg" alt="" class="img-responsive">
            </a>
        </figure>
        <figcaption>
            <p>Descripción o contenido del post</p>
        </figcaption>
    </div>
    <!-- post 3 -->
    <div class="linkedin-feed-post">
        <h4 class="linkedin-feed-post-title"><a target="_blank" href="http://link-al-post.html">Este será el título de cada post</a></h4>
        <figure>
            <a target="_blank" href="http://link-al-post.html">
                <img src="http://imagen-del-post.jpg" alt="" class="img-responsive">
            </a>
        </figure>
        <figcaption>
            <p>Descripción o contenido del post</p>
        </figcaption>
    </div>
</div>
{% endhighlight %}

Luego, le damos un poco de CSS para que no se vea tan feo (en mi caso voy a utilizar SCSS ya que me resulta más fácil y rápido para escribir:
{% highlight ruby %}
<style>
    .linkedin-feed-content {
      position: relative;
    }
    .linkedin-feed-post {
      background-color: white;
      margin: 0 0 30px 0;
      -webkit-box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
      box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
      padding: 30px;
    }
    .linkedin-feed-post figure {
      margin: 0 0 30px 0;
    }
    .linkedin-feed-post figure a {
      display: block;
    }
    .linkedin-feed-post figure img {
      margin: 0 auto;
    }
    .linkedin-feed-post-title {
      margin: 0 0 10px 0;
      font-weight: 700;
    }
</style>
{% endhighlight %}


#### Crear una aplicación en Linkedin:

#### Integrar el API de Linkedin:


Y recuerden: "No te preocupes si no funciona bien a la primera. Si todo lo que se hizo lo hiciera, estarías sin trabajo.".

Hasta la próxima!
