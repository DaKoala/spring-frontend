import { WithIndex } from '@/constants';

type KeyGenerationFunc<T> = (obj: T) => string;

export default function appendKey<T>(list: T[], genFunc: KeyGenerationFunc<T>): WithIndex<T>[] {
  return list.map((obj) => {
    const newObj = obj as WithIndex<T>;
    newObj.key = genFunc(obj);
    return newObj;
  });
}
