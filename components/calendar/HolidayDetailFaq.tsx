"use client";

import { useState } from "react";
import type { HolidayFaq } from "@lib/calendar/teen-builder";
import { ChevronDown } from "lucide-react";

export function HolidayDetailFaq({ faqs }: { faqs: HolidayFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="holiday-faq-heading" className="mt-10">
      <h2 id="holiday-faq-heading" className="text-xl font-bold text-foreground">
        Common questions
      </h2>
      <div className="mt-4 divide-y divide-border rounded-xl border border-border">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          const panelId = `holiday-faq-${index}`;
          return (
            <div key={faq.question}>
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold hover:bg-muted/40"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                hidden={!open}
                className="px-5 pb-4 text-base leading-relaxed text-muted-foreground"
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
