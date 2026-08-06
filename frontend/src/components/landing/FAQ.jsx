import SectionHeader from "../common/SectionHeader";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">

        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about FoodBridge."
        />

        <Accordion
          className="w-full rounded-3xl bg-card p-6 shadow-md"
        >

          <AccordionItem value="1">
            <AccordionTrigger>
              How can restaurants donate food?
            </AccordionTrigger>

            <AccordionContent>
              Restaurants can register, complete their profile, wait for admin
              approval, and then create food donation listings.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="2">
            <AccordionTrigger>
              How do NGOs receive food?
            </AccordionTrigger>

            <AccordionContent>
              NGOs submit food requests. Admin reviews requests and allocates
              available donations based on need and availability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="3">
            <AccordionTrigger>
              Can anyone become a volunteer?
            </AccordionTrigger>

            <AccordionContent>
              Yes. Volunteers register, complete verification, receive admin
              approval, and can then accept delivery assignments.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="4">
            <AccordionTrigger>
              Is FoodBridge free?
            </AccordionTrigger>

            <AccordionContent>
              Yes. FoodBridge is designed to connect communities and reduce food
              waste without charging users for participation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="5">
            <AccordionTrigger>
              How is food quality ensured?
            </AccordionTrigger>

            <AccordionContent>
              Restaurants provide food details and expiry information. NGOs and
              volunteers inspect donations before delivery.
            </AccordionContent>
          </AccordionItem>

        </Accordion>

      </div>
    </section>
  );
}