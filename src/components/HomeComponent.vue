<template>
    <div>

      <!-- Analytics Banner -->
      <div class="analytics-banner d-flex justify-content-around p-3 bg-light">
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">Registered Students</h5>
            <p class="card-text">{{ analytics.registeredStudentsCount }}</p>
          </div>
        </div>
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">Expected Fees</h5>
            <p class="card-text">UGX {{ analytics.totalExpectedFees.toLocaleString('en-US') }}</p>
          </div>
        </div>
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">Current Payments</h5>
            <p class="card-text">UGX {{ analytics.totalPayments.toLocaleString('en-US') }}</p>
          </div>
        </div>
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">Outstanding Fees</h5>
            <p class="card-text">UGX {{ analytics.outstandingFees.toLocaleString('en-US') }}</p>
          </div>
        </div>
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">Percentage Paid</h5>
            <div class="d-flex justify-content-center">
              <svg width="60" height="60">
                <circle cx="30" cy="30" r="25" stroke="lightgray" stroke-width="5" fill="none"></circle>
                <circle cx="30" cy="30" r="25" :stroke="percentagePaidColor" 
                    stroke-width="5" fill="none" :stroke-dasharray="percentagePaid 
                    + ' 100'" stroke-dashoffset="25" transform="rotate(-90, 30, 30)"></circle>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em">{{ analytics.percentagePaid.toFixed(0) }}%</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Search feature -->
      <div class="container text-center d-flex justify-content-center">
        <div class="input-group my-4 w-75">
            <input type="text" class="form-control w-25" placeholder="Search for a student"
                v-model="search_query" @input="handleInput" @keypress.enter="searchStudents"/>
            <select class="form-select input-group-prepend" :v-model="filter" @change="setFilter">
                <option value="" selected disabled>Choose search parameter</option>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="gender">Gender</option>
                <option value="physical_address">Physical Address</option>
                <option value="category">Category</option>
                <option value="student_id">Student ID</option>
                <option value="status">Registration Status</option>
            </select>
            <button class="btn btn-dark text-light" type="button" @click="searchStudents">Search</button>
        </div>
      </div>
  
      <!-- Main Content -->
        <div class="main-content d-flex" style="height: 800px;">
            <div class="row w-100 mx-5">

                <!-- Students List -->
                <div class="col-md-4 p-3" >
                    <div class="d-flex justify-content-between align-items-center my-3">
                        <h5>Our Students</h5>
                        <router-link class="btn btn-primary" :to="{ name: 'add-student' }">Add Student</router-link>
                    </div>
                    <div style="height: 60%; overflow-y: auto;">
                        <ul class="list-group">
                        <li v-for="student in students" :key="student.student_id"
                        :class="['list-group-item', { 'bg-primary text-light': student.student_id === selectedStudent?.student_id }]"
                         @click="selectStudent(student)">
                            {{ student.first_name }} {{ student.last_name }}
                        </li>
                    </ul>
                    </div>
                    
                </div>

                <!-- Student Biodata -->
                <div class="col-md-4 p-3" v-if="selectedStudent">
                    <h5 class="mb-4">Student Biodata</h5>
                    <p><strong>Name:</strong> {{ selectedStudent.first_name }} {{ selectedStudent.last_name }}</p>
                    <p><strong>Gender:</strong> {{ selectedStudent.gender }}</p>
                    <p><strong>Date of Birth:</strong> {{ selectedStudent.date_of_birth }}</p>
                    <p><strong>Address:</strong> {{ selectedStudent.physical_address }}</p>
                    <p><strong>Category:</strong> {{ selectedStudent.category }}</p>
                    <p><strong>Status:</strong> {{ selectedStudent.status ? 'Active' : 'Inactive' }}</p>
                    <p><strong>Class:</strong> {{ selectedStudent.class }}</p>
                    <p><strong>Fees:</strong> {{ selectedStudent.school_fees.toLocaleString('en-US') }}</p>
                    <p><strong>Total Payments:</strong> {{ selectedStudent.total_payments.toLocaleString('en-US') }}</p>
                    <button class="btn btn-link" @click="viewPayments(selectedStudent.payments)" :disabled="selectedStudent.total_payments == 0">View Payments</button>
                </div>

                <div class="col-md-4 mt-5 sculpture" v-else>
                    <div class="position-relative">
                        <img src="../assets/sculpture.jpg" alt="sculpture_image" class="w-100 h-75 rounded-5"/>
                        <div class="position-absolute top-50 start-50 translate-middle text-center bg-dark rounded">
                            <h5 class="text-light">Select a student to view their bio-data</h5>
                        </div>
                    </div>
                </div>

                <!-- Payments List -->
                <div class="col-md-4 p-3" v-if="viewingPayments">
                    <h5>Payments</h5>
                    <ul class="list-group">
                        <li v-for="payment in payments" :key="payment.payment_id" class="list-group-item">
                        UGX {{ payment.amount.toLocaleString('en-US') }} on {{ payment.createdAt }}
                        </li>
                    </ul>
                    <router-link :to="{ name: 'add-payment' }">
                        <button type="button" class="btn btn-primary mt-3" @click="showAddPayment" :disabled="selectedStudent.total_payments == selectedStudent.school_fees">Make a Payment</button>
                    </router-link>
                </div>

                <div class="col-md-4 mt-5 sculpture" v-else>
                    <div class="position-relative">
                        <img src="../assets/hand.jpg" alt="hand_image" class="w-100 h-75 rounded-5"/>
                        <div class="position-absolute top-50 start-50 translate-middle text-center rounded bg-dark">
                            <h5 class="text-light">Click "View Payments" for more details</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script>
    import ApiService from '../services/ApiService'

    export default {
    name: 'HomeComponent',
    data() {
        return {
            analytics: {
                registeredStudentsCount: 0,
                totalExpectedFees: 0,
                totalPayments: 0,
                outstandingFees: 0,
                percentagePaid: 0,
            },
            students: [],
            selectedStudent: null,
            payments: [],
            viewingPayments: false,

            search_query: null,
            filter: null
        };
    },
    computed: {
        percentagePaidColor() {
            return this.analytics.percentagePaid > 50 ? 'green' : 'red';
        },

        isSelected(student) {
            return this.selectedStudent === student;
        }
    },
    methods: {
        fetchAnalytics() {
            ApiService.getSchoolFinancials().then(response => {
                this.analytics = response.data;
            }).catch(error => {
                console.error(error)
            })
            
        },

        fetchStudents() {
            ApiService.getStudentFinancialDetails().then(response => {
                console.log(response.data);
                this.students = response.data;
            }).catch(error => {
                console.log(error);
            })
        },

        selectStudent(student) {
            this.selectedStudent = student;
            this.viewingPayments = false;
        },


        viewPayments(payments) {
            this.payments = payments.slice(0, 15);
            this.viewingPayments = true;
        },


        addStudent() {
            this.$router.push({ name: 'add-student' });
        },


        // showAddPayment() {
        //     this.$router.push({ name: 'add-payment', params: { studentId: this.selectedStudent.student_id } });
        // },

        handleInput() {},

        searchStudents() {
            const search_query = this.search_query;
            const field = this.filter;
            console.log(search_query);
            console.log(field);
        },
    },
    mounted() {
        this.fetchAnalytics();
        this.fetchStudents();
    },
    };
</script>


<style scoped>
    .analytics-banner .card {
        flex: 1;
        margin: 0 10px;
    }

    .main-content {
        display: flex;
        justify-content: space-between;
    }

    .students-list, .student-biodata, .payments-list {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 8px;
        margin: 10px;
    }

    .students-list ul, .payments-list ul {
        max-height: 400px;
        overflow-y: auto;
    }

    .list-group-item:hover {
        background-color: dimgrey;
        color: whitesmoke;
    }

    .sculpture {
        z-index: 1;
    }
</style>
