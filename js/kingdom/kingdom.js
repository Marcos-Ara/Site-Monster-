/* ==========================================================
                    KINGDOM
========================================================== */

"use strict";

const Kingdom = {

    name:"Kingdom",

    initialized:false,

    /* ======================================================
                        MAP
    ====================================================== */

    map:null,

    wrapper:null,

    viewport:null,

    canvas:null,

    /* ======================================================
                        UI
    ====================================================== */

    flags:[],

    preview:null,

    search:null,

    filters:[],

    zoomControls:null,

    /* ======================================================
                        STATE
    ====================================================== */

    currentGame:"classic",

    currentStage:null,

    zoom:1,

    minZoom:.75,

    maxZoom:3,

    dragging:false,

    dragStartX:0,

    dragStartY:0,

    offsetX:0,

    offsetY:0,

    /* ======================================================
                        INIT
    ====================================================== */

    init(){

        if(this.initialized) return;

        if(!this.isKingdom()) return;

        this.cache();

        this.bindEvents();

        this.load();

        this.initialized = true;

        console.log(

            "Kingdom iniciado."

        );

    },

    /* ======================================================
                        PAGE
    ====================================================== */

    isKingdom(){

        return (

            document.body.dataset.page ===

            "kingdom"

        );

    },


/* ==========================================================
                    ZOOM
========================================================== */

    zoomStep:.15,

    /* ======================================================
                        EVENTS
    ====================================================== */

    bindEvents(){

        this.bindZoom();

    },

    /* ======================================================
                        ZOOM
    ====================================================== */

    bindZoom(){

        if(!this.viewport) return;

        on(

            this.viewport,

            "wheel",

            event=>{

                this.onWheel(event);

            },

            {

                passive:false

            }

        );

        this.zoomControls.forEach(button=>{

            on(

                button,

                EVENTS.click,

                ()=>{

                    const action =

                        button.dataset.zoom;

                    if(action==="in"){

                        this.zoomIn();

                    }

                    else{

                        this.zoomOut();

                    }

                }

            );

        });

    },

/* ==========================================================
                    DRAG
========================================================== */

    /* ======================================================
                        EVENTS
    ====================================================== */

    bindDrag(){

        if(!this.viewport) return;

        on(

            this.viewport,

            "mousedown",

            event=>{

                this.dragStart(event);

            }

        );

        on(

            window,

            "mousemove",

            event=>{

                this.dragMove(event);

            }

        );

        on(

            window,

            "mouseup",

            ()=>{

                this.dragEnd();

            }

        );

    },

    /* ======================================================
                        START
    ====================================================== */

    dragStart(event){

        if(event.button !== 0) return;

        this.dragging = true;

        this.viewport.style.cursor =

            "grabbing";

        this.dragStartX =

            event.clientX -

            this.offsetX;

        this.dragStartY =

            event.clientY -

            this.offsetY;

    },
    /* ======================================================
                        MOVE
    ====================================================== */

    dragMove(event){

        if(

            !this.dragging

        ) return;

        this.offsetX =

            event.clientX -

            this.dragStartX;

        this.offsetY =

            event.clientY -

            this.dragStartY;

        this.updateTransform();

    },

    /* ======================================================
                        END
    ====================================================== */

    dragEnd(){

        if(

            !this.dragging

        ) return;

        this.dragging = false;

        this.viewport.style.cursor =

            "grab";

    },

    /* ==========================================================
                    FLAGS
========================================================== */

    stages:[

        {

            id:1,

            name:"Southport",

            game:"classic",

            x:18.4,

            y:76.1,

            youtube:"abc123",

            difficulty:"Easy"

        },

        {

            id:2,

            name:"Pagras",

            game:"classic",

            x:24.8,

            y:69.5,

            youtube:"def456",

            difficulty:"Normal"

        },

        {

            id:3,

            name:"Twin Rivers",

            game:"classic",

            x:31.2,

            y:61.4,

            youtube:"ghi789",

            difficulty:"Hard"

        }

    ],

    /* ======================================================
                        LOAD
    ====================================================== */

    loadFlags(){

        if(!this.canvas) return;

        this.clearFlags();

        this.stages.forEach(stage=>{

            this.canvas.appendChild(

                this.createFlag(stage)

            );

        });

    },

    /* ======================================================
                        CLEAR
    ====================================================== */

    clearFlags(){

        this.canvas

        .querySelectorAll(".flag")

        .forEach(flag=>{

            flag.remove();

        });

    },

/* ==========================================================
                    FLAGS
========================================================== */

    stages:[

        {

            id:1,

            name:"Southport",

            game:"classic",

            x:18.4,

            y:76.1,

            youtube:"abc123",

            difficulty:"Easy"

        },

        {

            id:2,

            name:"Pagras",

            game:"classic",

            x:24.8,

            y:69.5,

            youtube:"def456",

            difficulty:"Normal"

        },

        {

            id:3,

            name:"Twin Rivers",

            game:"classic",

            x:31.2,

            y:61.4,

            youtube:"ghi789",

            difficulty:"Hard"

        }

    ],

    /* ======================================================
                        LOAD
    ====================================================== */

    loadFlags(){

        if(!this.canvas) return;

        this.clearFlags();

        this.stages.forEach(stage=>{

            this.canvas.appendChild(

                this.createFlag(stage)

            );

        });

    },

    /* ======================================================
                        CLEAR
    ====================================================== */

    clearFlags(){

        this.canvas

        .querySelectorAll(".flag")

        .forEach(flag=>{

            flag.remove();

        });

    },

/* ==========================================================
                    FILTERS
========================================================== */

games:[

    {

        id:"classic",

        name:"Kingdom Rush",

        map:"assets/maps/classic.webp"

    },

    {

        id:"frontiers",

        name:"Frontiers",

        map:"assets/maps/frontiers.webp"

    },

    {

        id:"origins",

        name:"Origins",

        map:"assets/maps/origins.webp"

    },

    {

        id:"vengeance",

        name:"Vengeance",

        map:"assets/maps/vengeance.webp"

    },

    {

        id:"alliance",

        name:"Alliance",

        map:"assets/maps/alliance.webp"

    }

],

/* ======================================================
                    FILTERS
====================================================== */

bindFilters(){

    this.filters.forEach(button=>{

        on(

            button,

            EVENTS.click,

            ()=>{

                this.changeGame(

                    button.dataset.game

                );

            }

        );

    });

},

/* ==========================================================
                    SEARCH
========================================================== */

searchResults:[],

/* ======================================================
                    SEARCH
====================================================== */

bindSearch(){

    if(

        !this.search

    ) return;

    on(

        this.search,

        "input",

        event=>{

            this.searchStage(

                event.target.value

            );

        }

    );

},

/* ======================================================
                    FIND
====================================================== */

searchStage(text){

    const value =

        text

        .trim()

        .toLowerCase();

    if(!value){

        this.clearSearch();

        return;

    }

    this.searchResults =

        this.stages.filter(stage=>{

            return(

                stage.game===

                this.currentGame

                &&

                stage.name

                .toLowerCase()

                .includes(value)

            );

        });

    this.highlightFlags();

},

/* ==========================================================
                    CAMPAIGNS
========================================================== */

campaigns:[

    {

        id:"main",

        name:"Campanha Principal",

        icon:"🏰"

    },

    {

        id:"heroic",

        name:"Heroic",

        icon:"⚔️"

    },

    {

        id:"iron",

        name:"Iron Challenge",

        icon:"🛡️"

    }

],

currentCampaign:"main",

/* ======================================================
                    CAMPAIGNS
====================================================== */

bindCampaigns(){

    const buttons =

        $$("[data-campaign]");

    buttons.forEach(button=>{

        on(

            button,

            EVENTS.click,

            ()=>{

                this.changeCampaign(

                    button.dataset.campaign

                );

            }

        );

    });

},

/* ==========================================================
                    CAMPAIGNS
========================================================== */

campaigns:[

    {

        id:"main",

        name:"Campanha Principal",

        icon:"🏰"

    },

    {

        id:"heroic",

        name:"Heroic",

        icon:"⚔️"

    },

    {

        id:"iron",

        name:"Iron Challenge",

        icon:"🛡️"

    }

],

currentCampaign:"main",

/* ======================================================
                    CAMPAIGNS
====================================================== */

bindCampaigns(){

    const buttons =

        $$("[data-campaign]");

    buttons.forEach(button=>{

        on(

            button,

            EVENTS.click,

            ()=>{

                this.changeCampaign(

                    button.dataset.campaign

                );

            }

        );

    });

},

/* ==========================================================
                    PROGRESS
========================================================== */

progressKey:"monster-kingdom-progress",

progress:{},

/* ======================================================
                    LOAD
====================================================== */

loadProgress(){

    const data =

        localStorage.getItem(

            this.progressKey

        );

    if(data){

        this.progress =

            JSON.parse(data);

    }

    else{

        this.progress = {};

    }

},

/* ======================================================
                    SAVE
====================================================== */

saveProgress(){

    localStorage.setItem(

        this.progressKey,

        JSON.stringify(

            this.progress

        )

    );

},

/* ==========================================================
                    PROGRESS
========================================================== */

progressKey:"monster-kingdom-progress",

progress:{},

/* ======================================================
                    LOAD
====================================================== */

loadProgress(){

    const data =

        localStorage.getItem(

            this.progressKey

        );

    if(data){

        this.progress =

            JSON.parse(data);

    }

    else{

        this.progress = {};

    }

},

/* ======================================================
                    SAVE
====================================================== */

saveProgress(){

    localStorage.setItem(

        this.progressKey,

        JSON.stringify(

            this.progress

        )

    );

},

/* ======================================================
                    COMPLETE
====================================================== */

completeStage(

    stageId,

    stars=3

){

    this.progress[stageId]={

        completed:true,

        stars,

        date:

            Date.now()

    };

    this.saveProgress();

    this.updateFlags();

},

/* ==========================================================
                    PARTICLES
========================================================== */

particles:[],

particleCanvas:null,

particleContext:null,

particleAnimation:null,

maxParticles:80,

/* ======================================================
                    INIT
====================================================== */

initParticles(){

    this.particleCanvas =

        $("#particle-canvas");

    if(!this.particleCanvas) return;

    this.particleContext =

        this.particleCanvas.getContext("2d");

    this.resizeParticles();

    this.createParticles();

    this.animateParticles();

},

/* ======================================================
                    RESIZE
====================================================== */

resizeParticles(){

    this.particleCanvas.width =

        window.innerWidth;

    this.particleCanvas.height =

        window.innerHeight;

},

/* ======================================================
                    CREATE
====================================================== */

createParticles(){

    this.particles=[];

    for(

        let i=0;

        i<this.maxParticles;

        i++

    ){

        this.particles.push({

            x:

                Math.random()

                *this.particleCanvas.width,

            y:

                Math.random()

                *this.particleCanvas.height,

            radius:

                Math.random()*2+1,

            speed:

                Math.random()*0.6+.2,

            alpha:

                Math.random()

        });

    }

},

/* ======================================================
                    UPDATE
====================================================== */

updateParticles(){

    this.particles.forEach(p=>{

        p.y-=p.speed;

        if(

            p.y<-10

        ){

            p.y=

                this.particleCanvas.height+10;

            p.x=

                Math.random()

                *this.particleCanvas.width;

        }

    });

},

/* ======================================================
                    UPDATE
====================================================== */

updateParticles(){

    this.particles.forEach(p=>{

        p.y-=p.speed;

        if(

            p.y<-10

        ){

            p.y=

                this.particleCanvas.height+10;

            p.x=

                Math.random()

                *this.particleCanvas.width;

        }

    });

},

/* ======================================================
                    DRAW
====================================================== */

drawParticles(){

    const ctx=

        this.particleContext;

    ctx.clearRect(

        0,

        0,

        this.particleCanvas.width,

        this.particleCanvas.height

    );

    this.particles.forEach(p=>{

        ctx.beginPath();

        ctx.arc(

            p.x,

            p.y,

            p.radius,

            0,

            Math.PI*2

        );

        ctx.fillStyle=

        `rgba(

            255,

            255,

            255,

            ${p.alpha}

        )`;

        ctx.fill();

    });

},

/* ======================================================
                    STOP
====================================================== */

stopParticles(){

    cancelAnimationFrame(

        this.particleAnimation

    );

},

/* ==========================================================
                    TOUCH
========================================================== */

touchStartDistance:0,

lastTouchCenter:null,

/* ======================================================
                    TOUCH EVENTS
====================================================== */

bindTouch(){

    if(!this.viewport) return;

    on(

        this.viewport,

        "touchstart",

        event=>{

            this.touchStart(event);

        },

        {

            passive:false

        }

    );

    on(

        this.viewport,

        "touchmove",

        event=>{

            this.touchMove(event);

        },

        {

            passive:false

        }

    );

    on(

        this.viewport,

        "touchend",

        ()=>{

            this.touchEnd();

        }

    );

},

/* ==========================================================
                    TOUCH
========================================================== */

touchStartDistance:0,

lastTouchCenter:null,

/* ======================================================
                    TOUCH EVENTS
====================================================== */

bindTouch(){

    if(!this.viewport) return;

    on(

        this.viewport,

        "touchstart",

        event=>{

            this.touchStart(event);

        },

        {

            passive:false

        }

    );

    on(

        this.viewport,

        "touchmove",

        event=>{

            this.touchMove(event);

        },

        {

            passive:false

        }

    );

    on(

        this.viewport,

        "touchend",

        ()=>{

            this.touchEnd();

        }

    );

},

/* ======================================================
                    START
====================================================== */

touchStart(event){

    if(

        event.touches.length===1

    ){

        const touch =

            event.touches[0];

        this.dragging = true;

        this.dragStartX =

            touch.clientX -

            this.offsetX;

        this.dragStartY =

            touch.clientY -

            this.offsetY;

    }

    if(

        event.touches.length===2

    ){

        this.touchStartDistance =

            this.getTouchDistance(

                event.touches

            );

    }

},

/* ======================================================
                    PINCH
====================================================== */

touchZoom(event){

    const distance =

        this.getTouchDistance(

            event.touches

        );

    if(

        !this.touchStartDistance

    ){

        this.touchStartDistance=

            distance;

        return;

    }

    const delta =

        distance -

        this.touchStartDistance;

    this.zoom +=

        delta * 0.005;

    this.zoom = Math.max(

        this.minZoom,

        Math.min(

            this.zoom,

            this.maxZoom

        )

    );

    this.touchStartDistance=

        distance;

    this.updateTransform();

},

/* ======================================================
                    PINCH
====================================================== */

touchZoom(event){

    const distance =

        this.getTouchDistance(

            event.touches

        );

    if(

        !this.touchStartDistance

    ){

        this.touchStartDistance=

            distance;

        return;

    }

    const delta =

        distance -

        this.touchStartDistance;

    this.zoom +=

        delta * 0.005;

    this.zoom = Math.max(

        this.minZoom,

        Math.min(

            this.zoom,

            this.maxZoom

        )

    );

    this.touchStartDistance=

        distance;

    this.updateTransform();

},

/* ==========================================================
                    MINIMAP
========================================================== */

minimap:null,

minimapImage:null,

minimapViewport:null,

/* ======================================================
                    CACHE
====================================================== */

cacheMinimap(){

    this.minimap =

        $("#kingdom-minimap");

    this.minimapImage =

        $("#minimap-image");

    this.minimapViewport =

        $("#minimap-viewport");

},

/* ==========================================================
                    MINIMAP
========================================================== */

minimap:null,

minimapImage:null,

minimapViewport:null,

/* ======================================================
                    CACHE
====================================================== */

cacheMinimap(){

    this.minimap =

        $("#kingdom-minimap");

    this.minimapImage =

        $("#minimap-image");

    this.minimapViewport =

        $("#minimap-viewport");

},

/* ======================================================
                    UPDATE
====================================================== */

updateMinimap(){

    if(

        !this.minimapViewport ||

        !this.wrapper

    ) return;

    const scale =

        0.18;

    const width =

        this.wrapper.clientWidth /

        this.zoom *

        scale;

    const height =

        this.wrapper.clientHeight /

        this.zoom *

        scale;

    const x =

        (-this.offsetX / this.zoom)

        * scale;

    const y =

        (-this.offsetY / this.zoom)

        * scale;

    this.minimapViewport.style.width =

        width + "px";

    this.minimapViewport.style.height =

        height + "px";

    this.minimapViewport.style.left =

        x + "px";

    this.minimapViewport.style.top =

        y + "px";

},

/* ==========================================================
                    TOOLTIP
========================================================== */

tooltip:null,

tooltipTitle:null,

tooltipDifficulty:null,

tooltipCampaign:null,

tooltipStars:null,

tooltipHero:null,

tooltipVisible:false,

/* ======================================================
                    CACHE
====================================================== */

cacheTooltip(){

    this.tooltip =

        $("#kingdom-tooltip");

    if(!this.tooltip) return;

    this.tooltipTitle =

        $("#tooltip-title");

    this.tooltipDifficulty =

        $("#tooltip-difficulty");

    this.tooltipCampaign =

        $("#tooltip-campaign");

    this.tooltipStars =

        $("#tooltip-stars");

    this.tooltipHero =

        $("#tooltip-hero");

},

/* ==========================================================
                    TOOLTIP
========================================================== */

tooltip:null,

tooltipTitle:null,

tooltipDifficulty:null,

tooltipCampaign:null,

tooltipStars:null,

tooltipHero:null,

tooltipVisible:false,

/* ======================================================
                    CACHE
====================================================== */

cacheTooltip(){

    this.tooltip =

        $("#kingdom-tooltip");

    if(!this.tooltip) return;

    this.tooltipTitle =

        $("#tooltip-title");

    this.tooltipDifficulty =

        $("#tooltip-difficulty");

    this.tooltipCampaign =

        $("#tooltip-campaign");

    this.tooltipStars =

        $("#tooltip-stars");

    this.tooltipHero =

        $("#tooltip-hero");

},

/* ======================================================
                    SHOW
====================================================== */

showTooltip(stage,event){

    if(!this.tooltip) return;

    this.tooltipVisible = true;

    this.tooltipTitle.textContent =

        stage.name;

    this.tooltipDifficulty.textContent =

        stage.difficulty;

    this.tooltipCampaign.textContent =

        stage.campaign;

    this.tooltipHero.textContent =

        stage.hero ||

        "Desconhecido";

    this.tooltipStars.textContent =

        "★".repeat(

            this.getStars(stage.id)

        );

    this.moveTooltip(event);

    this.tooltip.classList.add(

        "show"

    );

},

/* ==========================================================
                    YOUTUBE
========================================================== */

youtubePlayer:null,

youtubeModal:null,

youtubeFrame:null,

youtubeTitle:null,

currentVideo:null,

/* ======================================================
                    CACHE
====================================================== */

cacheYoutube(){

    this.youtubeModal =

        $("#youtube-modal");

    this.youtubeFrame =

        $("#youtube-frame");

    this.youtubeTitle =

        $("#youtube-title");

},

/* ======================================================
                    OPEN
====================================================== */

openVideo(stage){

    if(!stage) return;

    this.currentVideo = stage;

    this.youtubeTitle.textContent =

        stage.name;

    this.youtubeFrame.src =

        `https://www.youtube.com/embed/${stage.youtube}?autoplay=1&rel=0`;

    this.youtubeModal.classList.add(

        "show"

    );

},

/* ======================================================
                    OPEN
====================================================== */

openVideo(stage){

    if(!stage) return;

    this.currentVideo = stage;

    this.youtubeTitle.textContent =

        stage.name;

    this.youtubeFrame.src =

        `https://www.youtube.com/embed/${stage.youtube}?autoplay=1&rel=0`;

    this.youtubeModal.classList.add(

        "show"

    );

},

/* ======================================================
                    NEXT
====================================================== */

nextVideo(){

    if(!this.currentStage) return;

    const stages =

        this.stages.filter(

            stage=>

            stage.game===this.currentGame &&

            stage.campaign===this.currentCampaign

        );

    const index =

        stages.findIndex(

            stage=>

            stage.id===

            this.currentStage.id

        );

    if(

        index===-1 ||

        index===stages.length-1

    ) return;

    this.selectStage(

        stages[index+1]

    );

},

/* ======================================================
                    NEXT
====================================================== */

nextVideo(){

    if(!this.currentStage) return;

    const stages =

        this.stages.filter(

            stage=>

            stage.game===this.currentGame &&

            stage.campaign===this.currentCampaign

        );

    const index =

        stages.findIndex(

            stage=>

            stage.id===

            this.currentStage.id

        );

    if(

        index===-1 ||

        index===stages.length-1

    ) return;

    this.selectStage(

        stages[index+1]

    );

},

/* ==========================================================
                    CLOUD SAVE
========================================================== */

cloudEnabled:false,

cloudEndpoint:"",

lastSync:null,

syncing:false,

/* ======================================================
                    CONFIG
====================================================== */

configureCloud({

    endpoint,

    enabled=true

}){

    this.cloudEndpoint =

        endpoint;

    this.cloudEnabled =

        enabled;

},

/* ======================================================
                    UPLOAD
====================================================== */

async uploadProgress(){

    if(

        !this.cloudEnabled ||

        !this.cloudEndpoint ||

        this.syncing

    ) return;

    this.syncing = true;

    try{

        const response =

            await fetch(

                this.cloudEndpoint,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":

                        "application/json"

                    },

                    body:JSON.stringify({

                        progress:

                        this.progress

                    })

                }

            );

        if(!response.ok){

            throw new Error(

                "Erro ao enviar"

            );

        }

        this.lastSync =

            Date.now();

    }

    catch(error){

        console.error(error);

    }

    finally{

        this.syncing = false;

    }

},

/* ======================================================
                    UPLOAD
====================================================== */

async uploadProgress(){

    if(

        !this.cloudEnabled ||

        !this.cloudEndpoint ||

        this.syncing

    ) return;

    this.syncing = true;

    try{

        const response =

            await fetch(

                this.cloudEndpoint,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":

                        "application/json"

                    },

                    body:JSON.stringify({

                        progress:

                        this.progress

                    })

                }

            );

        if(!response.ok){

            throw new Error(

                "Erro ao enviar"

            );

        }

        this.lastSync =

            Date.now();

    }

    catch(error){

        console.error(error);

    }

    finally{

        this.syncing = false;

    }

},

/* ======================================================
                    DOWNLOAD
====================================================== */

async downloadProgress(){

    if(

        !this.cloudEnabled ||

        !this.cloudEndpoint

    ) return;

    try{

        const response =

            await fetch(

                this.cloudEndpoint

            );

        if(!response.ok){

            throw new Error(

                "Erro ao baixar"

            );

        }

        const data =

            await response.json();

        if(data.progress){

            this.progress =

                data.progress;

            this.saveProgress();

            this.updateFlags();

        }

    }

    catch(error){

        console.error(error);

    }

},

/* ======================================================
                    SYNC
====================================================== */

async syncProgress(){

    await this.uploadProgress();

    await this.downloadProgress();

},
/* ==========================================================
                    ANIMATIONS
========================================================== */

animationDuration:350,

animationBusy:false,

/* ======================================================
                    MAP INTRO
====================================================== */

animateMapIn(){

    if(!this.canvas) return;

    this.canvas.animate(

        [

            {

                opacity:0,

                transform:

                "scale(.95)"

            },

            {

                opacity:1,

                transform:

                "scale(1)"

            }

        ],

        {

            duration:700,

            easing:

            "ease-out",

            fill:"forwards"

        }

    );

},

/* ======================================================
                    FLAG
====================================================== */

animateFlag(flag){

    if(!flag) return;

    flag.animate(

        [

            {

                transform:

                "translate(-50%,-50%) scale(.5)",

                opacity:0

            },

            {

                transform:

                "translate(-50%,-50%) scale(1.15)",

                opacity:1

            },

            {

                transform:

                "translate(-50%,-50%) scale(1)"

            }

        ],

        {

            duration:450,

            easing:

            "ease-out"

        }

    );

},

/* ======================================================
                    PREVIEW
====================================================== */

animatePreview(){

    if(!this.preview) return;

    this.preview.animate(

        [

            {

                opacity:0,

                transform:

                "translateY(15px)"

            },

            {

                opacity:1,

                transform:

                "translateY(0)"

            }

        ],

        {

            duration:250,

            easing:

            "ease"

        }

    );

},

/* ======================================================
                    CHANGE MAP
====================================================== */

animateMapChange(){

    if(!this.map) return;

    this.map.animate(

        [

            {

                opacity:.2

            },

            {

                opacity:1

            }

        ],

        {

            duration:500

        }

    );

},

/* ======================================================
                    SELECT
====================================================== */

animateSelection(flag){

    if(!flag) return;

    flag.animate(

        [

            {

                transform:

                "translate(-50%,-50%) scale(1)"

            },

            {

                transform:

                "translate(-50%,-50%) scale(1.4)"

            },

            {

                transform:

                "translate(-50%,-50%) scale(1)"

            }

        ],

        {

            duration:400

        }

    );

},

/* ==========================================================
                    EFFECTS
========================================================== */

effectsEnabled:true,

glowEnabled:true,

fogEnabled:true,

ambientEnabled:true,

/* ======================================================
                    LOAD
====================================================== */

loadEffects(){

    if(

        !this.effectsEnabled

    ) return;

    this.loadGlow();

    this.loadFog();

    this.loadAmbient();

},

/* ==========================================================
                    EFFECTS
========================================================== */

effectsEnabled:true,

glowEnabled:true,

fogEnabled:true,

ambientEnabled:true,

/* ======================================================
                    LOAD
====================================================== */

loadEffects(){

    if(

        !this.effectsEnabled

    ) return;

    this.loadGlow();

    this.loadFog();

    this.loadAmbient();

},

/* ======================================================
                    FOG
====================================================== */

loadFog(){

    if(

        !this.fogEnabled

    ) return;

    const fog =

        document.createElement(

            "div"

        );

    fog.className =

        "kingdom-fog";

    this.wrapper.appendChild(

        fog

    );

},

/* ======================================================
                    FOG
====================================================== */

loadFog(){

    if(

        !this.fogEnabled

    ) return;

    const fog =

        document.createElement(

            "div"

        );

    fog.className =

        "kingdom-fog";

    this.wrapper.appendChild(

        fog

    );

},

/* ==========================================================
                    PERFORMANCE
========================================================== */

fps:60,

lastFrame:0,

frameTime:1000/60,

renderPending:false,

resizeObserver:null,

intersectionObserver:null,

visibleFlags:new Set(),

/* ======================================================
                    RENDER
====================================================== */

requestRender(){

    if(

        this.renderPending

    ) return;

    this.renderPending = true;

    requestAnimationFrame(

        time=>{

            this.render(

                time

            );

        }

    );

},

render(time){

    this.renderPending = false;

    if(

        time-

        this.lastFrame

        <

        this.frameTime

    ){

        return;

    }

    this.lastFrame =

        time;

    this.updateTransform();

    this.updateMinimap();

},

/* ======================================================
                    OBSERVERS
====================================================== */

createObservers(){

    this.resizeObserver =

        new ResizeObserver(

            ()=>{

                this.resize();

            }

        );

    this.resizeObserver.observe(

        this.wrapper

    );

},

/* ======================================================
                    FLAGS
====================================================== */

createFlagObserver(){

    this.intersectionObserver =

        new IntersectionObserver(

            entries=>{

                entries.forEach(

                    entry=>{

                        if(

                            entry.isIntersecting

                        ){

                            this.visibleFlags.add(

                                entry.target

                            );

                        }

                        else{

                            this.visibleFlags.delete(

                                entry.target

                            );

                        }

                    }

                );

            }

        );

},

/* ======================================================
                    OBSERVE
====================================================== */

observeFlag(flag){

    if(

        this.intersectionObserver

    ){

        this.intersectionObserver.observe(

            flag

        );

    }

},

/* ======================================================
                    OBSERVE
====================================================== */

observeFlag(flag){

    if(

        this.intersectionObserver

    ){

        this.intersectionObserver.observe(

            flag

        );

    }

},

/* ==========================================================
                    PUBLIC API
========================================================== */

api:{},

/* ======================================================
                    CREATE API
====================================================== */

createAPI(){

    this.api = {

        openStage:

            stage =>

                this.selectStage(stage),

        openVideo:

            stage =>

                this.openVideo(stage),

        changeGame:

            game =>

                this.changeGame(game),

        changeCampaign:

            campaign =>

                this.changeCampaign(campaign),

        zoomIn:

            ()=>

                this.zoomIn(),

        zoomOut:

            ()=>

                this.zoomOut(),

        resetZoom:

            ()=>

                this.resetZoom(),

        search:

            value=>

                this.searchStage(value),

        complete:

            (id,stars)=>

                this.completeStage(

                    id,

                    stars

                )

    };

},

/* ======================================================
                    GET API
====================================================== */

getAPI(){

    return this.api;

},

/* ======================================================
                    LISTENERS
====================================================== */

bindGlobalEvents(){

    window.addEventListener(

        "kingdom:reset",

        ()=>{

            this.resetZoom();

        }

    );

    window.addEventListener(

        "kingdom:home",

        ()=>{

            this.changeGame(

                "classic"

            );

        }

    );

},

/* ==========================================================
                    DESTROY
========================================================== */

destroy(){

    this.stopParticles();

    this.hidePreview();

    this.hideTooltip();

    this.closeVideo();

    if(

        this.resizeObserver

    ){

        this.resizeObserver.disconnect();

    }

    if(

        this.intersectionObserver

    ){

        this.intersectionObserver.disconnect();

    }

    this.initialized = false;

},

/* ======================================================
                    REFRESH
====================================================== */

refresh(){

    if(

        !this.isKingdom()

    ) return;

    this.loadGameMap();

    this.loadFlags();

    this.updateFlags();

    this.updateMinimap();

},

/* ======================================================
                    REFRESH
====================================================== */

refresh(){

    if(

        !this.isKingdom()

    ) return;

    this.loadGameMap();

    this.loadFlags();

    this.updateFlags();

    this.updateMinimap();

},

/* ======================================================
                    PAUSE
====================================================== */

pause(){

    this.stopParticles();

},

/* ======================================================
                    RESUME
====================================================== */

resume(){

    this.animateParticles();

},

/* ======================================================
                    VERSION
====================================================== */

version(){

    return{

        module:

        "Kingdom",

        version:

        "2.0.0",

        author:

        "Monster",

        status:

        "production"

    };

} 
} 
