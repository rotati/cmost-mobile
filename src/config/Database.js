import Realm from "realm";

class Forms extends Realm.Object {}
Forms.schema = {
  name: "Forms",
  properties: {
    id: "string",
    name: "string",
    questions: "string",
    createdAt: "int",
    updatedAt: "int"
  }
}

class Responses extends Realm.Object {}
Responses.schema = {
  name: "Responses",
  primaryKey: 'id',
  properties: {
    id: "int",
    name: "string",
    formId: "string",
    answers: "string",
    finalized: "bool",
    submitted: "bool",
    createdAt: "int",
    updatedAt: "int"
  }
}

class Setting extends Realm.Object {}
Setting.schema = {
  name: "Setting",
  properties: {
    key: "string",
    value: "string"
  }
}

export default new Realm({ schema: [Responses, Forms, Setting], schemaVersion: 1 })