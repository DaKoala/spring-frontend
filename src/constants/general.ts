export interface Indexable {
  key: string;
}

export type WithIndex<T> = T & Indexable;
