import kinkcenter from "../venues/kinkcenter";
import subspace from "../venues/subspace";
import cspc from "./cspc";
import magpie from "./magpie-kink";
import sanctum from "./sanctum";
import type { Organization } from "./types";

export const OrganizationList: Organization[] = [
  cspc,
  subspace,
  sanctum,
  kinkcenter,
  magpie,
];
