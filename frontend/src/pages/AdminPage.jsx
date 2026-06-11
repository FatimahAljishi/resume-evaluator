import { useEffect, useState } from "react";
import client from "../api/client";

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await client.get("/admin/users");
    setUsers(response.data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function makeAdmin(email) {
    await client.patch(`admin/users/${email}/role`, {
      role: "admin",
    });

    loadUsers();
  }

  async function deleteUser(email) {
    await client.delete(`admin/users/${email}`);

    loadUsers();
  }

  return (
    <main>
      <h1>Admin Panel</h1>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                <button onClick={() => makeAdmin(user.email)}>
                  Make Admin
                </button>

                <button onClick={() => deleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
