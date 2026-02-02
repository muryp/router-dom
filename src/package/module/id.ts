let id = 0;
export function $id() {
  id = id++;
  return id.toString();
}
export function resetId() {
  id = 0;
}
