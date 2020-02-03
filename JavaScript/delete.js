/*borrar--- supuesto Delete*/
const deleteEmployee = async id => {
    try {
      const res = await axios.delete(`${baseUrl}${id}`);
      const index = employeeList.findIndex(employee => {
        return employee.id == id;
      });
      employeeList.splice(index, 1);
      printList(employeeList);
    } catch (err) {
      handleError(err);
    }
  };
  