import { RocketIcon } from "lucide-react"

export default function PropelX() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Propel X</h1>
        <p className="text-lg text-gray-600">PUDUVAI STARTUP DEMO DAY</p>
        <p className="text-gray-500">September 30 2022</p>
      </div>

      {/* Main Description */}
      <div className="mb-8">
        <p className="text-gray-600 leading-relaxed">
          10 promising growth stage startups would be provided opportunity for pitching their propositions at Startup
          Demo Day, who would be judged by an esteemed panel, which could be a precursor to the primary level screening
          for investment, customer acquisition and market development support.
        </p>
      </div>

      {/* Objectives */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Objectives</h2>
        <div className="space-y-3">
          {objectives.map((objective, index) => (
            <div key={index} className="flex gap-3">
              <RocketIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-600">{objective}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Day Highlights */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Demo Day - Highlights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="p-4">
              <p className="font-semibold text-xl mb-2 text-blue-600">{highlight.number}</p>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">What's in it for you?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-3">
              <RocketIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-600">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Profiles Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Exhibitor Profile */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Exhibitor Profile</h2>
          <div className="space-y-2">
            {exhibitorProfile.map((item, index) => (
              <p key={index} className="text-gray-600">
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* Visitor Profile */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Visitor Profile</h2>
          <div className="space-y-2">
            {visitorProfile.map((item, index) => (
              <p key={index} className="text-gray-600">
                {item}
              </p>
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}

const objectives = [
  "To Brand Puducherry as an Emerging Startup Ecosystem.",
  "To create a unique platform for Startups where they can showcase their ventures to investors.",
  "To Create B2B networking and collaborations for start-ups to grow in Puducherry.",
]

const highlights = [
  {
    number: "20+",
    description: "start-ups will showcase their products / services in the demo day visitors stall",
  },
  {
    number: "15+",
    description: "investors and mentors will be invited to attend the event",
  },
  {
    number: "100+",
    description: "Industry Leaders / Entrepreneurs will be invited to attend the Demo Day",
  },
]

const benefits = [
  "Exposure of esteemed dignitaries of the ecosystem",
  "Build strategic alliances with like-minded communities",
  "Networking with budding entrepreneurs",
  "Exposure of product demonstration",
  "Awareness about issues & challenges of early-stage innovators",
]

const exhibitorProfile = [
  "Electronics",
  "Engineering",
  "Internet of Things (IoT)",
  "Unmanned Aerial Vehicle (UAV)",
  "IT/ITES",
  "Renewable Energy & Solar",
  "Textile & Apparel Park",
  "Tourism",
]

const visitorProfile = [
  "CEOs & Entrepreneurs from various sectors",
  "VC's / PE's/ HNI's / Angel Investors",
  "Senior Officials of Central and State Government",
  "Aspiring Students",
  "Budding Entrepreneurs",
  "Key Experts, Industrialists and Associations",
  "Start-ups and MSMEs from Various sectors",
]

