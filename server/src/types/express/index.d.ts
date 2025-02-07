// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
      user?: {
        id: number;
        id_user?: number;
        email: string;
        password: string;
        lastname: string;
        firstname: string;
      };
    }
  }
}
