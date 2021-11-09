import { Message } from "discord.js";

declare module "easy-economy" {
    export class Economy {
        constructor(uri: string, options: object);
        public daily(message: Message): Promies<number | null>
    }
}