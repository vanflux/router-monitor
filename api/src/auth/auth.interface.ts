export interface AuthToken {
  agent?: AuthTokenAgent;
  admin?: AuthTokenAdmin;
}

export interface AuthTokenAgent {
  id: string;
}

export interface AuthTokenAdmin {
  username: string;
}
