const API_URL = "http://localhost:5000"; 
let currentUser = null;

// ✅ Register Function
async function register() {
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    console.log("Register clicked:", name, email);

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        console.log("Register Response:", data);

        if (res.ok) {
            alert("✅ Registration successful! Please login.");
            showLogin();
        } else {
            alert("❌ Error: " + (data.error || "Registration failed"));
        }
    } catch (err) {
        console.error("Error during register:", err);
        alert("Something went wrong!");
    }
}

// ✅ Login Function
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log("Login Response:", data);

        if (res.ok) {
            alert("✅ Login successful!");
            currentUser = data.user;

            document.getElementById("login-section").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
            loadTickets();
        } else {
            alert("❌ Invalid credentials");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong!");
    }
}

// ✅ Create Ticket
async function createTicket() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    const res = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            description,
            status,
            createdBy: currentUser._id
        })
    });

    if (res.ok) {
        alert("✅ Ticket Created!");
        loadTickets();
    } else {
        alert("❌ Error creating ticket");
    }
}

// ✅ Load Tickets
async function loadTickets() {
    const res = await fetch(`${API_URL}/tickets`);
    const tickets = await res.json();

    const ticketList = document.getElementById("ticket-list");
    ticketList.innerHTML = "";

    tickets.forEach(ticket => {
        ticketList.innerHTML += `
            <tr>
                <td>${ticket.title}</td>
                <td>${ticket.status}</td>
                <td>${new Date(ticket.createdAt).toLocaleString()}</td>
            </tr>
        `;
    });
}

// ✅ Switch Forms
function showRegister() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "block";
}

function showLogin() {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}
