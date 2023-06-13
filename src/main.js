import {createApp} from "vue";
import App from "./App.vue";
import components from "./components/UI";
import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/MainPage.vue";
import SolverPage from "@/SolverPage.vue";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: "/solver",
            name: "solver",
            component: SolverPage,
        },
        {
            path: "",
            name: "main",
            component: MainPage,
        },
    ],
});


const app = createApp(App).use(router);

components.forEach((component) => {
    app.component(component.name, component);
});
app.mount("#app");
