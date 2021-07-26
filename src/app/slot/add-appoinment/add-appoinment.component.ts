import { Component, OnInit,TemplateRef } from '@angular/core';
import { CommanServiceService } from '../../shared/comman-service.service'
import * as moment from 'moment'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-appoinment',
  templateUrl: './add-appoinment.component.html',
  styleUrls: ['./add-appoinment.component.scss']
})
export class AddAppoinmentComponent implements OnInit {
	bsInlineValue = new Date();
	bsInlineRangeValue: Date[];
	minDate = new Date();
	selectedDate: any;
	modalRef: BsModalRef;
	mytime: Date = new Date();
	slotList: any;
	zone: any
	addslotForm: FormGroup
	endslotTime: number | string;
	constructor(private commanService: CommanServiceService, private modalService: BsModalService, private fb: FormBuilder) {}
	ngOnInit() {
			this.createForm();
		}
		//For Modal
	openModal(template: TemplateRef < any > , zone) {
		this.zone = zone;
		this.modalRef = this.modalService.show(template, Object.assign({}, {
			class: 'gray modal-lg product-modal'
		}));
	}
	dayWiseList(selectedDate: string) {
		this.selectedDate = moment(selectedDate).format('YYYY-MM-DD')
		this.commanService.get('/addSlot/?startDate=' + this.selectedDate).subscribe((res) => {
			this.validatingBookedSlot(res);
		})
	}
	validatingBookedSlot(slotLists: any) {
		this.commanService.get('/slot').subscribe((userList) => {
			userList.filter((userBasedVaue) => {
				slotLists.filter((daysBaseList) => {
					let appoimentDate = moment(daysBaseList.createdDate).format("MM/DD/YYYY");
					let slotDate = moment(daysBaseList.createdDate).format("MM/DD/YYYY");
					if(moment(slotDate).isSame(appoimentDate)) {
						if(daysBaseList.slotstartTime.indexOf(userBasedVaue.slotstartTime) > -1 && daysBaseList.zone.toLowerCase().indexOf(userBasedVaue.zone) > -1) {
							daysBaseList.isUser = true;
						}
					}
				})
			})
		});
		this.slotList = slotLists
	}
	fromTime(event) {
		let fromTime = event.target.value;
		let hoursMini = event.target.value.split(':');
		if(hoursMini[0] != "00") {
			let time = this.timeSplitter(fromTime) + 30;
			this.endslotTime = this.minutesTohours(time)
			this.addslotForm.patchValue({
				endTime: this.endslotTime
			})
			this.addslotForm.controls['endTime'].disable();
		}
	}
	createForm() {
			this.addslotForm = this.fb.group({
				startTime: ['00:00', Validators.required],
				endTime: ['00:00', Validators.required],
			});
		}
		//Time split 
	timeSplitter(value) {
			let hoursMini = value.split(':');
			let hours = +hoursMini[0] * 60
			let overallTime;
			let minutes = +hoursMini[1];
			if(minutes > 0) {
				overallTime = hours + minutes;
			} else {
				overallTime = hours;
			}
			return overallTime;
		}
		// minutes
	minutesTohours(value) {
		let convertMinutes: any
		const minutes: number = Math.floor(value / 60);
		convertMinutes = minutes.toString().padStart(2, '0') + ':' + (value - minutes * 60).toString().padStart(2, '0');
		if(convertMinutes != NaN) {
			return convertMinutes
		} else {
			return '0'
		}
	}
	onSubmit() {
		this.addslotForm.controls['endTime'].enable();
		if(this.slotList.length > 0) {
			if(!this.slotList.some(res => res.slotstartTime == this.addslotForm.value.startTime && res.zone == this.zone)) {
				this.slotAdding();
			} else {
				alert("Slot time already exits")
			}
		} else {
			this.slotAdding();
		}
	}
	slotAdding() {
		let params = {
			"isUser": false,
			"status": false,
			"createdDate": this.selectedDate,
			"slotstartTime": this.addslotForm.value.startTime,
			"slotEndTime": this.addslotForm.value.endTime,
			"zone": this.zone
		}
		this.commanService.post('/addSlot', params).subscribe((response) => {
			if(response) this.dayWiseList(this.selectedDate)
			this.modalRef.hide();
			this.createForm();
		})
	}
}