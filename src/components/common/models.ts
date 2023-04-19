import { SubjectResource } from "../../api/models";

export type AssignedSubjectResource = SubjectResource & {
  isNew?: boolean;
  isLocked?: boolean;
  isBurned?: boolean;
};
