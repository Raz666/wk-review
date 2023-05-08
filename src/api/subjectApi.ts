import {
  AssignmentsCollection,
  ReviewsCollection,
  ReviewStatisticsCollection,
  StudyMaterialsCollection,
  SubjectResource,
  SubjectsCollection,
} from "./models";
import { api } from "./rtkApi";
import { useDataUpdatedAt } from "./useDataUpdatedAt";

export const subjectApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSubject: build.query<SubjectResource, { subjectId: number }>({
      providesTags: ["Subject"],
      query: ({ subjectId }) => ({
        url: `/subjects/${subjectId}`,
        headers: { "If-Modified-Since": useDataUpdatedAt() },
      }),
    }),
    getSubjects: build.query<
      SubjectsCollection,
      { subjectIds?: number[]; levels?: number[] }
    >({
      providesTags: ["Subject"],
      query: ({ subjectIds, levels }) => ({
        url:
          "/subjects?" +
          (subjectIds ? `ids=${subjectIds}` : "") +
          (levels ? `levels=${levels}` : ""),
        headers: { "If-Modified-Since": useDataUpdatedAt() },
      }),
    }),
    getStudyMaterials: build.query<
      StudyMaterialsCollection,
      { subjectId: number }
    >({
      providesTags: ["StudyMaterials"],
      query: ({ subjectId }) => ({
        url: `/study_materials?subject_ids=${subjectId}`,
        headers: { "If-Modified-Since": useDataUpdatedAt() },
      }),
    }),
    getReviewStats: build.query<
      ReviewStatisticsCollection,
      { subjectId: number }
    >({
      providesTags: ["ReviewStatistics"],
      query: ({ subjectId }) => ({
        url: `/review_statistics?subject_ids=${subjectId}`,
        headers: { "If-Modified-Since": useDataUpdatedAt() },
      }),
    }),
    getReviews: build.query<ReviewsCollection, { subjectId: number }>({
      providesTags: ["Reviews"],
      query: ({ subjectId }) => ({
        url: `/reviews?subject_ids=${subjectId}`,
        headers: { "If-Modified-Since": useDataUpdatedAt() },
      }),
    }),
    getAssignments: build.query<
      AssignmentsCollection,
      { subjectIds?: number[]; levels?: number[] }
    >({
      providesTags: ["Assignments"],
      query: ({ subjectIds, levels }) => ({
        url:
          "/assignments?" +
          (subjectIds ? `ids=${subjectIds}` : "") +
          (levels ? `levels=${levels}` : ""),
        headers: { "If-Modified-Since": useDataUpdatedAt() },
      }),
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
  useGetAssignmentsQuery,
} = subjectApi;
