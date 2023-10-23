import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  newMessage: any = {};
  errorMessages: string[] = [];

  constructor( private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addMessage() {
    this.errorMessages = [];

    if (!this.newMessage?.nom ||!this.newMessage?.prenom || !this.newMessage?.email || !this.newMessage?.subject || !this.newMessage?.mess ) {
      this.errorMessages.push('Veuillez entrer tous les détails de votre message');
      return;
    }

    const message = {
      nom: this.newMessage.nom,
      prenom: this.newMessage.prenom,
      email: this.newMessage.email,
      subject: this.newMessage.subject,
      mess: this.newMessage.mess,
    };

    this.messageService.addMessage(message).subscribe(
      (response) => {
        console.log(response);
        // Clear the form after adding message successfully
        this.newMessage = {
          nom: '',
          email: '',
          subject: '',
          mess: '',
        };
      },
      (error) => {
        console.error(error);
        this.errorMessages.push('Failed to add this message');
      }
    );
  }

}
