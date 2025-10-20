const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pixelColor = document.getElementById("pixel_color");
const secretMessage = document.getElementById("secret_message");
const pixelSize = 5;
const relay = "wss://relay.damus.io";
const con = new WebSocket(relay);
let pixels = [];

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, 100, 100);

function place(x, y, color) {
  const gridX = Math.floor(x / pixelSize) * pixelSize;
  const gridY = Math.floor(y / pixelSize) * pixelSize;

  pixels.push({ x: gridX, y: gridY, color: color });
  ctx.fillStyle = color;
  ctx.fillRect(gridX, gridY, pixelSize, pixelSize);
}

async function sendPixelEvent(x, y, color) {
  if (window.nostr) {
    const event = await window.nostr.signEvent({
      content: secretMessage.value,
      created_at: Math.floor(Date.now() / 1000),
      kind: 2763,
      tags: [
        ["x", x.toString()],
        ["y", y.toString()],
        ["color", color],
      ],
    });
    const event2 = await window.nostr.signEvent({
      content:
        "pixel x: " +
        x.toString() +
        "\npixel y: " +
        y.toString() +
        "\npixel color: " +
        color +
        "\npixel message: " +
        secretMessage.value,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [["via", "nostr-pixels"]],
    });
    con.send(JSON.stringify(["EVENT", event]));
    con.send(JSON.stringify(["EVENT", event2]));
  }
}

con.onopen = async () => {
  con.send(JSON.stringify(["REQ", "pixels", { kinds: [2763] }]));
};

con.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  if (data[0] === "EVENT") {
    const event = data[2];
    if (event.kind === 2763) {
      const xTag = event.tags.find((t) => t[0] === "x");
      const yTag = event.tags.find((t) => t[0] === "y");
      const colorTag = event.tags.find((t) => t[0] === "color");
      if (xTag && yTag && colorTag) {
        const x = parseFloat(xTag[1]);
        const y = parseFloat(yTag[1]);
        const color = colorTag[1];
        place(x, y, color);
      }
    }
  }
};

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  place(x, y, pixelColor.value);
  sendPixelEvent(x, y, pixelColor.value);
});
