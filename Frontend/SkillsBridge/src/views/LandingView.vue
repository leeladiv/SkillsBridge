<script setup>
import { ref } from 'vue'
import { APP_NAME, APP_TAGLINE } from '../utils/constants'
import BaseButton from '../components/base/BaseButton.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const newsletterEmail = ref('')
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
      <section class="relative mt-1.5  overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-br from-primary-50/80 via-white to-academic-navy/5" aria-hidden="true" />
        <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 ">
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
      <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
      <section class="border-y border-slate-200/80 bg-white py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Trusted by leading institutions
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Government agencies, universities, and corporate partners collaborate with {{ APP_NAME }} to connect talent with opportunity.
          </p>
          <div class="mt-12 grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
            <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 px-4 py-3 font-semibold text-slate-600">Ministry of Ed</div>
            <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 px-4 py-3 font-semibold text-slate-600">State Univ</div>
            <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 px-4 py-3 font-semibold text-slate-600">Tech College</div>
            <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 px-4 py-3 font-semibold text-slate-600">Polytechnic</div>
            <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 px-4 py-3 font-semibold text-slate-600">Research Inst</div>
            <div class="flex h-16 w-32 items-center justify-center rounded-lg bg-slate-100 px-4 py-3 font-semibold text-slate-600">Global Corp</div>
          </div>
        </div>
      </section>

      <!-- Social proof / value strip -->
      <section class="border-y border-slate-200/80 bg-white/25 py-8">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <p class="text-2xl font-bold text-primary-600 sm:text-3xl">Portfolio-first</p>
              <p class="mt-1 text-sm text-black">Projects and skills in one place, built for recruiters.</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-academic-navy sm:text-3xl">Ministry of Education backed</p>
              <p class="mt-1 text-sm text-black">Represent your institution. Trusted by career offices.</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-primary-600 sm:text-3xl">You're in control</p>
              <p class="mt-1 text-sm text-slate-600">Toggle visibility. Update anytime. Your data, your rules.</p>
            </div>
          </div>
        </div>
      </section>


      <!-- Feature highlights (alternating) -->
      <section class="bg-slate-50 py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Portfolio that works for you</h2>
              <p class="mt-4 text-lg text-slate-600">
                Build a professional portfolio in minutes. Add projects, skills, and tech stacks—all in one place. 
                Recruiters search by institution and skill, so your profile shows up when it matters.
              </p>
              <ul class="mt-6 space-y-3 text-slate-700">
                <li class="flex items-center gap-2">✓ Projects with descriptions & tech stacks</li>
                <li class="flex items-center gap-2">✓ Skills tagging and verification</li>
                <li class="flex items-center gap-2">✓ University-linked profiles</li>
              </ul>
            </div>
            <div class="aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="flex h-full items-center justify-center text-slate-500">Portfolio preview</div>
            </div>
          </div>
          <div class="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div class="order-2 lg:order-1">
              <div class="aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                <div class="flex h-full items-center justify-center text-slate-500">Explore view</div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Visibility you control</h2>
              <p class="mt-4 text-lg text-slate-600">
                Turn your profile on when you're job hunting, off when you're not. You decide who sees your 
                information—no spam, no unwanted outreach. Your data, your rules.
              </p>
              <ul class="mt-6 space-y-3 text-slate-700">
                <li class="flex items-center gap-2">✓ Toggle visibility anytime</li>
                <li class="flex items-center gap-2">✓ Institution-backed trust</li>
                <li class="flex items-center gap-2">✓ No fees ever</li>
              </ul>
            </div>
          </div>
          <div class="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Get discovered by recruiters</h2>
              <p class="mt-4 text-lg text-slate-600">
                Hiring managers search by university and skill. When you match, you show up. Keep your portfolio 
                updated and increase your chances for internships and full-time roles—all within your school's community.
              </p>
              <ul class="mt-6 space-y-3 text-slate-700">
                <li class="flex items-center gap-2">✓ Search by institution & skill</li>
                <li class="flex items-center gap-2">✓ Direct recruiter access</li>
                <li class="flex items-center gap-2">✓ Career office support</li>
              </ul>
            </div>
            <div class="aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
              <div class="flex h-full items-center justify-center text-slate-500">Search results</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Success stories (case studies) -->
      <section class="border-t border-slate-200 bg-white py-20 sm:py-24">
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
      <section class="bg-slate-50 py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What students & recruiters say</h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Real voices from our community.
            </p>
          </div>
          <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <blockquote class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
              <p class="text-slate-700">"I got my internship within two weeks of making my profile visible. Recruiters actually found me—no cold applying."</p>
              <footer class="mt-4 flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-primary-100" />
                <div>
                  <cite class="font-semibold text-slate-900">Sarah M.</cite>
                  <p class="text-sm text-slate-500">CS Student, State University</p>
                </div>
              </footer>
            </blockquote>
            <blockquote class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
              <p class="text-slate-700">"We hire from SkillsBridge because the portfolios are real and the university connection gives us confidence in the candidates."</p>
              <footer class="mt-4 flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-primary-100" />
                <div>
                  <cite class="font-semibold text-slate-900">James L.</cite>
                  <p class="text-sm text-slate-500">Tech Recruiter</p>
                </div>
              </footer>
            </blockquote>
            <blockquote class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
              <p class="text-slate-700">"Our career office loves it. Students get discovered, recruiters get quality talent—everyone wins. Ministry backing made adoption easy."</p>
              <footer class="mt-4 flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-primary-100" />
                <div>
                  <cite class="font-semibold text-slate-900">Dr. A. Patel</cite>
                  <p class="text-sm text-slate-500">Career Director</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <!-- Video showcase -->
      <section class="border-t border-slate-200 bg-white py-20 sm:py-24">
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
      <section class="border-y border-slate-200/80 bg-slate-50 py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Companies hiring from SkillsBridge
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Organizations actively recruiting talent from our platform.
          </p>
          <div class="mt-12 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <div class="flex h-14 w-28 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">TechCorp</div>
            <div class="flex h-14 w-28 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">FinanceCo</div>
            <div class="flex h-14 w-28 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">HealthPlus</div>
            <div class="flex h-14 w-28 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">EduTech</div>
            <div class="flex h-14 w-28 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">GovLab</div>
            <div class="flex h-14 w-28 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">StartUpX</div>
          </div>
        </div>
      </section>
>>>>>>> 4568a50c646c4eb6ff466bf3bfb15bf526700fda

      <!-- How it works -->
      <section id="how-it-works" class="py-20 sm:py-24 bg-white/25">
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
      <section class="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
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
      <section class="border-t border-slate-200 bg-white py-16 sm:py-20">
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

      <!-- University branding CTA -->
      <section class="py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl lg:text-5xl">
            University-based branding
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-800">
            Your profile is tied to your institution. Join your university's community on {{ APP_NAME }}, represent
            your school, and help recruiters connect the dots between your degree and your skills.
          </p>
          <BaseButton class="mt-8" size="lg" @click="$router.push({ name: 'Register' })">
            Sign up with your university email
          </BaseButton>
        </div>
      </section>

      <!-- Newsletter signup -->
      <section class="border-t border-slate-200 bg-white py-12 sm:py-16">
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
      <section class="border-t border-slate-200 bg-primary-600 py-16 sm:py-20">
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