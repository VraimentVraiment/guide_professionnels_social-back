<template>
  <div>
    <v-menu attached :disabled="disabled">
      <template #activator="{ activate }">
        <v-input :placeholder="placeholder" :disabled="disabled" :class="font" :model-value="value?.text ?? value"
          :dir="direction" @update:model-value="onInput" @focus="activate">
          <template v-if="iconLeft" #prepend>
            <v-icon :name="iconLeft" />
          </template>
          <template v-if="iconRight" #append>
            <v-icon :name="iconRight" />
          </template>
        </v-input>
      </template>

      <v-list v-if="results.length > 0">
        <v-list-item v-for="result of results" :key="result.value" @click="() => emitValue(result)">
          <v-list-item-content>{{ textPath ? result.text : result.value }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
import { useApi } from '@directus/extensions-sdk';
// import axios from 'axios';
import { debounce, get, throttle } from 'lodash';
import { render } from 'micromustache';
import { ref } from 'vue';
// import { useI18n } from 'vue-i18n';

type JsonResult = Record<string, unknown> | string | number;

const props = withDefaults(
  defineProps<{
    value: JsonResult | null;
    url?: string;
    resultsPath?: string;
    textPath?: string;
    valuePath?: string;
    trigger?: 'debounce' | 'throttle';
    rate?: number | string;
    placeholder?: string;
    iconLeft?: string;
    iconRight?: string;
    font?: 'sans-serif' | 'serif' | 'monospace';
    disabled?: boolean;
    direction?: string;
  }>(),
  {
    trigger: 'throttle',
    rate: 500,
    font: 'sans-serif',
  }
);

/**
 * We have problems with axios and rollup since some versions
 */
const axios = {
  get: async (url: string) => {
    try {

      const response = await fetch(url);
      return {
        data: await response.json(),
      }
    } catch (err) {
      console.error(err);
      return {
        data: [],
      }
    }
  }
};

const api = useApi();

const emit = defineEmits(['input']);

// const { t } = useI18n();

const results = ref<Record<string, any>[]>([]);

const fetchResultsRaw = async (value: string | null) => {
  if (!value) {
    results.value = [];
    return;
  }

  const url = render(props.url!, { value });

  try {
    const result = await (url.startsWith('/') ? api.get(url) : axios.get(url));
    const resultsArray = props.resultsPath ? get(result.data, props.resultsPath) : result.data;

    if (Array.isArray(resultsArray) === false) {
      // eslint-disable-next-line no-console
      console.warn(`Expected results type of array, "${typeof resultsArray}" received`);
      return;
    }

    results.value = resultsArray.map((result: Record<string, unknown>): JsonResult => {
      if (props.textPath && props.valuePath) {
        return { text: get(result, props.textPath), value: get(result, props.valuePath) };
      } else if (props.textPath) {
        return { text: get(result, props.textPath), value: result };
      } else if (props.valuePath) {
        return { value: get(result, props.valuePath) };
      } else {
        return { value: result };
      }
    });

  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.warn(err);
  }
};

const fetchResults =
  props.trigger === 'debounce'
    ? debounce(fetchResultsRaw, Number(props.rate))
    : throttle(fetchResultsRaw, Number(props.rate));

function onInput(value: string) {
  emitValue(value);
  fetchResults(value);
}

function emitValue(value: JsonResult | string) {
  emit('input', value);
}
</script>

<style lang="scss" scoped>
.v-input {
  &.monospace {
    --v-input-font-family: var(--family-monospace);
  }

  &.serif {
    --v-input-font-family: var(--family-serif);
  }

  &.sans-serif {
    --v-input-font-family: var(--family-sans-serif);
  }
}
</style>