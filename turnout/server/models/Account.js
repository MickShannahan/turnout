import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // REVIEW required rename to org
    orgName: { type: String },
    orgUrl: { type: String },
    orgColor: { type: String, required: true, default: '#16161d' }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

