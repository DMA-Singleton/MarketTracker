import fetch from "node-fetch";

class HttpRequestBase {
  private options: any = {
    headers: {},
  };
  private url: string;
  private queryParams: any[] = [];

  constructor(url: string) {
    this.url = url;
    this.addHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:75.0) Gecko/20100101 Firefox/75.0");
  }

  addHeader(key: string, value: string) {
    this.options.headers[key] = value;
  }

  getHeaders() {
    return this.options.headers;
  }

  async fetchAsText() {
    if (this.queryParams.length > 0) {
      this.queryParams.forEach((param, i) => (this.url += (i === 0 ? "?" : "&") + `${param.key}=${param.value}`));
    }
    const response = await fetch(this.url, this.options);
    this.checkStatusCode(response.status);
    return await response.text();
  }

  checkStatusCode(status: number) {
    if (status >= 300) {
      throw new Error(`error in status code [status code = ${status}]`);
    }
  }

  setQueryParam(key: string, value: string | number) {
    this.queryParams.push({ key: key, value: value });
  }
}

export = HttpRequestBase;
