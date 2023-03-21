import {
  PencilIcon,
  ChatBubbleBottomCenterIcon,
  NewspaperIcon
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Photo(text)graphic memory.",
    description:
      "Memorizes your knowledge base. Just put your zendesk subdomain and WiselyDesk will become an expert on your content.",
    icon: NewspaperIcon
  },
  {
    name: "Happy to chat.",
    description:
      "The hero your support team deserves. Answers the simple questions from knowledge base content while motivating the team to keep your content fresh.",
    icon: ChatBubbleBottomCenterIcon
  },
  {
    name: "Content Suggester (Coming Soon).",
    description:
      "Agents can tag tickets or chats that contain new information. WiselyDesk summarizes it and suggests improvements to your existing content.",
    icon: PencilIcon
  }
];

export default function Knowledgeable() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                A Smartie Pants
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Knows your content better than you
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                WiselyDesk memorizes your entire knowledge base in seconds and
                can instantly answer questions.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="/refundv2.gif"
            alt="Refund Demo"
            className="mt-20 rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
