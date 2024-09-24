t net = require('net');
const readline = require('readline');

// Create a Readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Connect to the server
const client = net.createConnection({ port: 8080 }, () => {
    console.log('Connected to the server.');
    client.on('data', (data) => {
        console.log(data.toString());
        promptUser();
    });
});

// Prompt user for input
const promptUser = () => {
    rl.question("Enter command (add/done/remove/view/list/quit): ", (input) => {
        client.write(input);
        if (input.toLowerCase() === 'quit') {
            rl.close();
        }
    });
};

// Handle disconnection from the server
client.on('end', () => {
    console.log('Disconnected from the server.');
});
