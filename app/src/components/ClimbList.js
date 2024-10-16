import { Formik, Form, Field, FieldArray, useField } from "formik";

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
const ClimbList = (props) => {
  const [field, meta, helpers] = useField(props);
  const { value } = meta;
  const { setValue } = helpers;
  return (
        <div>
          <FieldArray name="climbs"
            render={arrayHelpers => (
              <div>
                {value.climbs && value.climbs.length > 0 ? (
                  value.climbs.map((climb, index) => (
                    <div key={index}>
                      <Field name={`climbs.${index}`}/>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a climb from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    Add a Climb
                  </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
  </div>)
};

export default ClimbList;
