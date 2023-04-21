import { SubjectResource, SubjectType } from "../../api/models";
import { Context } from "./Context";
import { FoundIn } from "./FoundIn";
import { Meaning } from "./Meaning";
import { Progression } from "./Progression";
import { RadicalCombination } from "./RadicalCombination";
import { Reading } from "./Reading";

type Props = {
  subject: SubjectResource;
  goToSubject: (subjectId: number) => void;
};

export const useSections = ({ subject, goToSubject }: Props) => {
  const { object } = subject;
  const isRadical = object === "radical";
  const isKanji = object === "kanji";
  const isVocab = object === "vocabulary";
  const {
    amalgamation_subject_ids,
    component_subject_ids,
    context_sentences: sentences,
  } = subject.data;
  const subjectId = subject.id;
  const subjectIds = isVocab ? component_subject_ids : amalgamation_subject_ids;

  const getMeaningTitle = (object: SubjectType) => {
    switch (object) {
      case "radical":
        return "Name";
      case "vocabulary":
        return "Explanation";
      default:
        return "Meaning";
    }
  };

  const getFoundInTitle = (object: SubjectType) => {
    switch (object) {
      case "radical":
        return "Found In Kanji";
      case "vocabulary":
        return "Kanji Composition";
      default:
        return "Found In Vocabulary";
    }
  };

  const sections: {
    name: string;
    component: JSX.Element | null;
    hideHeader?: boolean;
  }[] = [
    {
      name: "Radical Combination",
      component: isKanji ? RadicalCombination({ subject, goToSubject }) : null,
    },
    { name: getMeaningTitle(object), component: Meaning({ subject }) },
    {
      name: isKanji ? "Readings" : "Reading",
      component: !isRadical ? Reading({ subject }) : null,
    },
    {
      name: "Context",
      component: sentences ? Context({ sentences }) : null,
    },
    {
      name: getFoundInTitle(object),
      component: FoundIn({ type: object, goToSubject, subjectIds }),
    },
    {
      name: "Progress",
      component: Progression({ subjectId }),
      hideHeader: true,
    },
  ];

  // console.log(sections);
  const filteredSections = sections.filter((s) => s.component !== null);
  // console.log(filteredSections);
  return filteredSections;
};
