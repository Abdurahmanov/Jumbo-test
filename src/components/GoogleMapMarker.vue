<script>
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
    }
  },

  mounted() {
    const { Marker } = this.google.maps;
    const image =
        "https://www.jumbo.com/INTERSHOP/static/WFS/Jumbo-Grocery-Site/-/-/nl_NL/images/pin-pup-store-active-icon.png";

    new Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon: image,
    });
  },

  // eslint-disable-next-line vue/require-render-return
  render() {}
};
</script>
