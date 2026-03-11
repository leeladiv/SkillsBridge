<script setup>
import { ref } from 'vue'
import { APP_NAME, APP_TAGLINE } from '../utils/constants'
import BaseButton from '../components/base/BaseButton.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const newsletterEmail = ref('')
const activeTestimonialIndex = ref(0)
const touchStartX = ref(0)

const MAX_TESTIMONIAL_VIDEOS = 7

const testimonialVideos = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'CS Student, State University',
    label: 'Student story',
    title: 'Landed an internship in two weeks',
    description:
      'See how Sarah used SkillsBridge to showcase her projects and get discovered by recruiters.',
  },
  {
    id: 2,
    name: 'James L.',
    role: 'Tech Recruiter',
    label: 'Recruiter perspective',
    title: 'Finding verified student talent',
    description:
      'James shares how SkillsBridge helps him quickly identify strong student candidates.',
  },
  {
    id: 3,
    name: 'Dr. A. Patel',
    role: 'Career Director',
    label: 'University partner',
    title: 'Supporting students at scale',
    description:
      'Dr. Patel explains how SkillsBridge fits into their university career support strategy.',
  },
].slice(0, MAX_TESTIMONIAL_VIDEOS)

function nextTestimonial() {
  activeTestimonialIndex.value =
    (activeTestimonialIndex.value + 1) % testimonialVideos.length
}

function prevTestimonial() {
  activeTestimonialIndex.value =
    (activeTestimonialIndex.value - 1 + testimonialVideos.length) %
    testimonialVideos.length
}

function onTouchStart(e) {
  if (e.changedTouches?.length) {
    touchStartX.value = e.changedTouches[0].clientX
  }
}

function onTouchEnd(e) {
  if (!e.changedTouches?.length) return
  const deltaX = e.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(deltaX) < 40) return
  if (deltaX < 0) {
    nextTestimonial()
  } else {
    prevTestimonial()
  }
}

function handleNewsletterSubmit() {
  // TODO: wire to backend or email service
  if (newsletterEmail.value) {
    newsletterEmail.value = ''
  }
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
    <AppNavbar />

    <main>
      <!-- Hero -->
      <section class="relative mt-0 overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-br from-primary-50/80 via-white to-academic-navy/5" aria-hidden="true" />
        <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div class="mx-auto max-w-3xl text-center">
            <p class="text-md font-semibold uppercase text-blue-500 tracking-wider text-primary-600 mt-0">
              Student Skills & Portfolio Platform
            </p>
            <h1 class="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl ">
              Turn your Skills & Degree into   opportunities
              <span class="bg-linear-to-r from-primary-600 text-blue-700 to-academic-navy bg-clip-text text-3xl">
               
              </span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-black">
              {{ APP_NAME }} connects talented students with recruiters. Build a professional portfolio,
              showcase your projects and skills, and get discovered by companies looking for your exact profile—all
              within your Schools community.
            </p>
            <p class="mt-3 text-black">
              One profile. One place. Your next opportunity starts here.
            </p>
            <div class="mt-10 flex flex-wrap items-center justify-center text-black gap-4">
              <BaseButton size="lg" @click="$router.push({ name: 'Register' })">
                Create your portfolio  It's free
              </BaseButton>
              <BaseButton variant="secondary" class=" text-black " size="lg" @click="$router.push({ name: 'Explore' })">
                Explore student profiles
              </BaseButton>
            </div>
            <p class="mt-6 text-md text-black">
              Join students from top Schools. No Fees required.
            </p>
          </div>
        </div>
        </section>

      <!-- Stats grid -->
      <section class="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <div class="bg-white shadow rounded-xl p-6">
          <p class="text-green-600 text-sm">+12% this month</p>
          <h2 class="text-3xl font-bold mt-2">3500+</h2>
          <p class="text-gray-500">Active Colleges</p>
          <div class="h-2 bg-gray-200 rounded mt-3">
            <div class="h-2 bg-blue-600 rounded w-3/4"></div>
          </div>
        </div>

        <div class="bg-white shadow rounded-xl p-6">
          <p class="text-green-600 text-sm">+8% this week</p>
          <h2 class="text-3xl font-bold mt-2">2M+</h2>
          <p class="text-gray-500">Students Enrolled</p>
          <div class="h-2 bg-gray-200 rounded mt-3">
            <div class="h-2 bg-blue-600 rounded w-4/5"></div>
          </div>
        </div>

        <div class="bg-white shadow rounded-xl p-6">
          <p class="text-green-600 text-sm">+15% this month</p>
          <h2 class="text-3xl font-bold mt-2">40K+</h2>
          <p class="text-gray-500">Faculty Trained</p>
          <div class="h-2 bg-gray-200 rounded mt-3">
            <div class="h-2 bg-blue-600 rounded w-2/3"></div>
          </div>
        </div>

        <div class="bg-white shadow rounded-xl p-6">
          <p class="text-green-600 text-sm">+22% this quarter</p>
          <h2 class="text-3xl font-bold mt-2">20K+</h2>
          <p class="text-gray-500">Successful Placements</p>
          <div class="h-2 bg-gray-200 rounded mt-3">
            <div class="h-2 bg-blue-600 rounded w-4/5"></div>
          </div>
        </div>
      </div>
      </section>

      <!-- Partner logos grid -->
      <section class="border-y border-slate-200/80 bg-white py-8 sm:py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Trusted by leading institutions
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Government agencies, universities, and corporate partners collaborate with {{ APP_NAME }} to connect talent with opportunity.
          </p>

        <div class="mt-10 overflow-hidden logo-marquee slow">
          <div aria-hidden="true" class=" opacity-70 mt-12 logo-marquee-track grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
             <div class="flex h-16 w-30 items-center justify-center rounded-lg bg-slate-100 font-semibol">
              <img src="/public/AmeuLogo.PNG" class="h-16 w-100" alt="AmeuLogo" >
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100  font-semibold">
              <img src="/public/BlueCrestLogo.PNG" class="h-16 w-100" alt="BlueCrestLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/SmpuLogo.PNG" class="h-16 w-100" alt="SmpuLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/StarzLogo.PNG" class="h-16 w-85" alt="StarzLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/UL_Logo.PNG" class="h-16 w-100" alt="ULlogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/UmuLogo.PNG" class="h-16 w-100" alt="UmuLogo">
             </div>

             <div class="flex h-16 w-30 items-center justify-center rounded-lg bg-slate-100 font-semibol">
              <img src="/public/AmeuLogo.PNG" class="h-16 w-100" alt="AmeuLogo" >
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100  font-semibold">
              <img src="/public/BlueCrestLogo.PNG" class="h-16 w-100" alt="BlueCrestLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/SmpuLogo.PNG" class="h-16 w-100" alt="SmpuLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/StarzLogo.PNG" class="h-16 w-85" alt="StarzLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/UL_Logo.PNG" class="h-16 w-100" alt="ULlogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/UmuLogo.PNG" class="h-16 w-100" alt="UmuLogo">
             </div>
             </div>
          </div>
        </div>
      </section>
      <!-- Feature highlights (alternating) -->
      <section class="bg-slate-50 py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                A portfolio built for hiring teams
              </h2>
              <p class="mt-4 text-lg text-slate-600">
                Transform your academic work into a recruiting-ready profile. Showcase projects, tech stacks,
                and impact in one place so hiring managers can quickly understand what you can do.
              </p>
              <ul class="mt-6 space-y-3 text-slate-700">
                <li class="flex items-center gap-2">
                  ✓ Outcome-focused project cards with tech, role, and results
                </li>
                <li class="flex items-center gap-2">
                  ✓ Skill tags that make you searchable by stack and domain
                </li>
                <li class="flex items-center gap-2">
                  ✓ Profiles anchored to your university for added trust
                </li>
              </ul>
            </div>
            <div class="aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="flex h-full items-center justify-center text-slate-500">Portfolio preview</div>
            </div>
          </div>
          <div class="mt-10 lg:mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div class="order-2 lg:order-1">
              <div class="aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                <div class="flex h-full items-center justify-center text-slate-500">Explore view</div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Control what recruiters see
              </h2>
              <p class="mt-4 text-lg text-slate-600">
                You decide when your profile is visible and what is shared. Turn discovery on when you’re exploring
                roles, pause it when you’re not, without deleting your work or losing your network.
              </p>
              <ul class="mt-6 space-y-3 text-slate-700">
                <li class="flex items-center gap-2">
                  ✓ One-click visibility toggle for Explore and search
                </li>
                <li class="flex items-center gap-2">
                  ✓ Institution-backed identity for credible profiles
                </li>
                <li class="flex items-center gap-2">
                  ✓ No subscriptions or placement fees for students
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-10 lg:mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Be discoverable when it matters
              </h2>
              <p class="mt-4 text-lg text-slate-600">
                Recruiters search by university, skills, and tech stack to find candidates like you. When your profile
                matches their brief, you show up—with context that makes it easy to reach out.
              </p>
              <ul class="mt-6 space-y-3 text-slate-700">
                <li class="flex items-center gap-2">
                  ✓ Recruiter search by institution, skills, and technology
                </li>
                <li class="flex items-center gap-2">
                  ✓ Direct interest from hiring teams and partners
                </li>
                <li class="flex items-center gap-2">
                  ✓ Integrated with career offices for warm introductions
                </li>
              </ul>
            </div>
            <div class="aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="flex h-full items-center justify-center text-slate-500">Search results</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Success stories (case studies) -->
      <section class="border-t border-slate-200 bg-white py-14 sm:py-18">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Success stories</h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Real outcomes from our university partnerships and programs.
            </p>
          </div>
          <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <p class="text-4xl font-bold text-primary-600">40%</p>
              <p class="mt-2 font-semibold text-slate-900">Faster placement at State University</p>
              <p class="mt-3 text-slate-600">Career services saw a 40% increase in internship placements after adopting SkillsBridge for student portfolios.</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <p class="text-4xl font-bold text-primary-600">20K+</p>
              <p class="mt-2 font-semibold text-slate-900">Successful placements nationwide</p>
              <p class="mt-3 text-slate-600">Students across 3,500+ institutions have secured roles through recruiter matches on the platform.</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md sm:col-span-2 lg:col-span-1">
              <p class="text-4xl font-bold text-primary-600">85%</p>
              <p class="mt-2 font-semibold text-slate-900">Recruiter satisfaction</p>
              <p class="mt-3 text-slate-600">Hiring managers report higher quality candidates when searching by institution and verified skills.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="bg-slate-50 py-14 sm:py-18">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What students & recruiters say</h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Real voices from our community.
            </p>
          </div>
          <div
            class="mt-10 flex flex-col items-center gap-6 sm:mt-12"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
            <div class="w-full max-w-3xl overflow-hidden rounded-2xl bg-slate-900 text-left shadow-xl">
              <div class="relative aspect-video bg-slate-800">
                <div class="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    class="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white"
                  >
                    <span class="ml-0.5 text-xl font-semibold">▶</span>
                  </button>
                </div>
                <div class="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/40 to-transparent" />
                <div class="absolute bottom-4 left-4 right-4 space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary-200">
                    {{ testimonialVideos[activeTestimonialIndex].label }}
                  </p>
                  <p class="text-lg font-semibold text-white">
                    {{ testimonialVideos[activeTestimonialIndex].title }}
                  </p>
                  <p class="text-xs text-slate-200">
                    {{ testimonialVideos[activeTestimonialIndex].description }}
                  </p>
                </div>
              </div>
              <div class="flex items-center justify-between gap-4 border-t border-slate-800 bg-slate-900 px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500/20 text-xs font-semibold text-primary-100">
                    {{ testimonialVideos[activeTestimonialIndex].name.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-white">
                      {{ testimonialVideos[activeTestimonialIndex].name }}
                    </p>
                    <p class="text-xs text-slate-300">
                      {{ testimonialVideos[activeTestimonialIndex].role }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800"
                    @click="prevTestimonial"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800"
                    @click="nextTestimonial"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center gap-2">
              <button
                v-for="(video, index) in testimonialVideos"
                :key="video.id"
                type="button"
                class="h-2.5 rounded-full transition-all"
                :class="index === activeTestimonialIndex ? 'w-6 bg-primary-500' : 'w-2.5 bg-slate-300'"
                @click="activeTestimonialIndex = index"
                :aria-label="`Go to testimonial ${index + 1}`"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Video showcase -->
      <section class="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">See SkillsBridge in action</h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Learn how students build portfolios and get discovered by recruiters.
            </p>
          </div>
          <div class="mt-12 grid gap-8 lg:grid-cols-2">
            <div class="overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="aspect-video flex items-center justify-center text-slate-500">
                <span class="text-center">Video: Platform overview</span>
              </div>
              <div class="bg-white p-4">
                <p class="font-semibold text-slate-900">How SkillsBridge works</p>
                <p class="text-sm text-slate-600">A quick tour of the platform for students and recruiters</p>
              </div>
            </div>
            <div class="overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="aspect-video flex items-center justify-center text-slate-500">
                <span class="text-center">Video: Student experiences</span>
              </div>
              <div class="bg-white p-4">
                <p class="font-semibold text-slate-900">Student success stories</p>
                <p class="text-sm text-slate-600">Hear from students who landed roles through SkillsBridge</p>
              </div>
            </div>
          </div>
          <p class="mt-6 text-center text-sm text-slate-500">
            Add your YouTube or Vimeo embed URLs when ready
          </p>
        </div>
      </section>

      <!-- Hiring companies logos -->
      <section class="border-y border-slate-200/80 bg-slate-50 py-14 sm:py-18">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Companies hiring from SkillsBridge
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Organizations actively recruiting talent from our platform.
          </p>

        <div class="mt-10 overflow-hidden logo-marquee slow logo-marquee-track">
          <div aria-hidden="true" class="mt-12 logo-marquee-track grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
             <div class="flex h-16 w-30 items-center justify-center rounded-lg bg-slate-100 font-semibol">
              <img src="/public/AmeuLogo.PNG" class="h-16 w-100" alt="AmeuLogo" >
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100  font-semibold">
              <img src="/public/BlueCrestLogo.PNG" class="h-16 w-100" alt="BlueCrestLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/SmpuLogo.PNG" class="h-16 w-100" alt="SmpuLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/StarzLogo.PNG" class="h-16 w-85" alt="StarzLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/UL_Logo.PNG" class="h-16 w-100" alt="ULlogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/UmuLogo.PNG" class="h-16 w-100" alt="UmuLogo">
             </div>

             <div class="flex h-16 w-30 items-center justify-center rounded-lg bg-slate-100 font-semibol">
              <img src="/public/AmeuLogo.PNG" class="h-16 w-100" alt="AmeuLogo" >
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100  font-semibold">
              <img src="/public/BlueCrestLogo.PNG" class="h-16 w-100" alt="BlueCrestLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/SmpuLogo.PNG" class="h-16 w-100" alt="SmpuLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/StarzLogo.PNG" class="h-16 w-85" alt="StarzLogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/UL_Logo.PNG" class="h-16 w-100" alt="ULlogo">
             </div>
             <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 font-semibold">
              <img src="/public/UmuLogo.PNG" class="h-16 w-100" alt="UmuLogo">
             </div>
             </div>
          </div>
        </div>
      </section>

      <!-- How it works -->
      <section id="how-it-works" class="py-16 sm:py-20 bg-white/25">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl">
              How it works
            </h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-black">
              Get from signup to discoverable in three simple steps. No resume uploads, no scattered links, just one
              profile that does the work for you.
            </p>
          </div>
          <div class="mt-16 grid gap-10 sm:grid-cols-3 lg:gap-12">
            <div class="relative rounded-2xl bg-blue-500 p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:shadow-xl">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-black">
                1
              </div>
              <h3 class="mt-5 text-lg font-semibold text-black">Create your profile</h3>
              <p class="mt-3 text-black">
                Sign up with your personal email, add your institution, then list your skills and
                technologies. Link your best projects with descriptions and tech stacks so recruiters see what you
                can do.
              </p>
            </div>
            <div class="relative rounded-2xl bg-blue-500 p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:shadow-xl">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-primary-700">
                2
              </div>
              <h3 class="mt-5 text-lg font-semibold  text-slate-900">Control visibility</h3>
              <p class="mt-3 text-slate-900">
                Decide when your profile is visible on Explore. Turn it on when you're job hunting, off when you're
                not. You stay in charge of who sees your information and when.
              </p>
            </div>
            <div class="relative rounded-2xl bg-blue-500 p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:shadow-xl">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-primary-700">
                3
              </div>
              <h3 class="mt-5 text-lg font-semibold text-slate-900">Get discovered</h3>
              <p class="mt-3 text-slate-900">
                Explorers and hiring managers search by university and skill. When your profile matches, you show up.
                Keep your portfolio updated and increase your chances of being found for internships and full-time roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Awards and recognition -->
      <section class="border-t border-slate-200 bg-slate-50 py-14 sm:py-18">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Awards & recognition</h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Recognized for innovation in education and workforce development.
            </p>
          </div>
          <div class="mt-12 flex flex-wrap items-center justify-center gap-6">
            <div class="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
              <p class="font-semibold text-slate-900">🏆 EdTech Excellence</p>
              <p class="text-sm text-slate-600">2024</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
              <p class="font-semibold text-slate-900">✓ Ministry Certified</p>
              <p class="text-sm text-slate-600">Education Partner</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
              <p class="font-semibold text-slate-900">⭐ Top Student Platform</p>
              <p class="text-sm text-slate-600">Career Tech</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
              <p class="font-semibold text-slate-900">🔒 Privacy First</p>
              <p class="text-sm text-slate-600">Student Data Certified</p>
            </div>
          </div>
        </div>
      </section>

      <!-- About teaser -->
      <section class="border-t border-slate-200 bg-white py-14 sm:py-18">
        <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-blue-600">
            About {{ APP_NAME }}
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-800">
            We connect students with explorers through a single professional portfolio. Learn more about our
            mission and who we serve.
          </p>
          <BaseButton class="mt-6" variant="secondary" @click="$router.push({ name: 'About' })">
            Learn more
          </BaseButton>
        </div>
      </section>
      <!-- Newsletter signup -->
      <section class="border-t border-slate-200 bg-white py-10 sm:py-12">
        <div class="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Stay in the loop</h2>
          <p class="mt-3 text-slate-600">
            Get updates on new features, success stories, and opportunities. No spam.
          </p>
          <form class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center" @submit.prevent="handleNewsletterSubmit">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="you@university.edu"
              class="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:max-w-xs"
            />
            <BaseButton type="submit">Subscribe</BaseButton>
          </form>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="border-t border-slate-200 bg-primary-600 py-14 sm:py-18">
        <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold sm:text-4xl lg:text-5xl text-blue-500">
            Ready to get discovered?
          </h2> <br>
          <h2 class="text-black text-2x1 sm:text-3xl lg:text-3xl">Create your portfolio in minutes</h2>
          <p class="mt-4 text-blue-600 text-2xl font-bold sm:text-2xl lg:text-3xl">
             No cost, no commitment—just your best work in one place.
          </p>
          <BaseButton
            variant="inverse"
            class="mt-8"
            size="lg"
            @click="$router.push({ name: 'Register' })"
          >
            Get started for free
          </BaseButton>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.logo-marquee {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: max-content;
  animation: logo-marquee 24s linear infinite;
}

.logo-marquee.slow {
  animation-duration: 32s;
}

.logo-marquee-track {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  background-color: #e5e7eb; /* slate-200 */
}

.company-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  min-width: 7rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  color: #475569; /* slate-600 */
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.logo-marquee:hover,
.logo-marquee.slow:hover {
  animation-play-state: paused;
}

@keyframes logo-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>