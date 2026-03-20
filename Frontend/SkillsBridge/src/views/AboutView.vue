<script setup>
import { APP_NAME } from '../utils/constants'
import BaseButton from '../components/base/BaseButton.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const team = [
  { name: 'Leela Koeing', role: 'Founder / Product', bio: 'Building a platform that turns student skills into real opportunities.' },
  { name: 'Leela Koeing', role: 'Engineering', bio: 'Focused on performance, reliability, and delightful UX.' },
  { name: 'Team Member', role: 'Design', bio: 'Designing modern, recruiter-friendly profiles.' },
  { name: 'Team Member', role: 'Partnerships', bio: 'Connecting universities, students, and employers.' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppNavbar />

    <main class="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <!-- Header -->
      <section class="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70">
        <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_55%)]" />
        <div class="absolute -top-24 -right-28 h-64 w-64 rounded-full bg-primary-600/10 blur-3xl" />

        <div class="relative bg-linear-to-br from-primary-50 via-white to-slate-50 px-6 py-10 sm:px-10">
          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200/70">
              About
            </span>
            <span class="text-xs text-slate-500">Student work, recruiter-ready discovery</span>
          </div>

          <h1 class="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
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

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div class="rounded-2xl bg-white p-4 ring-1 ring-slate-200/70">
              <p class="text-sm font-semibold text-slate-900">One profile</p>
              <p class="mt-1 text-xs text-slate-600">Projects, skills, and context</p>
            </div>
            <div class="rounded-2xl bg-white p-4 ring-1 ring-slate-200/70">
              <p class="text-sm font-semibold text-slate-900">Built for discovery</p>
              <p class="mt-1 text-xs text-slate-600">Filter by skill and university</p>
            </div>
            <div class="rounded-2xl bg-white p-4 ring-1 ring-slate-200/70">
              <p class="text-sm font-semibold text-slate-900">Message-ready</p>
              <p class="mt-1 text-xs text-slate-600">Reach students directly</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission -->
      <section class="mt-10 grid gap-6 lg:grid-cols-3">
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 lg:col-span-2">
          <h2 class="text-xl font-semibold text-slate-900">Our mission</h2>
          <p class="mt-3 text-slate-700 leading-7">
            Resumes and scattered links rarely show the full story of what students can do. With {{ APP_NAME }}, each
            student keeps one portfolio that brings together projects, skills, and university context in a way that feels
            familiar to hiring teams.
          </p>
          <p class="mt-3 text-slate-700">
            Instead of sending different versions of a CV to every opportunity, students share a single profile that stays
            up to date. Recruiters can filter by institution and skills, then review real work before reaching out.
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            <span class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-100">
              Projects
            </span>
            <span class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-100">
              Skills
            </span>
            <span class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-100">
              University context
            </span>
          </div>
        </div>
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">What we optimize for</h3>
          <ul class="mt-4 space-y-4 text-slate-700">
            <li class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                ✓
              </span>
              <div>
                <p class="font-semibold text-slate-900">Clarity</p>
                <p class="mt-1 text-sm text-slate-600">Projects + skills in one place</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                ✓
              </span>
              <div>
                <p class="font-semibold text-slate-900">Trust</p>
                <p class="mt-1 text-sm text-slate-600">Profiles tied to institutions</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                ✓
              </span>
              <div>
                <p class="font-semibold text-slate-900">Speed</p>
                <p class="mt-1 text-sm text-slate-600">Search, filter, message</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Why we built this + Our story -->
      <section class="mt-14 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 space-y-4">
          <h2 class="text-xl font-semibold text-slate-900">Why we built this</h2>
          <p class="text-slate-700 leading-7">
            We saw talented students doing great work—but struggling to present it clearly in one place. Employers
            wanted proof of skills, while students had projects scattered across folders, links, and messages.
          </p>
          <p class="text-slate-700 leading-7">
            {{ APP_NAME }} bridges that gap with a simple portfolio that’s easy to build, easy to review, and trusted
            because it’s connected to an institution.
          </p>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 space-y-4">
          <h2 class="text-xl font-semibold text-slate-900">Our story</h2>
          <p class="text-slate-700 leading-7">
            SkillsBridge started as a practical idea: help students turn coursework and projects into a profile that
            hiring teams can scan quickly—and understand deeply.
          </p>
          <p class="text-slate-700 leading-7">
            Today, we’re building tools for students, career offices, and partners to collaborate around the same goal:
            turning skills into opportunities.
          </p>

          <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
            <p class="text-sm font-semibold text-slate-900">The SkillsBridge loop</p>
            <div class="mt-3 space-y-3">
              <div class="flex items-start gap-3">
                <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">1</span>
                <p class="text-sm text-slate-700">Students publish one portfolio with projects + skills.</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">2</span>
                <p class="text-sm text-slate-700">Recruiters discover by university and search intent.</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">3</span>
                <p class="text-sm text-slate-700">Messaging connects students to real opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Who it's for -->
      <section class="mt-14">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-slate-900">Who {{ APP_NAME }} is for</h2>
            <p class="mt-2 max-w-2xl text-slate-700">
              Two groups. One shared goal: turn skills into opportunities.
            </p>
          </div>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h3 class="text-lg font-semibold text-slate-900">Students</h3>
            <p class="mt-2 text-slate-700 leading-7">
              Use {{ APP_NAME }} to present your work beyond a traditional resume—linking projects, skills, and achievements to the institution where you study.
            </p>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h3 class="text-lg font-semibold text-slate-900">Recruiters & career partners</h3>
            <p class="mt-2 text-slate-700 leading-7">
              Discover students by university and search intent, then message directly from profiles that are already made visible by the student.
            </p>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="mt-14">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-slate-900">Team</h2>
            <p class="mt-2 max-w-2xl text-slate-700 leading-7">
              Meet the people building SkillsBridge.
            </p>
          </div>
          <div class="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200/70">
            <p class="text-sm font-semibold text-slate-900">Small team. Big focus.</p>
            <p class="mt-1 text-xs text-slate-600">Product, engineering, design, partnerships.</p>
          </div>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="m in team"
            :key="m.name + m.role"
            class="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 shrink-0 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-bold ring-1 ring-primary-100">
                {{ (m.name || '?')[0] }}
              </div>
              <div class="min-w-0">
                <p class="truncate font-semibold text-slate-900">{{ m.name }}</p>
                <p class="truncate text-xs font-semibold text-slate-500">{{ m.role }}</p>
              </div>
            </div>
            <p class="mt-3 text-sm text-slate-600 leading-6 line-clamp-3">{{ m.bio }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="text-[11px] font-semibold text-primary-700 bg-primary-50 px-2 py-1 rounded-full ring-1 ring-primary-100">
                {{ m.role.split(' ')[0] }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="mt-14">
        <div class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/70 overflow-hidden relative">
          <div class="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary-600/10 blur-2xl" />
          <div class="relative flex flex-col items-center text-center gap-4 sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 class="text-2xl font-bold sm:text-3xl text-slate-900">Ready to be discovered?</h2>
              <p class="mt-2 max-w-xl text-slate-700">
                Create a portfolio that highlights your projects and skills, and let recruiters message you directly.
              </p>
            </div>
            <div class="flex flex-wrap justify-center gap-3 sm:justify-start">
              <BaseButton variant="inverse" @click="$router.push({ name: 'Register' })">Get started</BaseButton>
              <BaseButton variant="secondary" @click="$router.push({ name: 'Explore' })">Browse students</BaseButton>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>