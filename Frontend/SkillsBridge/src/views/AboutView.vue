<script setup>
import { APP_NAME } from '../utils/constants'
import BaseButton from '../components/base/BaseButton.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppNavbar />

    <main class="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <!-- Header -->
      <section>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About {{ APP_NAME }}
        </h1>
        <p class="mt-3 text-lg text-slate-600">
          {{ APP_NAME }} helps students turn their work into a clear, professional profile that recruiters can
          actually search and understand.
        </p>
      </section>

      <!-- Mission -->
      <section class="mt-10 space-y-4 text-slate-700">
        <p class="text-lg leading-8">
          Resumes and scattered links rarely show the full story of what students can do. With {{ APP_NAME }}, each
          student keeps one portfolio that brings together projects, skills, and their university background in a
          way that feels familiar to hiring teams.
        </p>
        <p>
          Instead of sending different versions of a CV to every opportunity, students share a single profile that
          stays up to date. Recruiters and partners can filter by institution and skills, then review real work
          before reaching out.
        </p>
      </section>

      <!-- Who it's for -->
      <section class="mt-14 border-t border-slate-200 pt-10 space-y-6">
        <h2 class="text-xl font-semibold text-slate-900">Who {{ APP_NAME }} is for</h2>
        <p class="text-slate-700">
          We focus on two groups: students building their first professional presence, and the people who help
          them find opportunities.
        </p>
        <div class="space-y-4 text-slate-700">
          <p>
            <span class="font-semibold text-slate-900">Students</span> use {{ APP_NAME }} to present their work
            beyond a traditional resume—linking projects, skills, and achievements to the institution where they
            study.
          </p>
          <p>
            <span class="font-semibold text-slate-900">Recruiters and career partners</span> use it as a focused
            way to discover students by university and skill, with profiles that have already been made visible by
            the student.
          </p>
        </div>
      </section>

      <!-- Simple call to action -->
      <section class="mt-14 border-t border-slate-200 pt-10">
        <p class="text-slate-700">
          If you&apos;re a student, the best way to learn about {{ APP_NAME }} is to create a profile. If you&apos;re
          a recruiter or partner, start by browsing public student portfolios.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <BaseButton @click="$router.push({ name: 'Register' })">
            Create a student profile
          </BaseButton>
          <BaseButton variant="secondary" @click="$router.push({ name: 'Explore' })">
            Browse student portfolios
          </BaseButton>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>