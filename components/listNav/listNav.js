Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    item: {
      type: Object
    }
  },
  methods: {
    tapHandler() {
      this.triggerEvent('tapCell', this.properties.item)
    }
  }
})