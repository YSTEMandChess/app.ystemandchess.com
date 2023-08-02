import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ModalModule } from '../../_modal/modal.module';

import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-ide-page',
  templateUrl: './ide-page.component.html',
  styleUrls: ['./ide-page.component.scss']
})
export class IdePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
