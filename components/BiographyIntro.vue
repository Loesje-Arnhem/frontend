<template>
  <div class="intro">
    <div class="quote">
      <blockquote cite="Stein Ostboe, VG, Norway">
        “The closest a new Norwegian singer/songwriter has come the timeless
        qualities of Ryan Adams”
      </blockquote>
      <cite>Stein Ostboe, VG, Norway</cite>
    </div>
    <p>
      Nordgarden is a Norwegian artist deriving from the American old school of
      classic songwriting. In a style of deep roots in folk, blues, jazz, gospel
      and rock he seeks to write that good, melodic storytelling song, as well
      as performing it with burning passion and nerve following in the
      traditions of such as the indispensable Bob Dylan, Bruce Springsteen and
      Neil Young to the more recent likes of Elliott Smith, Ryan Adams and Rufus
      Wainwright.
    </p>
    <read-more-link
      v-if="readMore"
      to="/biography"
      :text="$t('readFullBiography')"
    />
  </div>
</template>

<script>
import ReadMoreLink from '@/components/ReadMoreLink.vue'

export default {
  components: {
    ReadMoreLink
  },
  props: {
    readMore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="postcss" scoped>
.intro {
  max-width: 60ch;
  margin-bottom: 3em;
}

p {
  font-size: 1.2em;
}

.quote {
  margin: 0 0 1em;
}

blockquote {
  margin: 0 0 0.25em;
  font-weight: var(--font-weight-bold);
  font-size: 1.5em;
  line-height: 1.2;
}

cite {
  display: block;
  font-style: normal;

  &::before {
    content: '—';
    margin-left: 1em;
  }
}
</style>
