import en from '../resources/lang/en'

type MessageKey = keyof typeof en

export function __(key: MessageKey): string {
  return en[key]
}
