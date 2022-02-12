import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  return createServer({
    environment,

    models: {
      login: Model,
      changePassword: Model,
      registration: Model,
    },

    routes() {
      this.namespace = "api";

      this.post("/registration", function (schema, request) {
        let attrs = JSON.parse(request.requestBody).registration;

        if (attrs) {
          return schema.authors.create(attrs);
        } else {
          return new Response(
            400,
            { some: "header" },
            { errors: ["name cannot be blank"] }
          );
        }
      });
      this.post("/login", function (schema, request) {
        let attrs = JSON.parse(request.requestBody).login;

        if (attrs) {
          return schema.authors.create(attrs);
        } else {
          return new Response(
            400,
            { some: "header" },
            { errors: ["name cannot be blank"] }
          );
        }
      });
      this.post("/changePassword", function (schema, request) {
        let attrs = JSON.parse(request.requestBody).login;

        return schema.reminders.create(attrs)
      });

      this.get("/registration");
    },
  });
}
