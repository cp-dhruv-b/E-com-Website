<template>
  <swiper class="slider" :options="swiperOptions">
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img :src="image.src" :alt="'Slider Image ' + (index + 1)" class="slider-image" />
    </swiper-slide>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination]);

import image1 from "../assets/333.jpg";
import image2 from "../assets/222.jpg";
import image3 from "../assets/333.jpg";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      images: [{ src: image1 }, { src: image2 }, { src: image3 }],
      swiperOptions: {
        autoplay: {
          delay: 2000,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>

<style scoped>
.slider {
  width: 100%;
  height: 400px;
}

.slider-image {
  width: 100%;
  height: auto;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-button-prev {
  left: 50px;
}

.swiper-button-next {
  right: 50px;
}
</style>
