// models/Code.ts

import mongoose, { Schema, Document } from 'mongoose';

interface ICode extends Document {
  title: string;
  description: string;
  code: string;
  language: string;
  type:string
}

const codeSchema = new Schema<ICode>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  type: { type: String, required: true },
});

const Code = mongoose.models.Code || mongoose.model<ICode>('Code', codeSchema);

export default Code;
