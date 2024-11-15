import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        
        light:{
          primary: '#3859eb', 
          secondary: '#501988', 
          accent: '#a3b5ff', 
          error: '#ff4081', 
          info: '#82b1ff', 
          success: '#4caf50', 
          warning: '#ffb300', 
          customBlue: '#1e3a8a', 
          customPurple: '#7c3aed',
        },
        dark: {
          primary: '#a3b5ff', 
          secondary: '#d1d9ff', 
          accent: '#501988',
        },
      },
    },
  });
