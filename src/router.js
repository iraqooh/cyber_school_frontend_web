import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './components/HomeComponent.vue';
import AddStudent from './components/AddStudent.vue';
import AddPayment from './components/AddPayment.vue';
import StudentsComponent from './components/StudentsComponent.vue';

const routes = [
    { path: '/', name: 'home', component: HomeComponent },

    { path: '/students', name: 'students', component: StudentsComponent },

    // { path: '/fees', name: 'fees', component: FeesComponent },

    // { path: '/payments', name: 'payments', component: PaymentsComponent },

    { path: '/add', name: 'add-student', component: AddStudent },

    { path: '/pay', name: 'add-payment', component: AddPayment },

    // { path: '/', name: 'home', component: HomeComponent },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;