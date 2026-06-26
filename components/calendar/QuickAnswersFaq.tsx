"use client";

import { useState } from "react";
import { CALENDAR_FAQS } from "@lib/calendar/faqs";
import { ChevronDown } from "lucide-react";

export function QuickAnswersFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <h2 id="faq-heading" className="text-2xl font-bold text-foreground">
        Quick answers
      </h2>
      <p className="mt-1 text-base text-muted-foreground">
        Straight answers to the questions students search most often.
      </p>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border">
        {CALENDAR_FAQS.map((faq, index) => {
          const open = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <div key={faq.question}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-foreground hover:bg-muted/40"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
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
