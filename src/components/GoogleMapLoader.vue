<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

/**
 * @module GoogleMapLoader
 * @description The component for loading the Google Map.
 */
export default {
  props: {
    /**
     * The map configuration.
     * @type {object}
     */
    mapConfig: Object,
    /**
     * The Google Maps API key.
     * @type {string}
     */
    apiKey: String,
  },

  data() {
    return {
      /**
       * The Google Maps instance.
       * @type {object}
       */
      google: null,
      /**
       * The map instance.
       * @type {object}
       */
      map: null,
    };
  },

  mounted() {
    const loader = new Loader({
      apiKey: this.apiKey,
      version: 'weekly',
      libraries: ['places'],
    });
    const mapContainer = this.$refs.googleMap;
    loader
      .load()
      .then(google => {
        this.google = google;
        this.map = new google.maps.Map(mapContainer, this.mapConfig);
        this.$store.dispatch('getMap', this.map);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  },
};
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 70vh;
}
</style>
