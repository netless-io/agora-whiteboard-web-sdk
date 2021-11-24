import { createRoom } from "./common";

const { VITE_TOKEN, VITE_ROOM_UUID, VITE_ROOM_TOKEN } = import.meta.env;

export async function prepare(): Promise<{ uuid: string; roomToken: string }> {
  let uuid: string | undefined;
  let roomToken: string | undefined;

  const query = new URLSearchParams(location.search);
  if (query.has("uuid") && query.has("roomToken")) {
    uuid = query.get("uuid") as string;
    roomToken = query.get("roomToken") as string;
  }

  if (!uuid || !roomToken) {
    const room = JSON.parse(localStorage.getItem("room") || "{}");
    if (room.uuid && room.roomToken) {
      ({ uuid, roomToken } = room);
    }
  }

  if (!uuid || !roomToken) {
    uuid = VITE_ROOM_UUID;
    roomToken = VITE_ROOM_TOKEN;
  }

  if ((!uuid || !roomToken) && VITE_TOKEN) {
    const shouldCreateRoom = window.confirm(
      "Not found uuid/roomToken both in query and localStorage and env, create one?"
    );
    if (shouldCreateRoom) {
      ({ uuid, roomToken } = await createRoom());
    }
  }

  if (!uuid || !roomToken) {
    throw new Error("Not found uuid/roomToken both in query and localStorage and env.");
  }

  return { uuid, roomToken };
}
