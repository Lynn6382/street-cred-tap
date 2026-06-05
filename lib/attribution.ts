export const BASE_APP_ID =
  process.env.NEXT_PUBLIC_BASE_APP_ID ?? "6a229eff2280de924021e2ac";

export const BUILDER_CODE =
  process.env.NEXT_PUBLIC_BASE_BUILDER_CODE ?? "bc_hofdklqz";

export const ATTRIBUTION_DATA_SUFFIX =
  (process.env.NEXT_PUBLIC_BASE_DATA_SUFFIX ??
    "0x62635f686f66646b6c717a0b0080218021802180218021802180218021") as `0x${string}`;

export const hasBuilderCode = ATTRIBUTION_DATA_SUFFIX !== "0x";
