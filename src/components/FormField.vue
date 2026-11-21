<template>
  <label class="field">
    <span class="field-label">{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <small v-if="hint" class="field-hint">{{ hint }}</small>
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  hint: { type: String, default: '' },
  required: { type: Boolean, default: true }
})
defineEmits(['update:modelValue'])
</script>