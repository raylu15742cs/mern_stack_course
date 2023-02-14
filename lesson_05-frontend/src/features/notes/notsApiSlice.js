import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const NotesAdapter = createEntityAdapter({});

const initialState = NotesAdapter.getInitialState();

export const NotesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => '/Notes',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((Note) => {
          Note.id = Note._id;
          return Note;
        });
        return NotesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Note', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Note', id })),
          ];
        } else return [{ type: 'Note', id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetNotesQuery } = NotesApiSlice;

// returns the query result object
export const selectNotesResult = NotesApiSlice.endpoints.getNotes.select();

// creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (NotesResult) => NotesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with alieses using destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  // Pass in a selector that returns the Notes slice of state
} = NotesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
