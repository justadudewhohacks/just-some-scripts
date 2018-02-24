export const declType = {
  type: { type: String, required: true },
  name: { type: String, required: true },
  arrayDepth: { type: Number },
  numArrayElements: { type: Number }
}

export const fieldDeclType ={
  ...declType,
  forClassesOnly: { type: [String] }
}

export const argType = {
  ...declType,
  defaultValue: { type: String }
}