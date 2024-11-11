import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import { IAppConfig } from "../shared.model";

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  private config: IAppConfig | undefined;

  constructor(private http: HttpClient) {}

  loadConfig() {
    const configUrl = environment.configFile;
    return firstValueFrom(this.http.get(configUrl))
      .then((config) => {
        this.config = config as IAppConfig;
      })
      .catch((error) => {
        console.error("Could not load config file:", error);
      });
  }

  getServerUrl(): string {
    return `${this.config?.apiServer.url}:${this.config?.apiServer.port}${this.config?.apiServer.suffix}`;
  }

  getConfig() {
    return this.config;
  }
}
