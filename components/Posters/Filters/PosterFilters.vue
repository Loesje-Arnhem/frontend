<script lang="ts" setup>
const { selectedSourceIds, selectedSubjectIds } = useTags();
const activeOverlays = reactive({
  sources: false,
  subjects: false,
});

const { data } = useFetch("/api/posters/taxonomies");

const dateBefore = useDateBefore();
const dateAfter = useDateAfter();

const toggleOverlay = (type: string) => {
  if (type === "subjects") {
    activeOverlays.subjects = !activeOverlays.subjects;
    activeOverlays.sources = false;
  } else {
    activeOverlays.sources = !activeOverlays.sources;
    activeOverlays.subjects = false;
  }
};

const today = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  let month = `${currentMonth}`;
  if (currentMonth < 10) {
    month = `0${currentMonth}`;
  }
  let day = `${currentDay}`;
  if (currentDay < 10) {
    day = `0${currentDay}`;
  }
  return `${now.getFullYear()}-${month}-${day}`;
};
</script>

<template>
  <div v-if="data" class="filter">
    <div class="buttons">
      <poster-filter-toggle
        v-if="data.sources.length"
        :is-active="activeOverlays.sources"
        class="filter-item"
        @toggle="toggleOverlay('sources')"
      >
        {{ $t("sources") }}
        <template v-if="selectedSourceIds.length">
          ({{ selectedSourceIds.length }})
        </template>
      </poster-filter-toggle>
      <poster-filter-toggle
        v-if="data.subjects.length"
        :is-active="activeOverlays.subjects"
        class="filter-item"
        @toggle="toggleOverlay('subjects')"
      >
        {{ $t("subjects") }}
        <template v-if="selectedSubjectIds.length">
          ({{ selectedSubjectIds.length }})
        </template>
      </poster-filter-toggle>
      <div class="filter-item date">
        <input-text-field
          id="date-after"
          v-model="dateAfter"
          type="date"
          :title="$t('until')"
          name="date-after"
          :max="today()"
          :min="dateBefore ? dateBefore : '1983-01-01'"
        />
      </div>
      <div class="filter-item date">
        <input-text-field
          id="date-before"
          v-model="dateBefore"
          type="date"
          :title="$t('from')"
          name="date-before"
          min="1983-01-01"
          :max="dateAfter ? dateAfter : today()"
        />
      </div>
    </div>

    <slide-in-animation mode="out-in">
      <div
        v-if="activeOverlays.sources"
        key="sources"
        class="tags"
        tabindex="-1"
      >
        <center-wrapper>
          <poster-tags-list :list="data.sources" />
        </center-wrapper>
      </div>

      <div
        v-if="activeOverlays.subjects"
        key="subjects"
        class="tags"
        tabindex="-1"
      >
        <center-wrapper>
          <poster-tags-list :list="data.subjects" />
        </center-wrapper>
      </div>
    </slide-in-animation>
  </div>
</template>

<style lang="postcss" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.filter {
  position: relative;
}

.buttons {
  border: 2px solid var(--color-black);
  background-color: var(--color-black);
  display: grid;
  margin-bottom: 1em;
  gap: 1px;
  grid-template-columns: repeat(2, 1fr);

  @media (--viewport-lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.filter-item {
  padding-left: 1em;
  padding-right: 1em;
  background-color: var(--color-white);
  overflow: hidden;
}

.tags {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  padding: 1em 0 0;
  background: rgb(255 255 255 / 80%);
  z-index: 1;
}

.date {
  & :deep(.field) {
    display: flex;
    align-items: center;
    gap: 0.25em;
  }

  & :deep(.label) {
    margin: 0;
  }

  & :deep(.input) {
    border-image-source: none !important;
    border-image-outset: 0 !important;
    flex: 1 1 auto;
    border-width: 0;
  }
}
</style>
