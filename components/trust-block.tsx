import { Check } from "lucide-react"

export default function TrustBlock() {
  return (
    <section id="about" className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-center">О НАШИХ УРОКАХ</h2>
        <h3 className="section-heading text-center">Специально для взрослых учеников</h3>

        <p className="text-lg mb-8 text-center">
          В Не Школе мы понимаем, что обучение игре на барабанах во взрослом возрасте имеет свои особенности. Наш подход
          фокусируется на практических навыках, быстрых результатах и создании поддерживающей среды, где взрослые могут
          развиваться независимо от предыдущего опыта.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-2xl mb-4">Почему взрослым нравится наш подход</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="text-orange-400 mt-1 flex-shrink-0" />
                <span>Учитесь в своем темпе в атмосфере без осуждения</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-orange-400 mt-1 flex-shrink-0" />
                <span>Играйте любимые песни с первого занятия</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-orange-400 mt-1 flex-shrink-0" />
                <span>Гибкое расписание для занятых взрослых</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-orange-400 mt-1 flex-shrink-0" />
                <span>Регулярные джем-сессии с другими взрослыми учениками</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-2xl mb-4">Наши достижения</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 border border-gray-500 rounded-xl">
                <p className="text-4xl mb-2">200+</p>
                <p className="text-sm text-gray-400">Обученных барабанщиков</p>
              </div>
              <div className="text-center p-4 border border-gray-500 rounded-xl">
                <p className="text-4xl mb-2">8</p>
                <p className="text-sm text-gray-400">Лет опыта</p>
              </div>
              <div className="text-center p-4 border border-gray-500 rounded-xl">
                <p className="text-4xl mb-2">4.9</p>
                <p className="text-sm text-gray-400">Средний рейтинг</p>
              </div>
              <div className="text-center p-4 border border-gray-500 rounded-xl">
                <p className="text-4xl mb-2">6</p>
                <p className="text-sm text-gray-400">Опытных преподавателей</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
