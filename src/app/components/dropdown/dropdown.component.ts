import {Component }  from '@angular/core';
import {Input, OnInit} from '@angular/core';
import { DataService } from "../../services/data.service";
import { AppConstants } from "../../app.constants";

@Component({
  selector: 'dru-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() values: string[];
  @Input() select: string;
  
  selectedValue : string = AppConstants.DEFAULT_COMBO_VALUE;
  hideCombo: boolean;
  show: boolean = false;

  constructor(private data: DataService) {}

  ngOnInit() {
  }
  
  onChange(itemValue: string, itemViewValue: string) {
    this.selectedValue = itemViewValue;
    this.select = itemValue;
    this.data.changeMessage(itemValue);

    //this.show = true;
  }
 
}