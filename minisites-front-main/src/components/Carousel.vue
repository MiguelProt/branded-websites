<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { ref } from "vue";

import Image5 from "@/assets/image5.png";
import Image6 from "@/assets/image6.png";

const currentSlide = ref(0);

const slideTo = (newSlide) => {
  console.log(newSlide);
  currentSlide.value = newSlide;
};

const carouselImages = [Image5, Image6, Image5, Image6, Image5, Image6];

const testimonials = [
  {
    img: Image5,
    name: "Name Of Client",
    stars: 2,
    title: "The clients goal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus nulla et risus vehicula, ac pretium elit ultrices. Suspendisse in felis est",
  },
  {
    img: Image6,
    name: "Name Of Client 2",
    stars: 3,
    title: "The clients goal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus nulla et risus vehicula, ac pretium elit ultrices. Suspendisse in felis est",
  },
  {
    img: Image5,
    name: "Name Of Client 3",
    stars: 5,
    title: "The clients goal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus nulla et risus vehicula, ac pretium elit ultrices. Suspendisse in felis est",
  },
  {
    img: Image6,
    name: "Name Of Client 4",
    stars: 1,
    title: "The clients goal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus nulla et risus vehicula, ac pretium elit ultrices. Suspendisse in felis est",
  },
  {
    img: Image5,
    name: "Name Of Client 5",
    stars: 4,
    title: "The clients goal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus nulla et risus vehicula, ac pretium elit ultrices. Suspendisse in felis est",
  },
  {
    img: Image6,
    name: "Name Of Client 6",
    stars: 5,
    title: "The clients goal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus nulla et risus vehicula, ac pretium elit ultrices. Suspendisse in felis est",
  },
];
</script>

<template>
  <div class="flex flex-col lg:flex-row mb-[22px] lg:mb-[28px] xl:mb-[40px]">
    <div class="lg:w-2/5 text-[#F9FAF7] lg:flex lg:flex-col lg:justify-center lg:mr-[23px] xl:mr-[33px]">
      <div class="flex justify-center lg:justify-start gap-1">
        <svg v-for="(item, index) in testimonials[currentSlide].stars" :key="index"
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
        >
          <path
            d="M22.7355 8.2829L4.34189 21.3659L7.02587 13.2801L0 8.2829H8.68433L11.3678 0.196594L14.0512 8.2829H22.7355ZM11.3684 16.3692L16.3918 15.3346L18.3932 21.3659L11.3684 16.3692Z"
            fill="#D3CB8B"
          />
        </svg>
      </div>
      <div class="text-center lg:text-left">
        <p class="text-[25px] lg:text-[30px] xl:text-[40px]">{{ testimonials[currentSlide].name }}</p>
        <p class="text-[18px] lg:text-[22px] xl:text-[30px]">
          {{ testimonials[currentSlide].title }}
        </p>
        <p class="text-[18px] lg:text-[16px] xl:text-[21px]">
          "{{ testimonials[currentSlide].description }}"
        </p>
      </div>
    </div>
    <div class="lg:w-3/5 my-[24px] mb-[0]">
      <Carousel
        id="gallery"
        :items-to-show="1"
        :wrap-around="false"
        v-model="currentSlide"
      >
        <Slide v-for="slide in carouselImages" :key="slide">
          <figure class="w-full">
            <img class="w-full" :src="slide" alt="" />
          </figure>
        </Slide>
      </Carousel>
    </div>
  </div>

  <Carousel
    id="thumbnails"
    :items-to-show="2.2"
    :wrap-around="true"
    v-model="currentSlide"
    ref="carousel"
  >
    <Slide v-for="(slide, index) in carouselImages" :key="slide">
      <figure @click="slideTo(index)" class="mx-[8px] lg:mx-[12px]">
        <img :src="slide" alt="" />
      </figure>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
