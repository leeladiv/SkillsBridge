<script setup>
import { APP_NAME, APP_TAGLINE } from '../utils/constants'
import BaseButton from '../components/base/BaseButton.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
    <AppNavbar />

    <main>
      <!-- Hero -->
      <section class="relative mt-1.5 overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-br from-primary-50/80 via-white to-academic-navy/5" aria-hidden="true" />
        <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div class="mx-auto max-w-3xl text-center">
            <p class="text-md font-semibold uppercase text-blue-500 tracking-wider text-primary-600">
              Student Skills & Portfolio Platform
            </p>
            <h1 class="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
              Turn your Skills & Degree into
              <span class="bg-linear-to-r from-primary-600 text-blue-700 to-academic-navy bg-clip-text text-3x1">
                opportunities
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
                Sign up with your personaal email, add your institution, then list your skills and
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