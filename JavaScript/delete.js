//Aca va el delete
const deleteEmployee = async id => {
    try {
      const res = await axios.delete(`${baseUrl}${id}`);
      const index = employeeList.findIndex(employee => {
        return employee.id == id;
      });
      getEmployees();
    } catch (err) {
      handleError(err);
    }
  };
  