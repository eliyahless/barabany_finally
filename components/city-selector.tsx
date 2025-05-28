"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cities } from "@/data/cities"
import { cn } from "@/lib/utils"

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
    <div className="w-full flex justify-center py-3 sm:py-4 md:py-6 bg-gradient-to-b from-zinc-900/50 to-transparent">
      <div
        className="flex items-center gap-1 sm:gap-2 bg-black/20 border border-white/10 backdrop-blur-lg py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-full shadow-2xl overflow-x-auto scrollbar-hide max-w-full md:max-w-6xl"
      >
        {cities.map((city) => {
          const isActive = activeTab === city.slug

          return (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              onClick={() => setActiveTab(city.slug)}
              className={cn(
                "relative cursor-pointer font-semibold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 whitespace-nowrap min-w-fit",
                "text-xs sm:text-sm md:text-base",
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
                  {/* Дополнительное свечение по бокам */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-500/20 to-orange-500/10 rounded-full" />
                  {/* Внутренний градиент */}
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