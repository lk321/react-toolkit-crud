import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, selectAllUsers, addUser, deleteUser } from "../user.slice";

const Users = () => {
    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div>
            <button
                type="button"
                onClick={() =>
                    dispatch(
                        addUser({
                            first_name: "morpheus",
                            email: "leader",
                        })
                    )
                }
            >
                Add User
            </button>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        <button
                            type="button"
                            onClick={() => dispatch(deleteUser(u.id))}
                        >
                            {u.first_name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
