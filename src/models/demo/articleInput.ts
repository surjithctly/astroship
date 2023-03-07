export default class ArticleInput {
  public subdomain: string;
  public articleId: string;

  constructor(zendeskUrl: string) {
    const regexMatch = this.findSubdomainAndArticleIdRegexGroups(zendeskUrl);

    if (regexMatch && regexMatch.groups) {
      const { subdomain, articleId } = regexMatch.groups;
      this.subdomain = subdomain;
      this.articleId = articleId;
    }
  }

  public isInputUrlValid(): boolean {
    return !!this.subdomain && !!this.articleId;
  }

  private findSubdomainAndArticleIdRegexGroups(zendeskUrl: string) {
    return zendeskUrl.match(
      /\/\/(?<subdomain>\w+).*\/articles\/(?<articleId>\d+)/
    );
  }
}
