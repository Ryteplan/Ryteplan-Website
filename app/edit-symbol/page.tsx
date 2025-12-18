'use client';
import { BuilderComponent, builder } from '@builder.io/react';

// Replace with your Public API Key.
const BUILDER_API_KEY = 'YOUR_API_KEY';
builder.init(BUILDER_API_KEY);

const EditSymbolPage = () => {
  return <BuilderComponent model="symbol" />
};

export default EditSymbolPage;