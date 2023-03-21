import {
  CloudArrowUpIcon,
  LightBulbIcon,
  RocketLaunchIcon
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Easy installation.",
    description:
      "Embed WiselyDesk in seconds. Simply copy and paste an iFrame/HTML into a custom page.",
    icon: CloudArrowUpIcon
  },
  {
    name: "Refined.",
    description:
      "Refine WiselyDesk responses using your general tone and escalation behaviour.",
    icon: LightBulbIcon
  },
  {
    name: "Endless customization.",
    description:
      "A friendly full stack engineer with AI knowledge leads your launch. Customize your WiselyDesk platform to your liking.",
    icon: RocketLaunchIcon
  }
];

export default function EasyInstall() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                A breeze to operate
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                A world of possibilites using new AI technology
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Use the latest and great technology to help your customers.
                Install by copy and pasting one file. Customization (chat,
                responses, chatbot tone) available.
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
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
