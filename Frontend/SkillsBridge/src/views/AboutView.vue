<script setup>
import { APP_NAME } from '../utils/constants'
import BaseButton from '../components/base/BaseButton.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const team = [
  { name: 'Ansu Konneh', role: 'Member / Engineer', bio: 'Building a platform that turns student skills into real opportunities.' },
  { name: 'Leela Koenig', role: 'Member / Engineer', bio: 'Focused on performance, reliability, and delightful UX.' },
  { name: 'HonestPato Youdebo', role: 'Member / Designer', bio: 'I turn ideas into clear, functional visuals.' },
  { name: 'David D. Samolu', role: 'Member / Colorist', bio: 'From correction to creative grade-commericials, sounds and videos.' },
  { name: 'Varro Smith', role: 'Member / Engineer', bio: 'Full-stack engineer focused on clean code, solid architecture, and user experience.' }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppNavbar />

    <main class="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <!-- Header -->
      <section class="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70">
        <div class="bg-linear-to-br from-primary-50 via-white to-slate-50 px-6 py-10 sm:px-10">
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            About {{ APP_NAME }}
          </h1>
          <p class="mt-3 max-w-2xl text-lg text-slate-600">
            {{ APP_NAME }} helps students turn real work into a professional profile recruiters can search, understand,
            and message.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <BaseButton @click="$router.push({ name: 'Register' })">Create your profile</BaseButton>
            <BaseButton variant="secondary" @click="$router.push({ name: 'Explore' })">Explore students</BaseButton>
          </div>
        </div>
      </section>

      <!-- Mission -->
      <section class="mt-10 grid gap-6 lg:grid-cols-3">
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 lg:col-span-2">
          <h2 class="text-xl font-semibold text-slate-900">Our mission</h2>
          <p class="mt-3 text-slate-700 leading-8">
            Resumes and scattered links rarely show the full story of what students can do. With {{ APP_NAME }}, each
            student keeps one portfolio that brings together projects, skills, and university context in a way that feels
            familiar to hiring teams.
          </p>
          <p class="mt-3 text-slate-700">
            Instead of sending different versions of a CV to every opportunity, students share a single profile that stays
            up to date. Recruiters can filter by institution and skills, then review real work before reaching out.
          </p>
        </div>
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">What we optimize for</h3>
          <ul class="mt-4 space-y-3 text-slate-700">
            <li class="flex gap-2"><span class="font-bold text-primary-600">✓</span> Clarity: projects + skills in one place</li>
            <li class="flex gap-2"><span class="font-bold text-primary-600">✓</span> Trust: profiles tied to institutions</li>
            <li class="flex gap-2"><span class="font-bold text-primary-600">✓</span> Speed: search, filter, message</li>
          </ul>
        </div>
      </section>

      <!-- Why we built this -->
      <section class="mt-14 border-t border-slate-200 pt-10 space-y-4">
        <h2 class="text-xl font-semibold text-slate-900">Why we built this</h2>
        <p class="text-slate-700">
          We saw talented students doing great work—but struggling to present it clearly in one place. Employers
          wanted proof of skills, while students had projects scattered across folders, links, and messages.
        </p>
        <p class="text-slate-700">
          {{ APP_NAME }} bridges that gap with a simple portfolio that’s easy to build, easy to review, and trusted
          because it’s connected to an institution.
        </p>
      </section>

      <!-- Our story -->
      <section class="mt-14 border-t border-slate-200 pt-10 space-y-4">
        <h2 class="text-xl font-semibold text-slate-900">Our story</h2>
        <p class="text-slate-700">
          SkillsBridge started as a practical idea: help students turn coursework and projects into a profile that
          hiring teams can scan quickly and understand deeply.
        </p>
        <p class="text-slate-700">
          Today, we’re building tools for students, career offices, and partners to collaborate around the same goal:
          turning skills into opportunities.
        </p>
      </section>

      <!-- Who it's for -->
      <section class="mt-14 border-t border-slate-200 pt-10 space-y-6">
        <h2 class="text-xl font-semibold text-slate-900">Who {{ APP_NAME }} is for</h2>
        <p class="text-slate-700">
          We focus on two groups: students building their first professional presence, and people who need help
          to find opportunities.
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

      <!-- Team -->
      <section class="mt-14 border-t border-slate-200 pt-10">
        <h2 class="text-2xl font-semibold text-slate-900">Team</h2>
        <p class="m-4 text-lg text-slate-800">
          Meet the people building SkillsBridge.
        </p>
        <div class="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="m in team"
            :key="m.name + m.role"
            class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"
          >
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                {{ (m.name || '?')[0] }}
              </div>
              <div class="min-w-0">
                <p class="truncate font-semibold text-slate-900">{{ m.name }}</p>
                <p class="truncate text-xs font-semibold text-slate-500">{{ m.role }}</p>
              </div> 
            </div>
            <br>
            <p class="mt-3 text-sm text-slate-600">"{{ m.bio }}"</p>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="mt-14">
        <div class="rounded-3xl bg-primary-800 px-6 py-10 text-center text-blue-500 shadow-md">
          <h2 class="text-2xl font-bold sm:text-3xl">Ready to be discovered?</h2>
          <p class="mx-auto mt-3 text-lg text-primary-100">
            Create a portfolio that highlights your projects and skills, and let explorers message you directly.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <BaseButton variant="inverse" @click="$router.push({ name: 'Register' })">Get started</BaseButton>
            <BaseButton variant="secondary" @click="$router.push({ name: 'Explore' })">Browse students</BaseButton>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>