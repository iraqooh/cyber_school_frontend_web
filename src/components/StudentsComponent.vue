<template>
    <div class="container d-flex">
      <div class="card flex-grow-1 me-3">
        <div style="background-color: darkolivegreen;" class="card-header">
          <h4 style ="text-align: center">Students</h4>
        </div>
        <div class="card-body">
          <ul v-if="students.length > 0" class="list-group">
            <li v-for="(student, index) in students"
                :key="index"
                class="list-group-item"
                @click="selectStudent(student)">
              {{ student.first_name }} {{ student.last_name }}
            </li>
          </ul>
          <div v-else>
            Loading......
          </div>
        </div>
      </div>
      <div v-if="selectedStudent" class="card flex-grow-1">
        <div class="card-header" style="background-color: green;">
          <h5 style ="text-align: center">Student Details</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>First Name</th>
                <td>{{ selectedStudent.first_name }}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{{ selectedStudent.last_name }}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>{{ selectedStudent.date_of_birth }}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{{ selectedStudent.gender }}</td>
              </tr>
              <tr>
                <th>Physical Address</th>
                <td>{{ selectedStudent.physical_address }}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{{ selectedStudent.category }}</td>
              </tr>
              <tr>
                <th>Class</th>
                <td>{{ selectedStudent.class }}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{{ selectedStudent.status }}</td>
              </tr>
              <!-- <tr>
                <th>School Fees</th>
                <td>{{ selectedStudent.school_fees }}</td>
              </tr>
              <tr>
                <th>Initial Payment (Optional)</th>
                <td>{{ selectedStudent.payments }}</td>
              </tr> -->
              <tr>
                <td colspan="2">
                  <RouterLink :to="{ path: '/' + selectedStudent.student_id + '/edit' }" class="btn btn-success float-end">
                    Edit
                  </RouterLink>
                  <button type="button" class="btn btn-danger float-end me-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ApiService from '../services/ApiService';
  
  export default {
    name: 'list-student',
    data() {
      return {
        students: [],
        selectedStudent: null
      };
    },
    mounted() {
      this.getStudents();
    },
    methods: {
      async getStudents() {
        try {
          const res = await ApiService.getStudents();
          // Assuming the response is an array of student objects
          if (Array.isArray(res.data)) {
            this.students = res.data;
            console.log('Students data:', this.students);
          } else {
            console.error('Unexpected response structure:', res.data);
          }
        } catch (error) {
          console.error('There was an error fetching the students data:', error);
          console.error('Error details:', error.response); // Log detailed error information
        }
      },
      selectStudent(student) {
        this.selectedStudent = student;
      }
    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
  }
  .list-group-item {
    cursor: pointer;
  }
  .list-group-item:hover {
    background-color: #f1f1f1;
  }
  </style>
  