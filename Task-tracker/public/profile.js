CTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login/Register</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .auth-container {
            background-image: linear-gradient(to right,  GreenYellow, Seagreen);
            padding: 20px;
            border-radius: 8px;
            border: 5px solid darkslategrey;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
        }

        .form-toggle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
 
        .form-toggle button {
            width: 48%;
            padding: 10px;
            background-color: darkslategray;
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 4px;
        }

        .form-toggle button.active {
            background-color: green;
        }

        .form-toggle button:not(.active) {
            background-color: darkseagreen;
        }

        .form {
            display: none;
        }

        .form.active {
            display: block;
        }

        form input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px deep #ccc;
            border-radius: 4px;
        }

        form button {
            width: 100%;
            padding: 10px;
            background-color: #5cb85c;
            border: none;
            color: white;
            border-radius: 4px;
            cursor: pointer;
        }

        form button:hover {
            background-color: #4cae4c;
        }

    </style>
</head>
<body>
    <div class="auth-container">
        <div class="form-toggle">
            <button id="loginToggle" class="active">Login</button>
            <button id="registerToggle">Register</button>
        </div>

        <!-- Login Form -->
        <form id="loginForm" class="form active">
            <h1>Login</h1>
            <input type="email" id="loginEmail" placeholder="Email" required>
            <input type="password" id="loginPassword" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>

        <!-- Register Form -->
        <form id="registerForm" class="form">
            <h1>Register</h1>
            <input type="text" id="registerUsername" placeholder="Username" required>
            <input type="email" id="registerEmail" placeholder="Email" required>
            <input type="password" id="registerPassword" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    </div>

    <script src="scripts.js"></script>
</body>
</html>

