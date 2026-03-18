<script setup>
import { ref, computed, onMounted } from 'vue'
import { APP_NAME } from '../utils/constants'
import BaseButton from '../components/base/BaseButton.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import StudentCard from '../components/explore/StudentCard.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import * as exploreService from '../services/exploreService'
import * as newsletterService from '../services/newsletterService'
import { useToast } from '../composables/useToast'

const newsletterEmail = ref('')
const newsletterLoading = ref(false)
const newsletterSuccess = ref(false)
const newsletterError = ref('')
const activeTestimonialIndex = ref(0) // slide index (chunked)
const touchStartX = ref(0)
const expandedTestimonials = ref({})

const activeSkill = ref('JavaScript')
const landingProfiles = ref([])
const landingLoading = ref(false)
const landingError = ref('')
const toast = useToast()

const skillChips = [
  'JavaScript',
  'Vue.js',
  'React',
  'Node.js',
  'Python',
  'SQL',
  'Data Analysis',
  'Machine Learning',
  'UI/UX',
  'Cybersecurity',
]

// Note: navigation happens in template via $router.push.

const testimonialCards = [
  {
    id: 1,
    quote:
      "SkillsBridge made my projects look professional. Recruiters didn’t just see my degree — they saw what I can build.",
    name: 'Kathleen B.',
    meta: 'Computer Science Student',
    location: 'New Hampshire',
  },
  {
    id: 2,
    quote:
      "I can filter by skills and university, then review real projects. It’s the fastest way I’ve found strong student talent.",
    name: 'Kyung B.',
    meta: 'Technical Recruiter',
    location: 'Maryland',
  },
  {
    id: 3,
    quote:
      "Students finally have one place to organize coursework, capstones, and projects — and it’s easy for employers to review.",
    name: 'Francisco R.',
    meta: 'Career Partner',
    location: 'Spain',
  },
  {
    id: 4,
    quote:
      'Publishing my profile helped me get inbound messages after I added two projects and updated my skills.',
    name: 'Amina K.',
    meta: 'Data Science Student',
    location: 'Monrovia',
  },
  {
    id: 5,
    quote:
      'The portfolio format is clean. I can evaluate impact and tech stack without opening five different links.',
    name: 'Jordan P.',
    meta: 'Hiring Manager',
    location: 'Remote',
  },
]

const testimonialSlides = computed(() => {
  const chunkSize = 3
  const slides = []
  for (let i = 0; i < testimonialCards.length; i += chunkSize) {
    slides.push(testimonialCards.slice(i, i + chunkSize))
  }
  return slides
})

onMounted(async () => {
  await loadLandingProfiles()
})

function toggleTestimonial(id) {
  expandedTestimonials.value = {
    ...expandedTestimonials.value,
    [id]: !expandedTestimonials.value[id],
  }
}

function nextTestimonial() {
  activeTestimonialIndex.value =
    (activeTestimonialIndex.value + 1) % testimonialSlides.value.length
}

function prevTestimonial() {
  activeTestimonialIndex.value =
    (activeTestimonialIndex.value - 1 + testimonialSlides.value.length) %
    testimonialSlides.value.length
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

async function loadLandingProfiles() {
  landingError.value = ''
  landingLoading.value = true
  try {
    const data = await exploreService.fetchPublicProfiles({ skill: activeSkill.value, limit: 4, page: 1, sort: 'newest' })
    landingProfiles.value = data.students || []
  } catch {
    landingProfiles.value = []
    landingError.value = 'Failed to load students'
  } finally {
    landingLoading.value = false
  }
}

async function selectSkill(skill) {
  activeSkill.value = skill
  await loadLandingProfiles()
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

async function handleNewsletterSubmit() {
  newsletterSuccess.value = false
  newsletterError.value = ''
  const email = String(newsletterEmail.value || '').trim()
  if (!isValidEmail(email)) {
    newsletterError.value = 'Enter a valid email address'
    return
  }
  newsletterLoading.value = true
  try {
    await newsletterService.subscribe(email)
    newsletterSuccess.value = true
    toast.success('Subscribed! Check your inbox for updates.')
    newsletterEmail.value = ''
  } catch (err) {
    newsletterError.value = err.response?.data?.message || 'Subscription failed'
  } finally {
    newsletterLoading.value = false
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
            <h1 class="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl ">
              Turn your Skills & Degree into   opportunities
              <span class="bg-linear-to-r from-primary-600 text-blue-700 to-academic-navy bg-clip-text text-3xl">
               
              </span>
            </h1>
            <p class="mt-6 sm:text-1xl lg:text-2xl leading-8  font-sans text-slate-800">
              {{ APP_NAME }} connects talented students with recruiters. Build a professional portfolio,
              showcase your projects and skills, and get discovered by companies looking for your exact profile all
              within your Schools community.
            </p>
            <p class="mt-3 italic text-lg font-serif text-slate-800">
              One profile. One place. Your next opportunity starts here.
            </p>
            <div class="mt-10 flex flex-wrap items-center justify-center text-slate-900 gap-4">
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

           <img src="/public/AMEU copy.png" class="h-16" />
           <img src="/public/BlueCrestLogo.PNG" class="h-16" />
           <img src="/public/SMPU1 copy.PNG" class="h-16" />
           <img src="/public/StarzLogo.PNG" class="h-16" />
           <img src="/public/UL_Logo.PNG" class="h-16" />
           <img src="/public/UMU copy.PNG" class="h-16" />

          <!-- duplicate logos for infinite loop -->
           <img src="/public/AMEU copy.png" class="h-16" />
           <img src="/public/BlueCrestLogo.PNG" class="h-16" />
           <img src="/public/SMPU1 copy.PNG" class="h-16" />
           <img src="/public/StarzLogo.PNG" class="h-16" />
           <img src="/public/UL_Logo.PNG" class="h-16" />
           <img src="/public/UMU copy.PNG" class="h-16" />

     </div>
        </div>
        </div>
      </section>

      <!-- Explore top students -->
      <section class="bg-slate-50 py-14 sm:py-18">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore top students
            </h2>
            <p class="mt-2 text-slate-600">
              Tap a skill to discover students who are strongest in that area.
            </p>
          </div>

          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <button
              v-for="skill in skillChips"
              :key="skill"
              type="button"
              class="rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm"
              :class="activeSkill === skill
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'"
              @click="selectSkill(skill)"
            >
              {{ skill }}
            </button>
          </div>

          <div class="mt-8">
            <div v-if="landingLoading" class="flex justify-center py-10">
              <BaseSpinner size="lg" />
            </div>
            <p v-else-if="landingError" class="text-center text-sm text-slate-600">
              {{ landingError }}
            </p>
            <div v-else class="grid gap-5 pt-2 sm:grid-cols-2 lg:grid-cols-4">
              <StudentCard
                v-for="s in landingProfiles"
                :key="s.id"
                :student="s"
                :university-name="s.university?.name || 'Student'"
              />
              <div v-if="!landingProfiles.length" class="lg:col-span-4">
                <p class="text-center text-sm text-slate-600">
                  No public students found for this skill yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Feature highlights (alternating) -->
      <!-- (removed feature highlights per request) -->


      <!-- Testimonials -->
      <section class="bg-[#f3efe7] py-14 sm:py-18">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Hear what other learners have to say
            </h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
              Real feedback from students, recruiters, and university partners using SkillsBridge.
            </p>
          </div>

          <div
            class="mt-10"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
            <div class="relative">
              <div class="overflow-hidden">
                <div
                  class="flex transition-transform duration-500 ease-out"
                  :style="{ transform: `translateX(-${activeTestimonialIndex * 100}%)` }"
                >
                  <div
                    v-for="(slide, slideIdx) in testimonialSlides"
                    :key="slideIdx"
                    class="w-full shrink-0 px-1"
                  >
                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <article
                        v-for="t in slide"
                        :key="t.id"
                        class="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70"
                      >
                        <div class="p-6">
                          <div class="text-2xl font-bold text-orange-500 leading-none">“</div>
                          <p
                            class="mt-3 text-sm leading-relaxed text-slate-700"
                            :class="expandedTestimonials[t.id] ? '' : 'line-clamp-4'"
                          >
                            {{ t.quote }}
                          </p>
                          <button
                            type="button"
                            class="mt-4 text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-slate-900"
                            @click="toggleTestimonial(t.id)"
                          >
                            <span v-if="expandedTestimonials[t.id]">Show Less</span>
                            <span v-else>Show More</span>
                          </button>
                        </div>
                        <div class="border-t border-slate-100 px-6 py-4">
                          <div class="flex items-center gap-3">
                            <div class="h-10 w-10 rounded-full bg-slate-200 ring-2 ring-white" />
                            <div class="min-w-0">
                              <p class="truncate text-sm font-semibold text-slate-900">{{ t.name }}</p>
                              <p class="truncate text-xs text-slate-600">{{ t.location }}</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow ring-1 ring-slate-200 hover:bg-white sm:inline-flex"
                aria-label="Previous testimonials"
                @click="prevTestimonial"
              >
                ‹
              </button>
              <button
                type="button"
                class="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow ring-1 ring-slate-200 hover:bg-white sm:inline-flex"
                aria-label="Next testimonials"
                @click="nextTestimonial"
              >
                ›
              </button>
            </div>

            <div class="mt-6 flex items-center justify-center gap-2">
              <button
                v-for="(s, index) in testimonialSlides"
                :key="index"
                type="button"
                class="h-2.5 rounded-full transition-all"
                :class="index === activeTestimonialIndex ? 'w-6 bg-orange-500' : 'w-2.5 bg-slate-300'"
                @click="activeTestimonialIndex = index"
                :aria-label="`Go to slide ${index + 1}`"
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
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-800">
              Learn how students build portfolios and get discovered by recruiters.
            </p>
          </div>
          <div class="mt-12 grid gap-6 lg:grid-cols-3">
            <div class="overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="aspect-video flex items-center justify-center text-slate-900">
               <video class="w-full h-full object-cover" controls autoplay muted loop>
              <source src="/public/skills bridge video.mp4" type="video/mp4">
              Your browser does not support the video tag.</video>
              </div>
              <div class="bg-white p-4">
                <p class="font-semibold text-slate-900">How SkillsBridge works</p>
                <p class="text-sm text-slate-700">A quick tour of the platform for students and recruiters</p>
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
                <p class="text-sm text-slate-700">Hear from students who landed roles through SkillsBridge</p>
              </div>
            </div>
            <div class="overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="aspect-video flex items-center justify-center text-slate-500">
                <video class="w-full h-full object-cover" controls autoplay muted loop>
                  <source src="/public/skills bridge video.mp4" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
              <div class="bg-white p-4">
                <p class="font-semibold text-slate-900">Publishing your profile</p>
                <p class="text-sm text-slate-700">Turn visibility on and share your portfolio link</p>
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
    <section id="how-it-works" class="py-20 bg-[#f3efe7]">
     <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto">
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        How it works
      </h2>
      <p class="mt-4 text-lg text-slate-700">
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

      <!-- (removed "From Skill to Opportunity" per request) -->
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
            <BaseButton type="submit" :loading="newsletterLoading">Subscribe</BaseButton>
          </form>
          <p v-if="newsletterError" class="mt-3 text-sm text-red-600">{{ newsletterError }}</p>
          <p v-else-if="newsletterSuccess" class="mt-3 text-sm text-green-700">Thanks — you’re subscribed.</p>
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