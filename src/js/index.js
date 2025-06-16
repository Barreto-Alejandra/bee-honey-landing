import "../styles/tailwind.scss";
import "../styles/main.scss";

import { gsap } from 'gsap';

import { Swiper } from 'swiper';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

class ResponsiveNav {
  constructor() {
    this.btnToggle = document.querySelector('#nav-toggle');
    this.navMenu   = document.querySelector('#nav-menu');
    this.navLinks  = document.querySelectorAll('.nav-link');
    this.iconOpen  = this.btnToggle?.querySelector('#icon-open');
    this.iconClose = this.btnToggle?.querySelector('#icon-close');

    if (!this.btnToggle || !this.navMenu) return;

    if (window.innerWidth >= 768) {

      this.navMenu.style.maxHeight = 'none';
      this.navMenu.style.opacity   = '1';
    } else {
      gsap.set(this.navMenu, { maxHeight: 0, autoAlpha: 0, overflow: 'hidden' });
    }

    this._bindToggle();
    this._bindLinks();
  }

  _bindToggle() {
    this.btnToggle.addEventListener('click', () => {
      if (window.innerWidth >= 768) return;

      const currentMaxH = parseFloat(getComputedStyle(this.navMenu).maxHeight);
      const isClosed   = currentMaxH === 0;

      if (isClosed) this._openMenu();
      else          this._closeMenu();
    });
  }

  _openMenu() {
    const fullH = this.navMenu.scrollHeight + 'px';
    this.iconOpen.classList.add('hidden');
    this.iconClose.classList.remove('hidden');

    gsap.killTweensOf(this.navMenu);
    gsap.to(this.navMenu, {
      maxHeight: fullH,
      autoAlpha: 1,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        this.navMenu.style.maxHeight = 'none';
      }
    });
  }

  _closeMenu() {
    this.iconOpen.classList.remove('hidden');
    this.iconClose.classList.add('hidden');

    const fullH = this.navMenu.scrollHeight + 'px';
    this.navMenu.style.maxHeight = fullH;

    gsap.killTweensOf(this.navMenu);
    gsap.to(this.navMenu, {
      maxHeight: 0,
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power3.in'
    });
  }

  _bindLinks() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const y = target.getBoundingClientRect().top + window.pageYOffset - 50;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        if (window.innerWidth < 768) {
          this._closeMenu();
        }
      });
    });
  }
}
class LazyVideoLoader {
  constructor(containerSelector = '.lazy-video') {
    this.containers = Array.from(document.querySelectorAll(containerSelector));
    this.observerOptions = { threshold: 0.5 };
    this.containers.forEach(c => this._setup(c));
  }

  _setup(container) {
    const video = container.querySelector('video');
    if (!video) return;
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(([e], o) => {
        if (e.isIntersecting) {
          video.src = video.dataset.src;
          video.play().catch(() => {});
          o.disconnect();
        }
      }, this.observerOptions);
      obs.observe(video);
    } else {
      video.src = video.dataset.src;
      video.play().catch(() => {});
    }
  }
}


class GallerySlider {

  constructor(containerSelector, paginationSelector, opts = {}) {
    this.container = document.querySelector(containerSelector);
    this.paginationEl = document.querySelector(paginationSelector);
    this.options = Object.assign({
      modules: [Pagination, EffectFade, Autoplay], 
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: paginationSelector,
        clickable: true,
      },
      loop: true,
    }, opts);

    if (!this.container || !this.paginationEl) {
      return;
    }

    this._initSwiper();
    this._initIntersection();
  }

  _initSwiper() {
    this.swiper = new Swiper(this.container, this.options);
    if (this.swiper.autoplay) this.swiper.autoplay.stop();
  }

  _initIntersection() {
    const obs = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          if (this.swiper.autoplay) this.swiper.autoplay.start();
          observer.unobserve(this.container);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(this.container);
  }
}



document.addEventListener('DOMContentLoaded', () => {
  new ResponsiveNav();
  new LazyVideoLoader();
  new GallerySlider('.gallery-swiper', '.swiper-pagination');
});