<script>
import {mapGetters} from "vuex";

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isClick: false,
      m: null,
    };
  },
  computed: {
    ...mapGetters([
      'getListRef',
    ]),
  },
  mounted() {
    const { Marker, InfoWindow } = this.google.maps;
    const image =
        "https://www.jumbo.com/INTERSHOP/static/WFS/Jumbo-Grocery-Site/-/-/nl_NL/images/pin-pup-store-active-icon.png";

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
                </div>`
    })

    marker.addListener("click", () => this.clickHandler(infoWindow));
  },
  methods: {
    clickHandler(infoWindow) {
      if(this.isClick) {
        infoWindow.close()
      } else {
        infoWindow.open(this.m.get("map"), this.m);
        this.getListRef.scrollToIndex(this.index);
        this.$store.dispatch('getListItemActiveIndex', this.index);
      }
      this.map.setZoom(15);
      this.map.panTo(this.m.getPosition());
      this.isClick = !this.isClick
    }
  },
  beforeDestroy() {
    this.m.setMap(null);
    // this.m.removeListener("click", () => this.clickHandler(''))
  },
  render() {
    return null
  }
};
</script>
