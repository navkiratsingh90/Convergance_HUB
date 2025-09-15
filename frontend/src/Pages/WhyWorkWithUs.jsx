import {
  Box,
  Cpu,
  Radio,
  Layers,
  Zap,
  Wrench
} from "lucide-react"

export default function WhyWorkWithUs() {
  const features = [
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Quality",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?"
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: "Experience",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?"
    },
    {
      icon: <Radio className="w-6 h-6" />,
      title: "Support",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Innovation",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Results",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Efficiency",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?"
    },
  ]

  return (
    <section className="bg-neutral-900 text-white py-16 w-full h-full">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Work With Us?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-start gap-4">
              <div className="flex items-center justify-center p-4 rounded-full bg-neutral-700">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
