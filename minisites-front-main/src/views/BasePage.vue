<script setup>
import Profile1 from "../assets/profile1.png";
import Profile2 from "../assets/profile2.png";
import Img2 from "../assets/img2.png";
import Img3 from "../assets/img3.png";
import Img4 from "../assets/img4.png";

import Carousel from "../components/Carousel.vue";
import Loader from "../components/Loader.vue";
import emailjs from "@emailjs/browser";
import { ref, defineProps, onMounted, watch } from "vue";

const props = defineProps({
  section1: {
    type: Array,
    required: true,
  },
  section2: {
    type: Array,
    required: true,
  },
  section3: {
    type: Array,
    required: true,
  },
});

const templateParams = ref({
  fullName: "",
  email: "",
  message: "",
  advisorName: "Ryan McNeill",
});

const msgCongrats = ref(false);
const loader = ref(false);

const sendEmail = async () => {
  try {
    loader.value = true;

    const response = await fetch('/sendEmail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        fullName: templateParams.value.fullName,
        email: templateParams.value.email,
        message: templateParams.value.message,
      }),
    });

    const result = await response.text();
    console.log(result); // Log response for debugging
    msgCongrats.value = true;
    loader.value = false;

    // Reset form fields
    templateParams.value = {
      fullName: "",
      email: "",
      message: "",
      advisorName: "Ryan McNeill",
    };

    // Show the success message for 3 seconds
    setTimeout(() => {
      msgCongrats.value = false;
    }, 3000);
  } catch (error) {
    console.error("ERROR", error); // Handle errors
  }
};


const showNav = ref(false);

const toggleNav = () => {
  const navbar = document.getElementById("navbar-default");
  navbar.classList.toggle("hidden");
  showNav.value = !showNav.value;
};

const showHeader = () => {
  window.onscroll = function () {
    var header = document.getElementById("header");

    if (window.innerWidth < 1024) return;

    if (window.scrollY > 50) {
      // header.classList.add("");
      header.classList.remove("top-header");
    } else {
      // header.classList.remove("fixed");
      header.classList.add("top-header");
    }
  };
};

const validateEmail = () => {
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (validEmail.test(templateParams.value.email)) {
    formRequired.value.email = false;
  } else {
    formRequired.value.email = true;
  }
};

const validateData = () => {
  console.log(templateParams.value);
  if (templateParams.value.fullName === "") {
    formRequired.value.fullName = true;
  }

  if (templateParams.value.email === "") {
    formRequired.value.email = true;
  } else {
    validateEmail();
  }

  if (templateParams.value.message === "") {
    formRequired.value.message = true;
  }

  if (
    formRequired.value.fullName ||
    formRequired.value.email ||
    formRequired.value.message
  ) {
    console.log(formRequired.value);
    return;
  } else {
    sendEmail();
  }
};

const formRequired = ref({
  fullName: false,
  email: false,
  message: false,
});

watch(
  () => templateParams.value.message,
  (val) => {
    if (val.length > 10) {
      formRequired.value.message = false;
    }
  }
);

watch(
  () => templateParams.value.fullName,
  (val) => {
    if (val.length > 3) {
      formRequired.value.fullName = false;
    }
  }
);

watch(
  () => templateParams.value.email,
  (val) => {
    if (val.length > 3) {
      validateEmail();
    }
  }
);

onMounted(() => {
  showHeader();
});
</script>

<template>
  <section
    class="lg:w-full z-10 fixed w-full top-header"
    id="header"
    style="top: 0px"
  >
    <nav
      class="mx-auto py-[16px] px-[24px] lg:py-0 border-gray-200 md:px-[40px] lg:px-[56px] xl:px-[90px] bg-[#223223] lg:bg-[#f9faf7]"
    >
      <button
        @click="toggleNav"
        type="button"
        class="block items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden ml-auto"
      >
        <svg
          v-if="!showNav"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="40"
          viewBox="0 0 35 40"
          fill="none"
        >
          <path
            d="M0 7.5C0 6.11719 1.11719 5 2.5 5H32.5C33.8828 5 35 6.11719 35 7.5C35 8.88281 33.8828 10 32.5 10H2.5C1.11719 10 0 8.88281 0 7.5ZM0 20C0 18.6172 1.11719 17.5 2.5 17.5H32.5C33.8828 17.5 35 18.6172 35 20C35 21.3828 33.8828 22.5 32.5 22.5H2.5C1.11719 22.5 0 21.3828 0 20ZM35 32.5C35 33.8828 33.8828 35 32.5 35H2.5C1.11719 35 0 33.8828 0 32.5C0 31.1172 1.11719 30 2.5 30H32.5C33.8828 30 35 31.1172 35 32.5Z"
            fill="#3EA431"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="47"
          viewBox="0 0 35 47"
          fill="none"
        >
          <path
            d="M31.2265 13.7266C32.3658 12.5872 32.3658 10.737 31.2265 9.59766C30.0872 8.45833 28.2369 8.45833 27.0976 9.59766L17.5 19.2044L7.89319 9.60677C6.75387 8.46745 4.9036 8.46745 3.76428 9.60677C2.62496 10.7461 2.62496 12.5964 3.76428 13.7357L13.3711 23.3333L3.7734 32.9401C2.63407 34.0794 2.63407 35.9297 3.7734 37.069C4.91272 38.2083 6.76298 38.2083 7.9023 37.069L17.5 27.4622L27.1067 37.0599C28.2461 38.1992 30.0963 38.1992 31.2356 37.0599C32.375 35.9206 32.375 34.0703 31.2356 32.931L21.6289 23.3333L31.2265 13.7266Z"
            fill="#3EA431"
          />
        </svg>
      </button>
      <div
        id="navbar-default"
        class="max-w-screen-xl hidden lg:flex flex-wrap items-center justify-end mx-auto p-1 md:p-4"
      >
        <div class="w-full" id="navbar-default">
          <ul
            class="xs:text-[18px] lg:text-[16px] 2xl:text-[18px] border-0 flex flex-col lg:flex-row md:p-0 my-[10px] rounded-lg justify-center md:justify-end"
          >
            <li
              class="flex items-center justify-center hover:underline py-[24px] lg:py-0 border-b-2 lg:border-b-0 border-[#3EA431]"
            >
              <a
                @click="toggleNav"
                href="#my-journey"
                class="block py-2 px-1 md:px-3 text-[#F9FAF7] lg:text-[#223223] rounded md:bg-transparent md:p-0"
                >My professional journey</a
              >
            </li>
            <li
              class="flex items-center justify-center hover:underline py-[24px] lg:py-0 border-b-2 lg:border-b-0 border-[#3EA431]"
            >
              <a
                @click="toggleNav"
                href="#more-about-me"
                class="block py-2 px-1 md:px-3 text-[#F9FAF7] lg:text-[#223223] rounded md:bg-transparent md:p-0"
                >More about me</a
              >
            </li>
            <li
              v-if="false"
              class="flex items-center justify-center hover:underline py-[24px] lg:py-0 border-b-2 lg:border-b-0 border-[#3EA431]"
            >
              <a
                @click="toggleNav"
                href="#testimonials"
                class="block py-2 px-1 md:px-3 text-[#F9FAF7] lg:text-[#223223] rounded md:bg-transparent"
                >Testimonials</a
              >
            </li>
            <li
              class="flex items-center justify-center hover:underline rounded-md py-[24px] lg:py-0"
            >
              <a
                @click="toggleNav"
                href="#questions"
                class="bg-[#3BBB2B] lg:bg-transparent w-full text-center block py-[16px] lg:py-2 px-1 md:px-3 text-[#F9FAF7] lg:text-[#3BBB2B] rounded lg:underline"
                >Have questions?</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>

  <section class="bg-g-w">
    <div class="2xl:container mx-auto flex flex-col lg:flex-row bg-[#f9faf7]">
      <div
        class="lg:flex items-center justify-center bg-[#223223] lg:py-10 h-[170px] md:h-[198px] lg:h-[465px] xl:h-[595px]"
      >
        <figure
          class="w-[118px] md:w-[200px] lg:w-[265px] xl:w-[372px] translate-y-[93px] md:translate-y-[80px] lg:translate-x-[56px] lg:translate-y-[0] xl:translate-x-[90px] xl:translate-y-0 mx-auto"
        >
          <img :src="Profile1" alt="" />
        </figure>
      </div>
      <div
        class="pt-[100px] pb-[40px] px-[24px] md:pt-[190px] md:pb-[80px] md:px-[40px] lg:py-[108px] lg:pr-[56px] lg:pl-[90px] xl:pr-[80px] xl:pl-[126px] text-center lg:text-left flex-col justify-center"
      >
        <p class="text-[18px] lg:text-[22px] xl:text-[30px] font-semibold">
          MEET
        </p>
        <p
          class="font-bold dashiel text-[50px] md:text-[72px] lg:text-[72px] xl:text-[105px] leading-[52px] xs:leading-normal xl:leading-[100px]"
        >
          {{ props.section1[0].text }}
        </p>
        <p class="text-[22px] xl:text-[30px] font-semibold">
          {{ props.section1[1].text }}
        </p>
        <p class="text-[18px] lg:text-[16px] xl:text-[21px] font-normal">
          {{ props.section1[2].text }}
        </p>
      </div>
    </div>
  </section>

  <section class="bg-[#EDEADA]" id="my-journey">
    <div
      class="flex-col 2xl:container lg:flex-row lg:items-center columns-2 mx-auto flex pt-[88px] xl:pt-[125px] lg:pb-[60px] xl:pb-[125px]"
    >
      <article class="w-[320px] xs:w-[402px] md:w-4/5 lg:w-[492px] xl:w-[45%]">
        <div
          class="w-full flex py-[33px] md:py-[40px] px-[10px] lg:px-0 lg:py-[40px] bg-[#95B096] rounded-md"
        >
          <div
            :style="{ 'background-image': `url(${Img2})` }"
            class="translate-x-[30px] xs:translate-x-[46px] md:translate-x-[100px] lg:translate-x-[56px] xl:translate-x-[80px] w-[310px] h-[310px] xs:w-[380px] xs:h-[380px] md:h-[400px] md:w-[95%] lg:w-[465px] lg:h-[465px] xl:w-[652px] xl:h-[652px] bg-contain md:bg-cover bg-no-repeat"
          ></div>
        </div>
      </article>
      <div
        class="lg:w-text-imgs xl:w-[55%] px-[30px] md:px-[40px] lg:pr-[56px] lg:pl-[88px] xl:pr-[80px] xl:pl-[160px] pb-[80px] md:pb-[60px] lg:pb-0 md:mt-[80px] lg:mt-0 xl:mt-0"
      >
        <p
          class="dashiel text-[#464434] font-bold leading-[60px] md:leading-[90px] lg:leading-[84px] text-[50px] lg:text-[60px] xl:text-[84px] mt-[40px] lg:mt-0 mb-[23px]"
        >
          {{ props.section2[0].text }}
        </p>
        <div
          class="mt-[20px] text-[#6A6649] text-[18px] md:text-[21px] lg:text-[16px] xl:text-[21px]"
        >
          <p>{{ props.section2[1].text }}</p>
          <template v-if="props.section2[2].text.length > 0">
            <br />
            <p>{{ props.section2[2].text }}</p>
          </template>
          <template v-if="props.section2[3].text.length > 0">
            <br />
            <p>{{ props.section2[3].text }}</p>
          </template>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-[#EDEADA] relative">
    <div id="more-about-me" class="absolute -top-[92px] lg:-top-[112px]"></div>
    <div
      class="flex flex-col 2xl:container lg:flex-row lg:items-center columns-2 mx-auto pt-[0px] pb-[80px] lg:pb-[88px]"
    >
      <div
        class="order-2 lg:order-1 lg:w-text-imgs xl:w-[55%] px-[30px] md:px-[40px] lg:pl-[56px] lg:pr-[88px] xl:pl-[80px] xl:pr-[160px] md:py-[80px] lg:py-0"
      >
        <p
          class="dashiel text-[#464434] font-bold leading-[60px] md:leading-[90px] lg:leading-[65px] text-[50px] lg:text-[60px] xl:text-[84px] mt-[40px] lg:mt-0 mb-[23px]"
        >
          {{ props.section3[0].text }}
        </p>
        <div class="text-[18px] lg:text-[16px] xl:text-[21px] text-[#6A6649]">
          <p>{{ props.section3[1].text }}</p>
          <template v-if="props.section3[2].text.length > 0">
            <br />
            <p>{{ props.section3[2].text }}</p>
          </template>
          <template v-if="props.section3[3].text.length > 0">
            <br />
            <p>{{ props.section3[3].text }}</p>
          </template>
        </div>
      </div>
      <article
        class="w-[320px] xs:w-[402px] md:w-4/5 lg:w-[492px] xl:w-[45%] order-1 lg:order-2 ml-auto"
      >
        <div
          class="w-full flex justify-center py-[33px] md:py-[57px] px-[10px] lg:px-0 lg:py-[40px] pl-[10px] lg:mb-0 xl:mb-0 bg-[#D3CB8B] rounded-md"
        >
          <div
            :style="{ 'background-image': `url(${Img3})` }"
            class="-translate-x-[46px] md:-translate-x-[100px] lg:-translate-x-[56px] xl:-translate-x-[80px] w-[310px] h-[310px] xs:w-[380px] xs:h-[380px] md:h-[400px] md:w-[95%] lg:w-[465px] xl:w-[652px] xl:h-[652px] bg-contain md:bg-cover bg-no-repeat rounded-md"
          ></div>
        </div>
      </article>
    </div>
  </section>

  <section class="bg-[#223223] pb-[100px]" id="testimonials" v-if="false">
    <div class="2xl:container mx-auto">
      <article
        class="px-[44px] py-[80px] xs:px-[60px] lg:py-[88px] xl:py-[125px] md:px-[60px] lg:px-[75px] xl:px-[90px]"
      >
        <p
          class="dashiel font-bold text-[50px] lg:text-[60px] xl:text-[84px] text-[#F9FAF7] text-center pb-6"
        >
          Hear from Mark's clients
        </p>
        <Carousel />
      </article>

      <div class="px-[24px] lg:px-[56px]">
        <p
          class="dashiel font-bold text-[50px] lg:text-[60px] xl:text-[84px] text-[#F9FAF7] text-center leading-[60px] md:leading-[45px] lg:leading-[80px]"
        >
          What clients are saying about Mark
        </p>
        <div
          class="text-[#F9FAF7] lg:flex md:justify-center items-center text-center font-light mb-4 mt-2 xl:my-0"
        >
          <p class="flex items-center justify-center">
            <svg
              class="md:mr-1 md:mt-1"
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="27"
              viewBox="0 0 29 27"
              fill="none"
            >
              <path
                d="M28.6367 10.2104H17.8469L14.5141 0L11.1709 10.2104L0.381104 10.2L9.11921 16.5168L5.77602 26.7168L14.5141 20.4104L23.2418 26.7168L19.909 16.5168L28.6367 10.2104Z"
                fill="#00B67A"
              />
            </svg>
            <span class="font-medium text-[22px] lg:text-[16px] xl:text-[24px]"
              >Trustpilot</span
            >
          </p>

          <p
            class="text-[18px] lg:text-[16px] xl:text-[24px] xl:my-[40px] lg:ml-[6px]"
          >
            Rated
            <span class="font-medium text-center">4.8</span> / 5 based on 359
            reviews. Showing our favorite reviews.
          </p>
        </div>
        <div class="grid-container gap-[24px] md:gap-[16px] xl:gap-[24px]">
          <div
            class="bg-white p-[40px] md:p-[22px] xl:p-[42px] rounded-sm"
            v-for="(item, index) in 6"
            :key="index"
          >
            <div class="flex gap-1">
              <svg
                v-for="(item, index) in 5"
                :key="index"
                class="md:w-[16px] md:h-[16px]"
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
              >
                <path
                  d="M0.409424 32.5476H32.8389V0.794861H0.409424V32.5476Z"
                  fill="#00B67A"
                />
                <path
                  d="M28.0548 14.3071L9.66122 27.3901L12.3452 19.3043L5.31934 14.3071H14.0037L16.6871 6.22076L19.3705 14.3071H28.0548ZM16.6878 22.3934L21.7111 21.3588L23.7125 27.3901L16.6878 22.3934Z"
                  fill="white"
                />
              </svg>
            </div>
            <p
              class="text-[25px] md:text-[16px] lg:text-[18px] xl:text-[24px] font-bold my-[16px] md:leading-[14px]"
            >
              My sincere thanks and appr…
            </p>
            <p
              class="text-[18px] md:text-[14px] lg:text-[16px] xl:text-[22px] font-light"
            >
              My sincere thanks and appreciation to Ryan McNeill for his
              patience and understan...
            </p>
            <p
              class="text-[16px] md:text-[12px] lg:text-[14px] md:mt-[16px] xl:text-[18px]"
            >
              <span class="font-bold">Dixie Williams,</span> September 11
            </p>
          </div>
        </div>

        <div class="flex justify-center mt-[40px]">
          <div
            class="flex items-center bg-[#f1efe41a] px-[35px] py-[18px] rounded-md"
          >
            <p class="text-[#3BBB2B] mr-2 font-bold xl:text-[24px]">
              Show more
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-w-y">
    <div class="flex flex-col md:flex-row 2xl:container mx-auto">
      <div
        class="order-2 md:order-1 bg-[#f9faf7] md:w-1/2 lg:w-[43%] p-[24px] py-[80px] md:px-[40px] lg:p-[80px] xl:py-[125px]"
      >
        <figure
          class="mb-[24px] md:mb-[31px] mx-auto lg:mx-0 flex justify-center w-[150px]"
        >
          <img class="w-full" :src="Profile2" alt="" />
        </figure>
        <div class="text-center lg:text-left text-[#464434]">
          <p
            class="text-[40px] md:text-[30px] lg:text-[22px] xl:text-[30px] font-semibold"
          >
          Ryan McNeill
          </p>
          <p class="text-[18px] lg:text-[16px] xl:text-[21px] font-semibold">
          Fiduciary
          </p>
        </div>
        <div class="flex items-center justify-center lg:justify-start">
          <svg
            class="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="21"
            viewBox="0 0 17 21"
            fill="none"
          >
            <g clip-path="url(#clip0_1116_5295)">
              <path
                d="M14.9375 7.875C14.9375 4.24922 12.0008 1.3125 8.375 1.3125C4.74922 1.3125 1.8125 4.24922 1.8125 7.875C1.8125 8.51484 2.03398 9.39258 2.49336 10.4754C2.94043 11.5377 3.56797 12.6902 4.28164 13.8428C5.68027 16.1109 7.3332 18.2807 8.3791 19.585C9.4209 18.2807 11.0779 16.1109 12.4766 13.8428C13.1861 12.6902 13.8178 11.5336 14.2648 10.4754C14.716 9.39258 14.9375 8.51484 14.9375 7.875ZM16.25 7.875C16.25 11.4598 11.4512 17.8418 9.34707 20.475C8.84258 21.1025 7.90742 21.1025 7.40293 20.475C5.29883 17.8418 0.5 11.4598 0.5 7.875C0.5 3.52734 4.02734 0 8.375 0C12.7227 0 16.25 3.52734 16.25 7.875ZM6.40625 7.875C6.40625 8.39715 6.61367 8.8979 6.98288 9.26712C7.3521 9.63633 7.85286 9.84375 8.375 9.84375C8.89715 9.84375 9.3979 9.63633 9.76712 9.26712C10.1363 8.8979 10.3438 8.39715 10.3438 7.875C10.3438 7.35286 10.1363 6.8521 9.76712 6.48288C9.3979 6.11367 8.89715 5.90625 8.375 5.90625C7.85286 5.90625 7.3521 6.11367 6.98288 6.48288C6.61367 6.8521 6.40625 7.35286 6.40625 7.875ZM8.375 11.1562C7.50476 11.1562 6.67016 10.8105 6.05481 10.1952C5.43945 9.57984 5.09375 8.74524 5.09375 7.875C5.09375 7.00476 5.43945 6.17016 6.05481 5.55481C6.67016 4.93945 7.50476 4.59375 8.375 4.59375C9.24524 4.59375 10.0798 4.93945 10.6952 5.55481C11.3105 6.17016 11.6562 7.00476 11.6562 7.875C11.6562 8.74524 11.3105 9.57984 10.6952 10.1952C10.0798 10.8105 9.24524 11.1562 8.375 11.1562Z"
                fill="#6A6649"
              />
            </g>
            <defs>
              <clipPath id="clip0_1116_5295">
                <rect
                  width="15.75"
                  height="21"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <p
            class="text-[21px] md:text-[18px] lg:text-[16px] xl:text-[21px] my-[24px] md:my-[31px] text-[#6A6649]"
          >
          Port Huron, Michigan 
          </p>
        </div>

        <div class="flex items-center justify-center lg:justify-start">
          <svg
            class="mr-2 mb-5 lg:mb-[30px]"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
          >
            <g clip-path="url(#clip0_1116_5293)">
              <path
                d="M15.9137 11.2878C15.241 11.0007 14.4617 11.1893 13.9982 11.7553L12.6365 13.4206C10.7498 12.3255 9.1748 10.7505 8.07969 8.86375L9.74082 7.50613C10.3068 7.04265 10.4996 6.26336 10.2084 5.5907L8.23965 0.996951C7.93203 0.275076 7.15684 -0.126877 6.38984 0.0371851L1.79609 1.02156C1.04141 1.18152 0.5 1.85008 0.5 2.62527C0.5 12.3337 8.02637 20.2825 17.5625 20.9552C17.7471 20.9675 17.9357 20.9798 18.1244 20.988C18.1244 20.988 18.1244 20.988 18.1285 20.988C18.3787 20.9962 18.6248 21.0044 18.8791 21.0044C19.6543 21.0044 20.3229 20.463 20.4828 19.7083L21.4672 15.1145C21.6313 14.3475 21.2293 13.5723 20.5074 13.2647L15.9137 11.296V11.2878ZM18.8627 19.6878C9.44551 19.6796 1.8125 12.0466 1.8125 2.62527C1.8125 2.46941 1.91914 2.33816 2.0709 2.30535L6.66465 1.32097C6.81641 1.28816 6.97227 1.37019 7.03379 1.51375L9.00254 6.1075C9.05996 6.24285 9.02305 6.39871 8.9082 6.48894L7.24297 7.85066C6.74668 8.25672 6.61543 8.96629 6.93945 9.5241C8.14941 11.6118 9.88848 13.3509 11.9721 14.5567C12.5299 14.8807 13.2395 14.7495 13.6455 14.2532L15.0072 12.588C15.1016 12.4731 15.2574 12.4362 15.3887 12.4936L19.9824 14.4624C20.126 14.5239 20.208 14.6798 20.1752 14.8315L19.1908 19.4253C19.158 19.577 19.0227 19.6837 18.8709 19.6837C18.8668 19.6837 18.8627 19.6837 18.8586 19.6837L18.8627 19.6878Z"
                fill="#6A6649"
              />
            </g>
            <defs>
              <clipPath id="clip0_1116_5293">
                <rect
                  width="21"
                  height="21"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <p
            class="text-[21px] lg:text-[16px] mb-[24px] md:mb-[31px] xl:text-[21px] text-[#6A6649]"
          >
          (484) 218 5377
          </p>
        </div>
        <p
          class="text-[18px] lg:text-[14px] xl:text-[15px] text-center lg:text-left text-[#6A6649]"
        >
          Your information is 100% confidential and your email will never be
          spammed! Just a friendly response to answer your questions and help
          point you in the right direction.
        </p>
      </div>

      <div
        class="order-1 md:order-2 bg-[#95B096] flex justify-center flex-col md:w-1/2 lg:w-[57%] px-[24px] py-[80px] md:px-[40px] lg:px-[60px] xl:py-[125px] relative"
      >
        <div id="questions" class="absolute -top-[40px]"></div>
        <template v-if="!msgCongrats && !loader">
          <div class="flex justify-between mb-[40px]">
            <p
              class="dashiel text-[50px] lg:text-[60px] xl:text-[84px] font-bold leading-[40px] lg:leading-[50px] xl:leading-[80px] text-[#223223]"
            >
              Send me a <br />
              question
            </p>
            <svg
              class="ml-3 w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px]"
              xmlns="http://www.w3.org/2000/svg"
              width="67"
              height="67"
              viewBox="0 0 67 67"
              fill="none"
            >
              <g clip-path="url(#clip0_1017_1151)">
                <path
                  d="M4.03115 18.6176C3.09638 18.8847 2.24755 19.3912 1.56865 20.0871C0.889754 20.783 0.404317 21.644 0.160376 22.5851C-0.0835649 23.5262 -0.0775547 24.5146 0.177812 25.4527C0.433179 26.3907 0.929051 27.2458 1.61636 27.9334L10.5549 36.8615C10.9305 37.2366 11.1415 37.7457 11.1415 38.2765V53.8333C11.1415 54.9379 12.037 55.8333 13.1415 55.8333H28.7194C29.2494 55.8333 29.7576 56.0436 30.1326 56.4181L39.1364 65.4087C39.6511 65.9278 40.2633 66.3401 40.9379 66.6218C41.6124 66.9035 42.336 67.0491 43.067 67.0502C43.5475 67.0493 44.0259 66.9874 44.4908 66.866C45.4315 66.629 46.2931 66.1485 46.9891 65.4726C47.685 64.7968 48.1906 63.9496 48.455 63.0163L65.9392 3.57923C66.3862 2.05993 64.9739 0.648579 63.4549 1.09646L4.03115 18.6176ZM7.96326 26.3665C6.8904 25.2934 7.35659 23.4632 8.8121 23.0341L45.5739 12.1964C47.5628 11.6101 49.0199 14.0651 47.5525 15.5301L20.1435 42.895C18.8831 44.1533 16.7305 43.2607 16.7305 41.4796V35.9642C16.7305 35.4338 16.5198 34.9252 16.1448 34.5501L7.96326 26.3665ZM44.0519 58.2329C43.6242 59.6885 41.795 60.1565 40.7207 59.0852L32.4467 50.8338C32.0718 50.4599 31.564 50.25 31.0345 50.25H25.5259C23.7437 50.25 22.8516 48.0948 24.1123 46.8352L51.5381 19.4325C53.0034 17.9685 55.4545 19.4238 54.8706 21.4111L44.0519 58.2329Z"
                  fill="#223223"
                />
              </g>
              <defs>
                <clipPath id="clip0_1017_1151">
                  <rect width="67" height="67" rx="1" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <div class="mb-[40px] relative">
              <label
                class="block text-[#223223] text-[18px] lg:text-[21px] mb-[8px]"
                for="fullName"
              >
                Name
              </label>
              <input
                v-model="templateParams.fullName"
                class="shadow appearance-none rounded-md w-full p-[16px] text-[#6A6649] placeholder"
                :class="
                  formRequired.fullName
                    ? 'border-2 border-[#DD654B] pb-[28px]'
                    : 'lg:mb-0'
                "
                id="fullName"
                type="text"
                placeholder="Your full name here..."
              />
              <div
                v-if="formRequired.fullName"
                class="bg-[#DD654B] absolute w-full rounded-b-md px-[16px] py-[2px] text-[#F9FAF7]"
                style="bottom: 0"
              >
                Please write your full name
              </div>
            </div>
            <div class="mb-[40px] relative">
              <label
                class="block text-[#223223] text-[18px] lg:text-[21px] mb-2"
                for="email"
              >
                Email
              </label>
              <input
                v-model="templateParams.email"
                class="shadow appearance-none border rounded-md w-full p-[16px] text-[#6A6649] placeholder"
                :class="
                  formRequired.email
                    ? 'border-2 border-[#DD654B] pb-[28px]'
                    : ''
                "
                id="email"
                type="email"
                placeholder="Your email here..."
              />
              <div
                v-if="formRequired.email"
                class="bg-[#DD654B] absolute w-full rounded-b-md px-[16px] py-[2px] text-[#F9FAF7]"
                style="bottom: 0"
              >
                Please write a valid email
              </div>
            </div>

            <div class="mb-[40px] relative">
              <label
                class="block text-[#223223] text-[18px] lg:text-[21px] mb-2"
                for="message"
              >
                Message
              </label>
              <textarea
                v-model="templateParams.message"
                placeholder="Write your question here, please be as specific as you can..."
                :class="
                  formRequired.message
                    ? 'border-2 border-[#DD654B] pb-[28px]'
                    : ''
                "
                class="rounded-md w-full p-[16px] placeholder"
                name=""
                id="message"
                cols="30"
                rows="4"
              ></textarea>
              <div
                v-if="formRequired.message"
                class="bg-[#DD654B] absolute w-full rounded-b-md px-[16px] py-[2px] text-[#F9FAF7]"
                style="bottom: 0"
              >
                Please write your question
              </div>
            </div>
          </div>

          <button
            type="submit"
            @click="validateData"
            class="flex justify-center items-center rounded-md bg-[#3EA431] cursor-pointer"
            style="height: 47px"
          >
            <p class="text-[#F5F6F1] text-[21px]">Next</p>
          </button>
        </template>
        <div v-else class="w-full">
          <Loader v-if="loader" class="mx-auto" />
          <div v-else>
            <p
              class="dashiel text-[#223223] text-[105px] font-bold leading-[95px]"
            >
              Thank you!
            </p>
            <p class="text-[#223223] text-[21px] mt-[32px]">
              We've received your message and will get back to you as soon as
              possible.
            </p>
            <p class="text-[#223223] text-[21px] mt-[32px]">
              Have a great day!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer
    class="py-[80px] px-[24px] md:px-[40px] md:py-[80px] lg:px-[56px] lg:pb-[118px] lg:pt-[60px] xl:py-[125px] bg-[#223223] text-[#EAF3EB]"
  >
    <div class="2xl:container mx-auto">
      <ul class="list-none pb-[24px] leading-[35px] lg:leading-[42px]">
        <li class="font-bold text-[22px]">Quick links</li>
        <li class="text-[17px]">
          <a class="hover:underline" href="#my-journey"
            >My Professional Journey</a
          >
        </li>
        <li class="text-[17px]">
          <a class="hover:underline" href="#more-about-me">More About Me</a>
        </li>
        <li class="text-[17px]" v-if="false">
          <a class="hover:underline" href="#testimonials">Testimonials</a>
        </li>
        <li class="text-[17px]">
          <a class="hover:underline" href="#questions">Have questions?</a>
        </li>
      </ul>
      <p class="text-[14px] lg:text-[12px]">
        Ryan McNeill is an independent financial services firm that creates
        retirement strategies using a variety of investment and insurance
        products. Neither the firm nor its representatives may give tax or legal
        advice. Investing involves risk, including the potential loss of
        principal. No investment strategy can guarantee a profit or protect
        against loss in periods of declining values. Any references to
        protection benefits or lifetime income generally refer to fixed
        insurance products, never securities or investment products. Insurance
        and annuity product guarantees are backed by the financial strength and
        claims-paying ability of the issuing insurance company.
      </p>
    </div>
  </footer>
</template>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

@font-face {
  font-family: Dashiel;
  src: url(fonts/DashielXBold.otf);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #223223;
  /* background-color: #f4f4f4; */
}

.dashiel {
  font-family: Dashiel !important;
}
.bg-g-w {
  background: linear-gradient(
    90deg,
    rgba(34, 50, 35, 1) 0%,
    rgba(34, 50, 35, 1) 50%,
    rgba(249, 250, 247, 1) 50%,
    rgba(249, 250, 247, 1) 100%
  );
}

.bg-w-y {
  background: linear-gradient(
    90deg,
    rgba(249, 250, 247, 1) 0%,
    rgba(249, 250, 247, 1) 50%,
    #95b096 50%,
    #95b096 100%
  );
}

.top-header {
  width: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-item {
  height: 100px;
}

.placeholder::placeholder {
  color: #6a6649;
  opacity: 0.7;
  font-size: 18px;
}

.carousel__prev,
.carousel__next {
  color: #f9faf7 !important;
  top: 0;
  bottom: 0;
  height: auto;
  width: 50px !important;
  transform: none;
}
.carousel__prev {
  left: -50px;
}
.carousel__next {
  right: -50px;
}

@media (min-width: 480px) {
  .carousel__prev {
    left: -60px;
  }
  .carousel__next {
    right: -60px;
  }
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .top-header {
    position: absolute;
    top: 0;
  }
  .top-header nav {
    background-color: rgba(34, 50, 35, 0);
  }
}

@media (min-width: 1440px) {
  .carousel__prev {
    left: -65px;
  }
  .carousel__next {
    right: -65px;
  }
}

@media (min-width: 1536px) {
  .\32xl\:container {
    max-width: 1536px;
  }
}
</style>
