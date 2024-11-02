import https from "https";
const token = "7932535528:AAFO5hrI_Q9ZKFboAh5WWlWMIevQ5ormAHg"; // Ganti dengan token bot Anda
export async function getUpdates(req, res) {
    const url = `https://api.telegram.org/bot${token}/getUpdates`;
    https
        .get(url, (response) => {
        let data = "";
        // Mengumpulkan data dari response
        response.on("data", (chunk) => {
            data += chunk;
        });
        // Setelah selesai menerima data
        response.on("end", () => {
            try {
                const jsonData = JSON.parse(data);
                if (jsonData.ok && jsonData.result) {
                    // Mengembalikan semua data pembaruan (updates) dari Telegram
                    res.json({ success: true, updates: jsonData.result });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: "Failed to fetch updates",
                    });
                }
            }
            catch (error) {
                console.error("Error parsing JSON:", error);
                res.status(500).json({
                    success: false,
                    message: "Failed to parse response data",
                });
            }
        });
    })
        .on("error", (err) => {
        console.error("Request error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to get updates",
        });
    });
}
export async function sendMessage(req, res) {
    const { chat_id, text } = req.body; // Ambil chat_id dan text dari body request
    // Log untuk memeriksa nilai yang diterima
    console.log("Chat ID:", chat_id);
    console.log("Text:", text);
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const data = JSON.stringify({
        chat_id: chat_id, // Pastikan menggunakan chat_id
        text: text,
    });
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data),
        },
    };
    const reqApi = https.request(url, options, (response) => {
        let responseData = "";
        response.on("data", (chunk) => {
            responseData += chunk;
        });
        response.on("end", () => {
            try {
                const jsonResponse = JSON.parse(responseData);
                console.log("Telegram Response:", jsonResponse);
                if (jsonResponse.ok) {
                    res.json({ success: true, message: "Message sent successfully" });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: "Failed to send message",
                    });
                }
            }
            catch (error) {
                console.error("Error parsing JSON:", error);
                res.status(500).json({
                    success: false,
                    message: "Failed to parse response data",
                });
            }
        });
    });
    reqApi.on("error", (error) => {
        console.error("Request error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    });
    reqApi.write(data);
    reqApi.end();
}
