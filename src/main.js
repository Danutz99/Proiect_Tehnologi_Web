import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
import vuetify from './plugins/vuetify';
import GoogleLogin from 'vue-google-login';
import Vuex from 'vuex';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import VueSimpleMarkdown from 'vue-simple-markdown';

import 'vue-simple-markdown/dist/vue-simple-markdown.css';

import enUS from '@kangc/v-md-editor/lib/lang/en-US';

VMdEditor.lang.use('en-US', enUS);

Vue.use(VueSimpleMarkdown);
VMdEditor.use(githubTheme);
Vue.config.productionTip = false;
Vue.use(GoogleLogin);
Vue.use(Vuex);
Vue.use(VMdEditor);

const store = new Vuex.Store({
    state: {
        userId: '',
        currentCourse: {}
    },
    mutations: {
        userInfo(state, id) {
            state.userId = id;
        },
        setCurrentCourse(state, course) {
            state.currentCourse = course;
        }
    },
    actions: {
        updateUserInfo(store, id) {
            store.commit('userInfo', id);
        },

        updateCurrentCourse(store, course) {
            store.commit('setCurrentCourse', course);
        }
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    created: function() {
        this.checkLogin();
    },
    watch: {
        $route: 'checkLogin'
    },
    methods: {
        checkLogin() {
            if (!localStorage.getItem('login')) {
                this.$router.push('login').catch(() => {});
                return;
            }

            // if (!this.$store.username && localStorage.getItem('login')) {
            //     this.$store.dispatch('update_user_name', 123);
            //     this.$router.push('user').catch(() => {});
            //     return;
            // }

            // if (this.$store.username && localStorage.getItem('login')) {
            //     this.$router.push('user').catch(() => {});
            //     return;
            // }
        }
    }
}).$mount('#app');
