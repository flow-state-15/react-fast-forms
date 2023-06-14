import { Form, useCreateFormStore } from "../libs/form-lib/state/formState";

export default function FastForm2(props) {
  const { Input } = useCreateFormStore();
  console.log("form wrapper rendering");
  return (
    <Form>
      <label>My Amazing Label: </label>
      <Input id="input-1" className="input-class" type="text" />
      <label>My Second Amazing label: </label>
      <Input id="input-2" className="input-class" type="number" />
    </Form>
  );
}
