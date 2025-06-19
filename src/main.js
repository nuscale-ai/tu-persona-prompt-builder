import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'

// Import PrimeVue CSS
import 'primeicons/primeicons.css'

// Import PrimeVue components
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import PanelMenu from 'primevue/panelmenu'
import TieredMenu from 'primevue/tieredmenu'

// Create Vue app
const app = createApp(App)

// Use PrimeVue with Aura theme
app.use(PrimeVue, {
    // theme: 'none'
    theme: {
        preset: Material
    }
})

// Register PrimeVue components
app.component('Button', Button)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('Menubar', Menubar)
app.component('Avatar', Avatar)
app.component('PanelMenu', PanelMenu)
app.component('TieredMenu', TieredMenu)

// Mount app
app.mount('#app')
