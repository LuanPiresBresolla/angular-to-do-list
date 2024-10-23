import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';

import { IListItem } from '@app/modules/to-do-list/interfaces/IListItem';
import { InputAddItemComponent } from '@app/modules/to-do-list/components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '@app/modules/to-do-list/components/input-list-item/input-list-item.component';

import { EnumLocalStorage } from '@app/modules/to-do-list/enums/EnumLocalStorage';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  private setListItems = signal<IListItem[]>(this.parseItems());

  public addItem = signal(true);
  public getListItems = this.setListItems.asReadonly();

  private parseItems() {
    const storage = localStorage.getItem(EnumLocalStorage.MY_LIST) ?? '[]';
    return JSON.parse(storage);
  }

  private updateLocalStorage() {
    localStorage.setItem(EnumLocalStorage.MY_LIST, JSON.stringify(this.setListItems()));
  }

  public getInputAndAddItem(value: IListItem) {
    localStorage.setItem(EnumLocalStorage.MY_LIST, JSON.stringify([...this.getListItems(), value]));
    this.setListItems.set(this.parseItems());
  }

  public listItemsStage(status: 'pending' | 'completed') {
    if (status === 'completed') {
      return this.getListItems().filter(item => item.checked);
    }

    return this.getListItems().filter(item => !item.checked);
  }

  public updateItemCheckbox(newItem: { id: string, checked: boolean }) {
    this.setListItems.update(oldValue => {
      return oldValue.map(item => {
        if (item.id === newItem.id) {
          item.checked = newItem.checked;
        }

        return item;
      });
    });

    this.updateLocalStorage();
  }

  public updateItemText(newItem: { id: string, text: string }) {
    this.setListItems.update(oldValue => {
      return oldValue.map(item => {
        if (item.id === newItem.id) {
          item.value = newItem.text;
        }

        return item;
      });
    });

    this.updateLocalStorage();
  }

  public deleteItem(id: string) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir o item!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.setListItems.update(oldValue => {
          return oldValue.filter(item => item.id !== id);
        });

        this.updateLocalStorage();
      }
    });
  }

  public deleteAllItems() {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir tudo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(EnumLocalStorage.MY_LIST);
        this.setListItems.set([]);
      }
    });
  }
}
