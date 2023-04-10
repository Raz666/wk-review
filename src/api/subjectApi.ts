import {
  ReviewsCollection,
  ReviewStatisticsCollection,
  StudyMaterialsCollection,
  SubjectResource,
  SubjectsCollection,
} from "./models";
import { api } from "./rtkApi";

export const subjectApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSubject: build.query<SubjectResource, { subjectId: number }>({
      providesTags: ["Subject"],
      query: ({ subjectId }) => `/subjects/${subjectId}`,
    }),
    getSubjects: build.query<
      SubjectsCollection,
      { subjectIds?: number[]; levels?: number[] }
    >({
      providesTags: ["Subject"],
      query: ({ subjectIds, levels }) =>
        "/subjects?" +
        (subjectIds ? `ids=${subjectIds}` : "") +
        (levels ? `levels=${levels}` : ""),
    }),
    getStudyMaterials: build.query<
      StudyMaterialsCollection,
      { subjectId: number }
    >({
      providesTags: ["StudyMaterials"],
      query: ({ subjectId }) => `/study_materials?subject_ids=${subjectId}`,
    }),
    getReviewStats: build.query<
      ReviewStatisticsCollection,
      { subjectId: number }
    >({
      providesTags: ["ReviewStatistics"],
      query: ({ subjectId }) => `/review_statistics?subject_ids=${subjectId}`,
    }),
    getReviews: build.query<ReviewsCollection, { subjectId: number }>({
      providesTags: ["Reviews"],
      query: ({ subjectId }) => `/reviews?subject_ids=${subjectId}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSubjectQuery,
  useGetSubjectsQuery,
  useGetStudyMaterialsQuery,
  useGetReviewStatsQuery,
  useGetReviewsQuery,
} = subjectApi;
