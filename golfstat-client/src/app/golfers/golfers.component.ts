import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import { StatsService } from '../stats.service';
import { Golfer } from '../model/golfer';

@Component({
  selector: 'app-golfers',
  templateUrl: './golfers.component.html',
  styleUrls: ['./golfers.component.css']
})
export class GolfersComponent implements OnInit {
  golfers: Golfer[];
  selectedGender: string;
  newGolferName: string;
  newGolfer: Golfer;

  constructor(
    private statsService: StatsService,
    private messageService: MessageService
  ) {
    this.selectedGender = "";
    this.newGolferName = "";
  }

  ngOnInit() {
    this.getGolfers();
  }

  addGolfer() {
     console.log("new golfer: "+this.newGolferName+", gender: "+this.selectedGender);
     var message = "";
     if(this.newGolferName === "") {
       message = "Golfer name cannot be blank";
     }
     if(this.selectedGender === "") {
       if(message !== "") {
         message += "; You must select a gender";
       }
       else {
         message = "You must select a gender";
       }
     }
     if(message === "") {
       console.log("no errors, saving new golfer");
       this.newGolfer = new Golfer();
       this.newGolfer.name = this.newGolferName;
       this.newGolfer.gender = this.selectedGender;
       this.statsService.addNewGolfer(this.newGolfer).subscribe(
         data => {
           console.log("New golfer added, refreshing golfer list");
           this.newGolferName = "";
           this.selectedGender = "";
           this.getGolfers();
         },
         err => {
           console.error(err);
           this.messageService.add({severity:'error', summary:'Save New Golfer Error', detail:err.message});
         },
         () => {
           //console.log('done loading nav tree');
         }
       );

     }
     else {
       this.messageService.add({severity:'error', summary:'Add Golfers', detail:message});
     }
  }

  getGolfers() {
    this.statsService.getGolfers().subscribe(
      data => {
        console.log(data);
        this.golfers = data;
      },
      err => {
        console.error(err);
        this.messageService.add({severity:'error', summary:'Retrieve Golfers', detail:err.message});
      },
      () => {
        console.log('done loading golfers');
      }
    );
  }
}
