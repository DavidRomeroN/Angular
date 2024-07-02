import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen=false;
  @Output() closeMoldal=new EventEmitter();

  onCloseModal(){
    this.closeMoldal.emit(false);
  }
}
