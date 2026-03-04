<script setup>
import { APP_NAME } from '../utils/constants'
import BaseButton from '../components/base/BaseButton.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppNavbar />

    <main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About {{ APP_NAME }}
        </h1>
        <p class="mt-2 text-lg text-slate-600">
          The student skills portfolio platform connecting talent with opportunity.
        </p>
      </div>

      <section class="mx-auto mt-12 max-w-3xl">
        <h2 class="text-xl font-semibold text-slate-900">Our mission</h2>
        <p class="mt-4 text-lg leading-8 text-slate-700">
          {{ APP_NAME }} is built for the way hiring works today. We believe that every student deserves a clear,
          professional way to showcase their work—and that recruiters deserve a better way to find talent by
          university and skill.
        </p>
        <p class="mt-4 text-slate-700">
          Whether you're a computer science major with side projects, a design student with a strong portfolio, or
          any student with skills to show, {{ APP_NAME }} gives you one place to put it all. Your profile is
          built around your university identity, so you're discoverable in a context that matters to employers.
        </p>
        <p class="mt-4 text-slate-700">
          For explorers, {{ APP_NAME }} is a focused talent pool: filter by institution and skills, see only
          public profiles, and reach out when you find the right fit. No noise—just students who are ready to be
          found.
        </p>
      </section>

      <section class="mt-16">
        <h2 class="text-xl font-semibold text-slate-900">Who we serve</h2>
        <div class="mt-8 grid gap-8 sm:grid-cols-2">
          <div class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
            <h3 class="text-lg font-semibold text-slate-900">For students</h3>
            <p class="mt-3 text-slate-700">
              Build a portfolio that reflects your real skills and projects. Control your visibility, update
              anytime, and get discovered by companies that are looking for someone like you.
            </p>
            <BaseButton class="mt-6" size="sm" @click="$router.push({ name: 'Register' })">
              Create your portfolio
            </BaseButton>
          </div>
          <div class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
            <h3 class="text-lg font-semibold text-slate-900">For explorers</h3>
            <p class="mt-3 text-slate-700">
              Explore student profiles by university and skill. See only public portfolios, so every profile you
              view is from someone open to opportunities. No scraping, no guesswork—just a clean talent pipeline.
            </p>
            <BaseButton class="mt-6" variant="secondary" size="sm" @click="$router.push({ name: 'Explore' })">
              Explore students
            </BaseButton>
          </div>
        </div>
      </section>

      <section class="mx-auto mt-16 max-w-3xl border-t border-slate-200 pt-16">
        <h2 class="text-xl font-semibold text-slate-900">Get in touch</h2>
        <p class="mt-4 text-slate-600">
          Questions about {{ APP_NAME }}? We'd love to hear from you. Reach out to your university's career office
          or contact us through the platform.
        </p>
        <div class="mt-6 flex gap-4">
          <BaseButton @click="$router.push({ name: 'Home' })">Back to home</BaseButton>
          <BaseButton variant="secondary" @click="$router.push({ name: 'Register' })">Sign up</BaseButton>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>