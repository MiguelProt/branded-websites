<script setup>
import BasePage from "./BasePage.vue";
import CusomInputs from "../components/CustomInputs.vue";
import { ref } from "vue";

const section1 = ref([
  { text: "Ryan McNeill", type: "input", label: "Full Name" },
  {
    text: "Fiduciary",
    type: "input",
    label: "Title",
  },
  {
    text: "I specialize in helping Americans secure their retirement through annuities, since 2008 I have been guiding clients across the country. My focus is on creating income strategies that protect savings, even during volatile times. Whether it’s planning for retirement, income planning, or estate planning, I’m here to help you meet your financial goals with confidence.",
    type: "textarea",
    label: "Text",
  },
]);

const section2 = ref([
  { text: "My professional journey", type: "input", label: "Title 1" },
  {
    text: "Since 2008 I’ve been working with individuals, families, and business owners to prepare for life events like retirement and estate planning. Early in my career, I served as a senior manager at a large insurance company, assisting retirees in securing their futures. My experience also extends to being a principal owner of a life and annuity agency, where I worked closely with clients to protect their financial well-being during turbulent market conditions.",
    type: "textarea",
    label: "Title",
  },
  {
    text: "As my career progressed, I took on the role of a life and annuity specialist within a property and casualty agency, expanding my knowledge and skills to better serve my clients. I hold several insurance licenses in life and health, as well as a series 65 securities license, allowing me to offer comprehensive advice. I’ve always believed that clients should be actively involved in designing their retirement plans, ensuring that their strategies align with their financial goals and risk tolerance.",
    type: "textarea",
    label: "Text",
  },
  {
    text: "Recently, I’ve been working alongside my son, Caleb McNeill, as he begins his journey as an advisor. Mentoring him has been a rewarding experience, and I am honored to teach him how to serve clients with the same dedication and integrity that I value. Don’t be surprised if you meet Caleb during one of our calls or appointments!",
    type: "textarea",
    label: "Text",
  },
]);

const section3 = ref([
  { text: "More about me", type: "input", label: "Title 1" },
  {
    text: "Originally from Port Huron, Michigan, I love working virtually with clients across the country, thanks to our advanced technology systems. Being able to meet “face-to-face” online and share screens makes it easy to collaborate and ensure we are all on the same page when designing your retirement plan.",
    type: "textarea",
    label: "Text 1",
  },
  {
    text: "In my approach, I strive to take the complexity out of annuities and financial planning, answering your questions in a simple, personalized manner. Whether we connect over the phone or online, you can rely on me to guide you through the process and offer advice that is truly in your best interest. If you need help with retirement planning or annuity recommendations, I’m here to serve you and ensure you can retire with peace of mind.",
    type: "textarea",
    label: "Text2",
  },
  {
    text: "",
    type: "textarea",
    label: "Text3",
  },
]);

const section4 = ref([
  { text: "What Clients are Saying About Mark", type: "input", label: "Title 1" },
  {
    text: "I reside in Oxford, Ct with my wife and three wonderful children that keep our life full and exciting with all the joys of parenthood. We are active in several community social and sporting groups. I have been a board member for SONCCA (Seymour-Oxford Nursery and Child Care Assoc.)and an active supporter of many local United way and YMCA charitable activities throughout the years. I have a love for the outdoors, and you can often me golfing fishing and spending time with our four-legged best friend Lexi.",
    type: "textarea",
    label: "Text 1",
  },
  {
    text: "​If you’re more conservative and can’t afford to lose money in retirement, I would love the opportunity to connect with you and share how I help protect and preserve your retirement.Retire With Certainty",
    type: "textarea",
    label: "Text2",
  },
]);

</script>

<template>
  <div class="container" v-if="false">
    <form class="bg-white px-8 pt-6 pb-8 mb-4">
      <input type="text" name="honeypot" style="display:none" />
      <p class="font-bold text-[20px]">Section 1</p>
      <CusomInputs v-for="input in section1" :key="index" :input="input" />

      <p class="font-bold text-[20px]">Section 2</p>
      <CusomInputs v-for="input in section2" :key="index" :input="input" />

      <p class="font-bold text-[20px]">Section 3</p>
      <CusomInputs v-for="input in section3" :key="index" :input="input" />

      <!-- <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
        
      </div> -->
    </form>
  </div>

  <section class="relative">
    <BasePage 
    :section1="section1"
    :section2="section2"
    :section3="section3"
  />
  </section>
</template>