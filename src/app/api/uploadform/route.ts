import { incrementApiLimit, checkApiLimit } from "../../../../prisma/api-limit";
import http from 'http';

export async function POST(req, res) {
    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end("Free trial has expired. Please upgrade to pro.");
        return;
    }
    // You can send any response you want here
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(freeTrial));
};

// This part assumes you're using this function in a server setup
const server = http.createServer((req, res) => {
    // Assuming this route is for POST requests
    if (req.method === 'POST') {
        POST(req, res);
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end("Method Not Allowed");
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
