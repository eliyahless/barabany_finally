"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cities } from "../data/cities"
import { cn } from "../lib/lib/utils"

export default function CitySelector() {
  const pathname = usePathname()
  const currentCity = pathname.split("/")[1] || ""
  const [activeTab, setActiveTab] = useState(currentCity || cities[0].slug)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (currentCity) {
      setActiveTab(currentCity)
    }
  }, [currentCity])

  if (!mounted) return null

  return (
    <div className="w-full flex justify-center py-2 bg-gradient-to-b from-zinc-900/30 to-transparent">
      <div className="flex items-center gap-2 bg-black/20 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-xl overflow-x-auto scrollbar-hide max-w-6xl">
        {cities.map((city) => {
          const isActive = activeTab === city.slug

          return (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              onClick={() => setActiveTab(city.slug)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap min-w-fit",
                "text-white/80 hover:text-white",
                isActive && "text-white",
              )}
            >
              <span className="relative z-10 font-bold">{city.name}</span>
              {isActive && (
                <motion.div
                  layoutId="cityLamp"
                  className="absolute inset-0 w-full bg-orange-500/20 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-500/20 to-orange-500/10 rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 to-orange-600/20 rounded-full" />
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
} 