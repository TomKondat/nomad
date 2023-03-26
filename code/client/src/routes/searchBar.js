import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiSearch } from "react-icons/bi";
function SizesExample() {
  return (
    <>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">
          {" "}
          <BiSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search Convention"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
    </>
  );
}

export default SizesExample;
