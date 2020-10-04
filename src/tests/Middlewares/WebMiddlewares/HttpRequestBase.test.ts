import HttpRequestBase from "../../../../src/Middlewares/WebMiddlewares/HttpRequestBase";

jest.mock("node-fetch");
import fetch from "node-fetch";
const { Response } = jest.requireActual("node-fetch");
const mockedFetch = fetch as any;

beforeEach(() => {
  jest.clearAllMocks();
});

test("addHeaders", () => {
  const request = new HttpRequestBase("url");
  request.addHeader("key", "value");
  const headers = request.getHeaders();
  const expectedHeaders = {
    key: "value",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:75.0) Gecko/20100101 Firefox/75.0",
  };
  expect(headers).toStrictEqual(expectedHeaders);
});

test("fetchAsText", async () => {
  const request = new HttpRequestBase("http://url.com");
  const expectedResponse = new Response("aaa");
  mockedFetch.mockReturnValue(Promise.resolve(expectedResponse));
  request
    .fetchAsText()
    .then((res) => {
      expect(res).toStrictEqual("aaa");
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith("http://url.com", {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:75.0) Gecko/20100101 Firefox/75.0" },
      });
    })
    .catch((err) => fail(new Error(err)));
});

test("fetchAsText with errors in response", async () => {
  const request = new HttpRequestBase("http://url.com");
  const expectedResponse = new Response("aaa", { status: 404 });
  mockedFetch.mockReturnValue(Promise.resolve(expectedResponse));
  request.fetchAsText().catch((err) => {
    expect(err).toStrictEqual(new Error("error in status code [status code = 404]"));
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith("http://url.com", {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:75.0) Gecko/20100101 Firefox/75.0" },
    });
  });
});

test("fetchAsText with headers", async () => {
  const request = new HttpRequestBase("http://url.com");
  request.addHeader("key", "value");
  mockedFetch.mockReturnValue(Promise.resolve(new Response("aaa")));
  request
    .fetchAsText()
    .then((res) => {
      expect(res).toStrictEqual("aaa");
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith("http://url.com", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:75.0) Gecko/20100101 Firefox/75.0",
          key: "value",
        },
      });
    })
    .catch((err) => fail(new Error(err)));
});

test("setQueryParams", async () => {
  const request = new HttpRequestBase("http://url.com");
  request.setQueryParam("key", "value");
  request.setQueryParam("key2", "value2");
  mockedFetch.mockReturnValue(Promise.resolve(new Response("aaa")));
  request
    .fetchAsText()
    .then(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith("http://url.com?key=value&key2=value2", {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:75.0) Gecko/20100101 Firefox/75.0" },
      });
    })
    .catch((err) => fail(new Error(err)));
});
