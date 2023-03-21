import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What technology is this? Generative AI?",
    answer:
      "We leverage the latest advancements in Generative AI through our use of the GPT model to generate responses to user inquiries. Additionally, we utilize other AI tools to conduct thorough searches across your entire Zendesk help center to provide users with the most relevant articles."
  },
  {
    question:
      "Does Generative AI have a tendency to generate false or inaccurate information?",
    answer:
      "Older versions of Generative AI were known for generating false or inaccurate information, but the newer GPT-4 model has made improvements in this area. With clever prompts and context-specific training, we can usually achieve results that are as good as or better than what humans can do. However, we don't recommend WiselyDesk if the information needs to be 100% correct 100% of the time."
  },
  {
    question:
      "Will the implementation of this require a significant investment of our time?",
    answer:
      "Nope, our dedicated full stack engineer with AI knowledge will make sure everything goes smoothly with limited involvement from your end. However, as this is using ground-breaking technology, we are happy to involve you and teach you about the latest and greatest in AI"
  },
  {
    question: "Who would benefit from using this?",
    answer:
      "Our ideal customers are SaaS and online companies of all sizes who prioritize their customer support and want to enhance the effectiveness of their help center. Whether you're a small startup or a large enterprise, if you care about providing top-notch support to your customers, we're here to help you make it happen!"
  },
  {
    question: "Who should not use this?",
    answer:
      "As mentioned before, we don't recommend WiselyDesk at it's current iteration if your customers need 100% accurate information 100% of the time."
  },
  {
    question: "What if Zendesk builds this?",
    answer:
      "If Zendesk introduces a similar feature and you prefer to use it, we'll gladly migrate you. Our priority is to work with happy customers, whether it's because our service is better, you enjoy working with our team, or our pricing is more affordable. We also think, as a small startup, we'll be able to create features faster that will please our customers."
  },
  {
    question:
      "What does WiselyDesk aim to achieve? Is it just an add-on for Zendesk?",
    answer:
      "Our ultimate goal is to create an AI-powered help center platform that's tailored to the needs of modern businesses. While we do integrate with Zendesk, we're more than just an add-on. With the latest advancements in AI, we're building a Zendesk alternative from scratch that prioritizes intelligence and efficiency."
  }
];

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
