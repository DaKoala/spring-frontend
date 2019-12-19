import { WithIndex } from '@/constants';

type KeyGenerationFunc<T> = (obj: T) => string;

/**
 * Append a key attribute to each element in an array
 * @param list An array of any type
 * @param genFunc The function that generate key from item
 */
export default function appendKey<T>(list: T[], genFunc: KeyGenerationFunc<T>): WithIndex<T>[] {
  return list.map((obj) => {
    const newObj = obj as WithIndex<T>;
    newObj.key = genFunc(obj);
    return newObj;
  });
}
