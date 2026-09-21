import type { LucideIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }: { icon: LucideIcon; title: string; description: string; actionLabel: string; actionTo: '/preferences' | '/' }) {
  return <div className="mx-auto max-w-xl rounded-[2rem] border border-dashed border-orange-200 bg-orange-50/50 px-6 py-14 text-center"><span className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-white text-orange-500 shadow-sm"><Icon className="size-6" /></span><h2 className="font-display text-2xl font-bold text-stone-900">{title}</h2><p className="mx-auto mt-2 max-w-md leading-7 text-stone-500">{description}</p><Button asChild className="mt-6 h-11 rounded-full bg-orange-500 px-6 hover:bg-orange-600"><Link to={actionTo}>{actionLabel}</Link></Button></div>
}
