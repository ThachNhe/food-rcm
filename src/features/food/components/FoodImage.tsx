import { useState } from 'react'
import { ImageOff, Soup } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FoodImage({ src, alt, className, imgClassName }: { src: string; alt: string; className?: string; imgClassName?: string }) {
  const [failed, setFailed] = useState(false)
  return <div className={cn('overflow-hidden bg-orange-50', className)}>{failed ? <div className="flex h-full min-h-48 flex-col items-center justify-center gap-2 text-orange-300"><span className="relative"><Soup className="size-12" /><ImageOff className="absolute -right-2 -bottom-1 size-5" /></span><span className="text-xs font-semibold text-orange-400">Photo unavailable</span></div> : <img src={src} alt={alt} className={cn('h-full w-full object-cover', imgClassName)} loading="lazy" onError={() => setFailed(true)} />}</div>
}
