import { Router } from '@angular/router';
import { NotFoundError } from './../../common/not-found-error';
import { House } from './../../models/house';
import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  houses : House[] = [];
  house : House = {};
  StatusButton : Boolean = true;
 
  constructor(private houseService : HouseService, private route: Router , private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.getHouses();
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  


  getHouses(){
    this.houseService.getALL()
    .subscribe(houses => this.houses = houses,
        error => {
        alert('error inattendu');
        console.log(error);
    })
  }

  createHouse(){
    this.houseService.create(this.house)
      .subscribe(() => {
      this.houses.unshift(this.house); // ajouter en premier
      //initialisation input 
      this.house ={    
        name :'',
        address :'',
        name_floor :'',
        name_room :'',
        name_device :'',
        status :''
      };
    },(error : AppError) => {
      
      if(error instanceof BadInput) {
        alert('Merci de vérifié vos information !! ')
      }else{
        alert('error inattendu');
      }
    })
    this.flashMessage.show('A été ajoutée avec success ', {cssClass : 'alert-success',timeout:3000});
    this.route.navigate(['/house']);
    this.closePopup();

  }
  
  editHouse(house){
    this.house = house;
    this.openPopup(); 
    this.StatusButton = false;
   }


   updateHouse(){
    
    
    this.houseService.update(this.house)
      .subscribe(() => {
        this.house  = {
          name :'',
          address :'',
          name_floor :'',
          name_room :'',
          name_device :'',
          status :''
          
        };

      },(error : AppError) => {
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
        }else{
          alert('error inattendu');
        }
      })
      this.flashMessage.show('house updeted ', {cssClass : 'alert-success',timeout:3000});
      this.route.navigate(['/house']) 

      this.closePopup();
     
  }


  Delete(house ){

    // if(confirm("tu veux le supprimer ")) {
    // this.houseService.delete(house)
    //   .subscribe(() => {
    //     let index  = this.houses.indexOf(house);
    //     this.houses.splice(index, 1)
    //   },(error : AppError)  => {
    //     if(error instanceof NotFoundError) {
    //       alert('Ce message est déjà supprimé !! ')
    //     }else{
    //       alert('error inattendu');
    //       console.log(error)
    //     }
    //   })
      
    // }


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.houseService.delete(house)
        .subscribe(() => {
          let index  = this.houses.indexOf(house);
          this.houses.splice(index, 1)
        },(error : AppError)  => {
          if(error instanceof NotFoundError) {
            alert('Ce message est déjà supprimé !! ')
          }else{
            alert('error inattendu');
            console.log(error)
          }
        })
          this.flashMessage.show('house deleted ', {cssClass : 'alert-danger',timeout:3000});
          this.route.navigate(['/house']) 
        Swal.fire(
          {
            title: 'Deleted',
            text: "This client is deleted",
            icon: 'success',
            timer : 3000
          }
    
          
        )
      }
    })
  }


  changeStatus(house){

    this.house = house;
    
    if(this.house.status === "ON"){
      //this.device.status =  "OFF";

      this.houseService.update(this.house)
          .subscribe(()=>{
            this.house.status ="OFF";
            
          })
      
          
    }
    else {
      this.houseService.update(this.house)
          .subscribe(()=>{
             this.house.status ="ON";
        
           })
      

    }
  }

}
