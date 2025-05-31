"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    instrument: "voice",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    alert("Thanks for your interest! We'll contact you soon to schedule your free trial lesson.")
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-[#595959]">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-left">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#595959] focus:outline-none focus:ring-2 focus:ring-[#ffc800]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium mb-1 text-left">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#595959] focus:outline-none focus:ring-2 focus:ring-[#ffc800]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="instrument" className="block text-sm font-medium mb-1 text-left">
            Instrument of Interest
          </label>
          <select
            id="instrument"
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#595959] focus:outline-none focus:ring-2 focus:ring-[#ffc800]"
          >
            <option value="voice">Voice</option>
            <option value="guitar">Guitar</option>
            <option value="piano">Piano</option>
            <option value="drums">Drums</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            • BOOK FREE TRIAL
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto flex items-center justify-center gap-2"
            onClick={() => window.open("https://t.me/neshkola", "_blank")}
          >
            <MessageCircle size={18} />
            ASK IN TELEGRAM
          </Button>
        </div>
      </form>
    </div>
  )
}
