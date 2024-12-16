// external
import { v4 as uuidv4 } from "uuid";

export const TABLES_DATA = [
  {
    id: `emp_table_${uuidv4()}`,
    name: "Employee",
    columns: [
      {
        column_id: `emp_table_col_id_${uuidv4()}`,
        name: "id",
        column_data_type: "Integer",
      },
      {
        column_id: `emp_table_col_age_${uuidv4()}`,
        name: "age",
        column_data_type: "Integer",
      },
      {
        column_id: `emp_table_col_experience_${uuidv4()}`,
        name: "experience",
        column_data_type: "Integer",
      },
    ],
  },
  {
    id: `salary_table_${uuidv4()}`,
    name: "Salary",
    columns: [
      {
        column_id: `salary_table_col_id_${uuidv4()}`,
        name: "id",
        column_data_type: "Integer",
      },
      {
        column_id: `salary_table_col_name_${uuidv4()}`,
        name: "name",
        column_data_type: "String",
      },
      {
        column_id: `salary_table_col_salary_${uuidv4()}`,
        name: "salary",
        column_data_type: "Float",
      },
    ],
  },
  {
    id: `restaurants_table_${uuidv4()}`,
    name: "Restaurants",
    columns: [
      {
        column_id: `restaurants_table_col_id_${uuidv4()}`,
        name: "id",
        column_data_type: "Integer",
      },
      {
        column_id: `restaurants_table_col_name_${uuidv4()}`,
        name: "name",
        column_data_type: "String",
      },
      {
        column_id: `restaurants_table_col_address_${uuidv4()}`,
        name: "address",
        column_data_type: "String",
      },
      {
        column_id: `restaurants_table_col_city_${uuidv4()}`,
        name: "city",
        column_data_type: "String",
      },
    ],
  },
  {
    id: `customers_table_${uuidv4()}`,
    name: "Customers",
    columns: [
      {
        column_id: `customers_table_col_id_${uuidv4()}`,
        name: "id",
        column_data_type: "Integer",
      },
      {
        column_id: `customers_table_col_name_${uuidv4()}`,
        name: "name",
        column_data_type: "String",
      },
    ],
  },
];
