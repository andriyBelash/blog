import { Tokens } from "@/src/types/enum";
import Cookies from "js-cookie";

export default class AuthTokenService {

  public static getAccessToken(): string | null {
    return Cookies.get(Tokens.ACCESS) || null;
  }

  public static setAccessToken(token: string): void {
    Cookies.set(Tokens.ACCESS, token, {
      expires: 1,
    });
  }

  public static getRefreshToken(): string | null {
    return Cookies.get(Tokens.REFRESH) || null;
  }

  public static setRefreshToken(token: string): void {
    Cookies.set(Tokens.REFRESH, token);
  }
  public static removeFromStorage(): void {
    Cookies.remove(Tokens.ACCESS);
  }
}