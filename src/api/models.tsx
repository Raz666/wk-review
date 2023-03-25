type Pages = {
  per_Page: number;
  next_url: string;
  previous_url: string;
};
type Resource<T> = {
  id: number;
  object: SubjectType;
  url: string;
  data_updated_at: string;
  data: T;
};
type Collection<Resource> = {
  object: string;
  url: string;
  pages: Pages;
  total_count: number;
  data_updated_at: string;
  data: Array<Resource>;
};

type SubjectType =
  | "assignment"
  | "kanji"
  | "level_progression"
  | "radical"
  | "reset"
  | "review_statistic"
  | "review"
  | "spaced_repetition_system"
  | "study_material"
  | "user"
  | "vocabulary";
type MeaningType = "whitelist" | "blacklist";
export type ReadingType = "kunyomi" | "nanori" | "onyomi";

export type Meaning = {
  meaning: string;
  primary: boolean;
  accepted_answer: boolean;
};
type AuxiliaryMeaning = {
  type: MeaningType;
  meaning: string;
};
export type Reading = {
  type: ReadingType;
  primary: boolean;
  reading: string;
  accepted_answer: boolean;
  label?: string;
};

export type Subject = {
  created_at: string;
  level: number;
  slug: string;
  hidden_at?: string;
  document_url: string;
  characters: string;
  meanings: Meaning[];
  auxiliary_meanings: AuxiliaryMeaning[];
  readings: Reading[];
  component_subject_ids: number[];
  amalgamation_subject_ids: number[];
  visually_similar_subject_ids: number[];
  meaning_mnemonic: string;
  meaning_hint: string;
  reading_mnemonic: string;
  reading_hint: string;
  lesson_Position: number;
  spaced_repetition_system_id: number;
};
export type SubjectResource = Resource<Subject>;
export type SubjectsCollection = Collection<SubjectResource>;

export type StudyMaterial = {
  created_at: string;
  subject_id: number;
  subject_type: SubjectType;
  meaning_note?: string;
  reading_note?: string;
  meaning_synonyms: string[];
  hidden: boolean;
};
export type StudyMaterialResource = Resource<StudyMaterial>;
export type StudyMaterialsCollection = Collection<StudyMaterialResource>;

export type ReviewStatistic = {
  created_at: string;
  subject_id: number;
  subject_type: SubjectType;
  meaning_correct: number;
  meaning_incorrect: number;
  meaning_max_streak: number;
  meaning_current_streak: number;
  reading_correct: number;
  reading_incorrect: number;
  reading_max_streak: number;
  reading_current_streak: number;
  percentage_correct: number;
  hidden: boolean;
};
export type ReviewStatisticResource = Resource<ReviewStatistic>;
export type ReviewStatisticsCollection = Collection<ReviewStatisticResource>;

export enum SrsStage {
  Apprentice_1 = 1,
  Apprentice_2 = 2,
  Apprentice_3 = 3,
  Apprentice_4 = 4,
  Guru_1 = 5,
  Guru_2 = 6,
  Master = 7,
  Enlightened = 8,
  Burned = 9,
}
export type Review = {
  created_at: string;
  assignment_id: number;
  subject_id: number;
  spaced_repetition_system_id: number;
  starting_srs_stage: SrsStage;
  ending_srs_stage: SrsStage;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
};
export type ReviewResource = Resource<Review>;
export type ReviewsCollection = Collection<ReviewResource>;
