class Flowwwi {
    constructor(element) {
        this.element = element
        this.accX = 0
        this.accY = 0
        this.OffsetTopDoc = this.offsetTop(this.element)
        this.OffsetLeftDoc = this.offsetLeft(this.element)
        this.width = this.element.offsetWidth
        this.height = this.element.offsetHeight
        this.childrenLength = this.element.children.length
    }
    /**
        * Calcule la position de l'élement par rapport au haut de l'élement document
        * @param {HTMLElement} element 
        * @return {Number}
    */
    offsetTop(element) {
        if (element.offsetParent) {
            this.accY = this.offsetTop(element.offsetParent)
        }
        return element.offsetTop + this.accY
    }
    /**
     * Calcule la position de l'element par rapport à la gauche de l'élement document
     * @author la2spaille
     * @param {HTMLElement} element 
     * @return {Number}
     * @
     */
    offsetLeft() {
        if (this.element.offsetParent) {
            this.accX = this.element.offsetParent.offsetLeft
        }
        return this.element.offsetLeft + this.accX
    }
    /**
        * @author Grafikart
        * @returns {Parallax[]}
        */
    static bind() {
        return Array.from(document.querySelectorAll('*')).map(
            (element) => {
                return new Flowwwi(element)
            }
        )
    }
}
Flowwwi.bind()
class Scroll {
    constructor(element) {
        this.element = element
        this.delta = 0
        this.scrollY = 0
        this.direction = this.element.dataset.scroll
        this.touch = {
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            deltaX: 0,
            deltaY: 0
        }
        this.scroll = this.scroll.bind(this);
        this.scroll()
    }
    scroll() {
        // document.addEventListener('wheel', (e) => {
        //     window.requestAnimationFrame(() => {
        //         if (this.direction == 'vertical') {
        //             this.delta += e.deltaY
        //             this.scrollY = this.delta
        //             if (this.scrollY < 0) this.scrollY = 0
        //             this.element.style.transform = `translateY(${-this.scrollY}px)`
        //         } else {
        //             this.delta += e.deltaY + e.deltaX
        //             this.element.querySelector('main').style.transform = `translateX(${-this.delta}px)`
        //         }
        //     })

        // })
        // window.addEventListener('keydown', (e) => {
        //     if (e.which == 40) this.scrollY += 40
        //     if (e.which == 38) this.scrollY -= 40
        //     if (this.scrollY < 0) this.scrollY = 0
        //     this.element.style.transform = `translateY(${-this.scrollY}px)`
        // })
        document.addEventListener('touchstart', (e) => {
            this.touch.startY = e.touches[0].clientY
            document.addEventListener('touchmove', (ee) => {
                this.touch.moveY = ee.touches[0].clientY
                this.touch.deltaY = this.touch.startY - this.touch.moveY
                this.scrollY = this.touch.deltaY
                console.log(this.touch.deltaY )
                this.element.style.transform = `translateY(${-this.scrollY}px)`
            })
        })
        

    }
    static bind() {
        return Array.from(document.querySelectorAll('[data-scroll]')).map(
            (element) => {
                return new Scroll(element)
            }
        )
    }
}
Scroll.bind()

// class SnappingScroll extends Flowwwi {
//     constructor(element) {
//         super(element)
//         this.element = element
//         this.isScroll = false
//         this.deltaX = 0
//         this.deltaY = 0
//         this.touch = {
//             startX: 0,
//             startY: 0,
//             moveX: 0,
//             moveY: 0,
//             deltaX: 0,
//             deltaY: 0
//         }
//         this.count = 0
//         this.direction = this.element.dataset.snapping
//         this.snappingScroll = this.snappingScroll.bind(this);
//         this.snappingScroll()
//     }
//     snappingScroll() {
//         this.isScroll = false
//         window.addEventListener('wheel', (e) => {
//             setTimeout(() => {
//                 this.isScroll = true
//                 this.deltaX = e.deltaX
//                 this.deltaY = e.deltaY
//             }, 1000);
//         })
//         this.element.addEventListener('touchstart', (e) => {
//             this.touch.startX = e.touches[0].clientX
//         })
//         this.element.addEventListener('touchmove', (e) => {
//             this.touch.moveX = e.touches[0].clientX
//             this.touch.deltaX = this.touch.startX - this.touch.moveX
//         })
//         // this.element.addEventListener('touchend', () => {
//         //     if (this.deltaY < 0) {
//         //         this.count--
//         //     }
//         //     if (this.deltaY > 0) {
//         //         this.count++
//         //     }
//         //     this.element.style.transform = `translateX(${-this.count * this.width / this.childrenLength}px)`
//         //     // console.log(this.count,this.width,this.childrenLength)
//         //     clearInterval(TIME)
//         //     setTimeout(() => {
//         //         this.snappingScroll()
//         //     }, 1500);
//         // })
//         // setInterval(() => {
//         //     console.log(this.touch.deltaX)
//         // }, 100);


//         let TIME = setInterval(() => {
//             if (this.isScroll == true) {
//                 if (this.deltaY < 0) {
//                     this.count--
//                 }
//                 if (this.deltaY > 0) {
//                     this.count++
//                 }
//                 this.element.style.transform = `translateX(${-this.count * this.width / this.childrenLength}px)`
//                 // console.log(this.count,this.width,this.childrenLength)
//                 clearInterval(TIME)
//                 setTimeout(() => {
//                     this.snappingScroll()
//                 }, 1500);
//             }
//         }, 200);
//     }
//     static bind() {
//         return Array.from(document.querySelectorAll('[data-snapping]')).map(
//             (element) => {
//                 return new SnappingScroll(element)
//             }
//         )
//     }
// }
// SnappingScroll.bind()






// const imgPrimary = document.querySelector('#w-primary-img')
// const imgPrymarylightbox = document.querySelector('#img-primary-lightbox')
// const lightbox = document.querySelector('#l-lightbox')
// const lightboxClose = document.querySelector('#i-lightbox-close')
// const menuBtn = document.querySelector('#i-menu')
// const headerNav = document.querySelector('.w-header-nav')
// const headerNavClose = document.querySelector('#i-header-nav-close')
// const lightboxBg = document.querySelector('.l-lightbox-bg')
// const next_s = document.querySelectorAll('.i-next')
// const previous_s = document.querySelectorAll('.i-previous')
// const allThumbnail = Array.from(document.querySelectorAll('.w-thumbnail-primary'))
// const allThumbnailLightbox = Array.from(document.querySelectorAll('.w-thumbnail-lightbox'))
// const addtoCartMinus = document.querySelector("#minus")
// const addtoCartPlus = document.querySelector("#plus")
// const miniCartEmpty = document.querySelector(".w-mini-cart--is-empty")
// const basket = document.querySelector(".w-basket")
// const miniCart = document.querySelector(".w-mini-cart")
// const addToCart = document.querySelector("#btn-add-to-cart")
// const imgPrimaryWrapper = document.getElementById('img-primary-wrapper')
// const imgPrimaryLightboxWrapper = document.getElementById('img-primary-lightbox-wrapper')
// var addPanierMulti = document.querySelector("#AddPanierMulti")

// // Var
// var pu = document.querySelector("#mini-cart-product-pu")
// var qte = document.querySelector("#mini-cart-product-qte")
// var pill = document.querySelector('#basket-pill')
// var pt = document.querySelector("#mini-cart-product-pt")
// var del = document.querySelector(".w-mini-cart-product-delete")
// var attribution
// var position
// var diff
// // Initialisation
// qte.textContent = 0
// attribution = 0
// position = 0
// diff = (position - attribution) * 100
// // Function 
// function ImageAttribution() {
//     allThumbnail.forEach(thumbnail => {
//         thumbnail.classList.remove('is-active')
//     })
//     allThumbnailLightbox.forEach(thumbnail => {
//         thumbnail.classList.remove('is-active')
//     })
//     allThumbnail[attribution].classList.add("is-active")
//     allThumbnailLightbox[attribution].classList.add("is-active")
//     diff = (position - attribution) * 100 + diff
//     imgPrimaryWrapper.style.transform = 'translateX(' + diff + '%)'
//     imgPrimaryLightboxWrapper.style.transform = 'translateX(' + diff + '%)'
//     position = attribution
// }
// // Mobile Navigation Apparition
// menuBtn.addEventListener('click', (e) => {
//     headerNav.classList.add('is-active')
//     lightboxBg.classList.add('is-active')
//     e.stopPropagation()
// })
// headerNavClose.addEventListener('click', (e) => {
//     headerNav.classList.remove('is-active')
//     lightboxBg.classList.remove('is-active')
//     e.stopPropagation()
// })

// // Lightbox Apparition
// imgPrimary.addEventListener('click', (e) => {
//     lightbox.classList.add('is-active')
//     e.stopPropagation()
// })
// lightboxClose.addEventListener('click', (e) => {
//     lightbox.classList.remove('is-active')
//     e.stopPropagation()
// })

// //  Image Attribution
// allThumbnail[attribution].classList.add("is-active")
// allThumbnailLightbox[attribution].classList.add("is-active")
// allThumbnail.forEach(thumbnail => {
//     thumbnail.addEventListener('click', (e) => {
//         attribution = allThumbnail.indexOf(thumbnail)
//         ImageAttribution()
//         e.stopPropagation()
//     })
// })
// allThumbnailLightbox.forEach(thumbnail => {
//     thumbnail.addEventListener('click', (e) => {
//         attribution = allThumbnailLightbox.indexOf(thumbnail)
//         ImageAttribution()
//         e.stopPropagation()
//     })
// })
// next_s.forEach(next => {
//     next.addEventListener('click', (e) => {
//         if (attribution <= 2) {
//             attribution += 1
//         }
//         ImageAttribution()
//         e.stopPropagation()
//     })
// })
// previous_s.forEach(previous => {
//     previous.addEventListener('click', (e) => {
//         if (attribution >= 1) {
//             attribution -= 1
//         }
//         ImageAttribution()
//         e.stopPropagation()
//     })
// })

// // Add To Cart Input
// addPanierMulti.textContent = 0
// addtoCartMinus.addEventListener('click', (e) => {
//     if (addPanierMulti.textContent >= 1) {
//         addPanierMulti.textContent = addPanierMulti.textContent - 1
//     }
//     e.stopPropagation()
// })
// addtoCartPlus.addEventListener('click', (e) => {
//     addPanierMulti.textContent = addPanierMulti.textContent - -1
//     e.stopPropagation()
// })

// // Mini Cart products
// addToCart.addEventListener('click', (e) => {
//     if (addPanierMulti.textContent != 0) {
//         miniCartEmpty.classList.add('is-no-empty')
//         miniCartEmpty.classList.remove("true")
//         pill.classList.add('is-active')
//     }
//     qte.textContent = qte.textContent - - addPanierMulti.textContent
//     pill.textContent = qte.textContent
//     pt.textContent = qte.textContent * pu.textContent
//     e.stopPropagation()
// })
// del.addEventListener('click', (e) => {
//     miniCartEmpty.classList.remove('is-no-empty')
//     pill.classList.remove('is-active')
//     qte.textContent = 0
//     pill.textContent = qte.textContent
//     pt.textContent = qte.textContent * pu.textContent
//     e.stopPropagation()
// })

// // Mini Cart Apparition
// let miniCartOpen = false
// basket.addEventListener('click', (e) => {
//     e.stopPropagation()
//     e.preventDefault()
//     miniCart.classList.add("is-active")
//     miniCartEmpty.classList.add("true")
//     miniCartOpen = true
//     // window.addEventListener('click', (wE) => {
//     //     let taarget = document.querySelector('.taarget')
//     //         if (wE.target != taarget) {
//     //             miniCart.classList.remove("is-active")
//     //             miniCartEmpty.classList.remove("true")
//     //         }

//     // })

// })
// // window.R = {}
// function init() {
//     // let transform


//     //////////////////////////////////////////////////////////

//     class InfiniteScroll {
//         constructor(element) {
//             this.element = element
//             this.height = window.innerHeight
//             this.infiniteScroll = this.infiniteScroll.bind(this);
//             this.infiniteScroll()
//         }
//         infiniteScroll() {
//             scrollTo(0, 0)
//             this.element.style.height = `${3 * window.innerHeight}px`
//             this.height = 3 * window.innerHeight
//             window.addEventListener('scroll', () => {
//                 const { scrollTop, scrollHeight, clientHeight } = document.documentElement
//                 window.requestAnimationFrame(() => {
//                     if (clientHeight + scrollTop >= scrollHeight - 200) {
//                         this.height += 400
//                         this.element.style.height = `${this.height}px`
//                     }
//                 })
//             })
//         }
//         static bind() {
//             return Array.from(document.querySelectorAll('.l-infinite-scroll')).map(
//                 (element) => {
//                     return new InfiniteScroll(element)
//                 }
//             )
//         }
//     }
//     InfiniteScroll.bind()

//     //////////////////////////////////////////////////////////

//     class SnappingScroll {
//         constructor(element) {
//             this.element = element
//             this.isScroll = false
//             this.count = 0
//             this.snappingScroll = this.snappingScroll.bind(this);
//             this.snappingScroll()
//         }
//         snappingScroll() {
//             this.isScroll = false
//             window.addEventListener('scroll', () => {
//                 setTimeout(() => {
//                     this.isScroll = true

//                 }, 1000);
//             })
//             let beforeScroll = window.scrollY
//             let TIME = setInterval(() => {
//                 if (this.isScroll == true) {
//                     let diffScroll = window.scrollY - beforeScroll
//                     if (diffScroll > 0) {
//                         this.count++
//                     }
//                     if (this.count > 0 && diffScroll < 0) {
//                         this.count--
//                     }
//                     this.element.style.transform = `translateX(${-this.count * window.innerWidth}px)`
//                     window.scrollTo(0, this.count * window.innerWidth)
//                     console.log(this.count)
//                     clearInterval(TIME)
//                     setTimeout(() => {
//                         this.snappingScroll()
//                     }, 1500);
//                 }
//             }, 200);
//         }
//         static bind() {
//             return Array.from(document.querySelectorAll('.l-snapping-scroll')).map(
//                 (element) => {
//                     return new SnappingScroll(element)
//                 }
//             )
//         }
//     }
//     SnappingScroll.bind()

//     //////////////////////////////////////////////////////////

//     class NavLinks {
//         constructor(element) {
//             this.element = element
//         }

//     }
//     let stadiumLink = new NavLinks(document.querySelector('.w-page-links.arena a'))
//     let ramsLink = new NavLinks(document.querySelector('.w-page-links.rams a'))
//     let aboutLink = new NavLinks(document.querySelector('.w-page-links.about a'))
//     let bengalsLink = new NavLinks(document.querySelector('.w-page-links.bengals a'))

//     //////////////////////////////////////////////////////////

//     // linkHover = document.querySelectorAll('.link-hover')
//     // reveal = document.querySelectorAll('.transformation')
//     // links = document.querySelectorAll('a')
//     // siteLinks = document.querySelectorAll('.w-page-links')

//     //////////////////////////////////////////////////////////
//     // wTransition = document.querySelector('.w-transition-overlay')
//     // transition = document.querySelector('.w-transition-overlay > div')
//     // function pageLinks(link, x, y, x1, y1) {
//     //     link.addEventListener('mouseover', (e) => {
//     //         e.stopPropagation()
//     //         wTransition.style.transform = `translateX(${x}) translateY(${y})`
//     //         setTimeout(() => {
//     //             transition.style.transform = "scale(1)"
//     //             link.style.color
//     //         }, 100);
//     //     })
//     //     link.addEventListener('mouseout', (e) => {
//     //         e.stopPropagation()
//     //         transition.style.transform = "scale(0.8)"

//     //     })
//     //     link.addEventListener('click', (e) => {
//     //         e.stopPropagation()
//     //         wTransition.style.transition = "1s"
//     //         siteLinks.forEach(liiink => {
//     //             liiink.style.transition = "1s 0s"
//     //             liiink.classList.add('transformation')
//     //         })
//     //         setTimeout(() => {
//     //             wTransition.style.transform = `translateX(${x1}) translateY(${y1})`
//     //             transition.style.opacity = "1"

//     //             if (link == aboutBtn) {
//     //                 transition.classList.add('index')
//     //             }
//     //             if (link == arenaBtn) {
//     //                 transition.classList.add('stadium')
//     //             }
//     //             if (link == ramsBtn) {
//     //                 transition.classList.add('rams')
//     //             }
//     //             if (link == bengalsBtn) {
//     //                 transition.classList.add('bengals')
//     //             }
//     //             setTimeout(() => {
//     //                 transition.style.transform = "scale(0.8)"
//     //                 wTransition.style.transition = "0s"
//     //                 transition.style.opacity = "0.3"
//     //                 setTimeout(() => {
//     //                     if (link == ramsBtn) {
//     //                         transition.classList.remove('rams')
//     //                     }
//     //                     if (link == bengalsBtn) {
//     //                         transition.classList.remove('bengals')
//     //                     }
//     //                     if (link == aboutBtn) {
//     //                         transition.classList.remove('index')
//     //                     }
//     //                     if (link == arenaBtn) {
//     //                         transition.classList.remove('stadium')
//     //                     }
//     //                 }, 200);

//     //             }, 700);
//     //         }, 100);
//     //     })
//     // }
//     // pageLinks(ramsBtn, 'calc(100vw + 50% - 100px)', '50vh', 'calc(-50% + 100px)', '50vh')
//     // pageLinks(bengalsBtn, 'calc(-50% + 100px)', '50vh', 'calc(100vw + 50% - 100px)', '50vh')
//     // pageLinks(arenaBtn, '50vw', 'calc(-50% + 100px)', '50vw', 'calc(100vh + 50% - 100px)')
//     // pageLinks(aboutBtn, '50vw', 'calc(100vh + 50% - 100px)', '50vw', 'calc(-50% + 100px)')

//     //////////////////////////////////////////////////////////

//     // lightbox = document.querySelector('.w-lightbox')
//     // arenaImg = document.querySelectorAll('.w-gallery img.arena')
//     // arenaLightboxImg = document.querySelectorAll('.w-lightbox img.arena')
//     // closeBtn = document.querySelector('.close')
//     // if (arenaImg.length != 0) {
//     //     arenaImg.forEach((img, index) => {
//     //         img.addEventListener('click', () => {
//     //             links.forEach(link => {
//     //                 link.style.opacity = "0"
//     //                 closeBtn.classList.remove('transformation')
//     //                 setTimeout(() => {
//     //                     link.style.visibility = "hidden"
//     //                 }, 300);
//     //             })
//     //             lightbox.style.opacity = "1"
//     //             lightbox.style.transition = "clip-path 2s cubic-bezier(0.19, 0.8, 0.02, 0.99), opacity 0s"
//     //             setTimeout(() => {
//     //                 lightbox.classList.remove('transformation--click')
//     //             }, 200);
//     //             setTimeout(() => {
//     //                 arenaLightboxImg[index].classList.remove('transformation--click')

//     //             }, 1000);
//     //         })
//     //     })
//     // }
//     // if (closeBtn != undefined) {
//     //     closeBtn.addEventListener('click', () => {
//     //         links.forEach(link => {
//     //             link.style.opacity = "1"
//     //             link.style.visibility = "visible"
//     //         })
//     //         arenaImg.forEach((img, index) => {
//     //             lightbox.style.transition = "clip-path 0s .35s cubic-bezier(0.19, 0.8, 0.02, 0.99), opacity .3s"
//     //             lightbox.style.opacity = "0"
//     //             setTimeout(() => {
//     //                 lightbox.classList.add('transformation--click')
//     //                 arenaLightboxImg[index].classList.add('transformation--click')
//     //                 closeBtn.classList.add('transformation')
//     //             }, 1000);
//     //         })
//     //     })
//     // }

//     //////////////////////////////////////////////////////////



//     //////////////////////////////////////////////////////////



//     // Parallax
//     class Parallax extends Flowwwi {
//         constructor(element) {
//             super(element)
//             this.para = this.element.attributes['data-parallax'].value;
//             this.paraY = parseFloat(this.para.split('/')[0], 10);
//             this.paraX = parseFloat(this.para.split('/')[1], 10) || 0;
//             this.paraR = parseFloat(this.para.split('/')[2], 10) || 0;
//             this.paraS = parseFloat(this.para.split('/')[3], 10) || 0;
//             this.transition = "0s";
//             this.element.style.setProperty('transition', this.transition);
//             this.ratio = 1;

//             this.parallaxTransform = this.parallaxTransform.bind(this);
//             this.onIntersection = this.onIntersection.bind(this);
//             this.onResize = this.onResize.bind(this);

//             this.elementY = super.offsetTopDoc + (this.element.offsetHeight / 2);
//             this.test = 0
//             this.houm = 0
//             const observer = new IntersectionObserver(this.onIntersection);
//             observer.observe(element);
//             this.parallaxTransform();
//         }
//         /**
//          * 
//          * @param {IntersectionObserverEntry[]} entries 
//          */
//         onIntersection(entries) {
//             for (const entry of entries) {
//                 if (this.paraX != 0 || entry.isIntersecting) {
//                     document.addEventListener("scroll", this.parallaxTransform);
//                     window.addEventListener("resize", this.onResize);
//                     this.elementY = super.offsetTopDoc + this.element.offsetHeight / 2;
//                 } else {
//                     document.removeEventListener("scroll", this.parallaxTransform);
//                     window.removeEventListener('resize', this.onResize);
//                 }
//             }
//         }
//         onResize() {
//             this.elementY = super.offsetTopDoc + this.element.offsetHeight / 2;
//             this.parallaxTransform();
//         }
//         parallaxTransform() {
//             window.addEventListener('scroll', () => {
//                 window.requestAnimationFrame(() => {
//                     if (this.element.getBoundingClientRect().right < 0) {
//                         this.test++
//                         this.houm = this.element.offsetWidth
//                     }
//                     if (this.element.getBoundingClientRect().x > window.innerWidth) {
//                         this.test--
//                         this.houm = this.element.offsetWidth
//                     }
//                     transform = `translateX(${this.paraX * window.scrollY + (window.innerWidth + 90) * this.test + this.houm * this.test}px)`

//                     // }
//                     // console.log(this.element.getBoundingClientRect().right)
//                     this.element.style.setProperty('transform', transform)
//                 })
//             })

//         }
//         /**
//          * @author Grafikart
//          * @returns {Parallax[]}
//          */
//         static bind() {
//             return Array.from(document.querySelectorAll('[data-parallax]')).map(
//                 (element) => {
//                     return new Parallax(element)
//                 }
//             )
//         }
//     }
//     Parallax.bind()
// }

// // Loader
// class Loader {
//     constructor(element) {
//         this.element = element
//         this.loading = this.loading.bind(this)
//         this.loading()
//     }
//     loading() {
//         window.addEventListener('load', () => {
//             this.element.classList.add('dom-loaded')
//         })
//     }
// }
// loader = new Loader(document.querySelector('#loader'))
// class Apparition {
//     constructor(element) {
//         this.element = element
//         this.delay = this.element.dataset.delay * 1000 || 0
//         this.transformation = this.transformation.bind(this)
//         this.transformation()
//     }
//     transformation() {
//         window.addEventListener('load', () => {
//             this.element.classList.remove('transformation')
//         }, this.delay);
//     }
//     static bind() {
//         return Array.from(document.querySelectorAll('.transformation')).map(
//             (element) => {
//                 return new Apparition(element)
//             }
//         )
//     }
// }
// Apparition.bind()

// // Cursor
// class Cursor {
//     constructor(element) {
//         this.element = element
//         this.mouseX = 0
//         this.mouseY = 0
//         this.transformMouse = 0
//         this.mouseTransform = this.mouseTransform.bind(this)
//         this.mouseTransform()
//     }
//     mouseTransform() {
//         document.addEventListener('mousemove', (e) => {
//             window.requestAnimationFrame(() => {
//                 this.mouseY = `${e.clientY}px`
//                 this.mouseX = `${e.clientX}px`
//                 this.transformMouse = `translate(calc(${this.mouseX} - 50%),calc(${this.mouseY} - 50%))`
//                 this.element.style.setProperty('transform', this.transformMouse)
//                 this.element.style.setProperty(' -webkit-transform', this.transformMouse)
//                 document.querySelectorAll('a').forEach(link => {
//                     link.addEventListener('mouseenter', (event) => {
//                         this.element.classList.add('site-cursor--link-hover')
//                         event.stopPropagation()
//                     })
//                     link.addEventListener('mouseleave', (event) => {
//                         this.element.classList.remove('site-cursor--link-hover')
//                         event.stopPropagation()
//                     })
//                 })
//                 if (document.querySelectorAll('img').length != 0) {
//                     document.querySelectorAll('img').forEach(img => {
//                         img.addEventListener('mouseenter', (event) => {
//                             this.element.classList.add('site-cursor--img-hover')
//                             event.stopPropagation()
//                         })
//                         img.addEventListener('mouseleave', (event) => {
//                             this.element.classList.remove('site-cursor--img-hover')
//                             event.stopPropagation()
//                         })
//                     })
//                 }
//                 if (closeBtn != undefined) {
//                     closeBtn.addEventListener('mouseenter', (event) => {
//                         this.element.classList.add('site-cursor--close-hover')
//                         event.stopPropagation()
//                     })
//                     closeBtn.addEventListener('mouseleave', (event) => {
//                         this.element.classList.remove('site-cursor--close-hover')
//                         event.stopPropagation()
//                     })
//                 }
//             })
//         })
//     }
// }
// let cursor = new Cursor(document.querySelector('.w-site-cursor'))

// // AJAX
// let cuts, select, pageText
// pageText = new Array(4)
// let pageTransition = function () {
//     let ajaxLinks = document.querySelectorAll('a')
//     ajaxLinks.forEach((link, index) => {
//         fetch(link.getAttribute('href')).then(function (response) {
//             response.text().then(function (text) {
//                 pageText[index] = text
//             })
//         })
//     })
//     init()
//     ajaxLinks.forEach((link, index) => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault()
//             e.stopPropagation()
//             cuts = pageText[index].split('<main>') //On récupère le DOM de la page appelé et on le découpe
//             cuts = cuts[1].split('</main>')
//             select = cuts[0]
//             setTimeout(() => {
//                 document.querySelector("main").innerHTML = select // contient le résultat de la page
//                 pageTransition()
//                 siteLinks.forEach(liiink => {
//                     liiink.style.transition = "1s 2s"
//                 })
//                 reveal.forEach(reveal => {
//                     setTimeout(() => {
//                         reveal.classList.remove('transformation')
//                     }, 1500);
//                 })
//             }, 300);
//             if (e.target.getAttribute('href') != window.location) {
//                 window.history.pushState({ path: e.target.getAttribute('href') }, '', e.target.getAttribute('href'))
//             }

//         })
//     })
// }
// pageTransition()
// // Transion entre les page avec les bonton
// // window.addEventListener('popstate', () => {
// //     // Début de la transition (un bouton est cliqué)
// //     transitionBefore()
// //     xhr.onreadystatechange = function () {
// //         if (xhr.readyState === 4) {
// //             if (xhr.status === 200) {
// //                 transitionAfter()
// //             } else {
// //                 console.log("Pas bon, pas bon du tout...")
// //                 // Le serveur a renvoyé un status d'erreur
// //             }
// //         }
// //     }
// //     xhr.open('GET', window.location.href, true)
// //     xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
// //     xhr.send()
// // })


