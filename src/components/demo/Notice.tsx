import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function Example() {
  return (
    <div className="mt-[2em] w-fit border-l-4 border-yellow-400 bg-yellow-100 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Demo limited to one article.{" "}
            <a
              href="/waitlist"
              className="font-medium text-yellow-700 underline hover:text-yellow-600">
              Join waiting list to see a demo using your entire Zendesk account.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
