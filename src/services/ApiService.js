import apiClient from '../api/index'

console.log(apiClient);

class ApiService {

    // get school financial analytics
    getSchoolFinancials() {
        return apiClient.get('/financials')
    }

    // get all students
    getStudents(query) {
        return apiClient.get(`/students${query}`)
    }

    // Fetch detailed student data
    getStudentFinancialDetails() {
        return apiClient.get('/students-details');
    }

    // add new student
    addStudent(data) {
        return apiClient.post('/students', data)
    }

    // update student
    updateStudent(data) {
        return apiClient.put('/students', data)
    }

    // delete student
    deleteStudent(id) {
        return apiClient.delete(`/students/${id}`)
    }

    // make a payment
    makePayment(data) {
        return apiClient.post('/payments', data)
    }

}

export default new ApiService();
