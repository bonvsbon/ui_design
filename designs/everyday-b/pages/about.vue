<script setup lang="ts">
const { stories } = useCatalog()
useSeoMeta({ title: 'About GAMBOL | Everyday comfort' })
</script>
<template>
  <div class="about-page">
    <div class="page-heading container">
      <span class="red-label">HELLO, WE’RE GAMBOL.</span>
      <h1>COMFORT GOES<br />WITH YOU.</h1>
      <p lang="th">สบายทุกก้าว ไปกับแกมโบล</p>
    </div>
    <div class="about-hero">
      <img
        src="/images/coast.webp"
        alt="Friends enjoying a day by the Thai sea"
        width="1536"
        height="1024"
      />
    </div>
    <div class="article-body">
      <h2>FOR THE DAYS THAT ARE YOURS.</h2>
      <p>
        GAMBOL makes everyday footwear for men, women and kids. From flip flops and slides to
        sneakers, the focus is comfort that fits into everyday life.
      </p>
      <p lang="th">รองเท้าที่ใส่ง่าย เข้ากับวันของคุณ พร้อมความนุ่มสบายจาก GBOLD Technology</p>
      <NuxtLink to="/technology" class="text-link"
        >DISCOVER GBOLD<AppIcon name="arrow" :size="18"
      /></NuxtLink>
    </div>
    <div class="section container">
      <SectionHeading title="A LITTLE MORE ABOUT US." />
      <div class="stories-grid">
        <StoryCard v-for="s in stories.slice(0, 3)" :key="s.id" :story="s" />
      </div>
    </div>
  </div>
</template>
