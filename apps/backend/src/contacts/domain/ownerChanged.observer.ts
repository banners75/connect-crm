export interface IOwnerChangedObserver {
  notify(contactId: number, originalOwner: string, newOwner: string): void;
}
