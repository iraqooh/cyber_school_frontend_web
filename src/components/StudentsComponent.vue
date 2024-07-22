<template>
  <div class="container my-5">
    <div class="card flex-grow-1 me-3">
      <div class="card-header">
        <h4 class="text-center">Students</h4>
      </div>
      <div class="card-body">
        <ul v-if="students.length > 0" class="list-group">
          <li v-for="(student, index) in students" :key="index" class="list-group-item" @click="selectStudent(student)">
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
        <h5 class="text-center">Student Details</h5>
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
              <td>{{ selectedStudent.status ? 'Active' : 'Inactive' }}</td>
            </tr>
            <tr>
              <td colspan="2">
                <router-link :to="{ path: '/' + selectedStudent.student_id + '/edit' }"
                  class="btn btn-success float-end">
                  Edit
                </router-link>
                <button type="button" class="btn btn-danger float-end me-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card flex-grow-1">
        <div class="card-header" style="background-color: green;">
          <h5 class="text-center">Student Finances</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>Expected School Fees</th>
                <td>{{ selectedStudent.school_fees }}</td>
              </tr>
              <tr>
                <th>Amount Paid</th>
                <td>{{ selectedStudent.total_payments }}</td>
              </tr>
              <tr>
                <th>Amount Due</th>
                <td>{{ selectedStudent.outstanding_fees }}</td>
              </tr>
              <tr>
                <th>Initial Payment (Optional)</th>
                <td>
                  <ul>
                    <li v-for="payment in selectedStudent.payments" :key="payment.payment_id">
                      {{ payment.amount }} - {{ new Date(payment.createdAt).toLocaleDateString() }}
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
        if (Array.isArray(res.data)) {
          this.students = res.data;
          console.log('Students data:', JSON.parse(JSON.stringify(this.students)));
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('There was an error fetching the students data:', error);
        console.error('Error details:', error.response);
      }
    },
    async getStudentFinancialDetails(studentId) {
      try {
        const res = await ApiService.getStudentFinancialDetails(studentId);
        if (res.data) {
          this.selectedStudent = { ...this.selectedStudent, ...res.data };
          console.log('Student financial details:', JSON.parse(JSON.stringify(this.selectedStudent)));
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('There was an error fetching the student financial details:', error);
        console.error('Error details:', error.response);
      }
    },
    selectStudent(student) {
      this.selectedStudent = student;
      this.getStudentFinancialDetails(student.student_id); // Fetch financial details when a student is selected
    }
  }
};
</script>

<style>
.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}

</style>
