import { users } from '../schema';

type UserSchema = Omit<typeof users, 'getSQL' | '$inferInsert' | '$inferSelect' | '_'>;
type UserSchemaKeys = keyof UserSchema;

type SelectableItems = { [key in UserSchemaKeys]?: boolean };

type ResultSelected<Selectable extends SelectableItems> = {
  [key in keyof Selectable]: key extends UserSchemaKeys ? UserSchema[key] : never;
};

function assetsIsSelectableKey(key: any): asserts key is UserSchemaKeys {
  if (Object.keys(users).includes(key)) throw 'Invalid key';
}

export function usersFields<K extends SelectableItems>(selected: K): ResultSelected<K> {
  return Object.entries(selected).reduce((chain, [key, value]) => {
    if (!value) return chain;

    assetsIsSelectableKey(key);

    return { ...chain, [key]: users[key] };
  }, {} as ResultSelected<K>);
}
