import PaperLayout from "@/components/paper/PaperLayout";
import { deleteEmployee, getAllEmployees } from "@/services/employeesService.ts";
import { employeeColumns } from "@/helpers/columns/employeesColumns";
import QUERY_KEYS from "@/data/queryKays.ts";
import AddEmployee from "@/pages/employee/AddEmployee.tsx";

const Employees: React.FC = () => {
  return (
    <PaperLayout
      name="Employee"
      queryKey={QUERY_KEYS.EMPLOYEES}
      queryFn={getAllEmployees}
      columns={employeeColumns}
      handleDeleteSelected={async (ids: string[]) => {
        await Promise.all(ids.map((id) => deleteEmployee(id)));
      }}
      FormWrapper={AddEmployee}
      paperHeaderProps={{
        name: "Employees",
      }}
      showAddButton={true}
      enableEditButton={false}
      enableViewButton={false}
    />
  );
};

export default Employees;
