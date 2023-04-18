import { SubjectResource, SubjectType } from "../../api/models";
import { AssignedSubjectResource } from "../common";

export type LevelSubjectGroup = {
  type: SubjectType;
  name: string;
  subjects: AssignedSubjectResource[];
};
