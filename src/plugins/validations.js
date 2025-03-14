import { configure, defineRule } from 'vee-validate'
import { max, min, required } from '@vee-validate/rules'

export default {
  install(app) {
    defineRule('min', min)
    defineRule('max', max)
    defineRule('required', required)

    configure({
      generateMessage: (context) => {
        const messages = {
          min: `The ${context.field} field is too short.`,
          max: `The ${context.field} field is too long.`,
          required: `The ${context.field} is required`,
        }
        const message = messages[context.rule.name] ? messages[context.rule.name] : `The ${context.field} field is invalid.`

        return message;
      },
    })
  },
}
