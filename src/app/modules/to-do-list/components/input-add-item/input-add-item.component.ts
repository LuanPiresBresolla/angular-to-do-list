import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';

import { IListItem } from '@app/modules/to-do-list/interfaces/IListItem';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  @Output()
  public outputAddListItems = new EventEmitter<IListItem>();

  @Input({ required: true })
  public inputListItems: IListItem[] = [];

  @ViewChild('inputValue')
  public inputValue!: ElementRef;

  private cdr = inject(ChangeDetectorRef);

  public focusAndAddItem(value: string) {
    if (value) {
      this.cdr.detectChanges();
      this.inputValue.nativeElement.value = '';

      this.outputAddListItems.emit({
        id: `ID ${new Date().getTime()}`,
        checked: false,
        value,
      });

      this.inputValue.nativeElement.focus();
    }
  }
}
