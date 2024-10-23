import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItem } from '@app/modules/to-do-list/interfaces/IListItem';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {

  @Input({ required: true })
  public inputListItems: IListItem[] = [];

  @Output()
  public outputUpdateItemCheckbox = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();

  @Output()
  public outputUpdateItemText = new EventEmitter<{
    id: string;
    text: string;
  }>();

  @Output()
  public outputDeleteItem = new EventEmitter<string>();

  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  public updateItemText(id: string, text: string) {
    return this.outputUpdateItemText.emit({ id, text });
  }

  public deleteItem(id: string) {
    return this.outputDeleteItem.emit(id);
  }
}
