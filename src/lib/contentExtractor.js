export function extractVisibleContent() {
  return document.body.innerText.slice(0, 12000)
}