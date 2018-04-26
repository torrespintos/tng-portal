import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import { NgForm } from "@angular/forms";

import { ServiceManagementService } from "../shared/services/service-management/serviceManagement.service";

@Component({
  selector: "app-instantiate-dialog",
  templateUrl: "./instantiate-dialog.component.html",
  styleUrls: ["./instantiate-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class InstantiateDialogComponent implements OnInit {
  sla: string;
  isIngress = true;
  ingress = new Array();
  egress = new Array();
  locations = ["None"];
  // TODO GET possible sla
  slas = ["SLA1", "SLA2"];

  constructor(
    public dialogRef: MatDialogRef<InstantiateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceManagementService: ServiceManagementService
  ) {}

  ngOnInit() {
    this.serviceManagementService
      .postVims()
      .then(response => {
        this.serviceManagementService
          .getVims(response.resource_uuid)
          .then(response => {
            this.locations.concat(response);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  addNew(instantiationForm: NgForm) {
    if (this.isIngress) {
      this.ingress.push({
        location: instantiationForm.controls.location.value,
        nap: instantiationForm.controls.nap.value
      });
    } else {
      this.egress.push({
        location: instantiationForm.controls.location.value,
        nap: instantiationForm.controls.nap.value
      });
    }
    instantiationForm.reset();
  }

  eraseEntry(entry: string) {
    if (this.isIngress) {
      this.ingress = this.ingress.filter(x => x !== entry);
    } else {
      this.egress = this.egress.filter(x => x !== entry);
    }
  }

  setSLA(selectedSLA) {
    this.sla = selectedSLA;
  }

  instantiate(service) {
    this.serviceManagementService.instantiate(
      service,
      this.ingress,
      this.egress,
      this.sla
    );
  }
}
