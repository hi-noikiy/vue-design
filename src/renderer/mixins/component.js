import Vue from 'vue'
import {mapGetters} from 'vuex'
import {createElement} from '@/utils'

export default {
  computed: {
    ...mapGetters(['components'])
  },
  methods: {
    createComponent ({id}) {
      let that = this
      const instance = new Vue({
        el: document.getElementById(id),
        render (h) {
          let component = that.components.find(_ => _.id === id)
          if (!component) return this.$destroy()
          let {setting: { tag }, props} = component
          return h(tag, {
            attrs: {id},
            props,
            domProps: props.domProps,
            class: props.class && props.class.split(' '),
            style: props.style
          })
        }
      })
      instance.$mount()
      return instance
    },
    reRender (components = this.components) {
      components.forEach(({id, parent}) => {
        let target = document.getElementById(parent)
        createElement(target, id)
        this.createComponent({id})
      })
    }
  }
}
