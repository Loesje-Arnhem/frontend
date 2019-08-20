<template>
  <div class="home">
    <hello-world text="taaest"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import HelloWorld from '@/components/Shared/Alert.vue'; // @ is an alias to /src

@Component({
  // Asdsa
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
