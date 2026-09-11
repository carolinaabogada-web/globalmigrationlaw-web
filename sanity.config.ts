"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId, studioTitle } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  title: studioTitle,
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision lets an admin run raw GROQ queries — handy for debugging,
    // hidden from the main nav for everyday editors.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
