import { IoAdapter } from "@nestjs/platform-socket.io";
import { Pool } from "pg";

export class SocketAdapter extends IoAdapter {
    createIOServer(port: number, options?: any) {
        console.log(port, options);
        const server = super.createIOServer(port, options);
        const pool = new Pool({
            user: "mysql",
            host: "localhost",
            database: "waydn",
            password: "ehdgud#dk1",
            port: 3306,
        })
        return server;
    }
}