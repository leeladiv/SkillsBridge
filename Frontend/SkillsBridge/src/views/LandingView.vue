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
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-br from-primary-50/80 via-white to-academic-navy/5" aria-hidden="true" />
        <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div class="mx-auto max-w-3xl text-center">
            <p class="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Student Skills & Portfolio Platform
            </p>
            <h1 class="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Turn your degree into
              <span class="bg-linear-to-r from-primary-600 to-academic-navy bg-clip-text text-transparent">
                opportunities
              </span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-slate-600">
              {{ APP_NAME }} connects talented students with recruiters. Build a professional portfolio,
              showcase your projects and skills, and get discovered by companies looking for your exact profile—all
              within your university community.
            </p>
            <p class="mt-3 text-slate-500">
              One profile. One place. Your next opportunity starts here.
            </p>
            <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
              <BaseButton size="lg" @click="$router.push({ name: 'Register' })">
                Create your portfolio — It's free
              </BaseButton>
              <BaseButton variant="secondary" size="lg" @click="$router.push({ name: 'Explore' })">
                Explore student profiles
              </BaseButton>
            </div>
            <p class="mt-6 text-sm text-slate-500">
              Join students from top universities. No credit card required.
            </p>
          </div>
        </div>
      </section>

      <!-- Social proof / value strip -->
      <section class="border-y border-slate-200/80 bg-white/60 py-8">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <p class="text-2xl font-bold text-primary-600 sm:text-3xl">Portfolio-first</p>
              <p class="mt-1 text-sm text-slate-600">Projects and skills in one place, built for recruiters.</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-academic-navy sm:text-3xl">University-backed</p>
              <p class="mt-1 text-sm text-slate-600">Represent your institution. Trusted by career offices.</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-primary-600 sm:text-3xl">You're in control</p>
              <p class="mt-1 text-sm text-slate-600">Toggle visibility. Update anytime. Your data, your rules.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it works -->
      <section id="how-it-works" class="py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How it works
            </h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Get from signup to discoverable in three simple steps. No résumé uploads, no scattered links—just one
              profile that does the work for you.
            </p>
          </div>
          <div class="mt-16 grid gap-10 sm:grid-cols-3 lg:gap-12">
            <div class="relative rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:shadow-xl">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-primary-700">
                1
              </div>
              <h3 class="mt-5 text-lg font-semibold text-slate-900">Create your profile</h3>
              <p class="mt-3 text-slate-600">
                Sign up with your university email, add your degree and institution, then list your skills and
                technologies. Link your best projects with descriptions and tech stacks so recruiters see what you
                can do.
              </p>
            </div>
            <div class="relative rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:shadow-xl">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-primary-700">
                2
              </div>
              <h3 class="mt-5 text-lg font-semibold text-slate-900">Control visibility</h3>
              <p class="mt-3 text-slate-600">
                Decide when your profile is visible on Explore. Turn it on when you're job hunting, off when you're
                not. You stay in charge of who sees your information and when.
              </p>
            </div>
            <div class="relative rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/80 transition hover:shadow-xl">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-primary-700">
                3
              </div>
              <h3 class="mt-5 text-lg font-semibold text-slate-900">Get discovered</h3>
              <p class="mt-3 text-slate-600">
                Recruiters and hiring managers search by university and skill. When your profile matches, you show up.
                Keep your portfolio updated and increase your chances of being found for internships and full-time roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- About teaser -->
      <section class="border-t border-slate-200 bg-slate-50/80 py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            About {{ APP_NAME }}
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We connect students with recruiters through a single, professional portfolio. Learn more about our
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
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            University-based branding
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
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
          <h2 class="text-2xl font-bold text-white sm:text-3xl">
            Ready to get discovered?
          </h2>
          <p class="mt-4 text-lg text-primary-100">
            Create your portfolio in minutes. No cost, no commitment—just your best work in one place.
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