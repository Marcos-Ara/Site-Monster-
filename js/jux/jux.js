/*==================================================
                JUX.JS
==================================================*/

"use strict";

/*==================================================
            OBJETO JUX
==================================================*/

const Jux = {

    init(){

        this.cache();

        this.events();

        this.renderVideos();

        this.loadFeatured();

    },

/*==================================================
            ELEMENTOS
==================================================*/

    cache(){

        this.featuredVideo = document.querySelector(

            "#jux-featured-video"

        );

        this.featuredTitle = document.querySelector(

            "#jux-featured-title"

        );

        this.featuredDescription = document.querySelector(

            "#jux-featured-description"

        );

        this.videosContainer = document.querySelector(

            "#jux-videos"

        );

        this.searchInput = document.querySelector(

            "#jux-search"

        );

    },

/*==================================================
            EVENTOS
==================================================*/

    events(){

        if(this.searchInput){

            this.searchInput.addEventListener(

                "input",

                (event)=>{

                    this.filterVideos(

                        event.target.value

                    );

                }

            );

        }

    },

/*==================================================
            VÍDEO PRINCIPAL
==================================================*/

    loadFeatured(){

        if(

            !this.featuredVideo ||

            !DATA.FEATURED_VIDEO

        ){

            return;

        }

        this.featuredVideo.src =

        `https://www.youtube.com/embed/${DATA.FEATURED_VIDEO.youtubeId}`;

        if(this.featuredTitle){

            this.featuredTitle.textContent =

            DATA.FEATURED_VIDEO.title;

        }

        if(this.featuredDescription){

            this.featuredDescription.textContent =

            DATA.FEATURED_VIDEO.description;

        }

    },

/*==================================================
            RENDERIZAR VÍDEOS
==================================================*/

    renderVideos(){

        if(

            !this.videosContainer ||

            !DATA.VIDEOS

        ){

            return;

        }

        this.videosContainer.innerHTML = "";

        DATA.VIDEOS.forEach(video=>{

            this.videosContainer.appendChild(

                this.createCard(video)

            );

        });

    },

/*==================================================
            CARD
==================================================*/

    createCard(video){

        const card = document.createElement(

            "article"

        );

        card.className = "series-card";

        card.innerHTML = `

            <div class="series-image">

                <img

                    src="${video.thumbnail}"

                    alt="${video.title}"

                >

                <div class="play-button">

                    ▶

                </div>

            </div>

            <div class="series-content">

                <span>JUX</span>

                <h3>${video.title}</h3>

                <p>${video.description}</p>

                <button class="btn-purple">

                    Assistir

                </button>

            </div>

        `;

        card.addEventListener(

            "click",

            ()=>{

                this.openVideo(video);

            }

        );

        return card;

    },

/*==================================================
            ABRIR VÍDEO
==================================================*/

    openVideo(video){

        if(!video.youtubeId){

            console.warn(

                "Vídeo ainda não cadastrado."

            );

            return;

        }

        window.open(

            `https://www.youtube.com/watch?v=${video.youtubeId}`,

            "_blank"

        );

    },

/*==================================================
            PESQUISAR
==================================================*/

    filterVideos(search){

        if(

            !this.videosContainer ||

            !DATA.VIDEOS

        ){

            return;

        }

        const text = search.toLowerCase().trim();

        const videos = DATA.VIDEOS.filter(video=>{

            return(

                video.title

                .toLowerCase()

                .includes(text)

                ||

                video.description

                .toLowerCase()

                .includes(text)

            );

        });

        this.videosContainer.innerHTML = "";

        videos.forEach(video=>{

            this.videosContainer.appendChild(

                this.createCard(video)

            );

        });

    },

/*==================================================
            FILTRO
==================================================*/

    filterCategory(category){

        if(category === "all"){

            this.renderVideos();

            return;

        }

        const videos = DATA.VIDEOS.filter(video=>{

            if(!video.category){

                return false;

            }

            return video.category

                .toLowerCase()

                ===

                category.toLowerCase();

        });

        this.videosContainer.innerHTML = "";

        videos.forEach(video=>{

            this.videosContainer.appendChild(

                this.createCard(video)

            );

        });

    },

/*==================================================
            RECARREGAR
==================================================*/

    refresh(){

        this.renderVideos();

        this.loadFeatured();

    },

/*==================================================
            LIMPAR PESQUISA
==================================================*/

    clearSearch(){

        if(this.searchInput){

            this.searchInput.value = "";

        }

        this.renderVideos();

    },

/*==================================================
            ATUALIZAR VÍDEO PRINCIPAL
==================================================*/

    updateFeatured(video){

        if(!video){

            return;

        }

        if(this.featuredVideo){

            this.featuredVideo.src =

            `https://www.youtube.com/embed/${video.youtubeId}`;

        }

        if(this.featuredTitle){

            this.featuredTitle.textContent =

            video.title;

        }

        if(this.featuredDescription){

            this.featuredDescription.textContent =

            video.description;

        }

    },

/*==================================================
            DESTACAR CARD
==================================================*/

    highlight(card){

        if(card){

            card.classList.add("active");

        }

    },

    removeHighlight(card){

        if(card){

            card.classList.remove("active");

        }

    }

};

/*==================================================
            FUNÇÕES GLOBAIS
==================================================*/

window.openJuxVideo = function(videoId){

    if(!videoId){

        return;

    }

    window.open(

        `https://www.youtube.com/watch?v=${videoId}`,

        "_blank"

    );

};

window.filterJux = function(category){

    Jux.filterCategory(category);

};

window.reloadJux = function(){

    Jux.refresh();

};

window.clearJuxSearch = function(){

    Jux.clearSearch();

};

/*==================================================
            INICIAR
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Jux.init();

        console.log(

            "Jux.js carregado."

        );

    }

);

