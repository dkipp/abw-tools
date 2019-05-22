<template>
  <div class="patienten">
    <h1>Demo-Patienten anlegen</h1>

    <og-form-item label="Datenverzeichnis">
        <og-text-input :value="value" v-on:valueChanged="onTextChanged" placeholder=""></og-text-input>
    </og-form-item>

    <og-form-item label="Anzahl">
        <og-number-input min="100" max="5000" step="100" value="2500"></og-number-input>
    </og-form-item>


    <og-button label="generate" data-context="workflow" clicked="onClicked"></og-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Patienten extends Vue {
  @Prop() private value!: string;

  public onTextChanged() {
    //
  }
}
</script>