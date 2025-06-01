"use client"

import { useState } from "react"
import { Mic, Guitar, Piano, Drum, Music } from "lucide-react"
<<<<<<< HEAD
import { Button } from "./ui/button"
=======
import { Button } from "@/components/ui/button"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

export default function Programs() {
  const [activeTab, setActiveTab] = useState("voice")

  const programs = [
    {
      id: "voice",
      icon: <Mic className="w-6 h-6" />,
      title: "Voice",
      description:
        "Discover your unique voice and learn proper technique, breathing, and performance skills. Perfect for beginners and those looking to improve their singing.",
      trial: "In your free trial, you'll learn a simple song and get personalized vocal feedback.",
    },
    {
      id: "guitar",
      icon: <Guitar className="w-6 h-6" />,
      title: "Guitar",
      description:
        "Learn to play your favorite songs, understand chords, and develop your own style. Acoustic, electric, or bass - we've got you covered.",
      trial: "Your free trial includes learning your first chords and a simple song progression.",
    },
    {
      id: "piano",
      icon: <Piano className="w-6 h-6" />,
      title: "Piano",
      description:
        "Master the keyboard with our practical approach to piano. Learn to play by ear, read music, and express yourself through this versatile instrument.",
      trial: "During your free trial, you'll play your first melody and learn basic keyboard navigation.",
    },
    {
      id: "drums",
      icon: <Drum className="w-6 h-6" />,
      title: "Drums",
      description:
        "Feel the rhythm and learn to keep the beat with our hands-on drum lessons. Develop coordination, timing, and groove.",
      trial: "Your free trial includes learning your first beat and experiencing the joy of rhythm.",
    },
    {
      id: "other",
      icon: <Music className="w-6 h-6" />,
      title: "Other Instruments",
      description:
        "From saxophone to ukulele, we offer lessons for a variety of instruments. Tell us what you're interested in, and we'll match you with the right teacher.",
      trial: "Free trials available for all instruments - get in touch to discuss your specific interests.",
    },
  ]

  const activeProgram = programs.find((p) => p.id === activeTab) || programs[0]

  return (
    <section id="programs" className="container mx-auto px-4 py-16 bg-[#f8f8f8] rounded-2xl">
      <h2 className="text-[#575757] uppercase text-sm tracking-wider mb-4 text-center">OUR PROGRAMS</h2>
      <h3 className="text-[#171615] text-3xl md:text-4xl font-serif max-w-3xl mx-auto mb-12 text-center">
        Find your perfect musical discipline
      </h3>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {programs.map((program) => (
          <button
            key={program.id}
            onClick={() => setActiveTab(program.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              activeTab === program.id
                ? "bg-[#ffc800] text-[#171615]"
                : "bg-white text-[#171615] border border-[#595959]"
            }`}
          >
            {program.icon}
            <span>{program.title}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
        <h4 className="font-serif text-2xl mb-4">{activeProgram.title}</h4>
        <p className="mb-4">{activeProgram.description}</p>
        <div className="bg-[#f8f8f8] p-4 rounded-lg mb-6">
          <p className="font-medium">Free Trial: {activeProgram.trial}</p>
        </div>

        <Button variant="primary">• BOOK YOUR FREE {activeProgram.title.toUpperCase()} LESSON</Button>
      </div>
    </section>
  )
}
