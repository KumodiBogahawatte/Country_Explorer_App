import { Form } from "react-bootstrap";

const FilterDropdown = ({ onFilter }) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <Form.Group className="mb-4">
      <Form.Select onChange={(e) => onFilter(e.target.value)}>
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default FilterDropdown;
