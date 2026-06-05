import { Attribution } from "ox/erc8021";

export const BASE_APP_ID =
  process.env.NEXT_PUBLIC_BASE_APP_ID ?? "replace-with-base-dev-verify-token";

export const BUILDER_CODE = process.env.NEXT_PUBLIC_BASE_BUILDER_CODE ?? "";

export const ATTRIBUTION_DATA_SUFFIX = BUILDER_CODE
  ? Attribution.toDataSuffix({ codes: [BUILDER_CODE] })
  : "0x";

export const hasBuilderCode = ATTRIBUTION_DATA_SUFFIX !== "0x";
