/* ==========================================================
                    NAVIGATION
========================================================== */

"use strict";

const Navigation = {

    menu: null,

    button: null,

    links: [],

    header: null,

    initialized: false,

    /* ======================================================
                        INIT
    ====================================================== */

    init(){

        if(this.initialized) return;

        this.cache();

        this.bindEvents();

        this.setActiveLink();

        this.initialized = true;

        log("Navigation inicializada.");

    },

    /* ======================================================
                        CACHE
    ====================================================== */

    cache(){

        this.header = DOM.header;

        this.menu = $(".navigation");

        this.button = $(".menu-toggle");

        this.links = $$(".navigation a");

    },

    /* ======================================================
                        EVENTS
    ====================================================== */

    bindEvents(){

        if(this.button){

            on(

                this.button,

                EVENTS.click,

                ()=>this.toggle()

            );

        }

        this.links.forEach(link=>{

            on(

                link,

                EVENTS.click,

                ()=>this.close()

            );

        });

    },

    /* ======================================================
                        OPEN
    ====================================================== */

    open(){

        if(!this.menu) return;

        addClass(

            this.menu,

            CLASSES.open

        );

        addClass(

            DOM.body,

            "menu-open"

        );

    },

    /* ======================================================
                        CLOSE
    ====================================================== */

    close(){

        if(!this.menu) return;

        removeClass(

            this.menu,

            CLASSES.open

        );

        removeClass(

            DOM.body,

            "menu-open"

        );

    },

    /* ======================================================
                        TOGGLE
    ====================================================== */

    toggle(){

        if(

            hasClass(

                this.menu,

                CLASSES.open

            )

        ){

            this.close();

        }

        else{

            this.open();

        }

    },

    /* ======================================================
                        HEADER
    ====================================================== */

    lastScroll: 0,

    scrollLimit: 20,

    updateHeader(){

        if(!this.header) return;

        const current = WINDOW.scrollY;

        /* ==========================================
                    BACKGROUND
        ========================================== */

        if(current > this.scrollLimit){

            addClass(

                this.header,

                "header-scrolled"

            );

        }

        else{

            removeClass(

                this.header,

                "header-scrolled"

            );

        }

        /* ==========================================
                    SHOW / HIDE
        ========================================== */

        if(current > 120){

            if(current > this.lastScroll){

                addClass(

                    this.header,

                    "header-hidden"

                );

            }

            else{

                removeClass(

                    this.header,

                    "header-hidden"

                );

            }

        }

        else{

            removeClass(

                this.header,

                "header-hidden"

            );

        }

        this.lastScroll = current;

    },

    /* ======================================================
                        RESIZE
    ====================================================== */

    resize(){

        if(

            WINDOW.width >

            BREAKPOINTS.tablet

        ){

            this.close();

        }

    },

    /* ======================================================
                        GLOBAL EVENTS
    ====================================================== */

    bindWindowEvents(){

        on(

            window,

            EVENTS.scroll,

            throttle(

                ()=>{

                    this.updateHeader();

                },

                16

            )

        );

        on(

            window,

            EVENTS.resize,

            debounce(

                ()=>{

                    this.resize();

                },

                200

            )

        );

    },

    /* ======================================================
                        CURRENT PAGE
    ====================================================== */

    getCurrentPage(){

        const path = window.location.pathname;

        const file = path.split("/").pop();

        if(file === "" || file === "index.html"){

            return "index";

        }

        return file.replace(".html","");

    },

    /* ======================================================
                        ACTIVE LINK
    ====================================================== */

    setActiveLink(){

        if(!this.links.length) return;

        const current = this.getCurrentPage();

        this.links.forEach(link=>{

            removeClass(

                link,

                CLASSES.active

            );

            const href =

                link.getAttribute("href") || "";

            const page = href

                .split("/")

                .pop()

                .replace(".html","");

            if(

                (current === "index" &&

                 (page === "" || page === "index"))

                ||

                page === current

            ){

                addClass(

                    link,

                    CLASSES.active

                );

            }

        });

    },

    /* ======================================================
                        NAVIGATION
    ====================================================== */

    navigate(url){

        if(!url) return;

        window.location.href = url;

    },

    /* ======================================================
                        OPEN PAGE
    ====================================================== */

    open(link){

        if(!link) return;

        const href =

            link.getAttribute("href");

        if(!href) return;

        this.navigate(href);

    },

    /* ======================================================
                        MENU LINKS
    ====================================================== */

    bindLinks(){

        this.links.forEach(link=>{

            on(

                link,

                EVENTS.click,

                ()=>{

                    this.close();

                }

            );

        });

    },

    /* ======================================================
                        PAGE INFO
    ====================================================== */

    page(){

        return{

            current:this.getCurrentPage(),

            title:document.title,

            url:window.location.href

        };

    },

    /* ======================================================
                        SCROLL TO
    ====================================================== */

    scrollTo(target){

        if(!target) return;

        const element =

            typeof target === "string"

                ? $(target)

                : target;

        if(!element) return;

        const offset =

            UI.navbarHeight;

        const top =

            element.getBoundingClientRect().top +

            window.pageYOffset -

            offset;

        window.scrollTo({

            top,

            behavior:"smooth"

        });

    },

    /* ======================================================
                        HASH
    ====================================================== */

    updateHash(id){

        if(!id) return;

        history.pushState(

            null,

            null,

            `#${id}`

        );

    },

    /* ======================================================
                        SCROLL LINK
    ====================================================== */

    handleAnchor(link){

        if(!link) return;

        const href =

            link.getAttribute("href");

        if(

            !href ||

            !href.startsWith("#")

        ) return;

        const section =

            $(href);

        if(!section) return;

        this.scrollTo(section);

        this.updateHash(

            section.id

        );

        this.close();

    },

    /* ======================================================
                        ANCHORS
    ====================================================== */

    bindAnchors(){

        $$('a[href^="#"]').forEach(link=>{

            on(

                link,

                EVENTS.click,

                event=>{

                    event.preventDefault();

                    this.handleAnchor(link);

                }

            );

        });

    },

    /* ======================================================
                        INITIAL HASH
    ====================================================== */

    openHash(){

        const hash =

            window.location.hash;

        if(!hash) return;

        const element =

            $(hash);

        if(!element) return;

        setTimeout(()=>{

            this.scrollTo(element);

        },150);

    },

    /* ======================================================
                        MOBILE
    ====================================================== */

    isOpen(){

        return hasClass(

            this.menu,

            CLASSES.open

        );

    },

    lockScroll(){

        addClass(

            DOM.body,

            "menu-open"

        );

        DOM.body.style.overflow = "hidden";

    },

    unlockScroll(){

        removeClass(

            DOM.body,

            "menu-open"

        );

        DOM.body.style.overflow = "";

    },

    /* ======================================================
                        OPEN
    ====================================================== */

    open(){

        if(!this.menu) return;

        addClass(

            this.menu,

            CLASSES.open

        );

        if(this.button){

            addClass(

                this.button,

                CLASSES.active

            );

            this.button.setAttribute(

                "aria-expanded",

                "true"

            );

        }

        this.lockScroll();

    },

    /* ======================================================
                        CLOSE
    ====================================================== */

    close(){

        if(!this.menu) return;

        removeClass(

            this.menu,

            CLASSES.open

        );

        if(this.button){

            removeClass(

                this.button,

                CLASSES.active

            );

            this.button.setAttribute(

                "aria-expanded",

                "false"

            );

        }

        this.unlockScroll();

    },

    /* ======================================================
                        CLICK OUTSIDE
    ====================================================== */

    clickOutside(event){

        if(

            !this.isOpen()

        ) return;

        if(

            this.menu.contains(event.target)

        ) return;

        if(

            this.button &&

            this.button.contains(event.target)

        ) return;

        this.close();

    },

    /* ======================================================
                        ESC
    ====================================================== */

    escape(event){

        if(

            event.key !== "Escape"

        ) return;

        this.close();

    },

    /* ======================================================
                        MOBILE EVENTS
    ====================================================== */

    bindMobile(){

        on(

            document,

            EVENTS.click,

            event=>{

                this.clickOutside(event);

            }

        );

        on(

            document,

            "keydown",

            event=>{

                this.escape(event);

            }

        );

    },

    /* ======================================================
                        MOBILE
    ====================================================== */

    isOpen(){

        return hasClass(

            this.menu,

            CLASSES.open

        );

    },

    lockScroll(){

        addClass(

            DOM.body,

            "menu-open"

        );

        DOM.body.style.overflow = "hidden";

    },

    unlockScroll(){

        removeClass(

            DOM.body,

            "menu-open"

        );

        DOM.body.style.overflow = "";

    },

    /* ======================================================
                        OPEN
    ====================================================== */

    open(){

        if(!this.menu) return;

        addClass(

            this.menu,

            CLASSES.open

        );

        if(this.button){

            addClass(

                this.button,

                CLASSES.active

            );

            this.button.setAttribute(

                "aria-expanded",

                "true"

            );

        }

        this.lockScroll();

    },

    /* ======================================================
                        CLOSE
    ====================================================== */

    close(){

        if(!this.menu) return;

        removeClass(

            this.menu,

            CLASSES.open

        );

        if(this.button){

            removeClass(

                this.button,

                CLASSES.active

            );

            this.button.setAttribute(

                "aria-expanded",

                "false"

            );

        }

        this.unlockScroll();

    },

    /* ======================================================
                        CLICK OUTSIDE
    ====================================================== */

    clickOutside(event){

        if(

            !this.isOpen()

        ) return;

        if(

            this.menu.contains(event.target)

        ) return;

        if(

            this.button &&

            this.button.contains(event.target)

        ) return;

        this.close();

    },

    /* ======================================================
                        ESC
    ====================================================== */

    escape(event){

        if(

            event.key !== "Escape"

        ) return;

        this.close();

    },

    /* ======================================================
                        MOBILE EVENTS
    ====================================================== */

    bindMobile(){

        on(

            document,

            EVENTS.click,

            event=>{

                this.clickOutside(event);

            }

        );

        on(

            document,

            "keydown",

            event=>{

                this.escape(event);

            }

        );

    },

    /* ======================================================
                        KEYBOARD
    ====================================================== */

    keyboard(event){

        switch(event.key){

            case "Escape":

                this.close();

                break;

            case "Home":

                this.scrollTop();

                break;

        }

    },

    /* ======================================================
                        PRELOAD
    ====================================================== */

    preloadLinks(){

        this.links.forEach(link=>{

            const href = link.getAttribute("href");

            if(!href) return;

            on(

                link,

                "mouseenter",

                ()=>{

                    const preload = document.createElement("link");

                    preload.rel = "prefetch";

                    preload.href = href;

                    document.head.appendChild(preload);

                }

            );

        });

    },

    /* ======================================================
                        ACCESSIBILITY
    ====================================================== */

    accessibility(){

        this.links.forEach(link=>{

            link.setAttribute(

                "tabindex",

                "0"

            );

        });

    },

    /* ======================================================
                        REFRESH
    ====================================================== */

    refresh(){

        this.cache();

        this.setActiveLink();

        this.update();

    },

    /* ======================================================
                        RESET
    ====================================================== */

    reset(){

        this.close();

        removeClass(

            this.header,

            "header-scrolled"

        );

        removeClass(

            this.header,

            "header-hidden"

        );

    },

    /* ======================================================
                        VERSION
    ====================================================== */

    version(){

        return{

            name:"Navigation",

            version:"1.0.0"

        };

    }

};

/* ==========================================================
                    GLOBAL EVENTS
========================================================== */

on(

    document,

    "keydown",

    event=>{

        Navigation.keyboard(event);

    }

);

/* ==========================================================
                    START
========================================================== */

domReady(()=>{

    Navigation.init();

});

/* ==========================================================
                    FREEZE
========================================================== */

Object.freeze(Navigation);

/* ==========================================================
                    EXPORT
========================================================== */

window.Navigation = Navigation;

/* ==========================================================
                    END OF FILE
========================================================== */