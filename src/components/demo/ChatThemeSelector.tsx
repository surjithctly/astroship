export default function ChatThemeSelector({ themes, setTheme }) {
  return (
    <div className="inherit absolute top-[16rem] ml-[72%] hidden md:block">
      <label
        htmlFor="theme"
        className="block text-sm font-medium leading-6 text-gray-900">
        Widget Theme
      </label>
      <select
        id="theme"
        name="theme"
        className=" mt-2 block w-full max-w-fit rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => setTheme(e.target.value)}>
        {themes.map((theme, index) => {
          return <option key={index}>{theme.label}</option>;
        })}
      </select>
    </div>
  );
}
