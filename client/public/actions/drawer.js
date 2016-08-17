export const SHOW_DRAWER = 'SHOW_DRAWER';

export function drawerToggle(bool) {
  return {
    type: 'SHOW_DRAWER',
    payload: bool
  }
}