/* ==========================================================
                        APP
========================================================== */

"use strict";

const App = {

    initialized:false,

    loading:false,

    modules:[],

    version:"1.0.0",

    /* ======================================================
                        INIT
    ====================================================== */

    init(){

        if(this.initialized) return;

        log("Inicializando aplicação...");

        this.loading = true;

        this.registerModules();

        this.startModules();

        this.finishLoading();

        this.initialized = true;

        log("Aplicação iniciada.");

    },

    /* ======================================================
                        MODULES
    ====================================================== */

    registerModules(){

        this.modules = [

            Navigation,

            Animations

        ];

    },

    /* ======================================================
                        START
    ====================================================== */

    startModules(){

        this.modules.forEach(module=>{

            if(

                module &&

                typeof module.init === "function"

            ){

                module.init();

            }

        });

    },


    /* ======================================================
                        LOADER
    ====================================================== */

    loader:null,

    /* ======================================================
                        CACHE
    ====================================================== */

    cache(){

        this.loader = $("#loader");

    },

    /* ======================================================
                        FINISH LOADING
    ====================================================== */

    finishLoading(){

        this.cache();

        window.addEventListener(

            "load",

            ()=>{

                this.hideLoader();

            },

            { once:true }

        );

    },

    /* ======================================================
                        HIDE LOADER
    ====================================================== */

    hideLoader(){

        if(!this.loader){

            this.loading = false;

            return;

        }

        this.loader.classList.add(

            "loader-hide"

        );

        document.body.classList.add(

            "loaded"

        );

        setTimeout(()=>{

            this.loader.remove();

            this.loading = false;

            this.startAnimations();

        },500);

    },

    /* ======================================================
                        START ANIMATIONS
    ====================================================== */

    startAnimations(){

        if(

            window.Animations &&

            typeof Animations.refresh === "function"

        ){

            Animations.refresh();

        }

    },

/* ==========================================================
                    GLOBAL EVENTS
========================================================== */

    /* ======================================================
                        EVENTS
    ====================================================== */

    bindEvents(){

        window.addEventListener(

            "resize",

            ()=>{

                this.onResize();

            }

        );

        window.addEventListener(

            "scroll",

            ()=>{

                this.onScroll();

            },

            {

                passive:true

            }

        );

        document.addEventListener(

            "visibilitychange",

            ()=>{

                this.onVisibility();

            }

        );

        window.addEventListener(

            "online",

            ()=>{

                this.onOnline();

            }

        );

        window.addEventListener(

            "offline",

            ()=>{

                this.onOffline();

            }

        );

        document.addEventListener(

            "keydown",

            event=>{

                this.onKeyDown(event);

            }

        );

    },

    /* ======================================================
                        RESIZE
    ====================================================== */

    onResize(){

        this.modules.forEach(module=>{

            if(

                typeof module.resize === "function"

            ){

                module.resize();

            }

        });

    },

    /* ======================================================
                        SCROLL
    ====================================================== */

    onScroll(){

        this.modules.forEach(module=>{

            if(

                typeof module.scroll === "function"

            ){

                module.scroll();

            }

        });

    },

    /* ======================================================
                        TAB
    ====================================================== */

    onVisibility(){

        if(

            document.hidden

        ){

            this.modules.forEach(module=>{

                if(

                    typeof module.pause === "function"

                ){

                    module.pause();

                }

            });

        }

        else{

            this.modules.forEach(module=>{

                if(

                    typeof module.resume === "function"

                ){

                    module.resume();

                }

            });

        }

    },

    /* ======================================================
                        ONLINE
    ====================================================== */

    onOnline(){

        console.log(

            "Conexão restaurada."

        );

    },

    /* ======================================================
                        OFFLINE
    ====================================================== */

    onOffline(){

        console.warn(

            "Sem conexão."

        );

    },

    /* ======================================================
                        SHORTCUTS
    ====================================================== */

    onKeyDown(event){

        switch(event.key){

            case "F5":

                console.log(

                    "Atualizando..."

                );

                break;

        }

    },

/* ==========================================================
                    MODULE MANAGER
========================================================== */

    /* ======================================================
                        REFRESH
    ====================================================== */

    refresh(){

        this.modules.forEach(module=>{

            if(

                module &&

                typeof module.refresh === "function"

            ){

                module.refresh();

            }

        });

    },

    /* ======================================================
                        RESTART
    ====================================================== */

    restart(){

        this.destroy();

        this.initialized = false;

        this.init();

    },

    /* ======================================================
                        DESTROY
    ====================================================== */

    destroy(){

        this.modules.forEach(module=>{

            if(

                module &&

                typeof module.destroy === "function"

            ){

                module.destroy();

            }

        });

    },

    /* ======================================================
                        REGISTER
    ====================================================== */

    register(module){

        if(!module) return;

        if(

            this.modules.includes(module)

        ) return;

        this.modules.push(module);

    },

    /* ======================================================
                        REMOVE
    ====================================================== */

    unregister(module){

        this.modules =

            this.modules.filter(

                item=>item!==module

            );

    },

    /* ======================================================
                        FIND
    ====================================================== */

    get(name){

        return this.modules.find(module=>{

            return (

                module &&

                module.constructor &&

                module.constructor.name === name

            );

        });

    },

    /* ======================================================
                        STATUS
    ====================================================== */

    status(){

        return{

            initialized:this.initialized,

            loading:this.loading,

            modules:this.modules.length,

            version:this.version

        };

    },

/* ==========================================================
                    DEBUG
========================================================== */

    debug:false,

    /* ======================================================
                        INFO
    ====================================================== */

    info(){

        return{

            name:"Monster Kingdom",

            version:this.version,

            modules:this.modules.length,

            initialized:this.initialized,

            loading:this.loading,

            online:navigator.onLine,

            language:navigator.language,

            platform:navigator.platform,

            userAgent:navigator.userAgent

        };

    },

    /* ======================================================
                        DEBUG
    ====================================================== */

    enableDebug(){

        this.debug = true;

        console.log(

            "Debug ativado."

        );

    },

    disableDebug(){

        this.debug = false;

    },

    /* ======================================================
                        LOG
    ====================================================== */

    log(...message){

        if(!this.debug) return;

        console.log(

            "[APP]",

            ...message

        );

    },

    /* ======================================================
                        ERROR
    ====================================================== */

    handleError(error){

        console.error(

            "[APP ERROR]",

            error

        );

    },

    /* ======================================================
                        GLOBAL ERRORS
    ====================================================== */

    bindErrors(){

        window.addEventListener(

            "error",

            event=>{

                this.handleError(

                    event.error ||

                    event.message

                );

            }

        );

        window.addEventListener(

            "unhandledrejection",

            event=>{

                this.handleError(

                    event.reason

                );

            }

        );

    }

};

/* ==========================================================
                    START
========================================================== */

domReady(()=>{

    App.init();

});

/* ==========================================================
                    GLOBAL
========================================================== */

window.App = App;

/* ==========================================================
                    FREEZE
========================================================== */

Object.freeze(

    App

);

/* ==========================================================
                    END
========================================================== */