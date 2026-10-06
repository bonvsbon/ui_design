export function useToast() {
  const message = useState<string | null>('toast', () => null)
  let timer: ReturnType<typeof setTimeout> | undefined
  function show(text: string) {
    message.value = text
    clearTimeout(timer)
    timer = setTimeout(() => (message.value = null), 3200)
  }
  return { message, show }
}
