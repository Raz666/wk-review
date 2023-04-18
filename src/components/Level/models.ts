import { SubjectResource, SubjectType } from "../../api/models";

export type AssignedSubjectResource = SubjectResource & {
  isNew: boolean;
  isLocked: boolean;
};

export type LevelSubjectGroup = {
  type: SubjectType;
  name: string;
  subjects: AssignedSubjectResource[];
};
