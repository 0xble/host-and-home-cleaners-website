import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface FAQSectionProps {
  heading: string
  description: string
  faqs: Array<{
    question: string
    answer: React.ReactNode
  }>
}

export default function FAQSection({ heading, description, faqs }: FAQSectionProps) {
  return (
    <section className="mx-auto max-w-screen-md bg-white">
      <div className="px-4 py-8 sm:py-16 lg:px-6">
        <h2 className="mb-6 text-center tracking-tight text-shade lg:mb-8">
          {heading}
        </h2>
        <p className="mb-8">{description}</p>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(({ question, answer }, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-lg font-normal text-shade">{question}</AccordionTrigger>
              <AccordionContent>
                {typeof answer === 'string' ? <p>{answer}</p> : answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
