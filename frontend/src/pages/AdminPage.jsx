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
    <main className="admin-page">
      <div className="admin-card">
        <h2>Admin Panel</h2>

        <table className="users-table">
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

                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>

                <td className="actions">
                  <button
                    className="promote-btn"
                    onClick={() => makeAdmin(user.email)}
                  >
                    Make Admin
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
