import { UserCircle2, Zap, RotateCcw } from "lucide-react"

export default function Audience() {
  const audiences = [
    {
      icon: <UserCircle2 className="w-10 h-10" />,
      title: "Total Beginners",
      description:
        "Never played before? Perfect! Our method is designed to get you playing music from day one, no experience needed.",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Some Experience",
      description:
        "Already know the basics? We'll assess your skills and create a personalized plan to take you to the next level.",
    },
    {
      icon: <RotateCcw className="w-10 h-10" />,
      title: "Returning After a Break",
      description: "Played years ago? We'll help you dust off those skills and rediscover the joy of making music.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="section-title text-center">WHO IS IT FOR</h2>
      <h3 className="section-heading text-center mb-12">Everyone has a place in our musical community</h3>

      <div className="grid md:grid-cols-3 gap-8">
        {audiences.map((audience, index) => (
          <div key={index} className="card text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f8f8f8] mb-4">
              {audience.icon}
            </div>
            <h4 className="font-serif text-xl mb-2">{audience.title}</h4>
            <p className="text-[#575757]">{audience.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
