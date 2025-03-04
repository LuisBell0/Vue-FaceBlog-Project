import { configure, defineRule } from 'vee-validate'
import { max, min } from '@vee-validate/rules'

export default {
  install(app) {
    defineRule('min', min)
    defineRule('max', max)

    configure({
      generateMessage: (context) => {
        const messages = {
          min: `The field ${context.field} is too short.`,
          max: `The field ${context.field} is too long.`,
        }
        const message = messages[context.rule.name] ? messages[context.rule.name] : `The field ${context.field} is invalid.`

        return message;
      },
    })
  },
}
