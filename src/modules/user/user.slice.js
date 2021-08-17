import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
    status: "idle",
});

export const fetchUserById = createAsyncThunk(
    "users/fetchUserById",
    async (id) => {
        const response = await fetch(`https://reqres.in/api/users/${id}`).then(
            (res) => res.json()
        );

        return response.data;
    }
);

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await fetch("https://reqres.in/api/users").then((res) =>
        res.json()
    );

    return response.data;
});

export const addUser = createAsyncThunk("user/add", async (body) => {
    const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        body: JSON.stringify(body),
    }).then((res) => res.json());

    return { ...body, ...response };
});

export const updateUser = createAsyncThunk("user/update", async (body) => {
    const response = await fetch(`https://reqres.in/api/users/${body.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
    }).then((res) => res.json());

    return response;
});

export const deleteUser = createAsyncThunk("user/delete", async (id) =>
    fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
    }).then(() => id)
);

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUsers: usersAdapter.addMany,
        removeUser: usersAdapter.removeOne,
    },
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.status = "loading";
        },
        [fetchUsers.fulfilled]: (state, { payload }) => {
            state.status = "success";

            usersAdapter.setAll(state, payload);
        },
        [fetchUsers.rejected]: (state) => {
            state.status = "failed";
        },
        [fetchUserById.fulfilled]: (state, { payload }) => {
            state.status = "success";

            usersAdapter.setOne(state, payload);
        },
        [addUser.fulfilled]: (state, { payload }) => {
            state.status = "success";

            usersAdapter.addOne(state, payload);
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.status = "success";

            usersAdapter.updateOne(state, payload);
            // usersAdapter.updateOne(state, {
            //     id: payload.id,
            //     changes: payload.changes,
            // });
        },
        [deleteUser.fulfilled]: (state, { payload }) => {
            state.status = "success";

            usersAdapter.removeOne(state, payload);
        },
    },
});

export const { addUsers, removeUser } = usersSlice.actions;

export const selectUsersAdapter = (state) => state.user;

export const {
    selectAll: selectAllUsers,
    selectById: selectUsersById,
    selectEntities: selectUsersEntities,
    selectIds: selectUsersIds,
    selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors(selectUsersAdapter);

// export const selectors = usersAdapter.getSelectors(selectUsersAdapter);

export default usersSlice.reducer;
