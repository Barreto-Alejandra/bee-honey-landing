import "../styles/tailwind.scss";
import "../styles/main.scss";

import { Swiper } from 'swiper';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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
  new GallerySlider('.gallery-swiper', '.swiper-pagination');
});