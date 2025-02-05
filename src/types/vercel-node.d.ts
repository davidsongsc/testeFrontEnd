// types/vercel-node.d.ts
import { IncomingMessage, ServerResponse } from 'http';

declare module '@vercel/node' {
  export interface VercelRequest extends IncomingMessage {
    body: any;
    query: { [key: string]: string | string[] };
  }
  export interface VercelResponse extends ServerResponse {}
}
