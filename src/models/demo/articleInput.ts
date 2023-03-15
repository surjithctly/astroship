export default class ArticleInput {
  public subdomain: string;
  public articleId: string;
  public domain: string;

  constructor(zendeskUrl: string) {
    const regexMatch = this.parseArticleUrl(zendeskUrl);

    if (regexMatch && regexMatch.groups) {
      const { subdomain, articleId, domain } = regexMatch.groups;
      this.subdomain = subdomain.toLowerCase();
      this.articleId = articleId;
      this.domain = domain.toLowerCase();
    }
  }

  public isInputUrlValid(): boolean {
    return !!this.subdomain && !!this.articleId && !!this.domain;
  }

  public getOrganization(): string {
    // zendesk (the company) is a special case
    const isOfficialZendesk =
      this.domain === "zendesk" && this.subdomain === "support";
    if (isOfficialZendesk) {
      return "support";
    }

    // some companies have their url as COMPANYNAME.zendesk.com/hc..
    const orgInSubdomain = this.subdomain !== "support";
    if (orgInSubdomain) {
      return this.subdomain;
    }

    // otherwise we expect companies to have their zendesk as support.COMPANYNAME.com/hc..
    return this.domain;
  }

  private parseArticleUrl(zendeskUrl: string) {
    // Zendesk domains can be in multiple formats. So far, we support:
    // 1. https://support.amboss.com/hc/en-us/articles/360044237212-AMBOSS-Membership
    // 2. https://ultimateai.zendesk.com/hc/en-us/articles/5549818433042
    return zendeskUrl.match(
      /\/\/(?<subdomain>\w+)\.(?<domain>\w+)\..*\/articles\/(?<articleId>\d+)/
    );
  }
}
