import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VuetifyToast from 'vuetify-toast-snackbar'

//用于弹出消息
Vue.use(VuetifyToast, {
    x: 'center', // default right
    y: 'top', // default bottom
    color: 'info', // default
    icon: 'info',
    timeout: 3000, // default
    dismissable: true, // default
    autoHeight: false, // default
    multiLine: false, // default
    vertical: false, // default
    shorts: {
        custom: {
            color: 'purple'
        }
    },
    property: '$toast' // default
})


Vue.use(Vuetify, {
    theme: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    iconfont: 'mdi'
})

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
})
