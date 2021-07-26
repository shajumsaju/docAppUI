import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CommanServiceService } from '../../shared/comman-service.service'

@Component({
  selector: 'app-list-appoinment',
  templateUrl: './list-appoinment.component.html',
  styleUrls: ['./list-appoinment.component.scss']
})
export class ListAppoinmentComponent implements OnInit {
	settings = {}
	datas: any[] = [];
	modalRef: BsModalRef;
	items: any[];

	constructor(private modalService: BsModalService, private router: Router,
		private commanService: CommanServiceService) {
		this.items = Array(15).fill(0);
	}

	ngOnInit() {
		this.bookedList();
		this.commanService.filterDate.subscribe((filterDate) => {
			this.datas = []
			if (filterDate !== null) {
				this.commanService.get(`/slot/filter?appoinmentDate=${filterDate}`).subscribe((userList) => {
					userList.map(value => this.datas.push(value))
				});
			} else {
				this.bookedList()
			}

		})
	}

	addSlot() {
		this.router.navigate(['/add']);
	}

	bookedList() {
		this.datas = [];
		this.commanService.get('/slot').subscribe((userList) => {
			userList.map((value, index, array) => {
				this.datas.push(value);
			});
		});
	}

}