import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { speedDialItems } from '../../shared/button/items.model';
import { FileUploadModule } from 'primeng/fileupload';
import {  DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-project',
  imports: [FileUploadModule, DatePickerModule, FloatLabelModule, CascadeSelectModule, InputGroupModule, InputGroupAddonModule, ButtonModule, MultiSelectModule, ToolbarModule, IconFieldModule, InputIconModule, SplitButtonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent { 
  buttonDesignToken = {
    'border.radius': '6px',
    'primary.background': '#131C22',
    'primary.border.color': 'none',
    'primary.color': 'white',
    'primary.hover.color': 'white',
    'primary.hover.background': '#1C2933',
    'primary.hover.border.color': 'none',
    'primary.active.background': '#1C2933',
    'primary.active.color': '#BACBD9',
    'primary.active.border.color': 'none',
  };

    projectTypes = [{'name' : 'Game Development'}, {'name' : 'Web Development'}, {'name' : 'Mobile Development'}, {'name' : 'Software Development'}]
}
