import { h, defineComponent, withDirectives, resolveDirective } from 'vue'

/** 封装@vueuse/motion动画库中的自定义指令v-motion */
export default defineComponent({
  name: 'Motion',
  props: {
    delay: {
      type: Number,
      default: 50
    }
  },
  render() {
    const { delay } = this
    const motion = resolveDirective('motion')

    // 检查 motion 指令是否定义
    if (!motion) {
      console.error('v-motion directive is not defined. Make sure it is registered correctly.')
      return h('div', {}, this.$slots.default ? this.$slots.default() : [])
    }

    // 检查 this.$slots.default 是否存在并调用
    const defaultSlot = this.$slots.default ? this.$slots.default() : []

    return withDirectives(
      h(
        'div',
        {},
        {
          default: () => defaultSlot
        }
      ),
      [
        [
          motion,
          {
            initial: { opacity: 0, y: 150 },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                delay
              }
            }
          }
        ]
      ]
    )
  }
})
