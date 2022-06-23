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

    const infoWindow = new InfoWindow({
      content: `<div>
                    <div><strong>${this.marker.addressName}</strong></div>
                    <div>${this.marker.street} ${this.marker.street2}</div>
                    <div>${this.marker.city}</div>
                    <div>Opening hours: ${this.marker.todayOpen}-${this.marker.todayClose}</div>
                </div>`
    })

    marker.addListener("click", () => {
      infoWindow.open(marker.get("map"), marker);
      this.map.setZoom(15);
      this.map.panTo(marker.getPosition());
      this.getListRef.scrollToIndex(this.index);
      this.$store.dispatch('getListItemActiveIndex', this.index);
    });
  },
  render() {
    return null
  }
};
</script>
