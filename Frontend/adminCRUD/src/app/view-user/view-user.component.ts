import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpProviderService } from "../Service/http-provider.service";
import { WebApiService } from "../Service/web-api.service";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  userId: any
  userDetail: any = []

  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId']
    this.getUserDetailByID();
  }

  getUserDetailByID(){
    this.httpProvider.getUserDetailByID(this.userId).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.userDetail = resultData;
          }
        }
      },
      (error: any) => {
        console.error('Error obteniendo detalles del usuario:', error);
      }
    );
  }


}
