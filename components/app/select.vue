<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';

type Options = string[] | number[] | Object[];

interface ObjectValue {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  valueKey?: string;
  options: Options;
  modelValue?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const DELAY_UNWATCH_INTERVAL = 1000;

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const isObjectData = ref(false);
const searchInputRef = ref(null);
const filterText = ref('');

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emit('update:modelValue', val);
  },
});

const data = computed(() => {
  if (props.label && props.valueKey) {
    isObjectData.value = true;
    return props.options.map((opt: { [key: string] }) => ({
      label: opt[props.label as string],
      value: opt[props.valueKey as string],
    }));
  }

  if (props.label && !props.valueKey) {
    return props.options.map(
      (opt: { [key: string] }) => opt[props.label as string]
    );
  }

  return props.options.map((opt: { [key: string] }) => {
    if (label in opt) {
      return opt.label;
    }

    throw new Error('Object provided must be have label property');
  });
});

const filteredOptions = computed(() => {
  return data.value.filter((option) => {
    return (
      option.label.toLowerCase().includes(filterText.value.toLowerCase()) ??
      data
    );
  });
});

const target = ref(null);

onClickOutside(target, () => {
  open.value = false;
});

const selected = ref(null);
const open = ref(false);

const compareOptions = (option: any) => {
  if (!selected.value) return;

  if (isObjectData.value) {
    return selected.value?.label === option?.label;
  }

  return selected.value === option;
};

watch(selected, (val: string | ObjectValue) => {
  if (!val?.value) return;

  if (isObjectData.value) {
    value.value = val?.value;
    return;
  }

  value.value = val;
});

const unwatch = watchEffect(() => {
  if (props.modelValue) {
    const options = props.options.map((opt: { [key: string] }) => ({
      label: opt[props.label as string],
      value: opt[props.valueKey as string],
    }));

    const [result] = options.filter(
      (option) => option.value === props.modelValue
    );

    selected.value = result;
    return;
  }
});

watch(open, () => {
  if (!open.value) return;

  if (searchInputRef.value) {
    setTimeout(() => {
      searchInputRef.value!.focus();
    }, 100);
  }
});

setTimeout(() => {
  unwatch();
}, DELAY_UNWATCH_INTERVAL);
</script>

<template>
  <div>
    <div class="relative mt-2" ref="target">
      <button
        type="button"
        class="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-color-1 sm:text-sm sm:leading-6 md:py-4"
        :class="[error && 'ring-red-600']"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="select-label"
        @click="open = !open"
      >
        <span
          class="flex items-center h-4"
          v-if="isObjectData ? selected?.label : selected"
        >
          <!-- <img
            :src="selected.avatar"
            class="mr-3 h-5 w-5 flex-shrink-0 rounded-full"
          /> -->
          <span class="ml-1 block truncate p-0">{{
            isObjectData ? selected?.label : selected
          }}</span>
        </span>
        <span class="flex items-center h-4" v-else>
          <!-- <img
            :src="selected.avatar"
            class="h-5 w-5 flex-shrink-0 rounded-full"
          /> -->
          <input
            type="text"
            class="focus:outline-none"
            :class="[open || filterText ? 'block' : 'hidden']"
            v-model="filterText"
            ref="searchInputRef"
          />
          <span
            class="block truncate text-gray-400 p-0 ml-1 text-xs"
            v-if="!open && !filterText"
            >{{ placeholder ?? 'Select a option' }}</span
          >
        </span>
        <!-- <span
          class="pointer-events-none absolute inset-y-0 right-6 ml-3 flex items-center pr-2"
          v-if="filterText"
          @click="filterText = ''"
        >
          <div class="i-ph-x-circle text-10px h-5 w-5 text-gray-400"></div>
        </span> -->
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        >
          <div
            class="i-ph-caret-down-light text-10px h-5 w-5 text-gray-400"
          ></div>
        </span>
      </button>

      <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ul
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          :class="open ? '' : 'hidden'"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          <template v-for="(option, index) in filteredOptions" :key="index">
            <!--
            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
    
            Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
          -->

            <li
              class="relative cursor-default select-none pr-9 transition ease text-xs hover:bg-color-2 hover:text-white md:(text-sm)"
              :class="
                compareOptions(option)
                  ? 'bg-color-2 text-white'
                  : 'text-gray-900'
              "
            >
              <div
                class="flex items-center py-2 pl-3 md:py-3"
                @click="
                  () => {
                    selected = option;
                    open = false;
                  }
                "
              >
                <!-- <img
                  :src="person.avatar"
                  alt=""
                  class="mr-3 h-5 w-5 flex-shrink-0 rounded-full"
                /> -->
                <span
                  :class="[
                    compareOptions(option) ? 'font-semibold' : 'font-normal',
                    'block p-0 truncate',
                  ]"
                  >{{ isObjectData ? option?.label : option }}</span
                >
              </div>

              <span
                v-if="compareOptions(option)"
                class="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-white cursor-pointer"
                :class="compareOptions(option) ? 'text-white' : 'text-color-3'"
                @click.prevent="
                  () => {
                    filterText = '';
                    selected = null;
                  }
                "
              >
                <div class="i-ph-x-light h-4 w-4"></div>
              </span>
            </li>
          </template>
        </ul>
      </transition>
    </div>
    <div class="text-xs pt-2 text-red-500" v-if="error && errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
