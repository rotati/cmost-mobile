import Realm from "realm";

class BlankForm extends Realm.Object {}
BlankForm.schema = {
  name: "BlankForm",
  properties: {
    id: "string",
    name: "string",
    questions: "string",
    createdAt: "int",
    updatedAt: "int"
  }
}

class Form extends Realm.Object {}
Form.schema = {
  name: "Form",
  properties: {
    id: "string",
    name: "string",
    blankFormId: "string",
    questions: "string",
    createdAt: "int",
    updatedAt: "int"
  }
}

export default new Realm({ schema: [BlankForm, Form], schemaVersion: 1 })