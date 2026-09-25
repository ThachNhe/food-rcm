import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check, Dices, SlidersHorizontal, Sparkles, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { FoodCard } from '@/features/food/components/FoodCard'
import { foods, HERO_IMAGE } from '@/features/food/data/foods'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const { t } = useI18n()
  const featuredFoods = [foods[2], foods[9], foods[23]].filter((food) => food !== undefined)
  const steps = [
    { icon: SlidersHorizontal, number: '01', title: t.step1Title, text: t.step1Text },
    { icon: Sparkles, number: '02', title: t.step2Title, text: t.step2Text },
    { icon: Utensils, number: '03', title: t.step3Title, text: t.step3Text },
  ]
  return <>
    <section className="relative overflow-hidden"><div className="absolute -top-40 -left-40 size-96 rounded-full bg-orange-100/60 blur-3xl" /><div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-28">
      <div className="relative z-10"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-orange-700 shadow-sm"><Sparkles className="size-3.5" /> {t.heroBadge}</div><h1 className="font-display max-w-2xl text-5xl leading-[1.02] font-bold tracking-[-0.045em] text-stone-900 sm:text-6xl lg:text-7xl">{t.heroTitleBefore} <span className="text-orange-500 italic">{t.heroTitleAccent}</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 sm:text-xl">{t.heroDescription}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-13 rounded-full bg-orange-500 px-7 text-base shadow-lg shadow-orange-200 hover:bg-orange-600"><Link to="/preferences">{t.findMyFood} <ArrowRight className="size-4" /></Link></Button><Button asChild size="lg" variant="outline" className="h-13 rounded-full border-stone-300 bg-white px-7 text-base hover:border-orange-300 hover:bg-orange-50"><Link to="/random"><Dices className="size-4" /> {t.surpriseMe}</Link></Button></div><div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-stone-500">{[t.diversePicks, t.smartMatching, t.noSignup].map((item) => <span key={item} className="flex items-center gap-1.5"><Check className="size-4 text-emerald-500" /> {item}</span>)}</div></div>
      <div className="relative mx-auto w-full max-w-xl lg:mx-0"><div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-orange-200/60" /><div className="relative overflow-hidden rounded-[2.2rem] bg-stone-900 shadow-2xl shadow-orange-900/15"><img src={HERO_IMAGE} alt={t.heroAlt} className="h-[440px] w-full object-cover opacity-90 sm:h-[520px]" /><div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" /><div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/20 bg-white/90 p-4 backdrop-blur-md"><p className="text-xs font-bold tracking-wider text-orange-600 uppercase">{t.todaysMood}</p><div className="mt-1 flex items-end justify-between gap-4"><p className="font-display text-2xl font-bold text-stone-900">{t.moodText}</p><span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-500 text-white"><Utensils className="size-4" /></span></div></div></div></div>
    </div></section>
    <section className="border-y border-orange-100 bg-orange-50/60 py-18"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-10 max-w-2xl text-center"><p className="text-xs font-bold tracking-[.16em] text-orange-600 uppercase">{t.simpleByDesign}</p><h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.threeSteps}</h2></div><div className="grid gap-5 md:grid-cols-3">{steps.map(({ icon: Icon, number, title, text }) => <div key={number} className="rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-orange-100 text-orange-600"><Icon className="size-5" /></span><span className="font-display text-3xl font-bold text-orange-100">{number}</span></div><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-500">{text}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold tracking-[.16em] text-orange-600 uppercase">{t.tasteInside}</p><h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.popularNow}</h2></div><Link to="/preferences" className="flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700">{t.findYourMatch} <ArrowRight className="size-4" /></Link></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredFoods.map((food) => <FoodCard key={food.id} food={food} />)}</div></section>
  </>
}
