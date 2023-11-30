// Test API with petstore3
//
import OpenAPIClientAxios from "openapi-client-axios";
import type { Client } from "./openapi";

const api = new OpenAPIClientAxios({
  definition: "https://petstore3.swagger.io/api/v3/openapi.json",
  withServer: {
    url: "https://petstore3.swagger.io/api/v3/",
    description: "Test Server",
  },
});
api.init();

export async function testAPI() {
  const client = await api.getClient<Client>();
  const res = await client.findPetsByStatus({ status: "available" });
  const data = res.data;
  return data;
}
