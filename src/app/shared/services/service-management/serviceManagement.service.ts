import { Injectable } from "@angular/core";
import { ConfigService } from ".././config/config.service";
import { AuthService } from ".././auth/auth.service";

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

@Injectable()
export class ServiceManagementService {
  authHeaders: HttpHeaders;

  constructor(
    private authService: AuthService,
    private config: ConfigService,
    private http: HttpClient
  ) {}

  getNetworkServices(): any {
    return new Promise((resolve, reject) => {
      let headers = this.authService.getAuthHeaders();
      headers.set("Content-Type", "application/json");

      this.http
        .get(this.config.ROUTES.BASE + this.config.ROUTES.SERVICES, {
          headers: headers
        })
        .subscribe(
          response => {
            if (response[0].hasOwnProperty("nsd")) {
              resolve(response);
            } else {
              resolve([]);
            }
          },
          (error: HttpErrorResponse) => {
            reject(error.statusText);
          }
        );
    });
  }

  getNetworkService(uuid: string): any {
    return new Promise((resolve, reject) => {
      let headers = this.authService.getAuthHeaders();

      this.http
        .get(this.config.ROUTES.BASE + this.config.ROUTES.SERVICES + uuid, {
          headers: headers
        })
        .subscribe(
          response => {
            if (response.hasOwnProperty("nsd")) {
              resolve(response);
            } else {
              resolve({});
            }
          },
          (error: HttpErrorResponse) => {
            reject(error.statusText);
          }
        );
    });
  }

  getRequests(): any {
    return new Promise((resolve, reject) => {
      let headers = this.authService.getAuthHeaders();
      this.http
        .get(this.config.ROUTES.BASE + this.config.ROUTES.REQUESTS, {
          headers: headers
        })
        .subscribe(
          response => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error.statusText);
          }
        );
    });
  }

  getLicences(): any {
    return new Promise((resolve, reject) => {
      let headers = this.authService.getAuthHeaders();
      this.http
        .get(this.config.ROUTES.BASE + this.config.ROUTES.LICENCES, {
          headers: headers
        })
        .subscribe(
          response => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error.statusText);
          }
        );
    });
  }

  getInstances(): any {
    return new Promise((resolve, reject) => {
      let headers = this.authService.getAuthHeaders();
      this.http
        .get(this.config.ROUTES.BASE + this.config.ROUTES.INSTANCES, {
          headers: headers
        })
        .subscribe(
          response => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 404) {
              resolve([]);
            } else {
              reject(error.statusText);
            }
          }
        );
    });
  }

  postVims(): any {
    return new Promise((resolve, reject) => {
      let headers = this.authService.getAuthHeaders();

      let data = {
        compute_configuration: {
          tenant_id: "name",
          vim_address: "ip_address",
          tenant_ext_router: "uuid",
          tenant_ext_net: "uuid",
          username: "username",
          pass: "password"
        },
        networking_configuration: {
          username: "username",
          pass: "password",
          vim_address: "ip_address"
        },
        wim_id: "name",
        country: "country",
        city: "city",
        name: "nombre"
      };

      this.http
        .post(this.config.ROUTES.BASE + this.config.ROUTES.VIMS, data, {
          headers: headers
        })
        .subscribe(
          response => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error.statusText);
          }
        );
    });
  }

  getVims(uuid): any {
    return new Promise((resolve, reject) => {
      let headers = this.authService.getAuthHeaders();

      this.http
        .get(this.config.ROUTES.BASE + this.config.ROUTES.VIMS + uuid, {
          headers: headers
        })
        .subscribe(
          response => {
            // TODO RETURN AN ARRAY OF LOCATIONS
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error.statusText);
          }
        );
    });
  }

  instantiate(
    service: Object,
    ingress: Array<Object>,
    egress: Array<Object>,
    sla: String
  ) {
    console.log(ingress);
    console.log(egress);
    console.log(sla);
    // Send request to instantiate with data
    // Wait for the response / check the status of instantiation
    // Show toast saying success/error with id xxxxx
  }
}
