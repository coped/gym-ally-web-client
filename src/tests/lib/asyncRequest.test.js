import AsyncRequest from "lib/asyncRequest";
import { server } from "tests/server.js";

// Setup mock server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("AsyncRequest", () => {
  const baseUrl = "http://localhost:4000/api/v1.json";
  describe("get", () => {
    it("sends a get request", async () => {
      const response = await AsyncRequest.get({ path: baseUrl });
      const data = await response.json();
      expect(response.status).toEqual(200);
      expect(data.method).toEqual("GET");
    });
    it("specifies json in request header", async () => {
      const response = await AsyncRequest.get({ path: baseUrl });
      expect(response.headers.map["content-type"]).toEqual("application/json");
    });
    it("properly requests with authorization header", async () => {
      const mockToken = "mock-token";
      const response = await AsyncRequest.get({
        path: baseUrl,
        authorization: mockToken,
      });
      const data = await response.json();
      expect(data.authorization).toEqual(mockToken);
    });
  });
  describe("post", () => {
    it("sends a post request", async () => {
      const response = await AsyncRequest.post({ path: baseUrl });
      const data = await response.json();
      expect(response.status).toEqual(200);
      expect(data.method).toEqual("POST");
    });
    it("properly sends data", async () => {
      const mockInfo = { email: "my@email.com", password: "foobar" };
      const data = await (
        await AsyncRequest.post({ path: baseUrl, data: mockInfo })
      ).json();
      expect(data.body).toEqual(mockInfo);
    });
    it("properly requests with authorization header", async () => {
      const mockToken = "mock-token";
      const response = await AsyncRequest.post({
        path: baseUrl,
        authorization: mockToken,
      });
      const data = await response.json();
      expect(data.authorization).toEqual(mockToken);
    });
  });
  describe("patch", () => {
    it("sends a patch request", async () => {
      const response = await AsyncRequest.patch({ path: baseUrl });
      const data = await response.json();
      expect(response.status).toEqual(200);
      expect(data.method).toEqual("PATCH");
    });
    it("properly sends data", async () => {
      const mockInfo = { email: "my@email.com", password: "foobar" };
      const response = await AsyncRequest.patch({
        path: baseUrl,
        data: mockInfo,
      });
      const data = await response.json();
      expect(data.body).toEqual(mockInfo);
    });
    it("properly requests with authorization header", async () => {
      const mockToken = "mock-token";
      const response = await AsyncRequest.patch({
        path: baseUrl,
        authorization: mockToken,
      });
      const data = await response.json();
      expect(data.authorization).toEqual(mockToken);
    });
  });
  describe("destroy", () => {
    it("sends a delete request", async () => {
      const response = await AsyncRequest.destroy({ path: baseUrl });
      const data = await response.json();
      expect(response.status).toEqual(200);
      expect(data.method).toEqual("DELETE");
    });
    it("properly requests with authorization header", async () => {
      const mockToken = "mock-token";
      const response = await AsyncRequest.destroy({
        path: baseUrl,
        authorization: mockToken,
      });
      const data = await response.json();
      expect(data.authorization).toEqual(mockToken);
    });
  });
});
