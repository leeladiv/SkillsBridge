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
              showcase your projects and skills, and get discovered by companies looking for your exact profile all
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

        <div class="overflow-hidden mt-10 logo-marquee">
          <div class="logo-track flex gap-8 items-center">

           <img src="/public/AmeuLogo.PNG" class="h-16" />
           <img src="/public/BlueCrestLogo.PNG" class="h-16" />
           <img src="/public/SmpuLogo.PNG" class="h-16" />
           <img src="/public/StarzLogo.PNG" class="h-16" />
           <img src="/public/UL_Logo.PNG" class="h-16" />
           <img src="/public/UmuLogo.PNG" class="h-16" />

          <!-- duplicate logos for infinite loop -->
           <img src="/public/AmeuLogo.PNG" class="h-16" />
           <img src="/public/BlueCrestLogo.PNG" class="h-16" />
           <img src="/public/SmpuLogo.PNG" class="h-16" />
           <img src="/public/StarzLogo.PNG" class="h-16" />
           <img src="/public/UL_Logo.PNG" class="h-16" />
           <img src="/public/UmuLogo.PNG" class="h-16" />

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
            <video class="w-full h-full object-cover" controls autoplay muted loop>
              <source src="/public/skills bridge video.mp4" type="video/mp4">
              Your browser does not support the video tag.</video>
            </div>
          </div>
          <div class="mt-10 lg:mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div class="order-2 lg:order-1">
              <div class="aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
            <video class="w-full h-full object-cover" controls autoplay muted loop>
              <source src="/public/skills bridge video.mp4" type="video/mp4">
              Your browser does not support the video tag.</video>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Control what recruiters see
              </h2>
              <p class="mt-4 text-lg text-black">
                You decide when your profile is visible and what is shared. Turn discovery on when you’re exploring
                roles, pause it when you’re not, without deleting your work or losing your network.
              </p>
              <ul class="mt-6 space-y-3 text-black">
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
              <p class="mt-4 text-lg text-black">
                Recruiters search by university, skills, and tech stack to find candidates like you. When your profile
                matches their brief, you show up—with context that makes it easy to reach out.
              </p>
              <ul class="mt-6 space-y-3 text-black">
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
          <video class="w-full h-full object-cover" controls autoplay muted loop>
              <source src="/public/skills bridge video.mp4" type="video/mp4">
              Your browser does not support the video tag.</video>
            </div>
          </div>
        </div>
      </section>


      <!-- Testimonials -->
      <section class="bg-slate-50 py-14 sm:py-18">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What students & recruiters say</h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-black">
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
 
      <div class="aspect-video rounded-xl overflow-hidden">
        <video id="videoPlayer" class="w-full h-full object-cover" controls autoplay muted>
         <source src="/public/skills bridge video.mp4" type="video/mp4">
        </video>
      </div>
         <div class="flex items-center gap-2">
            <button
               type="button"
               class="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800"
               @click="prevTestimonial">
            </button>
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800"
                    @click="nextTestimonial">
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
                :class="index === activeTestimonialIndex ? 'w-6 bg-slate-500' : 'w-2.5 bg-slate-300'"
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
            <p class="mx-auto mt-4 max-w-2xl text-lg text-black">
              Learn how students build portfolios and get discovered by recruiters.
            </p>
          </div>
          <div class="mt-12 grid gap-8 lg:grid-cols-2">
            <div class="overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="aspect-video flex items-center justify-center text-black">
               <video class="w-full h-full object-cover" controls autoplay muted loop>
              <source src="/public/skills bridge video.mp4" type="video/mp4">
              Your browser does not support the video tag.</video>
              </div>
              <div class="bg-white p-4">
                <p class="font-semibold text-black">How SkillsBridge works</p>
                <p class="text-sm text-black">A quick tour of the platform for students and recruiters</p>
              </div>
            </div>
            <div class="overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="aspect-video flex items-center justify-center text-slate-500">
                <video class="w-full h-full object-cover" controls autoplay muted loop>
              <source src="/public/skills bridge video.mp4" type="video/mp4">
              Your browser does not support the video tag.</video>
              </div>
              <div class="bg-white p-4">
                <p class="font-semibold text-slate-900">Student success stories</p>
                <p class="text-sm text-black">Hear from students who landed roles through SkillsBridge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Hiring companies logos -->
      <section class="border-y border-slate-200/80 bg-slate-50 py-14 sm:py-18">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Companies in Collaboration with {{ APP_NAME }}
          </h2>
        <!-- carousel-->
        <div class="overflow-hidden mt-10 logo-marquee">
          <div class="logo-track flex gap-8 items-center">

           <img src="/public/Orange.png" class="h-16" />
           <img src="/public/Lonestar.png" class="h-16" />
           <img src="/public/lprc.png" class="h-20" />
           <img src="/public/Nocal.png" class="h-16" />
           <img src="/public/lta.png" class="h-16" />
           <img src="/public/mfdp logo.jpg" class="h-16" />
           <img src="/public/fire stone.jpg" class="h-16" />

          <!-- duplicate logos for infinite loop -->
          <img src="/public/Orange.png" class="h-16" />
          <img src="/public/Lonestar.png" class="h-16"/>
          <img src="/public/lprc.png" class="h-20" />
          <img src="/public/Nocal.png" class="h-16" />
          <img src="/public/lta.png" class="h-16" />
          <img src="/public/mfdp logo.jpg" class="h-16" />
          <img src="/public/fire stone.jpg" class="h-16" />

     </div>
        </div>
        </div>
      </section> 

      <!-- How it works -->
    <section id="how-it-works" class="py-20 bg-blue-500">
     <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto">
      <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        How it works
      </h2>
      <p class="mt-4 text-lg text-blue-100">
        Go from signup to being discovered in three simple steps. No scattered
        links or bulky resumes — just one powerful profile that showcases your
        skills and projects.
      </p>
    </div>

    <!-- Steps -->
    <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      <!-- Step 1 -->
      <div class="group relative rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-black">
            1
          </div>
          <h3 class="text-lg font-semibold text-black">
            Create your profile
          </h3>
        </div>

        <p class="mt-4 text-sm leading-relaxed text-slate-700">
          Sign up with your personal email, add your institution, and list your
          skills and technologies. Attach your best projects with descriptions
          and tech stacks so recruiters can quickly see what you can build.
        </p>

      </div>

      <!-- Step 2 -->
      <div class="group relative rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-black">
            2
          </div>
          <h3 class="text-lg font-semibold text-slate-900">
            Control visibility
          </h3>
        </div>

        <p class="mt-4 text-sm leading-relaxed text-slate-700">
          Decide when your profile appears in Explore. Turn visibility on when
          you're actively job hunting and switch it off when you're not. You
          stay in control of your information at all times.
        </p>

      </div>

      <!-- Step 3 -->
      <div class="group relative rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-black">
            3
          </div>
          <h3 class="text-lg font-semibold text-slate-900">
            Get discovered
          </h3>
        </div>

        <p class="mt-4 text-sm leading-relaxed text-slate-700">
          Recruiters and explorers search by university, skills, and projects.
          When your profile matches their search, you appear instantly.
          Keeping your portfolio updated increases your chances of landing
          internships and full-time roles.
        </p>

      </div>

    </div>
  </div>
</section>

 <section  class="py-20 bg-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <!-- Section Header -->
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-black">
        From Skill to Opportunity
      </h2>
      <p class="mt-4 text-lg text-black">
        SkillsBridge connects what you know with the opportunities that need it.
        Turn your abilities, projects, and experiences into a profile that helps
        explorers and organizations discover you.
      </p>
    </div>

    <!-- Feature Grid -->
    <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

      <!-- Feature 1 -->
      <div class="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-xl">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
          🎓
        </div>
        <h3 class="mt-5 text-lg font-semibold text-slate-900">
          Showcase your skills
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">
          Build a structured portfolio that highlights your skills,
          technologies, and projects. Show what you can actually build
          instead of relying only on a traditional resume.
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-xl">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
          🔎
        </div>
        <h3 class="mt-5 text-lg font-semibold text-slate-900">
          Be discovered
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">
          Recruiters and explorers search by university, skills, and
          technology stacks. When your profile matches their needs,
          you appear instantly in their results.
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-xl">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
          🚀
        </div>
        <h3 class="mt-5 text-lg font-semibold text-slate-900">
          Unlock opportunities
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">
          From internships to full-time roles, your profile becomes a
          bridge between your skills and organizations searching for
          talented students and graduates.
        </p>
      </div>

    </div>

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




.logo-marquee {
  overflow: hidden;
}

.logo-track {
  display: flex;
  width: max-content;
  animation: scroll 25s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>