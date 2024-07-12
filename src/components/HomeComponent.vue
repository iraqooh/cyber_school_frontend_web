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
        
    </div>
</template>
  

<script>
    // import ApiService from '../services/ApiService'

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
            
        },

        fetchStudents() {
            
        },

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
