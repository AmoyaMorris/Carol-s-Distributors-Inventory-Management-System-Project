async function loadUsers() {

    let users = await apiGet("/users/");
    let table = document.getElementById("users-table");

    table.innerHTML = "";

    if (!users || users.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4" class="empty-state">
                    No users found.
                </td>
            </tr>
        `;
        return;
    }

    users.forEach(u => {

        table.innerHTML += `
            <tr>
                <td>
                    <strong>${u.username}</strong>
                </td>

                <td>
                    ${u.role}
                </td>

                <td>
                    <span class="badge active">ACTIVE</span>
                </td>

                <td>
                    <button 
                        class="btn-danger"
                        onclick="deleteUser(${u.user_id})">

                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}


async function deleteUser(id) {

    if (!confirm("Delete this user account?\nThis cannot be undone.")) return;

    let res = await apiDelete(`/users/${id}`);

    if(res?.error){
        alert(res.error);
        return;
    }

    alert("User deleted successfully");
    
    loadUsers();
}


window.addEventListener("DOMContentLoaded", loadUsers);
