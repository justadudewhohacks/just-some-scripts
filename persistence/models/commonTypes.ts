export const declType = {
  type: { type: String, required: true },
  name: { type: String, required: true },
  arrayDepth: { type: Number },
  numArrayElements: { type: Number },
  _id: false
}

export const fieldDeclType = {
  ...declType,
  forClassesOnly: { type: [String] },
  _id: false
}

export const argType = {
  ...declType,
  defaultValue: { type: String },
  _id: false
}