# Nostr Pixels
r/place but on Nostr

The event kind for a single pixel is `2763`, it's also reposted as a kind `1` event with the same content as the pixel

## Example kind 2763 event
```json
{
  "id": "event identifier",
  "pubkey": "public key",
  "created_at": 0,
  "kind": 2763,
  "tags": [
    ["x", "0"],
    ["y", "0"],
    ["color", "#000000"]
  ],
  "content": "secret message",
  "sig": "event signature"
}
```
