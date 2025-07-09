import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
