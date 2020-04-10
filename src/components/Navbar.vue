<template>
    <nav>
    <v-app-bar > 
        <v-toolbar flat >
           
            <v-app-bar-nav-icon class="grey--text"  @click="drawer = !drawer"></v-app-bar-nav-icon>
            
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">BOOKING</span>
              
            </v-toolbar-title > 
            <v-spacer @click="drawer = !drawer">JA</v-spacer>
            <v-btn text color="grey">
                <span>Sign Out</span>
            </v-btn>
           
        </v-toolbar>
         </v-app-bar>
        
         <v-navigation-drawer  app v-model="drawer" class="primary">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    
                    <v-list-item-action>
                         <v-icon dark>{{link.icon}}</v-icon>
                    </v-list-item-action>
                   
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
                      
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

    </nav>
</template>

<script>


export default {
    data(){
        return{
            drawer:false,
            links: [
                {icon: 'home',text: 'Home',route:'/'},
                {icon: 'flight',text: 'Airways',route:'/airways'},
                {icon: 'hotel',text: 'Hotel',route:'/hotel'}
            ]
        }
    }

}
</script>
