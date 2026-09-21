import { Heart, Soup } from 'lucide-react'

export function AppFooter() { return <footer className="mt-20 border-t border-orange-100 bg-white/70"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-stone-500 sm:flex-row sm:px-6 lg:px-8"><span className="flex items-center gap-2 font-semibold text-stone-700"><Soup className="size-4 text-orange-500" /> What Should I Eat?</span><span className="flex items-center gap-1.5">Made with <Heart className="size-3.5 fill-orange-500 text-orange-500" /> for hungry students</span></div></footer> }
