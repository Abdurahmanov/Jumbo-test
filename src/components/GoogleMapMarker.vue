<script>
import { mapGetters } from 'vuex';
import pin from '@/assets/pin.webp';
import pinNew from '@/assets/pinNew.webp';

/**
 * @module GoogleMapMarker
 * @description The component for a single Google Map marker.
 */
export default {
  props: {
    /**
     * The Google Maps instance.
     * @type {object}
     */
    google: {
      type: Object,
      required: true,
    },
    /**
     * The map instance.
     * @type {object}
     */
    map: {
      type: Object,
      required: true,
    },
    /**
     * The marker data.
     * @type {object}
     */
    marker: {
      type: Object,
      required: true,
    },
    /**
     * The index of the marker.
     * @type {number}
     */
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      /**
       * Whether the marker has been clicked.
       * @type {boolean}
       */
      isClick: false,
      /**
       * The marker instance.
       * @type {object}
       */
      m: null,
    };
  },
  computed: {
    ...mapGetters(['getListRef']),
  },
  mounted() {
    const { Marker, InfoWindow } = this.google.maps;
    const image = this.marker.newStore !== 0 ? pinNew : pin;

    const marker = new Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon: image,
    });

    this.m = marker;

    const infoWindow = new InfoWindow({
      content: `<div>
                    <div><strong>${this.marker.addressName}</strong></div>
                    <div>${this.marker.street} ${this.marker.street2}</div>
                    <div>${this.marker.city}</div>
                    <div>Opening hours: ${this.marker.todayOpen}-${this.marker.todayClose}</div>
                </div>`,
    });

    marker.addListener('click', () => this.clickHandler(infoWindow));
  },
  methods: {
    /**
     * Handles the click on the marker.
     * @param {object} infoWindow The info window to open.
     */
    clickHandler(infoWindow) {
      if (this.isClick) {
        infoWindow.close();
      } else {
        infoWindow.open(this.m.get('map'), this.m);
        this.getListRef.scrollToIndex(this.index);
        this.$store.dispatch('getListItemActiveIndex', this.index);
      }
      this.map.setZoom(15);
      this.map.panTo(this.m.getPosition());
      this.isClick = !this.isClick;
    },
  },
  beforeDestroy() {
    this.m.setMap(null);
  },
  render() {
    return null;
  },
};
</script>
