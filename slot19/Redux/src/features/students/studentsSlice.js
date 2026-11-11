import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { studentApi } from '../../api/studentApi.js'

const errorMessage = (error) =>
  error.response?.data?.message || error.message || 'Có lỗi xảy ra'

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await studentApi.getAll()
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  },
)

export const addStudent = createAsyncThunk(
  'students/add',
  async (student, { getState, rejectWithValue }) => {
    const exists = getState().students.items.some(
      (item) => item.code.toLowerCase() === student.code.toLowerCase(),
    )
    if (exists) return rejectWithValue(`Mã sinh viên ${student.code} đã tồn tại`)
    try {
      return await studentApi.create(student)
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  },
)

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      return await studentApi.update(id, { id, ...data })
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  },
)

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await studentApi.remove(id)
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  },
)

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    items: [],
    status: 'idle',
    saving: false,
    error: null,
    keyword: '',
    sortBy: 'code',
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (student) => student.id === action.payload.id,
        )
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (student) => student.id !== action.payload,
        )
      })
      .addMatcher(isPending(addStudent, updateStudent, deleteStudent), (state) => {
        state.saving = true
        state.error = null
      })
      .addMatcher(isRejected(addStudent, updateStudent, deleteStudent), (state, action) => {
        state.error = action.payload ?? action.error.message
      })
      .addMatcher(
        (action) =>
          [addStudent, updateStudent, deleteStudent].some(
            (thunk) => thunk.fulfilled.match(action),
          ),
        (state) => {
          state.saving = false
        },
      )
      .addMatcher(
        isRejected(addStudent, updateStudent, deleteStudent),
        (state) => {
          state.saving = false
        },
      )
  },
})

export const { clearError, setKeyword, setSortBy } = studentsSlice.actions
export default studentsSlice.reducer

export const selectStudentsState = (state) => state.students
const selectItems = (state) => state.students.items
const selectKeyword = (state) => state.students.keyword
const selectSortBy = (state) => state.students.sortBy

export const selectVisibleStudents = createSelector(
  [selectItems, selectKeyword, selectSortBy],
  (items, keyword, sortBy) => {
    const normalizedKeyword = keyword.trim().toLowerCase()
    const filtered = normalizedKeyword
      ? items.filter(
          (student) =>
            student.name.toLowerCase().includes(normalizedKeyword) ||
            student.code.toLowerCase().includes(normalizedKeyword),
        )
      : items
    return [...filtered].sort((a, b) =>
      sortBy === 'gpa'
        ? Number(b.gpa) - Number(a.gpa)
        : String(a[sortBy]).localeCompare(String(b[sortBy]), 'vi'),
    )
  },
)

export const selectAverageGpa = createSelector([selectItems], (items) =>
  items.length
    ? (
        items.reduce((sum, student) => sum + Number(student.gpa), 0) /
        items.length
      ).toFixed(2)
    : '0.00',
)
