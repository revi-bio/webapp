<script setup lang="ts">
const props = defineProps<{
  type: string;
  size?: string;
}>();

const icons: Record<string, string> = {
  check: 'check',
  id_track: 'id_track',
  widgets: 'widgets',
  edit: 'edit',
  settings: 'settings',
  eye_tracking: 'eye_tracking',
  house: 'house',
  search: 'search',
  delete: 'delete',
  add: 'add',
  add_2: 'add_2',
  keyboard_arrow_down: 'keyboard_arrow_down',
  arrow_drop_down: 'arrow_drop_down',
  close: 'close',
  close_small: 'close_small',
  download: 'download',
  more_vert: 'more_vert',
  more_horiz: 'more_horiz',
  apps: 'apps',
  menu: 'menu',
  person: 'person',
  shield_person:'shield_person',
  mail: "mail",
  opened_mail: "drafts",
  visibility: "visibility"
};
</script>

<template>
  <span
    v-if="icons[type]"
    class="material-symbols-outlined align-middle"
    :class="size ? `text-${size}` : 'text-lg'"
  >
    {{ icons[type] }}
  </span>
</template>
