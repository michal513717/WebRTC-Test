import type { Request } from "express";
import type { v4 } from 'uuid';

export type ConnectRoomRequest = Request<uuidRequest, {}, {}, {}>;

type uuidRequest = { room: typeof v4 };