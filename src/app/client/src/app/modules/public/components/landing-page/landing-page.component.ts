import { Component, OnInit } from '@angular/core';
import { LayoutService, ServerResponse, ResourceService} from '@sunbird/shared';
import { FormService } from '@sunbird/core';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  layoutConfiguration;
  UserArticle:{}
  userCalender:{}
  showUserArticle:boolean = true;
  showUserCalender:boolean = true;
  showAnnoucements: boolean = true;
  mainContent:any[]= [];

  constructor(public layoutService: LayoutService, public formService: FormService, public resourceService: ResourceService) {
    this.formService= formService;
   }

  ngOnInit() {
    this.layoutConfiguration = this.layoutService.initlayoutConfig();
    this.getUserContentconfig();
    this.getPortalConfig();
  }

  getUserContentconfig(){
    const formInputParams = {
      formType: 'user',
      subType: 'content',
      formAction: 'display',
      component:'portal',
    };

    this.layoutService.getFormData(formInputParams).subscribe(
      (data:ServerResponse)=>{
        if(data.result?.form?.data){
          this.UserArticle= data.result.form.data?.fields[0]
          this.showUserArticle = this.UserArticle['showFeatureArticle']
          if(!this.showUserArticle){
              this.showAnnoucements = false
          }
          this.userCalender = data.result.form.data?.fields[1]
          this.showUserCalender = this.userCalender['showCalender']
        }   
      },
      (err:ServerResponse)=>{
        this.showUserArticle = true
        this.showUserCalender = true
        this.showAnnoucements = true

      }
    )
  }

    /**
   * @description -  to fetch portal config to display relevant content
   */
    getPortalConfig() {
      const formReadInputParams = { 
        formType: 'config',
        formAction: 'display',
        contentType: 'global',
        component: 'portal'
      };
      this.formService.getFormConfig(formReadInputParams).subscribe(
        (formResponsedata) => {
          if (formResponsedata && _.get(formResponsedata, "guestLandingPage") && _.get(_.get(formResponsedata, "guestLandingPage"), 'mainContent')) {
            this.mainContent= _.get(_.get(formResponsedata, "guestLandingPage"), 'mainContent').length > 0 ? _.get(_.get(formResponsedata, "guestLandingPage"), 'mainContent') : [];
            _.forEach(this.mainContent, (content) => {
              content.contentText = _.get(this.resourceService, content.contentText);
            });
          }

          },
          (error) => {
            this.mainContent= [];
          }
        );
    }

}
