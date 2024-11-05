import { Request, Response } from "express";
import https from "https";
import { db } from "../../db/index.js";
import { botTable } from "../../db/botTelegram.js";

// const token = "7932535528:AAFO5hrI_Q9ZKFboAh5WWlWMIevQ5ormAHg"; // Ganti dengan token bot Anda

export async function getUpdates(req: Request, res: Response) {
  db.select({
    id: botTable.id,
    chat_id: botTable.chat_id,
    username: botTable.username,
    message_id: botTable.message_id,
    text: botTable.text,
    createdAt: botTable.createdAt,
  })
    .from(botTable)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({
        error: "An error occurred while fetching updates",
      });
    });
}
const token = "7932535528:AAFO5hrI_Q9ZKFboAh5WWlWMIevQ5ormAHg"; // Ganti dengan token bot Anda

export async function sendMessage(req: Request, res: Response) {
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
        } else {
          res.status(500).json({
            success: false,
            message: "Failed to send message",
          });
        }
      } catch (error) {
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
export async function handleTelegramWebhook(req: Request, res: Response) {
  const update = req.body;
  console.log(
    "Received update from Telegram:",
    JSON.stringify(update, null, 2)
  );

  const message = update.message;

  if (message && message.chat && message.from) {
    const chat_id = message.chat.id;
    const username = message.from.username || "unknown";
    const message_id = message.message_id;
    const text = message.text || "";

    try {
      // Simpan data ke database
      await db.insert(botTable).values({
        chat_id,
        username,
        message_id,
        text,
      });
      console.log(`Data inserted for message_id: ${message_id}`);
      res.json({ success: true });
    } catch (dbError) {
      console.error("Database insert error:", dbError);
      res.status(500).json({ success: false, error: "Database error" });
    }
  } else {
    console.error("Unexpected message structure:", update);
    res
      .status(400)
      .json({ success: false, error: "Invalid message structure" });
  }
}

// export async function handleTelegramWebhook(req: Request, res: Response) {
//   console.log("Received webhook:", req.body);
//   res.status(200).json({ success: true });
// }
