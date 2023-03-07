function ArticleInput({ setZendeskUrl }) {
  return (
    <div className="mx-auto max-w-3xl">
      <form className="mx-auto mt-8">
        <div className="mb-4">
          <label
            className="smb-2 ml-2 block text-xl font-bold text-gray-700"
            htmlFor="article">
            Zendesk Article Url
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-lg leading-tight text-gray-700 shadow"
            id="article"
            type="text"
            onChange={(e) => setZendeskUrl(e.target.value)}
            placeholder="https://support.zendesk.com/hc/en-us/articles/4408884056346-Introduction-Getting-started-with-Zendesk-Support"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}
export default ArticleInput;
